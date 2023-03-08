import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const httpLink = new HttpLink({
  uri: "https://api.github.com/search/repositories",
  useGETForQueries: true,
  headers: {
    "Content-Type": "application/json",
  },
  fetch: (uri, options) => {
    return fetch(uri.toString().replace(/query/g, "q"), options);
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
