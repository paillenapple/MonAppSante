import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    currentJob: {},
    activeRecruiterJobs: []
  },
  reducers: {
    storeCurrentPageJobs: (state, action) => {
      state.jobs = action.payload;
    },
    storeCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
    storeActiveRecruiterJobs: (state, action) => {
      state.activeRecruiterJobs = action.payload;
    }
  },
});

export const { storeCurrentPageJobs, storeCurrentJob, storeActiveRecruiterJobs } = jobSlice.actions;

export const jobs = (state) => state.job.jobs;
export const currentJob = (state) => state.job.currentJob;
export const activeRecruiterJobs = (state) => state.job.activeRecruiterJobs;

export default jobSlice.reducer;
