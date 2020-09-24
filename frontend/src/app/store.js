import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loaderReducer from '../features/loader/loaderSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    loader: loaderReducer
  },
});
