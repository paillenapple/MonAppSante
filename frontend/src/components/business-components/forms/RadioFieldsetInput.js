import React from "react";
import styled from "styled-components/macro";
import RadioInput from "./RadioInput";
import InputError from "./../../business-components/forms/InputError";
import { useField } from "formik";

const RadioFieldsetInput = (props) => {
  const [field, meta] = useField(props);
  return (
    <StyledFieldset className="flex flex-col">
      <legend>{props.legend}</legend>
      <div className="flex flex-col nfc-mt1">
        {props.fields.map((f, index) => {
          return (
            <RadioInput
              key={index}
              id={f.id}
              label={f.label}
              value={f.value}
              field={field}
              {...props}
            />
          );
        })}
      </div>
      {meta.error && meta.touched && <StyledInputError message={meta.error} />}
    </StyledFieldset>
  );
};

export default RadioFieldsetInput;

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

const StyledInputError = styled(InputError)`
  margin-top: 7.5px;
`;
