import React from "react";
import styled from "styled-components";

const TitleSelect = () => {
  return (
    <TitleSelectStyled>
      <h3>Son İşlemler</h3>
    </TitleSelectStyled>
  );
};

const TitleSelectStyled = styled.div`
  width: 100%;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 0.7rem;
  border-radius: 20px;
  color: var(--theme-fourth);
  text-align: center;

  h3 {
    opacity: 0.7;
  }
`;

export default TitleSelect;
