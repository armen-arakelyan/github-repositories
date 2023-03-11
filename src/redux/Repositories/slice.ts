import { createSlice } from '@reduxjs/toolkit';
import { Edges } from '../../types';

interface ISlice {
  loading: boolean;
  error: null,
  data: [],
  repositoryCount: number;
  endCursor: string;
  edges: Edges[]
}

const initialState: ISlice = {
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
