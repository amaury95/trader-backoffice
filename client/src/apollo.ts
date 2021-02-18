import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { uri } from "config";

const httpLink = createHttpLink({
  uri,
});

const authLink = (token?: string) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      token,
    },
  }));

export const client = (token?: string) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    credentials: "include",
    link: authLink(token).concat(httpLink),
  });
