import { createSlice } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
  name: "delete",
  initialState: false,
  reducers: {
    deleteDone: (state, action) => {
      return action.payload;
    },
  },
});

export const { deleteDone } = deleteSlice.actions;

export default deleteSlice.reducer;
