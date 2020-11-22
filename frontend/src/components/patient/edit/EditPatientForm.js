import React from "react";
import styled from "styled-components/macro";
import { Formik } from "formik";
import { TextInput, DateInput } from "./../../business-components";
import { editPatientPayloadSchema } from "../../../utils/yup";
import { formatDate, parseDate } from "../../../utils/dataParsing";

const EditPatientForm = (props) => {
  const { switchDisplayMode, patient } = props;
  const parsedDob = parseDate(patient.dob, "dd/MM/yyyy");

  const handleFormSubmit = (values) => {
    const payload = new FormData();
    const formattedDob = formatDate(values.dob);
    payload.append("firstname", values.firstname);
    payload.append("surname", values.surname);
    payload.append("dob", formattedDob);
    props.toggleLoadingStatus(true);
    fetch(
      `${process.env.REACT_APP_APIBASEURL}/api/patients/edit/${patient._id}`,
      {
        method: "PATCH",
        body: payload,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        switchDisplayMode("readAll");
      })
      .catch((error) => {
        props.toggleLoadingStatus(false);
      });
  };
  return (
    <Formik
      initialValues={{
        firstname: patient.firstname,
        surname: patient.surname,
        dob: parsedDob,
      }}
      validationSchema={editPatientPayloadSchema}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <StyledForm
          className="flex flex-col flex-aic nfc-mt3 pad-3"
          id="editpatient-form"
          name="editpatient-form"
          noValidate={true}
          onSubmit={handleSubmit}
          spellCheck={false}
        >
          <div className="flex flex-col nfc-mt3">
            <TextInput
              autoFocus
              form="editpatient-form"
              id="firstname"
              label="Prénom"
              onChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
            />
            <TextInput
              form="editpatient-form"
              id="surname"
              label="Nom de famille"
              onChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
            />
            <DateInput
              form="editpatient-form"
              id="dob"
              label="Date de naissance"
              onChange={handleChange}
              values={values}
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
            />
          </div>
          <StyledButton type="submit">Envoyer</StyledButton>
        </StyledForm>
      )}
    </Formik>
  );
};

export default EditPatientForm;

const StyledForm = styled.form`
  background: var(--color-white);
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
