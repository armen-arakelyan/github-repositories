import { createSlice } from "@reduxjs/toolkit";
import { RepositoryInfo } from "../../types";

interface ISlice {
  loading: boolean;
  error: null;
  data: RepositoryInfo;
}

const initialState: ISlice = {
  loading: false,
  error: null,
  data: {
    name: "",
    owner: {
      avatarUrl: "",
      login: "",
    },
    pushedAt: null,
    shortDescriptionHTML: "",
    stargazerCount: 0,
    languages: []
  },
};

const slice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload.repository;
    },
    fetchDataFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = initialState.data;
    },
  },
});

export default slice;
