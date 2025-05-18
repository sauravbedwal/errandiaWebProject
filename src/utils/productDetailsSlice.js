import { createSlice } from "@reduxjs/toolkit";

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: null,
  reducers: {
    addProductDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { addProductDetails } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
