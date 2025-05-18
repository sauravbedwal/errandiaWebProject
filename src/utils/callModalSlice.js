import { createSlice } from "@reduxjs/toolkit";

const callModalSlice = createSlice({
  name: "callModal",
  initialState: { value: false },
  reducers: {
    modalCallToggle: (state) => {
      state.value = !state.value;
    },
    setCallModalTrue: (state) => {
      state.value = true;
    },
    setCallModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const { modalCallToggle, setCallModalTrue, setCallModalFalse } =
  callModalSlice.actions;

export default callModalSlice.reducer;
