import { createSlice } from "@reduxjs/toolkit";

const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState: {
    region: null,
    town: null,
    distance: null,
    service: "0",
    selectedRegion: null,
    selectedTown: null,
    selectedCall: null,
    data: null,
    isPending: false,
  },
  reducers: {
    addSearchProduct: (state, action) => {
      state.data = action.payload;
    },

    region: (state, action) => {
      state.region = action.payload;
    },

    town: (state, action) => {
      state.town = action.payload;
    },

    addDistance: (state, action) => {
      state.distance = action.payload;
    },
    service: (state, action) => {
      state.service = action.payload;
    },
    selectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
    selectedTown: (state, action) => {
      state.selectedTown = action.payload;
    },
    selectedCall: (state, action) => {
      state.selectedCall = action.payload;
    },
    setIsPending: (state, action) => {
      state.isPending = action.payload;
    },
  },
});
//

export const {
  addSearchProduct,
  region,
  town,
  addDistance,
  service,
  selectedRegion,
  selectedTown,
  selectedCall,
  setIsPending,
} = searchProductSlice.actions;

export default searchProductSlice.reducer;
