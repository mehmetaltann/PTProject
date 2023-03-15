import { useState } from "react";
import { PageLayout } from "../styles/Layout";
import AbSideBar from "../layouts/aileButce/AbSideBar";
import Dashboard from "../components/aileButcesi/dashboard/Dashboard";
import Gelir from "../components/aileButcesi/gelir/Gelir";
import Gider from "../components/aileButcesi/gider/Gider";
import styled from "styled-components";

const AileButcesiPage = () => {
  const [active, setActive] = useState(1);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Gelir />;
      case 4:
        return <Gider />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <PageLayout>
      <AbSideBar active={active} setActive={setActive} />
      <MainStyle>{displayData()}</MainStyle>
    </PageLayout>
  );
};

const MainStyle = styled.main`
  padding: 2rem 1.5rem;
  height: 90%;
  width: 100%;
  flex: 1;
  background-color: var(--theme-secondary);
  border: 3px solid var(--theme-white);
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default AileButcesiPage;
