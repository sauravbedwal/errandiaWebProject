import { createSlice } from "@reduxjs/toolkit";

const fallBackImageSlice = createSlice({
  name: "fallBackImage",
  initialState: null,
  reducers: {
    addFallBackImage: (state, action) => {
      return action.payload;
    },
  },
});

export const { addFallBackImage } = fallBackImageSlice.actions;

export default fallBackImageSlice.reducer;
