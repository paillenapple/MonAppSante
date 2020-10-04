import React from "react";
import styled from "styled-components/macro";

const InputError = ({className, message}) => {
  return (
    <StyledSpan className={className}>{message}</StyledSpan>
  )
}

export default InputError;

const StyledSpan = styled.span`
  font-size: .8rem;
  font-style: italic;
  color: var(--color-error);
`