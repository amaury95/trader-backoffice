import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { createConnection } from "typeorm";
import * as session from "express-session";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { seeds } from "./seeds";

require("dotenv").config();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req }),
  });

  await createConnection();

  seeds();

  const app = express();
  app.use(
    session({ saveUninitialized: false, resave: false, secret: "SECRET_KEY " })
  );

  const origin =
    process.env.NODE_ENV === "develop"
      ? "http://localhost:3000"
      : "https://trader-admin.github.io";

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin,
    },
  });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`, {
      origin,
    });
  });
};

startServer();
