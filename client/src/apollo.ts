import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = process.env.APOLLO_SERVER || "http://localhost:4000/graphql";

console.log("getting data from", uri);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  uri,
});
