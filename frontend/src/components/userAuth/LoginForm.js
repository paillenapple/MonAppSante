import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { PasswordInput, TextInput } from "./../business-components";
import { loginPayloadSchema } from "../../utils/yup";

const LoginForm = ({ handleFormSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => handleFormSubmit(values)}
      validationSchema={loginPayloadSchema}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <StyledForm
          className="flex flex-col flex-aic nfc-mt-3 pad-3"
          id="login-form"
          name="login-form"
          noValidate={true}
          onSubmit={handleSubmit}
          spellCheck={false}
        >
          <div className="flex flex-col nfc-mt-3">
            <TextInput
              autoFocus
              errors={errors}
              form="login-form"
              id="email"
              label="Adresse électronique"
              onChange={handleChange}
              touched={touched}
              values={values}
            />
            <PasswordInput
              errors={errors}
              form="login-form"
              id="password"
              label="Mot de passe"
              onChange={handleChange}
              touched={touched}
              values={values}
            />
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

const StyledButton = styled.button`
  background: var(--color-primary);
  color: var(text-color);
  padding: 12px 18px;
  border-radius: 2px;
`;
