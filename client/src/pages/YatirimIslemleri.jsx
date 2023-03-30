import styled from "styled-components";
import Transections from "../components/yatirimIslemleri/Transections";
import { PageLayout } from "../styles/Layout";

const YatirimIslemleri = () => {
  return (
    <PageLayout>
      <YatirimIslemleriStyled>
        <Transections />
      </YatirimIslemleriStyled>
      ;
    </PageLayout>
  );
};

const YatirimIslemleriStyled = styled.main`
  height: 90%;
  width: 100%;
`;

export default YatirimIslemleri;
