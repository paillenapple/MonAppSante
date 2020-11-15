import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

const PrivateRoute = ({ component: Component, isLogged, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps, ...props) =>
        isLogged === true ? (
          <Component {...routeProps} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;