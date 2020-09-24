import React from "react";
import { Formik } from "formik";
import styled from "styled-components";
import { InputError } from "./../components";
import { loginPayloadSchema } from "./../utils/yup";

const handleFormSubmit = (values) => {
  const payload = {};
  payload.email = values.email;
  payload.password = values.password;
  console.log(payload);
};

const Login = () => {
  return (
    <StyledSection>
      <StyledH1>Se connecter</StyledH1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginPayloadSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <StyledForm id="login-form" name="login-form" onSubmit={handleSubmit}>
            <Wrapper1>
              <Wrapper2>
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
              </Wrapper2>
              <Wrapper2>
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
              </Wrapper2>
            </Wrapper1>
            <StyledButton type="submit">Envoyer</StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledSection>
  );
};

export default Login;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;

  > :not(:first-child) {
    margin-top: 30px;
  }
`;

const StyledH1 = styled.h1`
  align-self: center;
  font-weight: 700;
  font-size: 24px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  > :not(:first-child) {
    margin-top: 22.5px;
  }
`;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;

  > :not(:first-child) {
    margin-top: 15px;
  }
`;

const Wrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: 100%;

  > :not(:first-child) {
    margin-top: 7.5px;
  }
`;

const StyledButton = styled.button`
  font: 700 1rem "Open Sans", sans-serif;
  padding: 6px 15px;
  border: 1px solid var(--text-color-primary);
`;

const StyledLabel = styled.label`
  font: 700 1rem "Open Sans", sans-serif;
  color: var(--text-color-primary);
`;

const StyledInput = styled.input`
  font: 400 1rem "Open Sans", sans-serif;
  padding: 6px;
  border: 1px solid var(--text-color-primary);
`;
