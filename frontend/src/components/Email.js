import React from "react";
import styled from "styled-components/macro";
import { MainTemplate, UserDesktopTemplate } from "../templates";

const Email = (props) => {
  const { pathname } = props.location;
  const user = props.currentUser;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Mes notifications"
          pathname={pathname}
          user={user}
        >
          {user.notifications.length > 0 ? (
            <ul className="flex flex-col nfc-mt1">
              {user.notifications.map((notif) => {
                return (
                  <li key={notif}>
                    <StyledArticle className="flex flex-aifs nfc-ml1">
                      <div className="flex-1">{notif}</div>
                      <button>Marquer comme lu</button>
                    </StyledArticle>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>Aucune notification disponible</div>
          )}
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default Email;

const StyledArticle = styled.article`
  background: var(--color-white);
  padding: 15px 30px;
  border-radius: 2px;
`;
