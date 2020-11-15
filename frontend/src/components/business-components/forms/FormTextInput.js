import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import InputError from "./InputError";

const FormTextInput = (props) => {
  const labelClassNames = classNames({
    "visually-hidden": props.hideLabel,
  });
  return (
    <Wrapper1 className="flex flex-col">
      <StyledLabel className={labelClassNames} htmlFor={props.id}>
        {props.label}
      </StyledLabel>
      <StyledInput
        autoFocus={props.autoFocus}
        form={props.form}
        id={props.id}
        name={props.id}
        onChange={props.onChange}
        readOnly={props.readOnly}
        type="text"
        value={props.values[props.id]}
        errorStatus={props.errors[props.id] && props.touched[props.id]}
      />
      {props.errors[props.id] ? (
        <StyledInputError message={props.errors[props.id]} />
      ) : null}
    </Wrapper1>
  );
};

export default FormTextInput;

const Wrapper1 = styled.div`
  width: 360px;
  max-width: 100%;
`;

const StyledInput = styled.input`
  color: ${(props) =>
    props.errorStatus ? "var(--color-error)" : "var(--text-color)"};
  padding: 6px;
  border: ${(props) =>
    props.errorStatus
      ? "1px solid var(--color-error)"
      : "1px solid var(--text-color)"};
  border-radius: 2px;

  &:focus {
    outline: ${(props) =>
      props.errorStatus
        ? "1px dashed var(--color-error)"
        : "1px dashed var(--text-color)"};
  }

  &:read-only {
    background: var(--color-light-grey);
  }
`;

const StyledLabel = styled.label`
  font: 700 0.9rem "Open Sans", sans-serif;
  margin-bottom: ${(props) => !props.hideLabel && "7.5px"};
`;

const StyledInputError = styled(InputError)`
  margin-top: 7.5px;
`;
