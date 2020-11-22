import React, { useEffect } from "react";
import styled from "styled-components/macro";
import {
  TextInput,
  DateInput,
  RadioFieldsetInput,
} from "./../business-components";
import { addDays, subDays, addYears } from "date-fns";

const PostFormStep21 = ({
  values,
  setFieldTouched,
  setFieldValue,
  ...props
}) => {
  useEffect(() => {
    if (values.maternity === "no") {
      setFieldValue("maternityRequired", "");
      setFieldTouched("maternityRequired", false);
    }
  }, [setFieldTouched, setFieldValue, values.maternity]);
  return (
    <>
      <TextInput
        form="newjob-form"
        name="recruiterFirstname"
        label="Prénom du médecin remplacé"
        readOnly
      />
      <TextInput
        form="newjob-form"
        name="recruiterSurname"
        label="Nom de famille du médecin remplacé"
        readOnly
      />
      <DateInput
        form="newjob-form"
        name="jobStartDate"
        label="Premier jour du remplacement proposé"
        setFieldValue={setFieldValue}
        maxDate={
          values.jobEndDate instanceof Date &&
          !isNaN(values.jobEndDate.valueOf())
            ? subDays(values.jobEndDate, 1)
            : subDays(addYears(new Date(), 10), 1)
        }
        minDate={new Date()}
        openToDate={
          values.jobEndDate instanceof Date &&
          !isNaN(values.jobEndDate.valueOf()) &&
          values.jobEndDate
        }
      />
      <DateInput
        form="newjob-form"
        name="jobEndDate"
        label="Dernier jour du remplacement proposé"
        setFieldValue={setFieldValue}
        maxDate={addYears(new Date(), 10)}
        minDate={
          values.jobStartDate instanceof Date &&
          !isNaN(values.jobStartDate.valueOf())
            ? addDays(values.jobStartDate, 1)
            : addDays(new Date(), 1)
        }
        openToDate={
          values.jobStartDate instanceof Date &&
          !isNaN(values.jobStartDate.valueOf()) &&
          values.jobStartDate
        }
      />
      <TextInput
        form="newjob-form"
        name="jobCity"
        label="Ville de remplacement"
        readOnly
      />
      <RadioFieldsetInput
        fields={[
          { id: "maternity1", value: "yes", label: "Oui" },
          { id: "maternity2", value: "no", label: "Non" },
        ]}
        form="newjob-form"
        legend="Le remplacement inclut au moins une demi-journée en
                        maternité / salle de naissance"
        name="maternity"
      />
      {values.maternity && values.maternity === "yes" && (
        <RadioFieldsetInput
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
        />
      )}
      <div className="flex-asc flex flex-aic nfc-ml3">
        <StyledButton
          className="flex-asc"
          type="button"
          onClick={() => props.backToPrevious()}
        >
          Étape précédente
        </StyledButton>
        <StyledButton
          className="flex-asc"
          onClick={() => props.handleClick()}
          type="button"
        >
          Étape suivante
        </StyledButton>
      </div>
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
