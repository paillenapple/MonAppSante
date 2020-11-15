import React from "react";
import { MainTemplate, UserDesktopTemplate } from "../../templates";

const Assignments = (props) => {
  const { pathname } = props.location;
  const user = props.currentUser;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Mon portefeuille"
          pathname={pathname}
          user={user}
        ></UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default Assignments;
