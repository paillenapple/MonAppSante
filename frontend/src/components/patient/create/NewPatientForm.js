import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  displayLoader,
  hideLoader,
  selectIsLoading,
} from "../../../features/loader/loaderSlice";
import { Redirect } from "react-router-dom";
import styled from "styled-components/macro";
import { Formik } from "formik";
import { TextInput, DateInput, Loader } from "./../../business-components";
import { newPatientPayloadSchema } from "../../../utils/yup";
import { formatDate } from "../../../utils/dataParsing";

const NewPatientForm = () => {
  const [redirect, setRedirection] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const handleFormSubmit = (values) => {
    const payload = new FormData();
    const formattedDob = formatDate(values.dob);
    payload.append("firstname", values.firstname);
    payload.append("surname", values.surname);
    payload.append("dob", formattedDob);
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
    return <Redirect to="/read" />;
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
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <StyledForm
              className="flex flex-col flex-aic nfc-mt3 pad-3"
              id="newpatient-form"
              name="newpatient-form"
              noValidate={true}
              onSubmit={handleSubmit}
              spellCheck={false}
            >
              <div className="flex flex-col nfc-mt3">
                <TextInput
                  autoFocus
                  form="newpatient-form"
                  id="firstname"
                  label="Prénom"
                  onChange={handleChange}
                  values={values}
                  errors={errors}
                  touched={touched}
                />
                <TextInput
                  form="newpatient-form"
                  id="surname"
                  label="Nom de famille"
                  onChange={handleChange}
                  values={values}
                  errors={errors}
                  touched={touched}
                />
                <DateInput
                  form="newpatient-form"
                  id="dob"
                  label="Date de naissance"
                  onChange={handleChange}
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
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

const StyledButton = styled.button`
  background: var(--color-primary);
  color: var(text-color);
  padding: 12px 18px;
  border-radius: 2px;
`;
