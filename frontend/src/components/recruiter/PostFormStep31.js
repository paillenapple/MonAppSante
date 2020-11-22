import React from "react";
import styled from "styled-components/macro";
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
        <StyledButton
          className="flex-asc"
          type="button"
          onClick={() => props.backToPrevious()}
        >
          Étape précédente
        </StyledButton>
        <StyledButton className="flex-asc" type="submit">
          Publier
        </StyledButton>
      </div>
    </div>
  );
};

export default PostFormStep31;

const StyledButton = styled.button`
  background: var(--color-primary);
  color: var(--text-color);
  padding: 12px 18px;
  border-radius: 2px;
`;
