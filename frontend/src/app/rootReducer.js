import { combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "./../features/loader/loaderSlice";
import userReducer from "./../features/user/userSlice";
import patientReducer from "./../features/patient/patientSlice";
import jobReducer from "./../features/job/jobSlice";

const rootReducer = combineReducers({
  loader: loaderReducer,
  user: userReducer,
  patient: patientReducer,
  job: jobReducer,
});

export default rootReducer;
