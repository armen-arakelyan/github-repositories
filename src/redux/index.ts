import { configureStore } from '@reduxjs/toolkit';
import repositoriesReducer from './Repositories/slice';
import repositoryReducer from './Repository/slice';

const store = configureStore({
  reducer: {
    repositories: repositoriesReducer.reducer,
    repository: repositoryReducer.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;