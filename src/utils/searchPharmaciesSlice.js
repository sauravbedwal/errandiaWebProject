import { createSlice } from "@reduxjs/toolkit";

const searchPharmaciesSlice = createSlice({
  name: "searchPharmacies",
  initialState: null,
  reducers: {
    addSearchPharmacies: (state, action) => {
      return action.payload;
    },
  },
});

export const { addSearchPharmacies } = searchPharmaciesSlice.actions;

export default searchPharmaciesSlice.reducer;
