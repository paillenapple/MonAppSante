import React from "react";

import { MainTemplate, UserDesktopTemplate } from "./../templates";

const UserDesktop = (props) => {
  const { pathname } = props.location;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Mon espace personnel"
          pathname={pathname}
        ></UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default UserDesktop;
