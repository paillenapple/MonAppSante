import React from "react";
import styled from "styled-components";

const InputError = ({message}) => {
  return (
    <StyledSpan>{message}</StyledSpan>
  )
}

export default InputError;

const StyledSpan = styled.span`
  font-weight: 400;
  font-size: .8rem;
  font-style: italic;
  color: red;
`