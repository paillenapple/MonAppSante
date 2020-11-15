import React from "react";
import styled from "styled-components";
import { MainTemplate, UserDesktopTemplate } from "../../templates";
import PostForm from "./PostForm";

const Assignments = (props) => {
  const { pathname } = props.location;
  const user = props.currentUser;
  return (
    <MainTemplate
      component={
        <UserDesktopTemplate
          title="Déposer une annonce"
          pathname={pathname}
          user={user}
        >
          <Wrapper1>
            <p>Vous avez la possibilité de proposer :</p>
            <StyledUl>
              <li>
                un <strong>remplacement ponctuel</strong>
              </li>
              <li>
                des remplacements itératifs, sur un rythme irrégulier, appelés{" "}
                <strong>remplacements récurrents</strong>
              </li>
              <li>
                des <strong>remplacements réguliers</strong>, correspondant à une
                ou plusieurs demi-journées fixe(s)
              </li>
            </StyledUl>
          </Wrapper1>
          <PostForm />
        </UserDesktopTemplate>
      }
      {...props}
    />
  );
};

export default Assignments;

const Wrapper1 = styled.div`
  display: flex;
  flex-direction: column;

  > :not(:first-child) {
    margin-top: 15px;
  }
`

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: initial;
  list-style-position: inside;

  > :not(:first-child) {
    margin-top: 7.5px;
  }
`