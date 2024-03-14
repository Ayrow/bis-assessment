import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IUser {
  role: string;
  city: string;
  address: string;
  phone: string;
  username: string;
  id: number;
  email: string;
  name: string;
}

interface IInitialState {
  user: null | IUser;
}

const initialState: IInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
