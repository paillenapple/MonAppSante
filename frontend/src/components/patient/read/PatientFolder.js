import React from "react";
import ReadOne from "./ReadOne";
import WriteOne from "./../edit/WriteOne";

const PatientFolder = props => {
  return (
    <>
     {
       props.mode === "readOne" &&
       <ReadOne {...props} />
     }
     {
       props.mode === "writeOne" &&
       <WriteOne {...props} />
     }
    </>
  )
}

export default PatientFolder;