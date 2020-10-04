import React, { useState } from "react";
import styled from "styled-components";
import classNames from "classnames";
import InputError from "./InputError";
import { Eye, EyeOff } from "react-feather";

const FormPasswordInput = (props) => {
  const [passwordIsVisible, togglePasswordVisibility] = useState(false);
  const [isActive, toggleInputFocus] = useState(false);
  const labelClassNames = classNames({
    "visually-hidden": props.hideLabel,
  });
  return (
    <Wrapper1 className="flex flex-col">
      <StyledLabel className={labelClassNames} htmlFor={props.id}>
        {props.label}
      </StyledLabel>
      <Wrapper2
        className="flex flex-col"
        errorStatus={props.errors[props.id] && props.touched[props.id]}
        isActive={isActive}
      >
        <StyledInput
          autoFocus={props.autoFocus}
          errorStatus={props.errors[props.id] && props.touched[props.id]}
          form={props.form}
          id={props.id}
          name={props.id}
          onChange={props.onChange}
          onFocus={() => toggleInputFocus(true)}
          onBlur={() => toggleInputFocus(false)}
          type={passwordIsVisible ? "text" : "password"}
          value={props.values[props.id]}
        />
        <button
          onClick={() => togglePasswordVisibility((prevState) => !prevState)}
          type="button"
        >
          {passwordIsVisible ? (
            <Eye width={20} height={20} />
          ) : (
            <EyeOff width={20} height={20} />
          )}
        </button>
      </Wrapper2>

      {props.errors[props.id] && props.touched[props.id] ? (
        <StyledInputError message={props.errors[props.id]} />
      ) : null}
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
  padding: 6px;
  border: ${(props) =>
    props.errorStatus
      ? "1px solid var(--color-error)"
      : "1px solid var(--text-color)"};
  border-radius: 2px;
  outline: ${(props) =>
    props.isActive
      ? props.errorStatus
        ? "1px dashed var(--color-error)"
        : "1px dashed var(--text-color)"
      : "none"};

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
  padding: 0;
  border: none;

  &:focus {
    outline: none;
  }
`;

const StyledLabel = styled.label`
  font: 700 0.9rem "Open Sans", sans-serif;
  margin-bottom: ${(props) => !props.hideLabel && "7.5px"};
`;

const StyledInputError = styled(InputError)`
  margin-top: 7.5px;
`;
