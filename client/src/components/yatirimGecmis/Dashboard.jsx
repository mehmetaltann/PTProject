import styled from "styled-components";
import { useYatirimContext } from "../../context/yatirimContext";

const Dashboard = () => {
  const { tarihiKayitlar } = useYatirimContext();

  return <DashboardStyleed>Dashboard</DashboardStyleed>;
};

const DashboardStyleed = styled.div``;

export default Dashboard;
