import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { createConnection } from "typeorm";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { KeycloakSession } from "./keycloak";

const startServer = async () => {
  const keycloak = await KeycloakSession();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }: any) => await keycloak(req.headers.token),
  });

  await createConnection();

  const app = express();

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000",
    },
  });

  app.listen(4000, () => {
    // tslint:disable-next-line:no-console
    console.log(`server running on http://localhost:4000/graphql`);
  });
};

startServer();
