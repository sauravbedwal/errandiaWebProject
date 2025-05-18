import { createSlice } from "@reduxjs/toolkit";

const userprofileAddProductModalSlice = createSlice({
  name: "userprofileAddProduct",
  initialState: {
    value: false,
    modal: null,
  },
  reducers: {
    modalUserprofileAddProductToggle: (state) => {
      state.value = !state.value;
    },
    setUserprofileAddProductModalTrue: (state) => {
      state.value = true;
    },
    setUserprofileAddProductModalFalse: (state) => {
      state.value = false;
    },
    setModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const {
  modalUserprofileAddProductToggle,
  setUserprofileAddProductModalTrue,
  setUserprofileAddProductModalFalse,
  setModal,
} = userprofileAddProductModalSlice.actions;

export default userprofileAddProductModalSlice.reducer;
