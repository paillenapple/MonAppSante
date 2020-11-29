import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./../features/user/userSlice";
import jobReducer from "./../features/job/jobSlice";

const rootReducer = combineReducers({
  user: userReducer,
  job: jobReducer,
});

export default rootReducer;
