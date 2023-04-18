import styled from "styled-components";
import Filtreleme from "./Filtreleme";
import GecmisIslemler from "./GecmisIslemler";
import { useYatirimContext } from "../../context/yatirimContext";
import { YatirimLayout } from "../../styles/Layout";
import { useEffect } from "react";

const Dashboard = () => {
  const { yatirimGecmisIslemSorgula, gecmisIslemler } = useYatirimContext();

  useEffect(() => {
    yatirimGecmisIslemSorgula();
  }, [gecmisIslemler]);

  return (
    <YatirimLayout>
      <Filtreleme />
      <GecmisIslemler />
    </YatirimLayout>
  );
};

export default Dashboard;
