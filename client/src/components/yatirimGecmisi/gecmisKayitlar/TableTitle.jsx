import styled from "styled-components";
import React from "react";

const TableTitle = React.memo(() => {
  return (
    <TableTitleStyled>
      <h3>Geçmiş İşlemler</h3>
    </TableTitleStyled>
  );
});

const TableTitleStyled = styled.div`
  width: 100%;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 0.7rem 1.5rem;
  border-radius: 20px;
  color: var(--theme-fourth);
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    opacity: 0.7;
  }
`;

export default TableTitle;
