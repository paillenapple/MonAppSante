import { createSlice } from "@reduxjs/toolkit";

export const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patients: [],
    currentPatient: {}
  },
  reducers: {
    storeAllPatients: (state, action) => {
      state.patients = action.payload;
    },
    storeCurrentPatient: (state, action) => {
      state.currentPatient = action.payload;
    },
  },
});

export const { storeAllPatients, storeCurrentPatient } = patientSlice.actions;

export const patients = (state) => state.patient.patients;
export const currentPatient = (state) => state.patient.currentPatient;

export default patientSlice.reducer;
