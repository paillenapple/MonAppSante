import React from "react";
import { MainTemplate, UserDesktopTemplate } from "../../../templates";
import Loader from "../../business-components/Loader";

const WriteOne = (props) => {
  const { pathname, stoppedLoading } = props.location;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Modifier un dossier patient"
          pathname={pathname}
        >
          {!stoppedLoading && <Loader />}
          {stoppedLoading && (
            <>
              <h2>Modifier un dossier patient</h2>
              <div>Fetched !</div>
            </>
          )}
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default WriteOne;
