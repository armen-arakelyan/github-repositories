import slice from "./slice";
import {
  LOAD_REPOSITORIES,
  LOAD_VIEWER_REPOSITORIES,
} from "../../Graphql/queries";
import { AppDispatch, ErrorMessage, Edges } from "../../types";
import { apolloClient } from "../../helpers";

export const fetchData =
  (searchQuery: string, cursor?: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const showViewerData = !!searchQuery;
      dispatch(slice.actions.startLoading());
      const { data } = await apolloClient.query({
        query: showViewerData ? LOAD_REPOSITORIES : LOAD_VIEWER_REPOSITORIES,
        variables: { searchQuery, first: 10, after: cursor || null },
      });
      const { edges = [], pageInfo } = showViewerData
        ? data.search
        : data.viewer.repositories;
      const { endCursor = "", hasNextPage = false } = pageInfo;
      const nodes = edges.map((edge: Edges) => edge.node);
      const resositoriesCount = showViewerData
        ? data.search.repositoryCount
        : data.viewer.repositories.totalCount;
      dispatch(
        slice.actions.fetchDataSuccess({
          repositories: nodes,
          repositoryCount: resositoriesCount,
          endCursor,
          hasNextPage,
          edges,
        })
      );
    } catch (error) {
      dispatch(slice.actions.fetchDataFail((error as ErrorMessage).message));
    }
  };
