import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import setNavContent from "./navigationContent";

const MainNavigation = ({ pathname, currentUser }) => {
  const navContent = setNavContent(currentUser.status);
  return (
    <StyledNav className="flex-asfs">
      <ul className="flex">
        {navContent.map((navitem) => {
          const Icon = navitem.icon;
          return (
            <StyledLi key={navitem.label}>
              {pathname === navitem.url ? (
                <Wrapper1 className="i-flex flex-aic nfc-ml1">
                  <Icon color="hsl(0, 0%, 17%)" size={18.4} />
                  <span>{navitem.label}</span>
                </Wrapper1>
              ) : (
                <StyledLink
                  className="i-flex flex-aic underline nfc-ml1"
                  to={navitem.url}
                >
                  <Icon color="hsl(93, 7%, 20%)" size={18.4} />
                  <span>{navitem.label}</span>
                </StyledLink>
              )}
            </StyledLi>
          );
        })}
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

const StyledLi = styled.li`
  position: relative;
`;

const StyledLink = styled(Link)`
  background: var(--color-secondary);
  padding: 12px 18px;

  &:focus {
    position: relative;
    z-index: 1;
  }

  @media (hover: hover) {
    &:hover {
      background: var(--color-secondary-hover);
    }
  }
`;
