import React from "react";
import { MainTemplate, UserDesktopTemplate } from "../../../templates";
import NewPatientForm from "./NewPatientForm";

const NewPatient = (props) => {
  const { pathname } = props.location;
  const user = props.currentUser;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Créer un dossier patient"
          pathname={pathname}
          user={user}
        >
          <NewPatientForm />
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default NewPatient;
