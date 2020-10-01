import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    token: "",
    firstname: "",
    surname: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.firstname = action.payload.firstname;
      state.surname = action.payload.surname;
    },
    logoutUser: (state) => {
      state.id = "";
      state.email = "";
      state.token = "";
      state.firstname = "";
      state.surname = "";
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export const currentUser = (state) => state.user;

export default userSlice.reducer;
