import React from "react";
import styled from "styled-components/macro";

const InputError = ({message}) => {
  return (
    <StyledSpan>{message}</StyledSpan>
  )
}

export default InputError;

const StyledSpan = styled.span`
  font-size: .8rem;
  font-style: italic;
  color: var(--color-error);
`