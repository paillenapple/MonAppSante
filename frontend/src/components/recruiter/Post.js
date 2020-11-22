import React from "react";
import { MainTemplate, UserDesktopTemplate } from "../../templates";
import PostForm from "./PostForm";

const Assignments = (props) => {
  const { pathname } = props.location;
  const user = props.currentUser;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Déposer une annonce"
          pathname={pathname}
          user={user}
        >
          <PostForm />
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default Assignments;
