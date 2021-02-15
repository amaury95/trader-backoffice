import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { createConnection } from "typeorm";
import * as session from "express-session";
import * as fs from "fs";
import * as https from "https";

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

require("dotenv").config();

const privateKey = fs.readFileSync("../certs/signature.key", "utf8");
const certificate = fs.readFileSync("../certs/signature.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: any) => ({ req }),
  });

  await createConnection();

  const app = express();

  app.use(
    session({ saveUninitialized: false, resave: false, secret: "SECRET_KEY " })
  );

  const origin =
    process.env.NODE_ENV === "develop"
      ? "http://localhost:3000"
      : "https://trader-admin.github.io";

  const host =
    process.env.NODE_ENV === "develop" ? "localhost" : "195.181.247.138";

  const port = 4000;

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin,
    },
  });

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port, host, () => {
    console.log(`server running on https://${host}:${port}/graphql`, {
      origin,
    });
  });
};

startServer();
