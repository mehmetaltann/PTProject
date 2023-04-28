import styled from "styled-components";
import { PageLayout } from "../styles/Layout";
import YImain from "../components/yatirimIslemleri/YImain";

const YatirimIslemleri = () => {
  return (
    <PageLayout>
      <YatirimIslemleriStyled>
        <YImain />
      </YatirimIslemleriStyled>
    </PageLayout>
  );
};

const YatirimIslemleriStyled = styled.main`
  height: 90%;
  width: 100%;
`;

export default YatirimIslemleri;
