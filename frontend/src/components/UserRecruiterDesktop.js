import React from "react";

import styled from "styled-components";

import { MainTemplate, UserDesktopTemplate } from "./../templates";

const UserRecruiterDesktop = (props) => {
  const { pathname } = props.location;
  const user = props.currentUser;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate title="Mon espace personnel" pathname={pathname} user={user}>
          <span>Je cherche un médecin remplaçant</span>
          <div className="flex flex-col nfc-mt1">
            <span>Nom: {user.surname}</span>
            <span>Prénom: {user.firstname}</span>
            <span>Statut: {user.status}</span>
          </div>
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default UserRecruiterDesktop;
