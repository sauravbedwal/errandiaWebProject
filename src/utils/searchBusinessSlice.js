import { createSlice } from "@reduxjs/toolkit";

const searchBusinessSlice = createSlice({
  name: "searchBusiness",
  initialState: null,
  reducers: {
    addSearchBusiness: (state, action) => {
      return action.payload;
    },
  },
});

export const { addSearchBusiness } = searchBusinessSlice.actions;

export default searchBusinessSlice.reducer;
