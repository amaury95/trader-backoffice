import { ApolloClient, InMemoryCache } from "@apollo/client";

import { uri } from "config";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: "include",
  uri,
});
