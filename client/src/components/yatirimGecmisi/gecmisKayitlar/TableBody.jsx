import styled from "styled-components";
import TableItem from "./TableItem";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useYatirimContext } from "../../../context/yatirimContext";

const itemsPerPage = 10;

const TableBody = () => {
  const { gecmisIslemler } = useYatirimContext();
  const initialData = gecmisIslemler.map(
    ({
      _id,
      kod,
      adet,
      alim_islemId,
      satim_tarihi,
      satim_fiyati,
      komisyon,
    }) => {
      return {
        kod: kod,
        adet: adet,
        alim_tarihi: "",
        alim_fiyati: 0,
        satis_tarihi: satim_tarihi,
        satis_fiyatı: satim_fiyati,
        kar_zarar_tutarı: 0,
        kar_zarar_oranı: 0,
        gun_sayisi: 0,
      };
    }
  );
  const data = gecmisIslemler;
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
        ({
          portfoy,
          kod,
          adet,
          alim_tarihi,
          alim_fiyati,
          satis_tarihi,
          satis_fiyatı,
          kar_zarar_tutarı,
          kar_zarar_oranı,
          gun_sayisi,
        }) => (
          <TableItem
            portfoy={portfoy}
            kod={kod}
            adet={adet}
            alim_tarihi={alim_tarihi}
            alim_fiyati={alim_fiyati}
            satis_tarihi={satis_tarihi}
            satis_fiyati={satis_fiyatı}
            kar_zarar_tutari={kar_zarar_tutarı}
            kar_zarar_orani={kar_zarar_oranı}
            gun_sayisi={gun_sayisi}
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
    .active {
      background: var(--theme-primary);
      transform: scale(150%);
    }
  }
`;

export default TableBody;
