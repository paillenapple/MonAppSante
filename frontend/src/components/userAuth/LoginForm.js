import React from "react";
import styled from "styled-components/macro";
import { Formik, Form } from "formik";
import { PasswordInput, TextInput } from "./../business-components";
import { loginPayloadSchema } from "../../utils/yup";

const LoginForm = ({ handleFormSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => handleFormSubmit(values)}
      validationSchema={loginPayloadSchema}
    >
      {() => (
        <StyledForm
          className="flex flex-col flex-aic nfc-mt3 pad-3"
          id="login-form"
          noValidate={true}
          spellCheck={false}
        >
          <div className="flex flex-col nfc-mt3">
            <TextInput
              form="login-form"
              label="Adresse électronique"
              name="email"
            />
            <PasswordInput
              form="login-form"
              label="Mot de passe"
              name="password"
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

const StyledForm = styled(Form)`
  background: var(--color-primary-light);
  color: var(--text-color);
  border-radius: 2px;
  box-shadow: var(--box-shadow-1);
`;

const StyledButton = styled.button`
  background: var(--color-primary);
  color: var(--text-color);
  padding: 12px 18px;
  border-radius: 2px;
`;
