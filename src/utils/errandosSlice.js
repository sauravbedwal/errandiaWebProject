import { createSlice } from "@reduxjs/toolkit";
//
const errandosSlice = createSlice({
  name: "errandosData",
  initialState: null,
  reducers: {
    errandosList: (state, action) => {
      return action.payload;
    },
  },
});

export const { errandosList } = errandosSlice.actions;

export default errandosSlice.reducer;
