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
  users: null | IUser[];
}

const initialState: IInitialState = {
  users: null,
};

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    // Some workaround to update the list
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.users =
        state.users?.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }) ?? [];

      // state.users = newList ?? [];
    },
  },
});

export const { setUsers, updateUser } = usersSlice.actions;
export default usersSlice.reducer;
