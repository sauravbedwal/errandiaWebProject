import { createSlice } from "@reduxjs/toolkit";

const businessShareSlice = createSlice({
  name: "businessShare",
  initialState: { value: false },
  reducers: {
    modalShareToggle: (state) => {
      state.value = !state.value;
    },
    setShareModalTrue: (state) => {
      state.value = true;
    },
    setShareModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const { modalShareToggle, setShareModalTrue, setShareModalFalse } =
  businessShareSlice.actions;

export default businessShareSlice.reducer;
