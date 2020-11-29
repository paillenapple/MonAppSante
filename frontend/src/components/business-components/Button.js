import React from "react";
import styled from "styled-components/macro";
import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <StyledButton
      className={props.className}
      type={props.type}
      size={props.size}
      variant={props.variant}
      {...props}
    >
      {props.children}
    </StyledButton>
  );
};

Button.defaultProps = {
  size: "medium",
  type: "button",
  variant: "primary",
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  type: PropTypes.oneOf(["button", "submit"]),
  variant: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;

const StyledButton = styled.button`
  padding: ${(props) => {
    if (props.size === "small") {
      return "6px 9px";
    } else if (props.size === "medium") {
      return "12px 18px";
    } else if (props.size === "large") {
      return "18px 27px";
    }
  }};
  background: ${(props) => {
    if (props.variant === "primary") {
      return "var(--color-primary)";
    } else if (props.variant === "secondary") {
      return "var(--color-secondary)";
    }
  }};
  border-radius: 2px;

  &:hover {
    background: ${(props) => {
      if (props.variant === "primary") {
        return "var(--color-primary-hover)";
      } else if (props.variant === "secondary") {
        return "var(--color-secondary-hover)";
      }
    }};
  }
`;
