import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/globalContext";
import { dateFormat } from "../../utils/help-functions";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { useState } from "react";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart = () => {
  const { butceData, activeTarih } = useGlobalContext();
  const [initailLabel, setInitailLabel] = useState([]);
  const gelirData = butceData
    .filter((data) => data.type === "gelir")
    .map((gelir) => {
      return gelir.amount;
    });

  const giderData = butceData
    .filter((data) => data.type === "gider")
    .map((gider) => {
      return gider.amount;
    });

  const data = {
    labels: butceData
      .filter((data) => data.type === "gelir")
      .map((gelir) => {
        return dateFormat(gelir.date);
      }),
    datasets: [
      {
        label: "Gelir",
        data: [...gelirData],
        backgroundColor: "green",
        tension: 0.4,
      },
      {
        label: "Gider",
        data: [...giderData],
        backgroundColor: "red",
        tension: 0.4,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  flex: 1;
  background: var(--theme-secondary);
  border: var(--theme-border);
  box-shadow: var(--theme-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export default Chart;
