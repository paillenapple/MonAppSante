import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { PasswordInput, TextInput } from "./../business-components";
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
      onSubmit={(values) => handleFormSubmit(values)}
      validationSchema={signupPayloadSchema}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <StyledForm
          className="flex flex-col flex-aic nfc-mt-3 pad-3"
          id="signup-form"
          name="signup-form"
          noValidate={true}
          onSubmit={handleSubmit}
          spellCheck={false}
        >
          <div className="flex flex-col nfc-mt-3">
            <TextInput
              autoFocus
              errors={errors}
              form="signup-form"
              id="email"
              label="Adresse électronique"
              onChange={handleChange}              
              touched={touched}
              values={values}
            />
            <PasswordInput
              errors={errors}
              form="signup-form"
              id="password1"
              label="Mot de passe"
              onChange={handleChange}              
              touched={touched}
              values={values}
            />
            <PasswordInput
              errors={errors}
              form="signup-form"
              id="password2"
              label="Confirmation du mot de passe"
              onChange={handleChange}
              touched={touched}
              values={values}
            />
            <TextInput
              autofocus
              errors={errors}
              form="signup-form"
              id="firstname"
              label="Prénom"
              onChange={handleChange}              
              touched={touched}
              values={values}
            />
            <TextInput
              autofocus
              errors={errors}
              form="signup-form"
              id="surname"
              label="Nom"
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

export default SignupForm;

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
