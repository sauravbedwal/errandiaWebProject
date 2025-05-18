import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { value: false },
  reducers: {
    modalToggle: (state) => {
      state.value = !state.value;
    },
    setModalTrue: (state) => {
      state.value = true;
    },
    setModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const { modalToggle, setModalTrue, setModalFalse } = modalSlice.actions;

export default modalSlice.reducer;
