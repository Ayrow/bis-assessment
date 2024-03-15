import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './src/features/users/usersSlice';
import modalReducer from './src/features/modal/modalSlice';
import toastReducer from './src/features/toast/toastSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    modal: modalReducer,
    toast: toastReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
