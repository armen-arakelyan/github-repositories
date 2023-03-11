import slice from "./slice";
import { LOAD_REPOSITORY } from "../../Graphql/queries";
import { AppDispatch, ErrorMessage } from "../../types";
import { apolloClient } from "../../helpers";

export const fetchData =
  (name: string, owner: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(slice.actions.startLoading());
      const { data } = await apolloClient.query({
        query: LOAD_REPOSITORY,
        variables: { name, owner },
      });
      const { repository } = data;
      
      const languages = repository.languages.nodes.map((itm: { name: string }) => itm.name);

      const repositoryModified = {
        ...repository,
        languages
      };
      dispatch(
        slice.actions.fetchDataSuccess({
          repository: repositoryModified
        })
      );
    } catch (error) {
      dispatch(slice.actions.fetchDataFail((error as ErrorMessage).message));
    }
  };
