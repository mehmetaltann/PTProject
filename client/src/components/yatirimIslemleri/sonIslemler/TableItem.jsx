import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../../utils/help-functions";
import { tl, calender, trash, comment } from "../../../utils/icons";

const TableItem = ({ action, kod, tarih, adet, fiyat, komisyon }) => {
  const totalCost = (adet * fiyat).toFixed(2);

  return (
    <TableItemStyled indicatorColor={action === "Alış" ? "green" : "red"}>
      <div className="cell">{action}</div>
      <div className="cell">{kod}</div>
      <div className="cell">{tarih}</div>
      <div className="cell">{adet}</div>
      <div className="cell">
        <p>
          <span>{fiyat}</span> {tl}
        </p>
      </div>
      <div className="cell">
        <p>
          <span>{komisyon}</span> {tl}
        </p>
      </div>
      <div className="cell">
        <p>
          <span>{totalCost}</span> {tl}
        </p>
      </div>
    </TableItemStyled>
  );
};

const TableItemStyled = styled.div`
  width: 100%;
  background-color: var(--theme-primary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  border-radius: 12px;
  padding: 0.6rem;
  color: var(--theme-fourth);
  position: relative;

  display: flex;
  align-items: center;

  .cell {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &::before {
    content: "";
    position: absolute;
    left: 4%;
    top: 40%;
    transform: translate(-60%);
    border-radius: 50%;
    width: 0.7rem;
    height: 0.7rem;
    background: ${(props) => props.indicatorColor};
  }
`;

export default TableItem;
