import slice from "./slice";
import { LOAD_REPOSITORIES } from '../../graphql/queries';
import { AppDispatch, ErrorMessage } from "../../types";
import { apolloClient } from "../../helpers";

export const fetchData =
  (searchQuery: string, page: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(slice.actions.startLoading());
      const { data } = await apolloClient.query({
        query: LOAD_REPOSITORIES,
        variables: { searchQuery, first: 10, after: null },
      });
      const { nodes = [], repositoryCount = 0, pageInfo } = data.search;
      dispatch(slice.actions.fetchDataSuccess({ repositories: nodes, repositoryCount, pageInfo }));
      
      if (page > 1 && pageInfo.hasNextPage) {
        const { endCursor } = pageInfo;
        const { data: newData } = await apolloClient.query({
          query: LOAD_REPOSITORIES,
          variables: { searchQuery, first: 10, after: endCursor },
        });
        const { nodes = [], repositoryCount = 0, pageInfo: newPageInfo } = newData.search;
        dispatch(slice.actions.fetchDataSuccess({ repositories: nodes, repositoryCount, pageInfo: newPageInfo }));
      }
    } catch (error) {
      dispatch(slice.actions.fetchDataFail((error as ErrorMessage).message));
    }
  };
