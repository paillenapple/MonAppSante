import React from "react";
import { MainTemplate, UserDesktopTemplate } from "../../../templates";
import { Loader, MultiSwitch } from "../..";
import { formatDate } from "../../../utils/dataParsing";

const ReadOne = (props) => {
  const { location, patient, stoppedLoading } = props;
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
          {!stoppedLoading ? (
            <Loader />
          ) : (
            <>
              <h2>
                {patient.firstname} {patient.surname}, né(e) le{" "}
                {formatDate(patient.dob, "dd/MM/yyyy")}
              </h2>
              <div>Fetched !</div>
            </>
          )}
        </UserDesktopTemplate>
      }
      {...props}
    ></MainTemplate>
  );
};

export default ReadOne;