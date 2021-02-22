import {
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  IResolvers,
  UserInputError,
} from "apollo-server-express";
import { Transaction } from "./entity/Transaction";
import { User } from "./entity/User";
import * as UserController from "./controller/UserController";

export const resolvers: IResolvers = {
  User: {
    edges: async (parent: User) => ({
      outcome: (await parent.outcome).filter(
        (transaction) => transaction.receiverId !== parent.id
      ),
      income: await parent.income,
    }),
  },

  Transaction: {
    edges: async (parent: Transaction) => ({
      receiver: await parent.receiver,
      sender: await parent.sender,
    }),
  },

  Query: {
    session: async (_, __, ctx) => {
      const { sub, name, preferred_username, email, email_verified } = ctx;

      if (!sub) {
        throw new UserInputError("you must be logged in");
      }

      const user = await User.findOne(sub);

      if (user) {
        return user;
      }

      if (!email_verified) {
        throw new UserInputError("you must verify your account first");
      }

      return await User.create({
        id: sub,
        balance: 0,
        fee: 0.1,
        email,
        name,
        username: preferred_username,
      }).save();
    },

    users: async (_, { keywords, limit, offset }, { sub }) => {
      const skip = offset || 0;
      const take = limit || 10;

      if (!sub) {
        throw new AuthenticationError("no access");
      }

      const where: string =
        keywords && keywords.length ? `username LIKE '%${keywords}%'` : `TRUE`;

      return await User.find({ take, skip, where });
    },

    accounts: async (_, { keywords, limit, offset }, { realm_access }) => {
      const skip = offset || 0;
      const take = limit || 10;

      if (!UserController.hasRoles(realm_access, "admin", "accountant")) {
        throw new ForbiddenError("you don't have access to that information");
      }

      const where: string =
        keywords && keywords.length
          ? `username LIKE '%${keywords}%' OR email LIKE '%${keywords}%'`
          : `TRUE`;

      return await User.find({ take, skip, where });
    },

    account: async (_, { id }, { realm_access }) => {
      if (!UserController.hasRoles(realm_access, "admin", "accountant")) {
        throw new AuthenticationError("no access");
      }
      return await User.findOne(id);
    },

    transactions: async (_, { limit, offset }, { realm_access }) => {
      const skip = offset || 0;
      const take = limit || 10;

      if (!UserController.hasRoles(realm_access, "admin", "accountant")) {
        throw new AuthenticationError("you must be logged in");
      }

      return await Transaction.find({ take, skip });
    },

    transaction: async (_, { id }, { sub, realm_access }) => {
      if (!sub) {
        throw new AuthenticationError("you must be logged in");
      }

      const transaction = await Transaction.findOne(id);

      if (
        !transaction ||
        !transaction.involve(sub) ||
        !UserController.hasRoles(realm_access, "admin", "accountant")
      ) {
        throw new ForbiddenError(
          "you dont have permission to access this transaction"
        );
      }

      return transaction;
    },

    brokerBalance: async (_, __, { realm_access }) => {
      if (!UserController.hasRoles(realm_access, "admin", "accountant")) {
        throw new AuthenticationError("you must be logged in");
      }

      const users = await User.find();

      return users.reduce((prev, curr) => prev + curr.balance, 0);
    },

    totalAccounts: async (_, __, { realm_access }) => {
      if (!UserController.hasRoles(realm_access, "admin", "accountant")) {
        throw new AuthenticationError("you must be logged in");
      }

      const users = await User.find();

      return users.length;
    },
  },

  Mutation: {
    profile: async (_, { id, name, avatar, fee }, { sub, realm_access }) => {
      const isAdmin = UserController.hasRoles(realm_access, "admin");
      if (!id === sub && !isAdmin) {
        throw new AuthenticationError("no access");
      }

      const user = await User.findOne(id);

      if (!user) {
        throw new UserInputError("invalid userId");
      }

      user.name = name || user.name;

      user.avatar = avatar || user.avatar;

      if (user.fee !== null && isAdmin) {
        user.fee = fee;
      }

      const result = await user.save();
      console.log(result);

      return result;
    },

    send: async (_, { amount, receiverId }, { sub }) => {
      const sender = await User.findOne(sub);
      const receiver = await User.findOne(receiverId);

      if (!sender || !receiver) {
        throw new ValidationError("error in user input");
      }

      return await UserController.send(amount, sender, receiver);
    },

    deposit: async (_, { amount, receiverId }, { sub, realm_access }) => {
      const sender = await User.findOne(sub);
      const receiver = await User.findOne(receiverId);

      if (!sender || !receiver) {
        throw new ValidationError("error in user input");
      }

      if (!UserController.hasRoles(realm_access, "admin")) {
        throw new ForbiddenError("user can not perform action");
      }

      return await UserController.deposit(amount, sender, receiver);
    },

    income: async (_, { amount }, { sub, realm_access }) => {
      const sender = await User.findOne(sub);

      if (!sender) {
        throw new ValidationError("error in user input");
      }

      if (!UserController.hasRoles(realm_access, "admin")) {
        throw new ForbiddenError("user can not perform action");
      }

      return await UserController.income(amount, sender);
    },
  },
};
