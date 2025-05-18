import { createSlice } from "@reduxjs/toolkit";

const reportModalSlice = createSlice({
  name: "reportModal",
  initialState: { value: false },
  reducers: {
    modalReportToggle: (state) => {
      state.value = !state.value;
    },
    setReportModalTrue: (state) => {
      state.value = true;
    },
    setReportModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const { modalReportToggle, setReportModalTrue, setReportModalFalse } =
  reportModalSlice.actions;

export default reportModalSlice.reducer;
