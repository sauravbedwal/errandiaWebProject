import { createSlice } from "@reduxjs/toolkit";

const userProfileEditServiceModalSlice = createSlice({
  name: "userProfileEditService",
  initialState: { value: false },
  reducers: {
    modalUserProfileEditServiceToggle: (state) => {
      state.value = !state.value;
    },
    setUserProfileEditServiceModalTrue: (state) => {
      state.value = true;
    },
    setUserProfileEditServiceModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalUserProfileEditServiceToggle,
  setUserProfileEditServiceModalTrue,
  setUserProfileEditServiceModalFalse,
} = userProfileEditServiceModalSlice.actions;

export default userProfileEditServiceModalSlice.reducer;
