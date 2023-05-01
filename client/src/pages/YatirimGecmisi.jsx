import styled from "styled-components";
import YGmain from "../components/yatirimGecmisi/YGmain";
import { PageLayout } from "../styles/Layout";

const YatirimGecmisi = () => {
  return (
    <PageLayout>
      <YatirimGecmisiStyled>
        <YGmain />
      </YatirimGecmisiStyled>
    </PageLayout>
  );
};

const YatirimGecmisiStyled = styled.main`
  height: 90%;
  width: 100%;
`;

export default YatirimGecmisi;
