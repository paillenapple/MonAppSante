import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    email: "",
    token: "",
    firstname: "",
    surname: "",
    status: "",
    city: "",
    favorites: [],
  },
  reducers: {
    loginUser: (state, action) => {
      state.id = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.firstname = action.payload.firstname;
      state.surname = action.payload.surname;
      state.status = action.payload.status;
      state.city = action.payload.city;
      state.favorites = action.payload.favorites;
    },
    logoutUser: (state) => {
      state.id = "";
      state.email = "";
      state.token = "";
      state.firstname = "";
      state.surname = "";
      state.status = "";
      state.city = "";
      state.favorites = [];
    },
    updateUser: (state, action) => {
      state.id = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.firstname = action.payload.firstname;
      state.surname = action.payload.surname;
      state.status = action.payload.status;
      state.city = action.payload.city;
      state.favorites = action.payload.favorites;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;

export const currentUser = (state) => state.user;

export default userSlice.reducer;
