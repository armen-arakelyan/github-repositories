import slice from "./slice";
// import { LOAD_REPOSITORIES } from '../../GraphQL/Queries';
import { AppDispatch, ErrorMessage } from "../../types";
import { getFetchRequest } from "../../helpers";

export const fetchData =
  (query: string, page: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(slice.actions.startLoading());
      const data = await (query && page
        ? getFetchRequest(
            `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=10`
          )
        : getFetchRequest(
            "https://api.github.com/users/armen-arakelyan/repos"
          ));
      // const { data } = await apolloClient.query({
      //   query: LOAD_REPOSITORIES,
      //   variables: { query }
      // })
      const repositories = data || {};
      dispatch(slice.actions.fetchDataSuccess(repositories));
    } catch (error) {
      dispatch(slice.actions.fetchDataFail((error as ErrorMessage).message));
    }
  };
