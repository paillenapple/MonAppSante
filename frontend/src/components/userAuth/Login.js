import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { Redirect } from "react-router-dom";
import { LoginForm } from "..";
import { Loader } from "./../business-components";

const Login = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoadingStatus] = useState(false);

  const handleFormSubmit = (values) => {
    setLoadingStatus(true);
    const payload = new FormData();
    payload.append("email", values.email);
    payload.append("password", values.password);
    fetch(`${process.env.REACT_APP_APIBASEURL}/api/auth/login`, {
      method: "POST",
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoadingStatus(false);
        dispatch(loginUser(data));
      })
      .catch((error) => {
        console.error(error);
        setLoadingStatus(false);
      });
  };

  if (currentUser.token) {
    return <Redirect to="/userdesktop" />;
  }

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className="flex flex-col flex-1 flex-aic nfc-mt3 pad-3">
          <h1>Se connecter</h1>
          <LoginForm handleFormSubmit={handleFormSubmit} />
        </section>
      )}
    </>
  );
};

export default Login;
