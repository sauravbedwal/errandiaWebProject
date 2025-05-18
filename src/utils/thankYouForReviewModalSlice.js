import { createSlice } from "@reduxjs/toolkit";

const thankYouForReviewModalSlice = createSlice({
  name: "thankYouForReview",
  initialState: { value: false },
  reducers: {
    modalThankYouForReviewToggle: (state) => {
      state.value = !state.value;
    },
    setThankYouForReviewModalTrue: (state) => {
      state.value = true;
    },
    setThankYouForReviewModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalThankYouForReviewToggle,
  setThankYouForReviewModalTrue,
  setThankYouForReviewModalFalse,
} = thankYouForReviewModalSlice.actions;

export default thankYouForReviewModalSlice.reducer;
