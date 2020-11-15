import React from "react";
import styled from "styled-components";
import RadioInput from "./RadioInput";
import InputError from "./../../business-components/forms/InputError";

const RadioFieldsetInput = (props) => {
  return (
    <StyledFieldset className="flex flex-col">
      <legend>{props.legend}</legend>
      <div className="flex flex-col nfc-mt-1">
        {props.fields.map((field, index) => {
          return (
            <RadioInput
              key={index}
              id={field.id}
              value={field.value}
              checked={props.values[props.name] === field["value"]}
              label={field.label}
              {...props}
            />
          );
        })}
      </div>
      {props.errors[props.name] ? (
        <StyledInputError message={props.errors[props.name]} />
      ) : null}
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
