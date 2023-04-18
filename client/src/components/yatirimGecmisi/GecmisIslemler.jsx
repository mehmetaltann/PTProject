import styled from "styled-components";
import Table from "../yatirimGecmisi/gecmisKayitlar/Table";
import TableTitle from "../UI/Table/TableTitle";

const GecmisIslemler = () => {
  return (
    <GecmisIslemlerStyled>
      <TableTitle title="Geçmiş Kayıtlar"/>
      <Table />
    </GecmisIslemlerStyled>
  );
};

const GecmisIslemlerStyled = styled.div`
  width: 80%;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

export default GecmisIslemler;
