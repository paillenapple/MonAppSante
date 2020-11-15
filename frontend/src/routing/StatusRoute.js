import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";

const StatusRoute = ({ component: Component, hasRightStatus, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps, ...props) =>
        hasRightStatus === true ? (
          <Component {...routeProps} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default StatusRoute;