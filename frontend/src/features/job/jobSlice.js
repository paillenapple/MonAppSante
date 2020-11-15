import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    currentJob: {},
  },
  reducers: {
    storeCurrentPageJobs: (state, action) => {
      state.jobs = action.payload;
    },
    storeCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
  },
});

export const { storeCurrentPageJobs, storeCurrentJob } = jobSlice.actions;

export const jobs = (state) => state.job.jobs;
export const currentJob = (state) => state.job.currentJob;

export default jobSlice.reducer;
