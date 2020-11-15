import { createSlice } from "@reduxjs/toolkit";

export const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patients: [],
    currentPatient: {}
  },
  reducers: {
    storeCurrentPagePatients: (state, action) => {
      state.patients = action.payload;
    },
    storeCurrentPatient: (state, action) => {
      state.currentPatient = action.payload;
    },
  },
});

export const { storeCurrentPagePatients, storeCurrentPatient } = patientSlice.actions;

export const patients = (state) => state.patient.patients;
export const currentPatient = (state) => state.patient.currentPatient;

export default patientSlice.reducer;
