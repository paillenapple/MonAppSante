import { createSlice } from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    value: false,
  },
  reducers: {
    displayLoader: state => {
      state.value = true;
    },
    hideLoader: state => {
      state.value = false;
    },
  },
});

export const { displayLoader, hideLoader } = loaderSlice.actions;

export const selectIsLoading = state => state.loader.value;

export default loaderSlice.reducer;
