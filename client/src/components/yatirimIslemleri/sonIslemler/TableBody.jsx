import React from "react";
import styled from "styled-components";
import TableItem from "./TableItem";

const TableBody = () => {
  const DATA = [
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "1525",
      fiyat: "256,32",
      komisyon: "12",
      total: "154224",
    },
    {
      action: "Satış",
      kod: "AFA",
      tarih: "22.07.2022",
      adet: "100",
      fiyat: "1254,34",
      komisyon: "0",
      total: "78965",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "123",
      total: "243",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "123",
      total: "243",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "123",
      total: "243",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "123",
      total: "243",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "123",
      total: "243",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "1",
      total: "243",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "12",
      total: "243",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "123",
      total: "243",
    },
    {
      action: "Alış",
      kod: "AFT",
      tarih: "15.05.2023",
      adet: "112",
      fiyat: "854",
      komisyon: "123",
      total: "243",
    },
  ];

  return (
    <TableBodyStyled>
      {DATA.map(({ _id, action, kod, tarih, adet, fiyat, komisyon }) => (
        <TableItem
          key={_id}
          action={action}
          kod={kod}
          tarih={tarih}
          adet={adet}
          fiyat={fiyat}
          komisyon={komisyon}
        />
      ))}
    </TableBodyStyled>
  );
};

const TableBodyStyled = styled.div`
  width: 100%;
  height: 90%;
  position: relative;
  padding-top: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export default TableBody;
