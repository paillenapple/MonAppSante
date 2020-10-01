import { combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "./../features/loader/loaderSlice";
import userReducer from "./../features/user/userSlice";
import patientReducer from "./../features/patient/patientSlice";

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  patient: patientReducer
});

export default rootReducer;
