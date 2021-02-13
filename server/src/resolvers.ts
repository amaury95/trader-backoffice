import {
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  IResolvers,
  UserInputError,
} from "apollo-server-express";
import * as bcrypt from "bcryptjs";
import { Transaction } from "./entity/Transaction";
import { Role } from "./entity/Role";
import { User } from "./entity/User";
import * as UserController from "./controller/UserController";

export const resolvers: IResolvers = {
  User: {
    edges: async (parent: User): Promise<any> => ({
      outcome: (await parent.outcome).filter(
        (transaction) => transaction.receiverId !== parent.id
      ),
      income: await parent.income,
      roles: await parent.roles,
    }),
  },

  Transaction: {
    receiver: async (parent) => await parent.receiver,
    sender: async (parent) => await parent.sender,
  },

  Query: {
    session: async (_, __, { req }) => {
      const { userId } = req.session;

      if (!userId) {
        return null;
      }

      return await User.findOne(userId);
    },

    users: async (_, { limit, offset }) => {
      offset ||= 0;
      limit ||= 10;
      return await User.find({ take: limit, skip: offset });
    },

    accounts: async (_, { limit, offset }, { req }) => {
      offset ||= 0;
      limit ||= 10;

      const { userId } = req.session;

      if (!(await User.hasRole(userId, Role.admin, Role.accountant))) {
        throw new ForbiddenError("you don't have access to that information");
      }

      return await User.find({ take: limit, skip: offset });
    },

    account: async (_, { id }) => {
      return await User.findOne(id);
    },

    transactions: async (_, { limit, offset }, { req }) => {
      offset ||= 0;
      limit ||= 10;

      const { userId } = req.session;

      if (!(await User.hasRole(userId, Role.accountant, Role.admin))) {
        throw new AuthenticationError("you must be logged in");
      }

      return await Transaction.find({ take: limit, skip: offset });
    },

    transaction: async (_, { id }, { req }) => {
      const { userId } = req.session;

      if (!req.session.userId) {
        throw new AuthenticationError("you must be logged in");
      }

      const transaction = await Transaction.findOne(id);

      if (
        !transaction ||
        !transaction.involve(userId) ||
        !User.hasRole(userId, Role.accountant, Role.admin)
      ) {
        throw new ForbiddenError(
          "you dont have permission to access this transaction"
        );
      }

      return transaction;
    },
  },

  Mutation: {
    register: async (_, { email, name, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        password: hashedPassword,
        balance: 0,
        fee: 0.05,
        email,
        name,
      }).save();

      await Role.create({
        value: await UserController.defaultRole(),
        user,
      }).save();

      return true;
    },

    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new UserInputError("there is not a user with that email.");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new UserInputError("incorrect password.");
      }

      req.session.userId = user.id;

      return user;
    },

    logout: (_, __, { req }) => {
      req.session.userId = 0;
      return true;
    },

    editRole: async (_, { value, userId, action }, { req }) => {
      if (!(await User.hasRole(req.session.userID, Role.admin))) {
        throw new ForbiddenError("user can not perform this action");
      }

      if (action === "append") {
        await Role.create({ value, userId }).save();
        return true;
      } else if (action === "revoque") {
        const role = await Role.findOne({ where: { value, userId } });
        if (role) {
          await role.remove();
          return true;
        }

        return false;
      }

      throw new UserInputError("invalida action");
    },

    send: async (_, { amount, receiverId }, { req }) => {
      const { userId } = req.session;
      const sender = await User.findOne(userId);
      const receiver = await User.findOne(receiverId);

      if (!sender || !receiver) {
        throw new ValidationError("error in user input");
      }

      return await UserController.send(amount, sender, receiver);
    },

    deposit: async (_, { amount, receiverId }, { req }) => {
      const { userId } = req.session;
      const sender = await User.findOne(userId);
      const receiver = await User.findOne(receiverId);

      if (!sender || !receiver) {
        throw new ValidationError("error in user input");
      }

      if (!(await sender.hasRole(Role.admin))) {
        throw new ForbiddenError("user can not perform action");
      }

      return await UserController.deposit(amount, sender, receiver);
    },

    profit: async (_, { amount }, { req }) => {
      const { userId } = req.session;
      const sender = await User.findOne(userId);

      if (!sender) {
        throw new ValidationError("error in user input");
      }

      if (!(await sender.hasRole(Role.admin))) {
        throw new ForbiddenError("user can not perform action");
      }

      return await UserController.profit(amount, sender);
    },
  },
};
