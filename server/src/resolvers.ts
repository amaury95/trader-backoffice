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
    session: async (_, __, { sub, name, email, email_verified }) => {
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
      }).save();
    },

    users: async (_, { keywords, limit, offset }, { sub }) => {
      const skip = offset || 0;
      const take = limit || 10;

      if (!sub) throw new AuthenticationError("no access");

      const where: string =
        keywords && keywords.length ? `name LIKE '%${keywords}%'` : `TRUE`;

      return await User.find({ take, skip, where });
    },

    accounts: async (_, { keywords, limit, offset }, { realm_access }) => {
      const skip = offset || 0;
      const take = limit || 10;

      const where: string =
        keywords && keywords.length
          ? `name LIKE '%${keywords}%' OR email LIKE '%${keywords}%'`
          : `TRUE`;

      if (!UserController.hasRoles(realm_access, "admin", "accountant")) {
        throw new ForbiddenError("you don't have access to that information");
      }

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
  },

  Mutation: {
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

    profit: async (_, { amount }, { sub, realm_access }) => {
      const sender = await User.findOne(sub);

      if (!sender) {
        throw new ValidationError("error in user input");
      }

      if (!UserController.hasRoles(realm_access, "admin")) {
        throw new ForbiddenError("user can not perform action");
      }

      return await UserController.profit(amount, sender);
    },
  },
};
