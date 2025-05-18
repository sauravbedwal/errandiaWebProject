import { createSlice } from "@reduxjs/toolkit";

const townsByRegionSlice = createSlice({
  name: "townsByRegion",
  initialState: null,
  reducers: {
    addTownsByRegion: (state, action) => {
      return action.payload;
    },
  },
});

export const { addTownsByRegion } = townsByRegionSlice.actions;

export default townsByRegionSlice.reducer;
