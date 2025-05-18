import { createSlice } from "@reduxjs/toolkit";

const runErrandNewModalSlice = createSlice({
  name: "runErrandNew",
  initialState: { value: false },
  reducers: {
    modalRunErrandNewToggle: (state) => {
      state.value = !state.value;
    },
    setRunErrandNewModalTrue: (state) => {
      state.value = true;
    },
    setRunErrandNewModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalRunErrandNewToggle,
  setRunErrandNewModalTrue,
  setRunErrandNewModalFalse,
} = runErrandNewModalSlice.actions;

export default runErrandNewModalSlice.reducer;
