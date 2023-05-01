import { PageLayout } from "../styles/Layout";
import styled from "styled-components";
import ButceKayit from "../components/aileButcesi/ButceKayit";

const ButceKayitPage = () => {
  return (
    <PageLayout>
      <ButceKayitStyled>
        <ButceKayit />
      </ButceKayitStyled>
    </PageLayout>
  );
};

const ButceKayitStyled = styled.main`
  height: 90%;
  width: 100%;
`;

export default ButceKayitPage;
