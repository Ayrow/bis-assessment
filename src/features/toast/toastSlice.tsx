import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum ToastTypes {
  Success = 'Success',
  Error = 'Error',
  Notification = 'Notification',
  None = 'None',
}

interface IInitialState {
  isToastShown: boolean;
  toastMsg: string;
  toastType: ToastTypes;
}

const initialState: IInitialState = {
  isToastShown: false,
  toastMsg: '',
  toastType: ToastTypes.None,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ toastMsg: string; toastType: ToastTypes }>
    ) => {
      state.isToastShown = true;
      state.toastMsg = action.payload.toastMsg;
      state.toastType = action.payload.toastType;
    },
    closeToast: () => initialState,
  },
});

export const { showToast, closeToast } = toastSlice.actions;
export default toastSlice.reducer;
