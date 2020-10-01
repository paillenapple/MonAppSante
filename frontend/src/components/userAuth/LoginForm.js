import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { InputError } from "..";
import { loginPayloadSchema } from "../../utils/yup";

const LoginForm = ({ handleFormSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginPayloadSchema}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <StyledForm
          className="flex flex-col flex-aic nfc-mt-4 pad-3"
          id="login-form"
          name="login-form"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col nfc-mt-3">
            <Wrapper1 className="flex flex-col nfc-mt-1">
              <StyledLabel htmlFor="email">Adresse électronique</StyledLabel>
              <StyledInput
                type="text"
                name="email"
                id="email"
                form="login-form"
                onChange={handleChange}
                autoFocus
                value={values.email}
              />
              {errors.email && touched.email ? (
                <InputError message={errors.email} />
              ) : null}
            </Wrapper1>
            <Wrapper1 className="flex flex-col nfc-mt-1">
              <StyledLabel htmlFor="password">Mot de passe</StyledLabel>
              <StyledInput
                type="password"
                name="password"
                id="password"
                form="login-form"
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && touched.password ? (
                <InputError message={errors.password} />
              ) : null}
            </Wrapper1>
          </div>
          <StyledButton className="flex-asc" type="submit">
            Envoyer
          </StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default LoginForm;

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