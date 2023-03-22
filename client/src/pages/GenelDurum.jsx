import { PageLayout } from "../styles/Layout";
import { useGlobalContext } from "../context/globalContext";
import Dashboard from "../components/genelDurum/Dashboard";
import styled from "styled-components";

const GenelDurum = () => {
  const { activeTarih, setActiveTarih } = useGlobalContext();

  return (
    <PageLayout>
      <GenelDurumMain>
        <Dashboard activeTarih={activeTarih} setActiveTarih={setActiveTarih} />
      </GenelDurumMain>
    </PageLayout>
  );
};

const GenelDurumMain = styled.main`
  height: 90%;
  width: 100%;
`;

export default GenelDurum;
