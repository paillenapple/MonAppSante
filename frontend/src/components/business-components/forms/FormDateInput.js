import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import InputError from "./InputError";
import DateInput from "./DateInput";

const FormDateInput = (props) => {
  const labelClassNames = classNames({
    "visually-hidden": props.hideLabel,
  });
  return (
    <Wrapper1 className="flex flex-col">
      <StyledLabel className={labelClassNames} htmlFor={props.id}>
        {props.label}
      </StyledLabel>
      <DateInput {...props} />
      {props.errors[props.id] ? (
        <StyledInputError message={props.errors[props.id]} />
      ) : null}
    </Wrapper1>
  );
};

export default FormDateInput;

const Wrapper1 = styled.div`
  width: 360px;
  max-width: 100%;
`;

const StyledLabel = styled.label`
  font: 700 0.9rem "Open Sans", sans-serif;
  margin-bottom: ${(props) => !props.hideLabel && "7.5px"};
`;

const StyledInputError = styled(InputError)`
  margin-top: 7.5px;
`
