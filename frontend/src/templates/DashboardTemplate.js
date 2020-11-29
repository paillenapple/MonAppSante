import React from "react";

import MainTemplate from "./MainTemplate";
import UserDesktopTemplate from "./UserDesktopTemplate";

const DashboardTemplate = ({ children, ...props }) => {
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate {...props}>{children}</UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default DashboardTemplate;
