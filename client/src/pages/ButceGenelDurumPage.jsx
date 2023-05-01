import { PageLayout } from "../styles/Layout";
import Dashboard from "../components/genelDurum/Dashboard";
import styled from "styled-components";

const ButceGenelDurumPage = () => {
  return (
    <PageLayout>
      <ButceGenelDurumStyled>
        <Dashboard />
      </ButceGenelDurumStyled>
    </PageLayout>
  );
};

const ButceGenelDurumStyled = styled.main`
  height: 90%;
  width: 100%;
`;

export default ButceGenelDurumPage;
