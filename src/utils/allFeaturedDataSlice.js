import { createSlice } from "@reduxjs/toolkit";
//
const allFeaturedDataSlice = createSlice({
  name: "allFeaturedData",
  initialState: null,
  reducers: {
    allFeaturedList: (state, action) => {
      return action.payload;
    },
  },
});

export const { allFeaturedList } = allFeaturedDataSlice.actions;

export default allFeaturedDataSlice.reducer;
