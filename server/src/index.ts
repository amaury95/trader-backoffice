import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { createConnection } from "typeorm";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { KeycloakSession } from "./keycloak";

import { host, port, origin } from "./config";

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
      origin,
    },
  });

  app.listen(parseInt(port, 10), () => {
    // tslint:disable-next-line:no-console
    console.log(`server running on http://${host}:${port}/graphql`);
  });
};

startServer();
