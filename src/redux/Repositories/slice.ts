import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: [],
  repositoryCount: 0,
  endCursor: '',
  edges: []
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
      state.endCursor = action.payload.endCursor;
      state.edges = action.payload.edges;
    },
    fetchDataFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = [];
    },
  },
});

export default slice;
