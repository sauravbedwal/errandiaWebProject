import { createSlice } from "@reduxjs/toolkit";

const addBusinessModalSlice = createSlice({
  name: "addBusiness",
  initialState: { value: false },
  reducers: {
    modalAddBusinessToggle: (state) => {
      state.value = !state.value;
    },
    setAddBusinessModalTrue: (state) => {
      state.value = true;
    },
    setAddBusinessModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalAddBusinessToggle,
  setAddBusinessModalTrue,
  setAddBusinessModalFalse,
} = addBusinessModalSlice.actions;

export default addBusinessModalSlice.reducer;
