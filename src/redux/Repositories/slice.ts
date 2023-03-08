import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  data: null,
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
      state.data = action.payload;
    },
    fetchDataFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export default slice;
