import styled from "styled-components";
import Table from "./sonIslemler/Table";
import TableTitle from "../UI/Table/TableTitle";

const SonIslemler = () => {
  return (
    <SonIslemlerStyled>
      <TableTitle title="Son İşlemler" />
      <Table />
    </SonIslemlerStyled>
  );
};

const SonIslemlerStyled = styled.div`
  width: 50%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

export default SonIslemler;
