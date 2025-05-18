import { createSlice } from "@reduxjs/toolkit";

const verifyBusinessModalSlice = createSlice({
  name: "verifyBusiness",
  initialState: { value: false },
  reducers: {
    modalVerifyBusinessToggle: (state) => {
      state.value = !state.value;
    },
    setVerifyBusinessModalTrue: (state) => {
      state.value = true;
    },
    setVerifyBusinessModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalVerifyBusinessToggle,
  setVerifyBusinessModalTrue,
  setVerifyBusinessModalFalse,
} = verifyBusinessModalSlice.actions;

export default verifyBusinessModalSlice.reducer;
