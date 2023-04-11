import styled from "styled-components";
import Table from "./sonIslemler/Table";
import TitleSelect from "./sonIslemler/TitleSelect";

const SonIslemler = () => {
  return (
    <SonIslemlerStyled>
      <TitleSelect />
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
