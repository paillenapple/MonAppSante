import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {Header} from "./../components";

const MainTemplate = ({ component, location }) => {
  return (
    <>
      <Header location={location} />
      <StyledMain>{component}</StyledMain>
    </>
  );
};

MainTemplate.propTypes = {
  component: PropTypes.element.isRequired,
};

export default MainTemplate;

const StyledMain = styled.main`
  flex: 1;
  background: var(--color-white);
  padding: 30px;
`;
