import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import { createConnection } from "typeorm";
import * as session from "express-session";

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

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
