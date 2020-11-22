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
    notifications: [],
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
      state.notifications = action.payload.notifications;
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
      state.notifications = [];
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
      state.notifications = action.payload.notifications;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;

export const currentUser = (state) => state.user;

export default userSlice.reducer;
