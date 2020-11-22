import React, { useState } from "react";
import styled from "styled-components/macro";
import classNames from "classnames";
import InputError from "./InputError";
import { Eye, EyeOff } from "react-feather";
import { useField } from "formik";

const FormPasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [passwordIsVisible, togglePasswordVisibility] = useState(false);
  const labelClassNames = classNames({
    "visually-hidden": props.hideLabel,
  });
  return (
    <Wrapper1 className="flex flex-col">
      <StyledLabel className={labelClassNames} htmlFor={field.name}>
        {label}
      </StyledLabel>
      <Wrapper2
        className="flex flex-col"
        errorStatus={meta.error && meta.touched}
      >
        <StyledInput
          errorStatus={meta.error && meta.touched}
          name={field.name}
          type={passwordIsVisible ? "text" : "password"}
          value={field.value}
          {...field}
          {...props}
        />
        <button
          onClick={() => togglePasswordVisibility((prevState) => !prevState)}
          type="button"
        >
          {passwordIsVisible ? (
            <Eye size={20} />
          ) : (
            <EyeOff size={20} />
          )}
        </button>
      </Wrapper2>

      {meta.error && meta.touched && <StyledInputError message={meta.error} />}
    </Wrapper1>
  );
};

export default FormPasswordInput;

const Wrapper1 = styled.div`
  width: 360px;
  max-width: 100%;
`;

const Wrapper2 = styled.div`
  position: relative;
  background: var(--color-white);

  > button {
    position: absolute;
    top: 6px;
    right: 6px;
    bottom: 6px;
  }
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
`;

const StyledLabel = styled.label`
  font: 700 0.9rem "Open Sans", sans-serif;
  margin-bottom: ${(props) => !props.hideLabel && "7.5px"};
`;

const StyledInputError = styled(InputError)`
  margin-top: 7.5px;
`;
