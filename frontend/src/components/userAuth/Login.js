import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  displayLoader,
  hideLoader,
  selectIsLoading,
} from "../../features/loader/loaderSlice";
import { loginUser, currentUser } from "../../features/user/userSlice";
import { Redirect } from "react-router-dom";
import { Loader, LoginForm } from "..";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const isLoading = useSelector(selectIsLoading);

  const handleFormSubmit = (values) => {
    const payload = new FormData();
    payload.append("email", values.email);
    payload.append("password", values.password);
    dispatch(displayLoader());
    fetch(`${process.env.REACT_APP_APIBASEURL}/api/auth/login`, {
      method: "POST",
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(loginUser(data));
        dispatch(hideLoader());
      })
      .catch((error) => {
        dispatch(hideLoader());
      });
  };

  if (user.token) {
    return <Redirect to="/userdesktop" />;
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className="flex flex-col flex-1 flex-aic nfc-mt-3 pad-3">
          <h1>Se connecter</h1>
          <LoginForm handleFormSubmit={handleFormSubmit} />
        </section>
      )}
    </>
  );
};

export default Login;
