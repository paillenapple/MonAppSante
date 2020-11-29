import React from "react";
import { Button } from "./../business-components";
import { formatDate } from "./../../utils/dataParsing";

const PostFormStep31 = (props) => {
  const { values } = props;
  return (
    <div className="flex flex-col nfc-mt3">
      <ul className="flex flex-col nfc-mt1">
        <li>
          Prénom du médecin remplacé :{" "}
          <strong>{values.recruiterFirstname}</strong>
        </li>
        <li>
          Nom de famille du médecin remplacé :{" "}
          <strong>{values.recruiterSurname}</strong>
        </li>
        <li>
          Type de remplacement : <strong>{values.jobType}</strong>
        </li>
        <li>
          Premier jour du remplacement :{" "}
          <strong>{formatDate(values.jobStartDate)}</strong>
        </li>
        <li>
          Dernier jour du remplacement :{" "}
          <strong>{formatDate(values.jobEndDate)}</strong>
        </li>
        <li>
          Ville du remplacement : <strong>{values.jobCity}</strong>
        </li>
        <li>
          Maternité :{" "}
          <strong>{values.maternity === "yes" ? "Oui" : "Non"}</strong>
        </li>
        {values.maternity === "yes" && (
          <li>
            Maternité obligatoire :{" "}
            <strong>
              {values.maternityRequired === "yes" ? "Oui" : "Non"}
            </strong>
          </li>
        )}
      </ul>
      <p>Souhaitez-vous publier cette annonce ?</p>
      <div className="flex-asc flex flex-aic nfc-ml3">
        <Button className="flex-asc" onClick={() => props.backToPrevious()}>
          Étape précédente
        </Button>
        <Button className="flex-asc" type="submit">
          Publier
        </Button>
      </div>
    </div>
  );
};

export default PostFormStep31;
