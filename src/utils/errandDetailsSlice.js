import { createSlice } from "@reduxjs/toolkit";

const errandDetailsSlice = createSlice({
  name: "errandDetails",
  initialState: null,
  reducers: {
    addErrandDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { addErrandDetails } = errandDetailsSlice.actions;

export default errandDetailsSlice.reducer;
