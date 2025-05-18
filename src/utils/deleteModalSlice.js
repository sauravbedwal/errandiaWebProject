import { createSlice } from "@reduxjs/toolkit";

const deleteModalSlice = createSlice({
  name: "deleteModal",
  initialState: { value: false },
  reducers: {
    modalDeleteToggle: (state) => {
      state.value = !state.value;
    },
    setDeleteModalTrue: (state) => {
      state.value = true;
    },
    setDeleteModalFalse: (state) => {
      state.value = false;
    },
  },
});

export const { modalDeleteToggle, setDeleteModalTrue, setDeleteModalFalse } =
  deleteModalSlice.actions;

export default deleteModalSlice.reducer;
