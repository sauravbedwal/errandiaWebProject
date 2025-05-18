import { createSlice } from "@reduxjs/toolkit";

const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: null,
  reducers: {
    addProductCategories: (state, action) => {
      return action.payload;
    },
  },
});

export const { addProductCategories } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
