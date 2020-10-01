import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { InputError } from "..";
import { signupPayloadSchema } from "../../utils/yup";

const SignupForm = ({ handleFormSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password1: "",
        password2: "",
        firstname: "",
        surname: "",
      }}
      validationSchema={signupPayloadSchema}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <StyledForm
          className="flex flex-col flex-aic nfc-mt-4 pad-3"
          id="signup-form"
          name="signup-form"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col nfc-mt-3">
            <Wrapper1 className="flex flex-col nfc-mt-1">
              <StyledLabel htmlFor="email">Adresse électronique</StyledLabel>
              <StyledInput
                type="text"
                name="email"
                id="email"
                form="signup-form"
                onChange={handleChange}
                autoFocus
                value={values.email}
              />
              {errors.email && touched.email ? (
                <InputError message={errors.email} />
              ) : null}
            </Wrapper1>
            <Wrapper1 className="flex flex-col nfc-mt-1">
              <StyledLabel htmlFor="password1">Mot de passe</StyledLabel>
              <StyledInput
                type="password"
                name="password1"
                id="password1"
                form="signup-form"
                onChange={handleChange}
                value={values.password1}
              />
              {errors.password1 && touched.password1 ? (
                <InputError message={errors.password1} />
              ) : null}
            </Wrapper1>
            <Wrapper1 className="flex flex-col nfc-mt-1">
              <StyledLabel htmlFor="password2">
                Confirmation du mot de passe
              </StyledLabel>
              <StyledInput
                type="password"
                name="password2"
                id="password2"
                form="signup-form"
                onChange={handleChange}
                value={values.password2}
              />
              {errors.password2 && touched.password2 ? (
                <InputError message={errors.password2} />
              ) : null}
            </Wrapper1>
            <Wrapper1 className="flex flex-col nfc-mt-1">
              <StyledLabel htmlFor="firstname">Prénom</StyledLabel>
              <StyledInput
                type="text"
                name="firstname"
                id="firstname"
                form="signup-form"
                onChange={handleChange}
                value={values.firstname}
              />
              {errors.firstname && touched.firstname ? (
                <InputError message={errors.firstname} />
              ) : null}
            </Wrapper1>
            <Wrapper1 className="flex flex-col nfc-mt-1">
              <StyledLabel htmlFor="surname">Nom</StyledLabel>
              <StyledInput
                type="text"
                name="surname"
                id="surname"
                form="signup-form"
                onChange={handleChange}
                value={values.surname}
              />
              {errors.surname && touched.surname ? (
                <InputError message={errors.surname} />
              ) : null}
            </Wrapper1>
          </div>
          <StyledButton className="flex-asc" type="submit">Envoyer</StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default SignupForm;

const StyledForm = styled.form`
  background: var(--color-primary-light);
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
