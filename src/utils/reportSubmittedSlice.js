import { createSlice } from "@reduxjs/toolkit";

const reportSubmittedSlice = createSlice({
  name: "reportSubmittedModal",
  initialState: { value: false },
  reducers: {
    modalReportSubmittedToggle: (state) => {
      state.value = !state.value;
    },
    setReportSubmittedModalTrue: (state) => {
      state.value = true;
    },
    setReportSubmittedModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalReportSubmittedToggle,
  setReportSubmittedModalTrue,
  setReportSubmittedModalFalse,
} = reportSubmittedSlice.actions;

export default reportSubmittedSlice.reducer;
