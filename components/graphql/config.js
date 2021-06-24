import fetch from "cross-fetch/polyfill";
import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`Graphql error ${message}`);
    });
  }
  console.log(networkError);
});
// const link = from([
//   errorlink,
//   new HttpLink({
//     url: "http://localhost:1337/graphql",
//   }),
// ]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:1337/graphql",
  onError: errorlink,
});
