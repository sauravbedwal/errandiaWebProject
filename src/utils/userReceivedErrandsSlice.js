import { createSlice } from "@reduxjs/toolkit";

const userReceivedErrandsSlice = createSlice({
  name: "userReceivedErrands",
  initialState: {
    receivedErrands: null,
    postedErrands: null,
  },
  reducers: {
    addReceivedErrands: (state, action) => {
      state.receivedErrands = action.payload;
    },
    addPostedErrands: (state, action) => {
      state.postedErrands = action.payload;
    },
  },
});

export const { addReceivedErrands, addPostedErrands } =
  userReceivedErrandsSlice.actions;

export default userReceivedErrandsSlice.reducer;
