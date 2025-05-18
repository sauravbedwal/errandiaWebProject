import { createSlice } from "@reduxjs/toolkit";
//
const productsDataSlice = createSlice({
  name: "productsData",
  initialState: {
    products: null,
    services: null,
  },
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    addServices: (state, action) => {
      state.services = action.payload;
    },
    removeProducts: (state, action) => {
      state.products = null;
    },
    removeServices: (state, action) => {
      state.services = null;
    },
    insertProduct: (state, action) => {
      return state.payload.concat(action.payload);
    },
  },
});

export const { addProducts, removeProducts, removeServices, addServices } =
  productsDataSlice.actions;

export default productsDataSlice.reducer;
