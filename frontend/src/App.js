import React from "react";
import {
  useSelector,
  // useDispatch
} from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { MainTemplate } from "./templates";
import { Home, Login, Signup } from "./components";
import Loader from "./features/loader/Loader";
import {
  // displayLoader,
  // hideLoader,
  selectIsLoading,
} from "./features/loader/loaderSlice";

const App = () => {
  const isLoading = useSelector(selectIsLoading);
  // const dispatch = useDispatch();
  // const handleClick = () => {
  //   if (isLoading) {
  //     dispatch(hideLoader());
  //   } else {
  //     dispatch(displayLoader());
  //   }
  // };
  return (
    <>
      {/* <button type="button" onClick={handleClick}>
        ToggleLoading
      </button> */}
      {isLoading && (
        <StyledLoader type="RevolvingDot" color="hsl(40, 90%, 56%)" />
      )}
      {!isLoading && (
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
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;

const StyledLoader = styled(Loader)`
  flex: 1;
  display: flex;

  > * {
    margin: auto;
  }
`;
