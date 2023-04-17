import styled from "styled-components";
import { useYatirimContext } from "../../context/yatirimContext";
import { useEffect } from "react";

const Dashboard = () => {
  const { tarihiKayitlar } = useYatirimContext();

  return <DashboardStyleed>Dashboard</DashboardStyleed>;
};

const DashboardStyleed = styled.div`
  height: 900px;
  width: 100%;
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
`;

export default Dashboard;
