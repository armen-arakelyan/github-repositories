import slice from "./slice";
import { LOAD_REPOSITORIES } from "../../Graphql/queries";
import { AppDispatch, ErrorMessage, Edges } from "../../types";
import { apolloClient } from "../../helpers";

export const fetchData =
  (searchQuery: string, cursor?: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(slice.actions.startLoading());
      const { data } = await apolloClient.query({
        query: LOAD_REPOSITORIES,
        variables: { searchQuery, first: 10, after: cursor || null },
      });
      const { edges = [], repositoryCount = 0, pageInfo } = data.search;
      const { endCursor = "", hasNextPage = false } = pageInfo;
      const nodes = edges.map((edge: Edges) => edge.node);
      dispatch(
        slice.actions.fetchDataSuccess({
          repositories: nodes,
          repositoryCount,
          endCursor,
          hasNextPage,
          edges,
        })
      );
    } catch (error) {
      dispatch(slice.actions.fetchDataFail((error as ErrorMessage).message));
    }
  };
