import React from "react";

import styled from "styled-components";

import { MainTemplate, UserDesktopTemplate } from "./../templates";

const UserSeekerDesktop = (props) => {
  const { pathname } = props.location;
  const user = props.currentUser;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate title="Mon espace personnel" pathname={pathname} user={user}>
          <h2>Mes informations</h2>
          <div className="flex flex-col nfc-mt1">
            <span>Nom: {user.surname}</span>
            <span>Prénom: {user.firstname}</span>
            <span>Statut: {user.status}</span>
          </div>
          <h2>Ma sélection</h2>
          
          {user.favorites.length > 0 ? (
            <>
            <p>Voici les annonces que vous avez souhaité enregistrer comme favorites :</p>
            <ul>
              {user.favorites.map((f, index) => {
                return <li key={f._id}>{f.recruiterFirstname}{" "}{f.recruiterSurname}</li>;
              })}
            </ul>
            </>
          ) : <p>Aucune annonce n'est enregistrée comme favorite !</p>}
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default UserSeekerDesktop;
