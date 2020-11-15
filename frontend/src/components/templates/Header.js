import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutUser } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const Header = ({ location }) => {
  const dispatch = useDispatch();
  const appCurrentUser = useSelector(currentUser);
  const { pathname } = location;
  return (
    <StyledHeader className="flex flex-jcsb flex-aic nfc-ml-3 pad-3">
      {pathname === "/" ? (
        <span>PédiaJob</span>
      ) : (
        <span>
          <Link to="/">PédiaJob</Link>
        </span>
      )}
      {appCurrentUser.token ? (
        <div className="flex flex-aic nfc-ml-3">
          {pathname !== "/userdesktop" ? (
            <Link to="/userdesktop">
              <span>
                {appCurrentUser.firstname} {appCurrentUser.surname}
              </span>
            </Link>
          ) : (
            <span>
              {appCurrentUser.firstname} {appCurrentUser.surname}
            </span>
          )}

          <StyledButton type="button" onClick={() => dispatch(logoutUser())}>
            Se déconnecter
          </StyledButton>
        </div>
      ) : (
        <nav>
          <ul className="flex flex-aic nfc-ml-2">
            <li>
              {pathname !== "/signup" ? (
                <Link className="underline" to="/signup">
                  Créer un compte
                </Link>
              ) : (
                <span>Créer un compte</span>
              )}
            </li>
            <li>
              {pathname !== "/login" ? (
                <Link className="underline" to="/login">
                  Se connecter
                </Link>
              ) : (
                <span>Se connecter</span>
              )}
            </li>
          </ul>
        </nav>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  min-height: 100px;
  background: var(--color-primary);
  color: var(--text-color);
  box-shadow: var(--box-shadow-1);

  > span {
    font: 700 2rem "Open Sans", sans-serif;
  }
`;

const StyledButton = styled.button`
  background: var(--color-secondary);
  color: var(--text-color);
  padding: 12px 18px;
  border-radius: 2px;

  @media (hover: hover) {
    &:hover {
      background: var(--color-secondary-hover);
    }
  }
`;
