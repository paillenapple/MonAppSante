import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  displayLoader,
  hideLoader,
  selectIsLoading,
} from "./../../features/loader/loaderSlice";
import { Redirect } from "react-router-dom";
import { SignupForm } from "./../../components";
import { Loader } from "./../business-components";

const Signup = () => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [redirect, setRedirection] = useState(false);

  const handleFormSubmit = (values) => {
    console.log(values)
    const payload = new FormData();
    payload.append("email", values.email);
    payload.append("password", values.password1);
    payload.append("firstname", values.firstname);
    payload.append("surname", values.surname);
    payload.append("status", values.status);
    if (values.city !== "") {
      payload.append("city", values.city);
    }
    dispatch(displayLoader());
    fetch(`${process.env.REACT_APP_APIBASEURL}/api/auth/signup`, {
      method: "POST",
      body: payload,
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(hideLoader());
        setRedirection(true);
      })
      .catch((error) => {
        dispatch(hideLoader());
      });
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className="flex flex-col flex-1 flex-aic nfc-mt-3 pad-3">
          <h1>Créer un compte</h1>
          <SignupForm handleFormSubmit={handleFormSubmit} />
        </section>
      )}
    </>
  );
};

export default Signup;
