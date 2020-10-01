import React from "react";

import styled from "styled-components/macro";

import MainNavigation from "./MainNavigation";

const UserDesktopTemplate = ({ children, title, pathname, multiSwitch }) => {
  return (
    <>
      <MainNavigation pathname={pathname} />
      <div className="flex flex-col flex-1 nfc-mt-3 pad-3">
        <div className="flex flex-jcsb flex-aife nfc-ml-3">
          <h1>{title}</h1>
          {multiSwitch}
        </div>
        <StyledSection className="flex flex-col flex-1 flex-aic nfc-mt-3 pad-3">
          {children}
        </StyledSection>
      </div>
    </>
  );
};

export default UserDesktopTemplate;

const StyledSection = styled.section`
  background: var(--color-primary-light);
  border-radius: 2px;
  box-shadow: var(--box-shadow-1);
`;
