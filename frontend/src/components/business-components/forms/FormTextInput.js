import React from "react";
import styled from "styled-components/macro";
import classNames from "classnames";
import InputError from "./InputError";
import { useField } from "formik";

const FormTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const labelClassNames = classNames({
    "visually-hidden": props.hideLabel,
  });
  return (
    <Wrapper1 className="flex flex-col">
      <StyledLabel className={labelClassNames} htmlFor={field.name}>
        {label}
      </StyledLabel>
      <StyledInput
        errorStatus={meta.error && meta.touched}
        name={field.name}
        type="text"
        value={field.value}
        {...field}
        {...props}
      />
      {meta.error && meta.touched && <StyledInputError message={meta.error} />}
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
