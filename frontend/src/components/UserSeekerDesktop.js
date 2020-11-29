import React from "react";
import { DashboardTemplate } from "./../templates";

const UserSeekerDesktop = (props) => {
  const { pathname } = props.location;
  const { currentUser } = props;
  return (
    <DashboardTemplate
      title="Mon espace personnel"
      pathname={pathname}
      currentUser={currentUser}
    >
      <h2>Mes informations</h2>
      <div className="flex flex-col nfc-mt1">
        <span>Nom: {currentUser.surname}</span>
        <span>Prénom: {currentUser.firstname}</span>
        <span>Statut: {currentUser.status}</span>
      </div>
      <h2>Ma sélection</h2>

      {currentUser.favorites.length > 0 ? (
        <>
          <p>
            Voici les annonces que vous avez souhaité enregistrer comme
            favorites :
          </p>
          <ul>
            {currentUser.favorites.map((f, index) => {
              return (
                <li key={f._id}>
                  {f.recruiterFirstname} {f.recruiterSurname}
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>Aucune annonce n'est enregistrée comme favorite !</p>
      )}
    </DashboardTemplate>
  );
};

export default UserSeekerDesktop;
