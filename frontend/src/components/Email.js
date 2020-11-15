import React from "react";
import { MainTemplate, UserDesktopTemplate } from "../templates";
import styled from "styled-components";

const Email = props => {
  const { pathname } = props.location;
  const user = props.currentUser;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Ma messagerie"
          pathname={pathname}
          user={user}
        >
        </UserDesktopTemplate>
      }
      {...props}
    />
  )
}

export default Email;