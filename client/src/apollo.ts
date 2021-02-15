import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri =
  process.env.NODE_ENV === "development"
    ? "https://localhost:4000/graphql"
    : "https://195.181.247.138:4000/graphql";

console.log("getting data from:", uri);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  uri,
});
