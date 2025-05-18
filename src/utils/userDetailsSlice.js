import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: null,
  reducers: {
    addUserDetails: (state, action) => {
      return action.payload;
    },
    removeUserDetails: (state, action) => {
      return null;
    },
  },
});

export const { addUserDetails, removeUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;

// same slice object os state instead of null
