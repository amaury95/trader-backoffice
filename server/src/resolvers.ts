import { IResolvers } from "apollo-server-express";
import { User } from "./entity/User";
import * as bcrypt from "bcryptjs";

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, { req }) => {
      const { userId } = req.session;

      if (!userId) {
        return null;
      }

      return await User.findOne(userId);
    },
  },

  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword,
      }).save();

      return true;
    },

    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      req.session.userId = user.id;

      return user;
    },
  },
};
