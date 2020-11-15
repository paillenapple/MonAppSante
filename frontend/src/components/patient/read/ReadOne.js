import React from "react";
import { MainTemplate, UserDesktopTemplate } from "../../../templates";
import { MultiSwitch } from "./../../business-components";

const ReadOne = (props) => {
  const { location, patient } = props;
  const { pathname } = location;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          multiSwitch={
            <MultiSwitch handleSwitchClick={props.handleSwitchClick} />
          }
          pathname={pathname}
          title="Informations patient"
        >
          <>
            <h2>
              {patient.firstname} {patient.surname}, né(e) le {patient.dob}
            </h2>
            <div>Fetched !</div>
          </>
        </UserDesktopTemplate>
      }
      {...props}
    ></MainTemplate>
  );
};

export default ReadOne;
