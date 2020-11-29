import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components/macro";
import { Formik, Form } from "formik";
import { Button, RadioFieldsetInput, Loader } from "./../business-components";
import PostFormStep21 from "./PostFormStep21";
import PostFormStep31 from "./PostFormStep31";
import { newJobForm11Schema, newJobForm21Schema } from "../../utils/yup";
import { formatDate } from "../../utils/dataParsing";

const PostForm = (props) => {
  const {currentUser} = props;
  const [isLoading, setLoadingStatus] = useState(false);
  const [redirect, triggerRedirection] = useState(false);
  const [step, setFormStep] = useState(1);
  
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
    setLoadingStatus(true);
    setFormStep(1);
    const payload = new FormData();
    const formattedJobStartDate = formatDate(values.jobStartDate);
    const formattedJobEndDate = formatDate(values.jobEndDate);
    payload.append("recruiterId", currentUser.id);
    payload.append("jobType", values.jobType);
    payload.append("recruiterFirstname", values.recruiterFirstname);
    payload.append("recruiterSurname", values.recruiterSurname);
    payload.append("jobStartDate", formattedJobStartDate);
    payload.append("jobEndDate", formattedJobEndDate);
    payload.append("jobCity", values.jobCity);
    payload.append("maternity", values.maternity);
    if (values.maternity === "yes") {
      payload.append("maternityRequired", values.maternityRequired);
    }
    fetch(`${process.env.REACT_APP_APIBASEURL}/api/job/create`, {
      method: "POST",
      body: payload,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoadingStatus(false);
        triggerRedirection(true);
      })
      .catch((error) => {
        console.error(error);
        setLoadingStatus(false);
      });
  };
  if (redirect) {
    return <Redirect to="/userdesktop" />;
  }

  const Intro = ({ children, step }) => {
    return (
      <>
        {children ? (
          <div className="flex flex-col nfc-mt3">
            <strong>Étape {step}</strong>
            {children}
          </div>
        ) : (
          <strong>Étape {step}</strong>
        )}
      </>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {step === 1 && (
            <Intro step={step}>
              <div className="flex flex-col nfc-mt2">
                <p>Vous avez la possibilité de proposer :</p>
                <StyledUl className="flex flex-col nfc-mt1">
                  <li>
                    un <strong>remplacement ponctuel</strong>
                  </li>
                  <li>
                    des remplacements itératifs, sur un rythme irrégulier,
                    appelés <strong>remplacements récurrents</strong>
                  </li>
                  <li>
                    des <strong>remplacements réguliers</strong>, correspondant
                    à une ou plusieurs demi-journée(s) fixe(s)
                  </li>
                </StyledUl>
              </div>
            </Intro>
          )}
          {step !== 1 && <Intro step={step} />}
          <Formik
            initialValues={{
              jobType: "",
              recruiterFirstname: currentUser.firstname,
              recruiterSurname: currentUser.surname,
              jobStartDate: "",
              jobEndDate: "",
              jobCity: currentUser.city,
              maternity: "",
              maternityRequired: "",
            }}
            validationSchema={getValidationSchema(step)}
            onSubmit={(values) => handleFormSubmit(values)}
          >
            {({ values, setFieldValue, setFieldTouched, validateForm }) => {
              return (
                <StyledForm
                  className="flex flex-col nfc-mt3 pad-3"
                  id="newjob-form"
                  noValidate={true}
                  spellCheck={false}
                >
                  <div className="flex flex-col nfc-mt3">
                    {step === 1 && (
                      <>
                        <RadioFieldsetInput
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
                        />
                        <Button
                          className="flex-asc"
                          onClick={() => {
                            setFieldTouched("jobType", true);
                            validateForm().then((res) => {
                              if (Object.entries(res).length === 0) {
                                setFormStep(2);
                              }
                            });
                          }}
                        >
                          Étape suivante
                        </Button>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        {values.jobType === "Remplacement ponctuel" && (
                          <PostFormStep21
                            backToPrevious={() => setFormStep(1)}
                            values={values}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            handleClick={() => {
                              setFieldTouched("recruiterFirstname", true);
                              setFieldTouched("recruiterSurname", true);
                              setFieldTouched("jobStartDate", true);
                              setFieldTouched("jobEndDate", true);
                              setFieldTouched("jobCity", true);
                              setFieldTouched("maternity", true);
                              setFieldTouched("maternityRequired", true);
                              validateForm().then((res) => {
                                if (Object.entries(res).length === 0) {
                                  setFormStep(3);
                                }
                              });
                            }}
                          />
                        )}
                        {values.jobType === "Remplacements récurrents" && (
                          <PostFormStep21
                            backToPrevious={() => setFormStep(1)}
                            values={values}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            handleClick={() => {
                              setFieldTouched("recruiterFirstname", true);
                              setFieldTouched("recruiterSurname", true);
                              setFieldTouched("jobStartDate", true);
                              setFieldTouched("jobEndDate", true);
                              setFieldTouched("jobCity", true);
                              setFieldTouched("maternity", true);
                              setFieldTouched("maternityRequired", true);
                              validateForm().then((res) => {
                                if (Object.entries(res).length === 0) {
                                  setFormStep(3);
                                }
                              });
                            }}
                          />
                        )}
                        {values.jobType === "Remplacements réguliers" && (
                          <PostFormStep21
                            backToPrevious={() => setFormStep(1)}
                            values={values}
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            handleClick={() => {
                              setFieldTouched("recruiterFirstname", true);
                              setFieldTouched("recruiterSurname", true);
                              setFieldTouched("jobStartDate", true);
                              setFieldTouched("jobEndDate", true);
                              setFieldTouched("jobCity", true);
                              setFieldTouched("maternity", true);
                              setFieldTouched("maternityRequired", true);
                              validateForm().then((res) => {
                                if (Object.entries(res).length === 0) {
                                  setFormStep(3);
                                }
                              });
                            }}
                          />
                        )}
                      </>
                    )}
                    {step === 3 && (
                      <PostFormStep31
                        backToPrevious={() => setFormStep(2)}
                        values={values}
                      />
                    )}
                  </div>
                </StyledForm>
              );
            }}
          </Formik>
        </>
      )}
    </>
  );
};

export default PostForm;

const StyledForm = styled(Form)`
  background: var(--color-white);
  color: var(--text-color);
  border-radius: 2px;
  box-shadow: var(--box-shadow-1);
`;

const StyledUl = styled.ul`
  list-style: initial;
  list-style-position: inside;
`;
