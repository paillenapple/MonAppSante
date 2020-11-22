import React from "react";
import styled from "styled-components/macro";
import { Formik, Form } from "formik";
import {
  PasswordInput,
  TextInput,
  RadioFieldsetInput,
} from "./../business-components";
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
    >
      {({ values }) => {
        return (
          <StyledForm
            className="flex flex-col flex-aic nfc-mt3 pad-3"
            id="signup-form"
            noValidate={true}
            spellCheck={false}
          >
            <div className="flex flex-col nfc-mt3">
              <TextInput
                form="signup-form"
                label="Adresse électronique"
                name="email"
              />
              <PasswordInput
                form="signup-form"
                label="Mot de passe"
                name="password1"
              />
              <PasswordInput
                form="signup-form"
                name="password2"
                label="Confirmation du mot de passe"
              />
              <TextInput form="signup-form" label="Prénom" name="firstname" />
              <TextInput form="signup-form" label="Nom" name="surname" />
              <RadioFieldsetInput
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
              />

              {values.status && values.status === "recruteur" && (
                <TextInput
                  form="signup-form"
                  label="Ville où se situe votre cabinet"
                  name="city"
                />
              )}
            </div>
            <StyledButton className="flex-asc" type="submit">
              Envoyer
            </StyledButton>
          </StyledForm>
        );
      }}
    </Formik>
  );
};

export default SignupForm;

const StyledForm = styled(Form)`
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
