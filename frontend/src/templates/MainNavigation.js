import React from "react";

import { Link } from "react-router-dom";

import styled from "styled-components";

import { Briefcase, UserPlus, Users } from "react-feather";

const MainNavigation = ({ pathname }) => {
  return (
    <StyledNav className="flex-asfs">
      <ul className="flex">
        <li>
          {pathname === "/userdesktop" ? (
            <Wrapper1 className="i-flex flex-aic nfc-ml-1">
              <Briefcase color="hsl(0, 0%, 17%)" size={18.4} />
              <span>Mon espace personnel</span>
            </Wrapper1>
          ) : (
            <StyledLink
              className="i-flex flex-aic underline nfc-ml-1"
              to="/userdesktop"
            >
              <Briefcase color="hsl(93, 7%, 20%)" size={18.4} />
              <span>Mon espace personnel</span>
            </StyledLink>
          )}
        </li>
        <li>
          {pathname === "/read" ? (
            <Wrapper1 className="i-flex flex-aic nfc-ml-1">
              <Users color="hsl(0, 0%, 17%)" size={18.4} />
              <span>Liste des patients</span>
            </Wrapper1>
          ) : (
            <StyledLink
              className="i-flex flex-aic underline nfc-ml-1"
              to="/read"
            >
              <Users color="hsl(93, 7%, 20%)" size={18.4} />
              <span>Liste des patients</span>
            </StyledLink>
          )}
        </li>
        <li>
          {pathname === "/new" ? (
            <Wrapper1 className="i-flex flex-aic nfc-ml-1">
              <UserPlus color="hsl(0, 0%, 17%)" size={18.4} />
              <span>Créer un dossier patient</span>
            </Wrapper1>
          ) : (
            <StyledLink
              className="i-flex flex-aic underline nfc-ml-1"
              to="/new"
            >
              <UserPlus color="hsl(93, 7%, 20%)" size={18.4} />
              <span>Créer un dossier patient</span>
            </StyledLink>
          )}
        </li>
      </ul>
    </StyledNav>
  );
};

export default MainNavigation;

const StyledNav = styled.nav`
  box-shadow: 0 3px 3px hsla(169, 17%, 61%, 0.24);
`;

const Wrapper1 = styled.div`
  background: var(--color-secondary-hover);
  padding: 12px 18px;
`;

const StyledLink = styled(Link)`
  background: var(--color-secondary);
  padding: 12px 18px;

  @media (hover: hover) {
    &:hover {
      background: var(--color-secondary-hover);
    }
  }
`;
