import styled from "styled-components";
import Transactions from "../components/yatirimIslemleri/Transactions";
import { PageLayout } from "../styles/Layout";

const YatirimIslemleri = () => {
  return (
    <PageLayout>
      <YatirimIslemleriStyled>
        <Transactions />
      </YatirimIslemleriStyled>
    </PageLayout>
  );
};

const YatirimIslemleriStyled = styled.main`
  height: 90%;
  width: 100%;
`;

export default YatirimIslemleri;
