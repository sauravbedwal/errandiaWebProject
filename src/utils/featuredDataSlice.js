import { createSlice } from "@reduxjs/toolkit";
//
const featuredDataSlice = createSlice({
  name: "featuredData",
  initialState: null,
  reducers: {
    featuredList: (state, action) => {
      return action.payload;
    },
  },
});

export const { featuredList } = featuredDataSlice.actions;

export default featuredDataSlice.reducer;
