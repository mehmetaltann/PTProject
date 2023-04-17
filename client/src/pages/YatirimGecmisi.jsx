import styled from "styled-components";
import Dashboard from "../components/yatirimGecmisi/Dashboard";
import { PageLayout } from "../styles/Layout";

const YatirimGecmisi = () => {
  return (
    <PageLayout>
      <YatirimGecmisiStyled>
        <Dashboard />
      </YatirimGecmisiStyled>
    </PageLayout>
  );
};

const YatirimGecmisiStyled = styled.main`
  height: 90%;
  width: 100%;
`;

export default YatirimGecmisi;
