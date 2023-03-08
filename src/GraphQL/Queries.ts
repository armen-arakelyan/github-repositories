import gql from "graphql-tag";

export const LOAD_REPOSITORIES = gql`
  query getGithubRepositories($query: String!) {
    search(query: $query) {
      total_count
    }
  }
`;
