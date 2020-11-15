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
        >
          <h2>Mes favoris</h2>
          {user.favorites.length > 0 && (
            <ul>
              {user.favorites.map((f, index) => {
                return <li key={f._id}>{f.recruiterFirstname}{" "}{f.recruiterSurname}</li>;
              })}
            </ul>
          )}
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default Assignments;
