import React from "react";
import styled from "styled-components/macro";
import classNames from "classnames";
import InputError from "./InputError";
import DateInput from "./DateInput";
import { useField } from "formik";

const FormDateInput = (props) => {
  const [field, meta] = useField(props);
  const labelClassNames = classNames({
    "visually-hidden": props.hideLabel,
  });
  return (
    <Wrapper1 className="flex flex-col">
      <StyledLabel className={labelClassNames} htmlFor={field.name}>
        {props.label}
      </StyledLabel>
      <DateInput {...props} {...field} {...meta} />
      {meta.error && meta.touched && <StyledInputError message={meta.error} />}
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
`;
