import React from "react";
import styled from "styled-components";
import Button from "../../UI/Button";
import { dateFormat } from "../../../utils/help-functions";
import { tl, calender, trash, comment } from "../../../utils/icons";
import { useYatirimContext } from "../../../context/yatirimContext";

const TableItem = ({
  id,
  action,
  kod,
  tarih,
  adet,
  fiyat,
  komisyon,
  durum,
}) => {
  const { yatirimIslemiSil } = useYatirimContext();
  const totalCost = (adet * fiyat).toFixed(2);
  let durumColor = "var(--theme-primary)";
  if (durum === "Kapalı") {
    durumColor = "var(--theme-red)";
  } else if (durum === "Güncellendi") {
    durumColor = "var(--theme-third)";
  }

  return (
    <TableItemStyled
      indicatorColor={action === "Alış" ? "green" : "red"}
      durumColor={durumColor}
    >
      <div className="cell">{action}</div>
      <div className="cell">{kod}</div>
      <div className="cell">{dateFormat(tarih)}</div>
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
      <div className="cell">
        <p>
          <Button
            background={"var(--theme-fourth)"}
            color={"var(--theme-primary)"}
            icon={trash}
            bpadding={".4rem"}
            bradious={"50%"}
            onClick={() => yatirimIslemiSil(id)}
          />
        </p>
      </div>
    </TableItemStyled>
  );
};

const TableItemStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.durumColor};
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
