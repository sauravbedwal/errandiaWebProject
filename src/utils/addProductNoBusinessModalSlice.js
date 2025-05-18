import { createSlice } from "@reduxjs/toolkit";

const addProductNoBusinessModalSlice = createSlice({
  name: "addProductNoBusiness",
  initialState: { value: false },
  reducers: {
    modalAddProductNoBusinessToggle: (state) => {
      state.value = !state.value;
    },
    setAddProductNoBusinessModalTrue: (state) => {
      state.value = true;
    },
    setAddProductNoBusinessModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalAddProductNoBusinessToggle,
  setAddProductNoBusinessModalTrue,
  setAddProductNoBusinessModalFalse,
} = addProductNoBusinessModalSlice.actions;

export default addProductNoBusinessModalSlice.reducer;
