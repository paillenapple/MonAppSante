import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import styled from "styled-components/macro";
import { InputError } from "../..";
import { newPatientPayloadSchema } from "../../../utils/yup";
import {
  displayLoader,
  hideLoader,
  selectIsLoading,
} from "../../../features/loader/loaderSlice";
import Loader from "../../business-components/Loader";

const NewPatientForm = () => {
  const [redirect, setRedirection] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleFormSubmit = (values) => {
    const payload = new FormData();
    payload.append("firstname", values.firstname);
    payload.append("surname", values.surname);
    payload.append("dob", values.dob);
    dispatch(displayLoader());
    fetch(`${process.env.REACT_APP_APIBASEURL}/api/patients/create`, {
      method: "POST",
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(hideLoader());
        setRedirection(true);
      })
      .catch((error) => {
        dispatch(hideLoader());
      });
  };
  if (redirect) {
    return <Redirect to="/userdesktop" />;
  }
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Formik
          initialValues={{
            firstname: "",
            surname: "",
            dob: "",
          }}
          validationSchema={newPatientPayloadSchema}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <StyledForm
              className="flex flex-col flex-aic nfc-mt-4 pad-3"
              id="newpatient-form"
              name="newpatient-form"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col nfc-mt-3">
                <Wrapper1 className="flex flex-col nfc-mt-1">
                  <StyledLabel htmlFor="firstname">Prénom</StyledLabel>
                  <StyledInput
                    autoFocus
                    form="newpatient-form"
                    id="firstname"
                    name="firstname"
                    onChange={handleChange}
                    type="text"
                    value={values.firstname}
                  />
                  {errors.firstname && touched.firstname ? (
                    <InputError message={errors.firstname} />
                  ) : null}
                </Wrapper1>
                <Wrapper1 className="flex flex-col nfc-mt-1">
                  <StyledLabel htmlFor="surname">Nom</StyledLabel>
                  <StyledInput
                    form="newpatient-form"
                    id="surname"
                    name="surname"
                    onChange={handleChange}
                    type="text"
                    value={values.surname}
                  />
                  {errors.surname && touched.surname ? (
                    <InputError message={errors.surname} />
                  ) : null}
                </Wrapper1>
                <Wrapper1 className="flex flex-col nfc-mt-1">
                  <StyledLabel htmlFor="dob">Date de naissance</StyledLabel>
                  <StyledInput
                    form="newpatient-form"
                    id="dob"
                    name="dob"
                    onChange={handleChange}
                    type="date"
                    value={values.dob}
                  />
                  {errors.dob && touched.dob ? (
                    <InputError message={errors.dob} />
                  ) : null}
                </Wrapper1>
              </div>
              <StyledButton type="submit">Envoyer</StyledButton>
            </StyledForm>
          )}
        </Formik>
      )}
    </>
  );
};

export default NewPatientForm;

const StyledForm = styled.form`
  background: var(--color-white);
  color: var(--text-color);
  border-radius: 2px;
  box-shadow: var(--box-shadow-1);
`;

const Wrapper1 = styled.div`
  width: 360px;
  max-width: 100%;
`;

const StyledLabel = styled.label`
  font: 700 0.9rem "Open Sans", sans-serif;
`;

const StyledInput = styled.input`
  padding: 6px;
  border: 1px solid var(--text-color);
  border-radius: 2px;
`;

const StyledButton = styled.button`
  background: var(--color-primary);
  color: var(text-color);
  padding: 12px 18px;
  border-radius: 2px;
`;
