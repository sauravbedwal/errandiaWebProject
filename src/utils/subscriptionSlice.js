import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: { value: false },
  reducers: {
    modalSubscriptionToggle: (state) => {
      state.value = !state.value;
    },
    setSubscriptionModalTrue: (state) => {
      state.value = true;
    },
    setSubscriptionModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalSubscriptionToggle,
  setSubscriptionModalTrue,
  setSubscriptionModalFalse,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
