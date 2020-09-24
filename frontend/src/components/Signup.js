import React from "react";
import { Formik } from "formik";
import styled from "styled-components";
import { InputError } from "./../components";
import { signupPayloadSchema } from "./../utils/yup";

const handleFormSubmit = ( values) => {
  const payload = {};
  payload.email = values.email;
  payload.password = values.password1;
  payload.firstname = values.firstname;
  payload.surname = values.surname;
  console.log(payload)
};

const Signup = () => {
  return (
    <StyledSection>
      <StyledH1>Créer un compte</StyledH1>
      <Formik
        initialValues={{
          email: "",
          password1: "",
          password2: "",
          firstname: "",
          surname: "",
        }}
        validationSchema={signupPayloadSchema}
        onSubmit={values => handleFormSubmit(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <StyledForm
            id="signup-form"
            name="signup-form"
            onSubmit={handleSubmit}
          >
            <Wrapper1>
              <Wrapper2>
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
              </Wrapper2>
              <Wrapper2>
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
              </Wrapper2>
              <Wrapper2>
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
              </Wrapper2>
              <Wrapper2>
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
              </Wrapper2>
              <Wrapper2>
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
              </Wrapper2>
            </Wrapper1>
            <StyledButton type="submit">Envoyer</StyledButton>
          </StyledForm>
        )}
      </Formik>
    </StyledSection>
  );
};

export default Signup;

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
