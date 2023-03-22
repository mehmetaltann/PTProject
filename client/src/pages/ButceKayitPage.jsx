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

  @media only screen and (max-width: 500px) {
    overflow: auto;
  }
`;

export default ButceKayitPage;
