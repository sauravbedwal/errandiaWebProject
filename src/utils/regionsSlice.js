import { createSlice } from "@reduxjs/toolkit";

const regionsSlice = createSlice({
  name: "regions",
  initialState: null,
  reducers: {
    addRegions: (state, action) => {
      return action.payload;
    },
  },
});

export const { addRegions } = regionsSlice.actions;

export default regionsSlice.reducer;
