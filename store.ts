import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/features/user/userSlice';
import modalReducer from './src/features/modal/modalSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
