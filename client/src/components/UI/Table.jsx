import styled from "styled-components";
import { useTable } from "react-table";
import { useMemo } from "react";

const Table = () => {
  const data = useMemo(
    () => [
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "1525",
        fiyat: "256,32 TL",
        komisyon: "12 TL",
        total: "154224 TL",
      },
      {
        action: "Satış",
        kod: "AFA",
        tarih: "22.07.2022",
        adet: "100",
        fiyat: "1254,34 TL",
        komisyon: "0 TL",
        total: "78965 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
      {
        action: "Alış",
        kod: "AFT",
        tarih: "15.05.2023",
        adet: "112",
        fiyat: "854 TL",
        komisyon: "123 TL",
        total: "243 TL",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "İşlem",
        accessor: "action",
      },
      {
        Header: "Kod",
        accessor: "kod",
      },
      {
        Header: "Tarih",
        accessor: "tarih",
      },
      {
        Header: "Adet",
        accessor: "adet",
      },
      {
        Header: "Fiyat",
        accessor: "fiyat",
      },
      {
        Header: "Komisyon",
        accessor: "komisyon",
      },
      {
        Header: "Toplam Tutar",
        accessor: "total",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <TableStyled>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableStyled>
  );
};

const TableStyled = styled.div`
  width: 100;
  
  table {
    width: 100;
    font-size: 1rem;
    margin-left: 40px;
    
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: var(--theme-border);
      border-right: var(--theme-border);

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export default Table;
