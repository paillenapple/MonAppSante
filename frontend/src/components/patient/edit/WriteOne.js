import React from "react";
import { MainTemplate, UserDesktopTemplate } from "../../../templates";
import EditPatientForm from "./EditPatientForm";

const WriteOne = (props) => {
  const { location, patient } = props;
  const { pathname } = location;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Modifier un dossier patient"
          pathname={pathname}
        >
          <EditPatientForm patient={patient} {...props} />
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default WriteOne;
