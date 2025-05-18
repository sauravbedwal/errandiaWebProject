import { createSlice } from "@reduxjs/toolkit";

const signUpModalSlice = createSlice({
  name: "signUpModal",
  initialState: { value: false },
  reducers: {
    signUpModalToggle: (state) => {
      state.value = !state.value;
    },
    setSignUpModalTrue: (state) => {
      state.value = true;
    },
    setSignUpModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const { signUpModalToggle, setSignUpModalTrue, setSignUpModalFalse } =
  signUpModalSlice.actions;

export default signUpModalSlice.reducer;
