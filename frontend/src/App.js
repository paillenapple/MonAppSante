import React from "react";
import { useSelector } from "react-redux";
import { currentUser } from "./features/user/userSlice";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import StatusRoute from "./routing/StatusRoute";
import { MainTemplate } from "./templates";

import {
  Home,
  Login,
  Signup,
  SeekerSearchJob,
  SeekerOneJob,
  RecruiterPost,
  UserSeekerDesktop,
  UserRecruiterDesktop,
  Email,
} from "./components";

const App = () => {
  const appCurrentUser = useSelector(currentUser);

  // TODO : réimplémenter fetch automatique userInfos / minute (erreur UserRecruiterDesktop)

  // const dispatch = useDispatch();
  // const [autoFetchStatus, triggerAutoFetchStatus] = useState(false);

  // useEffect(() => {
  //   if (appCurrentUser.id) {
  //     console.log("autoFetch")
  //     const abortController = new AbortController();
  //     const autoFetchTimer = setTimeout(() => triggerAutoFetchStatus(!autoFetchStatus), 10000)
  //     const fetchUserInfos = () => {
  //       const url = new URL(
  //         `${process.env.REACT_APP_APIBASEURL}/api/auth/getuserinfos/${appCurrentUser.id}`
  //       );
  //       fetch(url, {
  //         method: "GET",
  //         signal: abortController.signal,
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           dispatch(updateUser(data));

  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     };
  //     fetchUserInfos();
  //     return () => {
  //       clearTimeout(autoFetchTimer)
  //       abortController.abort();
  //     };
  //   }
  // }, [
  //   dispatch,
  //   appCurrentUser.id,
  //   autoFetchStatus,
  // ]);

  const UserDesktopComponent = (props) => {
    if (appCurrentUser.status === "demandeur") {
      return <UserSeekerDesktop {...props} />;
    } else if (appCurrentUser.status === "recruteur") {
      return <UserRecruiterDesktop {...props} />;
    }
  };
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
            <MainTemplate
              component={<Login currentUser={appCurrentUser} />}
              {...routeProps}
            />
          )}
        />
        <PrivateRoute
          path="/userdesktop"
          status={appCurrentUser.status}
          component={UserDesktopComponent}
          isLogged={appCurrentUser.token ? true : false}
          currentUser={appCurrentUser}
        />
        <PrivateRoute
          path="/email"
          status={appCurrentUser.status}
          component={Email}
          isLogged={appCurrentUser.token ? true : false}
          currentUser={appCurrentUser}
        />
        <StatusRoute
          path="/seeker/search-job"
          status={appCurrentUser.status}
          component={SeekerSearchJob}
          hasRightStatus={appCurrentUser.status === "demandeur" ? true : false}
          currentUser={appCurrentUser}
        />
        <StatusRoute
          path="/seeker/job/:id"
          status={appCurrentUser.status}
          component={SeekerOneJob}
          hasRightStatus={appCurrentUser.status === "demandeur" ? true : false}
          currentUser={appCurrentUser}
        />
        <StatusRoute
          path="/recruiter/post"
          status={appCurrentUser.status}
          component={RecruiterPost}
          hasRightStatus={appCurrentUser.status === "recruteur" ? true : false}
          currentUser={appCurrentUser}
        />
      </Switch>
    </Router>
  );
};

export default App;
