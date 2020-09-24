import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = ({ location }) => {
  return (
    <StyledHeader>
      {location.pathname === "/" ? (
        <span>App Santé</span>
      ) : (
        <span>
          <Link to="/">App Santé</Link>
        </span>
      )}
      <nav>
        <StyledUl>
          <li>
            <Link className="underline" to="/signup">
              Créer un compte
            </Link>
          </li>
          <li>
            <Link className="underline" to="/login">
              Se connecter
            </Link>
          </li>
        </StyledUl>
      </nav>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-primary);
  padding: 30px;

  > span {
    font-weight: 700;
    font-size: 24px;
    color: var(--text-color-primary);
  }

  > :not(:first-child) {
    margin-left: 30px;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 15px;
  }
`;
