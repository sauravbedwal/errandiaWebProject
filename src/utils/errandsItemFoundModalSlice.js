import { createSlice } from "@reduxjs/toolkit";

const errandsItemFoundModalSlice = createSlice({
  name: "errandsItemFound",
  initialState: { value: false },
  reducers: {
    modalErrandsItemFoundToggle: (state) => {
      state.value = !state.value;
    },
    setErrandsItemFoundModalTrue: (state) => {
      state.value = true;
    },
    setErrandsItemFoundModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalErrandsItemFoundToggle,
  setErrandsItemFoundModalTrue,
  setErrandsItemFoundModalFalse,
} = errandsItemFoundModalSlice.actions;

export default errandsItemFoundModalSlice.reducer;
