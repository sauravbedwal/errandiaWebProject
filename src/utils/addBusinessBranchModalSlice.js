import { createSlice } from "@reduxjs/toolkit";

const addBusinessBranchModalSlice = createSlice({
  name: "addBusinessBranch",
  initialState: { value: false },
  reducers: {
    modalAddBusinessBranchToggle: (state) => {
      state.value = !state.value;
    },
    setAddBusinessBranchModalTrue: (state) => {
      state.value = true;
    },
    setAddBusinessBranchModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalAddBusinessBranchToggle,
  setAddBusinessBranchModalTrue,
  setAddBusinessBranchModalFalse,
} = addBusinessBranchModalSlice.actions;

export default addBusinessBranchModalSlice.reducer;
