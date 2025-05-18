import { createSlice } from "@reduxjs/toolkit";

const filterPharmaciesCalenderSlice = createSlice({
  name: "filterPharmaciesCalender",
  initialState: null,
  reducers: {
    addDate: (state, action) => {
      return action.payload;
    },
  },
});

export const { addDate } = filterPharmaciesCalenderSlice.actions;

export default filterPharmaciesCalenderSlice.reducer;
