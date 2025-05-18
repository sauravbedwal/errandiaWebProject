import { createSlice } from "@reduxjs/toolkit";

const branchAddedModalSlice = createSlice({
  name: "branchAdded",
  initialState: { value: false },
  reducers: {
    modalBranchAddedToggle: (state) => {
      state.value = !state.value;
    },
    setBranchAddedModalTrue: (state) => {
      state.value = true;
    },
    setBranchAddedModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const {
  modalBranchAddedToggle,
  setBranchAddedModalTrue,
  setBranchAddedModalFalse,
} = branchAddedModalSlice.actions;

export default branchAddedModalSlice.reducer;
