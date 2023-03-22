import { PageLayout } from "../styles/Layout";
import Dashboard2 from "../components/genelDurum/Dashboard2";
import styled from "styled-components";

const ButceGenelDurumPage = () => {
  return (
    <PageLayout>
      <ButceGenelDurumStyled>
        <Dashboard2 />
      </ButceGenelDurumStyled>
    </PageLayout>
  );
};

const ButceGenelDurumStyled = styled.main`
  height: 90%;
  width: 100%;
`;

export default ButceGenelDurumPage;
