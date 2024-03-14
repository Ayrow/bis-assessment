import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../user/userSlice';

interface IInitialState {
  isModalOpen: boolean;
  userToEdit: IUser | null;
}

const initialState: IInitialState = {
  isModalOpen: false,
  userToEdit: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IUser>) => {
      state.isModalOpen = true;
      state.userToEdit = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.userToEdit = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
