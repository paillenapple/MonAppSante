import React from "react";
import styled from "styled-components";
import {ToastContainer as Container} from "react-toastify";

const ToastContainer = () => {
  return (
   <StyledContainer />
  )
}

export default ToastContainer;

const StyledContainer = styled(Container).attrs({
  // custom props
})`
  .Toastify__toast-container {}
  .Toastify__toast {}
  .Toastify__toast--error {
    background: var(--color-error);
    color: var(--color-white);
  }
  .Toastify__toast--warning {}
  .Toastify__toast--success {
    background: var(--color-primary);
    color: var(--text-color);
  }
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
`;