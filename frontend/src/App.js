import React from "react";

import { useSelector } from "react-redux";
import { currentUser } from "./features/user/userSlice";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";

import { MainTemplate } from "./templates";

import {
  Home,
  Login,
  Signup,
  NewPatient,
  PatientsListing,
  UserDesktop,
} from "./components";

const App = () => {
  const appCurrentUser = useSelector(currentUser);
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <MainTemplate component={<Home />} {...routeProps} />
          )}
        />
        <Route
          path="/signup"
          render={(routeProps) => (
            <MainTemplate component={<Signup />} {...routeProps} />
          )}
        />
        <Route
          path="/login"
          render={(routeProps) => (
            <MainTemplate component={<Login />} {...routeProps} />
          )}
        />
        <PrivateRoute
          path="/userdesktop"
          component={UserDesktop}
          isLogged={appCurrentUser.token ? true : false}
        />
        <PrivateRoute
          path="/new"
          component={NewPatient}
          isLogged={appCurrentUser.token ? true : false}
        />
        <PrivateRoute
          exact
          path="/read"
          component={PatientsListing}
          isLogged={appCurrentUser.token ? true : false}
        />
      </Switch>
    </Router>
  );
};

export default App;