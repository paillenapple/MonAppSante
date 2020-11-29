import React from "react";
import styled from "styled-components/macro";
import {Button} from "./../../business-components";

const DeletedJobNotif = ({ notif, removeNotifFromNotifications }) => {
  return (
    <StyledArticle className="flex flex-aifs nfc-ml1">
      <div className="flex-1">
        L'annonce {notif.body.jobId} a été supprimée par le Dr{" "}
        {notif.body.recruiterFirstname} {notif.body.recruiterSurname} !
      </div>
      <Button
        onClick={() => {
          return removeNotifFromNotifications(notif.body.jobId);
        }}
      >
        Marquer comme lu
      </Button>
    </StyledArticle>
  );
};

export default DeletedJobNotif;

const StyledArticle = styled.article`
  background: var(--color-white);
  padding: 15px 30px;
  border-radius: 2px;
`;
