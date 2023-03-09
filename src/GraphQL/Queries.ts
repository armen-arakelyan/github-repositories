import { gql } from "@apollo/client";

export const LOAD_REPOSITORIES = gql`
  query SearchRepositories($searchQuery: String!, $first: Int!, $after: String) {
    search(query: $searchQuery, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          id
          name
          stargazerCount
          pushedAt
          url
        }
      }
    }
  }
`;
