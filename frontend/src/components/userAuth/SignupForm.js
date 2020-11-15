import React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { PasswordInput, TextInput, RadioFieldsetInput } from "./../business-components";
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
        status: "",
        city: "",
      }}
      onSubmit={(values) => handleFormSubmit(values)}
      validationSchema={signupPayloadSchema}
      validateOnChange={false}
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
            <RadioFieldsetInput
              errors={errors}
              fields={[
                {
                  id: "status1",
                  value: "demandeur",
                  label: "Je cherche un remplacement",
                },
                {
                  id: "status2",
                  value: "recruteur",
                  label: "Je propose un remplacement",
                },
              ]}
              form="signup-form"
              legend="Choisissez"
              name="status"
              onChange={handleChange}
              touched={touched}
              values={values}
            />

            {values.status && values.status === "recruteur" && (
              <TextInput
                autofocus
                errors={errors}
                form="signup-form"
                id="city"
                label="Ville où se situe votre cabinet"
                onChange={handleChange}
                touched={touched}
                values={values}
              />
            )}
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

const StyledFieldset = styled.fieldset`
  legend {
    font: 700 0.9rem "Open Sans", sans-serif;
    margin-bottom: ${(props) => !props.hideLabel && "7.5px"};
  }

  label {
    font: 400 0.9rem "Open Sans", sans-serif;
    margin-left: 7.5px;
  }
`;
