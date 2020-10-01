import React from "react";
import styled from "styled-components/macro";

const Footer = () => {
  return <StyledFooter />;
};

export default Footer;

const StyledFooter = styled.footer`
  min-height: 100px;
  background: var(--text-color);
  box-shadow: 0 -3px 2px hsla(93, 7%, 10%, 0.24);
`;
