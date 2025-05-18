import { createSlice } from "@reduxjs/toolkit";
//
const pharmaciesSlice = createSlice({
  name: "pharmaciesData",
  initialState: null,
  reducers: {
    pharmaciesList: (state, action) => {
      return action.payload;
    },
  },
});

export const { pharmaciesList } = pharmaciesSlice.actions;

export default pharmaciesSlice.reducer;
