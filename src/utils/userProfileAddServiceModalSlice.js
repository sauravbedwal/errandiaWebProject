import { createSlice } from "@reduxjs/toolkit";

const userProfileAddServiceModalSlice = createSlice({
  name: "userProfileAddService",
  initialState: { value: false },
  reducers: {
    modalUserProfileAddServiceToggle: (state) => {
      state.value = !state.value;
    },
    setUserProfileAddServiceModalTrue: (state) => {
      state.value = true;
    },
    setUserProfileAddServiceModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalUserProfileAddServiceToggle,
  setUserProfileAddServiceModalTrue,
  setUserProfileAddServiceModalFalse,
} = userProfileAddServiceModalSlice.actions;

export default userProfileAddServiceModalSlice.reducer;
