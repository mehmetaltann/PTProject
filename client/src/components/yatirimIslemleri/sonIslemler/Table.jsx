import React from "react";
import styled from "styled-components";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = () => {
  return (
    <TableStyled>
      <TableHeader />
      <TableBody />
    </TableStyled>
  );
};

const TableStyled = styled.div`
  width: 100%;
  height: 100%;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  color: var(--theme-fourth);
  margin-top: 0px;
  position: relative;
  padding-top: 1.5rem;
`;

export default Table;