import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './Repositories/slice';

const store = configureStore({
  reducer: {
    repositories: repositoriesReducer.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;