import { createSlice } from "@reduxjs/toolkit";

const businessDataSlice = createSlice({
  name: "businessData",
  initialState: null,
  reducers: {
    addBusiness: (state, action) => {
      return action.payload;
    },

    removeBusiness: (state, action) => {
      return null;
    },
  },
});

export const { addBusiness, removeBusiness } = businessDataSlice.actions;

export default businessDataSlice.reducer;
