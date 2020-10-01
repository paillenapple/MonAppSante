import React from "react";
import PropTypes from "prop-types";

import {Header, Footer} from "./../components";

const MainTemplate = ({ component, location }) => {
  return (
    <>
      <Header location={location} />
      <main className="flex flex-col flex-1">{component}</main>
      <Footer />
    </>
  );
};

MainTemplate.propTypes = {
  component: PropTypes.element.isRequired,
};

export default MainTemplate;
