import { createSlice } from "@reduxjs/toolkit";

const errandiaBoosterSlice = createSlice({
  name: "errandiaBooster",
  initialState: { value: false },
  reducers: {
    modalErrandiaBoosterToggle: (state) => {
      state.value = !state.value;
    },
    setErrandiaBoosterModalTrue: (state) => {
      state.value = true;
    },
    setErrandiaBoosterModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const { modalErrandiaBoosterToggle, setErrandiaBoosterModalTrue, setErrandiaBoosterModalFalse } =
errandiaBoosterSlice.actions;

export default errandiaBoosterSlice.reducer;
