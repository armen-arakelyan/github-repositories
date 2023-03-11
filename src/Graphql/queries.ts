import { gql } from "@apollo/client";

export const LOAD_REPOSITORY = gql`
query GetRepositoryInfo($name: String!, $owner: String!) {
  repository(name: $name, owner: $owner) {
    name
    stargazerCount
    pushedAt
    shortDescriptionHTML
    owner {
      login
      avatarUrl
    }
    languages(first: 100) {
      nodes {
        name
      }
    }
  }
}
`;

export const LOAD_REPOSITORIES = gql`
  query SearchRepositories(
    $searchQuery: String!
    $first: Int!
    $after: String
  ) {
    search(
      query: $searchQuery
      type: REPOSITORY
      first: $first
      after: $after
    ) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            stargazerCount
            pushedAt
            url
            owner {
              login
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        startCursor
      }
    }
  }
`;
