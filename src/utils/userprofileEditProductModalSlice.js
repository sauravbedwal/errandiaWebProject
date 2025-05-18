import { createSlice } from "@reduxjs/toolkit";
// s
const userprofileEditProductModalSlice = createSlice({
  name: "userprofileEditProduct",
  initialState: {
    value: false,
    editImage: null,
  },
  reducers: {
    modalUserprofileEditProductToggle: (state) => {
      state.value = !state.value;
    },
    setUserprofileEditProductModalTrue: (state) => {
      state.value = true;
    },
    setUserprofileEditProductModalFalse: (state) => {
      state.value = false;
    },
    setEditImage: (state, action) => {
      state.editImage = action.payload;
    },
  },
});

export const {
  modalUserprofileEditProductToggle,
  setUserprofileEditProductModalTrue,
  setUserprofileEditProductModalFalse,
  setEditImage,
} = userprofileEditProductModalSlice.actions;

export default userprofileEditProductModalSlice.reducer;
