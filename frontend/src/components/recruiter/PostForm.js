import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  displayLoader,
  hideLoader,
  selectIsLoading,
} from "../../features/loader/loaderSlice";
import { currentUser } from "./../../features/user/userSlice";
import { Redirect } from "react-router-dom";
import styled from "styled-components/macro";
import { Formik } from "formik";
import { RadioFieldsetInput, Loader } from "./../business-components";
import { newJobForm11Schema, newJobForm21Schema } from "../../utils/yup";
import { formatDate } from "../../utils/dataParsing";
import PostFormStep21 from "./PostFormStep21";
import PostFormStep31 from "./PostFormStep31";

const PostForm = () => {
  const [redirect, setRedirection] = useState(false);
  const [step, setFormStep] = useState(1);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const user = useSelector(currentUser);

  const getValidationSchema = (step) => {
    switch (step) {
      case 1:
        return newJobForm11Schema;
      case 2:
        return newJobForm21Schema;
      default:
        break;
    }
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    // const payload = new FormData();
    // const formattedJobStartDate = formatDate(values.jobStartDate);
    // const formattedJobEndDate = formatDate(values.jobEndDate);
    // payload.append("jobType", values.jobType);
    // payload.append("recruiterFirstname", values.recruiterFirstname);
    // payload.append("recruiterSurname", values.recruiterSurname);
    // payload.append("jobStartDate", formattedJobStartDate);
    // payload.append("jobEndDate", formattedJobEndDate);
    // payload.append("jobCity", values.jobCity);
    // payload.append("maternity", values.maternity);
    // if (values.maternity === "yes") {
    //   payload.append("maternityRequired", values.maternityRequired);
    // }
    // dispatch(displayLoader());
    // fetch(`${process.env.REACT_APP_APIBASEURL}/api/job/create`, {
    //   method: "POST",
    //   body: payload,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     dispatch(hideLoader());
    //     setRedirection(true);
    //   })
    //   .catch((error) => {
    //     dispatch(hideLoader());
    //   });
  };
  if (redirect) {
    return <Redirect to="/userdesktop" />;
  }
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <Formik
          initialValues={{
            jobType: "",
            recruiterFirstname: user.firstname,
            recruiterSurname: user.surname,
            jobStartDate: "",
            jobEndDate: "",
            jobCity: user.city,
            maternity: "",
            maternityRequired: "",
          }}
          validationSchema={getValidationSchema(step)}
          onSubmit={(values) => handleFormSubmit(values)}
          // validateOnChange={false}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            validateForm,
          }) => {
            return (
              <StyledForm
                className="flex flex-col nfc-mt-3 pad-3"
                id="newjob-form"
                name="newjob-form"
                noValidate={true}
                onSubmit={handleSubmit}
                spellCheck={false}
              >
                <div className="flex flex-col nfc-mt-3">
                  {step === 1 && (
                    <>
                      <RadioFieldsetInput
                        errors={errors}
                        fields={[
                          {
                            id: "jobType1",
                            value: "Remplacement ponctuel",
                            label: "Remplacement ponctuel",
                          },
                          {
                            id: "jobType2",
                            value: "Remplacements récurrents",
                            label: "Remplacements récurrents",
                          },
                          {
                            id: "jobType3",
                            value: "Remplacements réguliers",
                            label: "Remplacements réguliers",
                          },
                        ]}
                        form="newjob-form"
                        legend="Type de remplacement"
                        name="jobType"
                        onChange={handleChange}
                        touched={touched}
                        values={values}
                      />
                      <StyledButton
                        className="flex-asc"
                        onClick={() =>
                          validateForm().then((res) => {
                            console.log(
                              Object.entries(res),
                              Object.entries(res).length
                            );
                            if (Object.entries(res).length === 0) {
                              setFormStep(2);
                            }
                          })
                        }
                        type="button"
                      >
                        Étape suivante
                      </StyledButton>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      {values.jobType === "Remplacement ponctuel" && (
                        <PostFormStep21
                          values={values}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                          setFieldValue={setFieldValue}
                          handleClick={() => {
                            validateForm()
                              .then((res) => {
                                console.log(
                                  Object.entries(res),
                                  Object.entries(res).length
                                );
                                if (Object.entries(res).length === 0) {
                                  setFormStep(3);
                                }
                              })
                          }}
                        />
                      )}
                      {values.jobType === "Remplacements récurrents" && (
                        <PostFormStep21
                          values={values}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                          setFieldValue={setFieldValue}
                          handleClick={() => {
                            validateForm()
                              .then((res) => {
                                console.log(
                                  Object.entries(res),
                                  Object.entries(res).length
                                );
                                if (Object.entries(res).length === 0) {
                                  setFormStep(3);
                                }
                              })
                          }}
                        />
                      )}
                      {values.jobType === "Remplacements réguliers" && (
                        <PostFormStep21
                          values={values}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                          setFieldValue={setFieldValue}
                          handleClick={() => {
                            validateForm()
                              .then((res) => {
                                console.log(
                                  Object.entries(res),
                                  Object.entries(res).length
                                );
                                if (Object.entries(res).length === 0) {
                                  setFormStep(3);
                                }
                              })
                          }}
                        />
                      )}
                    </>
                  )}
                  {step === 3 && <PostFormStep31 />}
                </div>
              </StyledForm>
            );
          }}
        </Formik>
      )}
    </>
  );
};

export default PostForm;

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
