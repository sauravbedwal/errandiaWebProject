import { createSlice } from "@reduxjs/toolkit";

const verifyBusinessConfirmedModalSlice = createSlice({
  name: "verifyConfirmed",
  initialState: { value: false },
  reducers: {
    modalVerifyBusinessConfirmedToggle: (state) => {
      state.value = !state.value;
    },
    setVerifyBusinessConfirmedModalTrue: (state) => {
      state.value = true;
    },
    setVerifyBusinessConfirmedModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalVerifyBusinessConfirmedToggle,
  setVerifyBusinessConfirmedModalTrue,
  setVerifyBusinessConfirmedModalFalse,
} = verifyBusinessConfirmedModalSlice.actions;

export default verifyBusinessConfirmedModalSlice.reducer;
