import React from "react";
import styled from "styled-components";
import {
  TextInput,
  DateInput,
  RadioFieldsetInput,
} from "./../business-components";

const PostFormStep21 = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
  setFieldValue,
  ...props
}) => {
  return (
    <>
      <TextInput
        autoFocus
        form="newjob-form"
        id="recruiterFirstname"
        label="Prénom du médecin remplacé"
        onChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
        readOnly
      />
      <TextInput
        form="newjob-form"
        id="recruiterSurname"
        label="Nom de famille du médecin remplacé"
        onChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
        readOnly
      />
      <DateInput
        form="newjob-form"
        id="jobStartDate"
        label="Premier jour du remplacement proposé"
        onChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
      />
      <DateInput
        form="newjob-form"
        id="jobEndDate"
        label="Dernier jour du remplacement proposé "
        onChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
        setFieldValue={setFieldValue}
      />
      <TextInput
        form="newjob-form"
        id="jobCity"
        label="Ville de remplacement"
        onChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
        readOnly
      />
      <RadioFieldsetInput
        errors={errors}
        fields={[
          { id: "maternity1", value: "yes", label: "Oui" },
          { id: "maternity2", value: "no", label: "Non" },
        ]}
        form="newjob-form"
        legend="Le remplacement inclut au moins une demi-journée en
                        maternité / salle de naissance"
        name="maternity"
        onChange={handleChange}
        touched={touched}
        values={values}
      />
      {values.maternity && values.maternity === "yes" && (
        <RadioFieldsetInput
          errors={errors}
          fields={[
            {
              id: "maternityRequired1",
              value: "yes",
              label: "Oui",
            },
            {
              id: "maternityRequired2",
              value: "no",
              label: "Non",
            },
          ]}
          form="newjob-form"
          legend="L'activité en maternité / salle de naissance est
                          obligatoire"
          name="maternityRequired"
          onChange={handleChange}
          touched={touched}
          values={values}
        />
      )}
      <StyledButton
        className="flex-asc"
        onClick={() => props.handleClick()}
        type="button"
      >
        Étape suivante
      </StyledButton>
    </>
  );
};

export default PostFormStep21;

const StyledButton = styled.button`
  background: var(--color-primary);
  color: var(text-color);
  padding: 12px 18px;
  border-radius: 2px;
`;
