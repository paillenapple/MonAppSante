import React from "react";
import styled from "styled-components/macro";
import { RefreshCw, Home } from "react-feather";

const JobCard = ({ deleteJob, job }) => {
  const {
    _id,
    recruiterFirstname,
    recruiterSurname,
    jobCity,
    jobType,
    jobStartDate,
    jobEndDate,
    maternity,
    maternityRequired,
  } = job;
  const getMaternityIconColor = (maternityRequired) => {
    switch (maternityRequired) {
      case false:
        return "var(--color-primary)";
      case true:
        return "var(--color-error)";
      default:
        return "darkgrey";
    }
  };
  return (
    <StyledArticle className="flex flex-col nfc-mt3">
      <div className="flex flex-aic flex-jcsb nfc-ml3">
        <div className="flex nfc-ml1">
          {jobType === "Remplacements réguliers" && (
            <RefreshCw size={20} color="var(--text-color)" />
          )}
          {maternity === true && (
            <Home size={20} color={getMaternityIconColor(maternityRequired)} />
          )}
        </div>
        <span>
          <strong>
            Dr {recruiterFirstname} {recruiterSurname}
          </strong>
        </span>
      </div>
      <div className="flex-asc">
        Remplacement du <strong>{jobStartDate}</strong> au{" "}
        <strong>{jobEndDate}</strong> à <strong>{jobCity}</strong>
      </div>
      <div className="flex-asfe flex flex-aic nfc-ml3">
        <button type="button">Modifier l'annonce</button>
        <button className="button-error" onClick={() => deleteJob(_id)} type="button">
          Supprimer l'annonce
        </button>
      </div>
    </StyledArticle>
  );
};

export default JobCard;

const StyledArticle = styled.article`
  background: var(--color-white);
  padding: 30px;
  border-radius: 2px;
  box-shadow: var(--box-shadow-1);
`;