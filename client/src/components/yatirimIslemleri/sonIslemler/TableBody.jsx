import styled from "styled-components";
import TableItem from "./TableItem";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useYatirimContext } from "../../../context/yatirimContext";

const itemsPerPage = 10;

const TableBody = () => {
  const { selectedPortfoy, islemler } = useYatirimContext();
  const data = islemler.filter((data) => data.portfoy_ismi === selectedPortfoy);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <TableBodyStyled>
      {currentItems.map(
        ({ _id, action, kod, date, adet, fiyat, komisyon, durum }) => (
          <TableItem
            key={_id}
            id={_id}
            action={action}
            kod={kod}
            tarih={date}
            adet={adet}
            fiyat={fiyat}
            komisyon={komisyon}
            durum={durum}
          />
        )
      )}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Sonra >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Önce"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
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

  .pagination {
    list-style-type: style none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 1rem;
    font-size: 1rem;
    gap: 5px;

    .page-num {
      padding: 8px;
      cursor: pointer;
      border-radius: 3px;
      font-weight: 400;

      &:hover {
        background: var(--theme-primary);
      }
    }
    .active{
      background: var(--theme-primary);
      transform: scale(150%)
    }
  }
`;

export default TableBody;
