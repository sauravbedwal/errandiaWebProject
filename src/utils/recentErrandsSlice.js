import { createSlice } from "@reduxjs/toolkit";
//
const recentErrandsSlice = createSlice({
  name: "recentErrandsData",
  initialState: null,
  reducers: {
    recentErrandsList: (state, action) => {
      return action.payload;
    },
  },
});

export const { recentErrandsList } = recentErrandsSlice.actions;

export default recentErrandsSlice.reducer;
