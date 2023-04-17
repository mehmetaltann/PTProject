import React from "react";
import styled from "styled-components";

const TableHeader = React.memo(() => {
  const headerList = [
    "İşlem",
    "Kod",
    "Tarih",
    "Adet",
    "Fiyat",
    "Komisyon",
    "Toplam",
    "İşlem",
  ];
  return (
    <TableHeaderStyled>
      <div className="row">
        {headerList.map((data, index) => (
          <div className="item" key={index}>
            {data}
          </div>
        ))}
      </div>
    </TableHeaderStyled>
  );
});

const TableHeaderStyled = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;

  .row {
    display: flex;
    align-items: center;

    .item {
      height: 100%;
      width: 100%;
      display: flex;
      border-bottom: none;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      opacity: 0.8;
    }
  }
`;

export default TableHeader;
