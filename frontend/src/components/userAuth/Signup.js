import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { SignupForm } from "./../../components";
import { Loader } from "./../business-components";

const Signup = () => {
  const [redirect, triggerRedirection] = useState(false);
  const [isLoading, setLoadingStatus] = useState(false);
  
  const handleFormSubmit = (values) => {
    setLoadingStatus(true);
    const payload = new FormData();
    payload.append("email", values.email);
    payload.append("password", values.password1);
    payload.append("firstname", values.firstname);
    payload.append("surname", values.surname);
    payload.append("status", values.status);
    if (values.city !== "") {
      payload.append("city", values.city);
    }
    fetch(`${process.env.REACT_APP_APIBASEURL}/api/auth/signup`, {
      method: "POST",
      body: payload,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setLoadingStatus(false);
        triggerRedirection(true);
      })
      .catch((error) => {
        console.error(error);
        setLoadingStatus(false);
      });
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <section className="flex flex-col flex-1 flex-aic nfc-mt3 pad-3">
          <h1>Créer un compte</h1>
          <SignupForm handleFormSubmit={handleFormSubmit} />
        </section>
      )}
    </>
  );
};

export default Signup;
