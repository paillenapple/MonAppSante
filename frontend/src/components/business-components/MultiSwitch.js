import React from "react";
import styled from "styled-components/macro";
import { Edit, List } from "react-feather";

const MultiSwitch = ({ handleSwitchClick }) => {
  return (
    <div className="flex">
      <StyledButton onClick={() => handleSwitchClick("readAll")} type="button">
        <List color="hsl(93, 7%, 10%)" size={18.4} />
      </StyledButton>
      <StyledButton onClick={() => handleSwitchClick("writeOne")} type="button">
        <Edit color="hsl(93, 7%, 10%)" size={18.4} />
      </StyledButton>
    </div>
  );
};

export default MultiSwitch;

const StyledButton = styled.button`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    props.currentScreen ? "hsl(169, 21%, 54%)" : "hsl(169, 17%, 96%)"};
  color: ${(props) =>
    props.currentScreen ? "hsl(0, 0%, 100%)" : "hsl(93, 7%, 10%)"};
`;
