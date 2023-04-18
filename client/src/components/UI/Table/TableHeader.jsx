import React from "react";
import styled from "styled-components";

const TableHeader = React.memo(({ header_list }) => {
  return (
    <TableHeaderStyled>
      <div className="row">
        {header_list.map((data, index) => (
          <div className="item" key={index}>
            <p>{data}</p>
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

      p {
        font-size: 1rem;
        white-space: pre-line;
      }
    }
  }
`;

export default TableHeader;
