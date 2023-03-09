import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  headers: { 'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}` },
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
});
