import { createSlice } from "@reduxjs/toolkit";

const businessDetailsSlice = createSlice({
  name: "businessDetails",
  initialState: null,
  reducers: {
    addBusinessDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { addBusinessDetails } = businessDetailsSlice.actions;

export default businessDetailsSlice.reducer;
