import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    perPage: null,
    totalItems: null,
    activePage: 1,
  },
  reducers: {
    addPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    addTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
    addActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { addPerPage, addTotalItems, addActivePage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
