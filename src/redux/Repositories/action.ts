import slice from "./slice";
import {
  LOAD_REPOSITORIES,
  LOAD_VIEWER_REPOSITORIES,
} from "../../Graphql/queries";
import { AppDispatch, ErrorMessage } from "../../types";
import { apolloClient } from "../../helpers";

export const fetchData =
  (searchQuery: string, endCursor: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const showViewerData = !!searchQuery;
      dispatch(slice.actions.startLoading());
      const { data } = await apolloClient.query({
        query: showViewerData ? LOAD_REPOSITORIES : LOAD_VIEWER_REPOSITORIES,
        variables: { searchQuery, first: 10, after: endCursor || null },
      });
      const { nodes = [], pageInfo } = showViewerData
        ? data.search
        : data.viewer.repositories;
      const resositoriesCount = showViewerData
        ? data.search.repositoryCount
        : data.viewer.repositories.totalCount;

      dispatch(
        slice.actions.fetchDataSuccess({
          repositories: nodes,
          repositoryCount: resositoriesCount,
          pageInfo: {
            ...pageInfo,
            endCursor: endCursor || ''
          }
        })
      );
    } catch (error) {
      dispatch(slice.actions.fetchDataFail((error as ErrorMessage).message));
    }
  };
