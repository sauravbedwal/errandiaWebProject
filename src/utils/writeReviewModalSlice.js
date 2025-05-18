import { createSlice } from "@reduxjs/toolkit";

const writeReviewModalSlice = createSlice({
  name: "writeReview",
  initialState: { value: false },
  reducers: {
    modalWriteReviewToggle: (state) => {
      state.value = !state.value;
    },
    setWriteReviewModalTrue: (state) => {
      state.value = true;
    },
    setWriteReviewModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalWriteReviewToggle,
  setWriteReviewModalTrue,
  setWriteReviewModalFalse,
} = writeReviewModalSlice.actions;

export default writeReviewModalSlice.reducer;
