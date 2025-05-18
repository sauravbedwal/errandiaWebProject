import { createSlice } from "@reduxjs/toolkit";
//
const businessNearYouSlice = createSlice({
  name: "businessNearYouData",
  initialState: null,
  reducers: {
    businessNearYouList: (state, action) => {
      return action.payload;
    },
  },
});

export const { businessNearYouList } = businessNearYouSlice.actions;

export default businessNearYouSlice.reducer;
