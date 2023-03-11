import { createSlice } from '@reduxjs/toolkit';

interface ISlice {
  loading: boolean;
  error: null,
  data: [],
  repositoryCount: number;
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }
}

const initialState: ISlice = {
  loading: false,
  error: null,
  data: [],
  repositoryCount: 0,
  pageInfo: {
    startCursor: '',
    endCursor: '',
    hasNextPage: false,
    hasPreviousPage: false
  }
};

const slice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload.repositories;
      state.repositoryCount = action.payload.repositoryCount;
      state.pageInfo = action.payload.pageInfo;
    },
    fetchDataFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export default slice;
