import React from "react";
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
  const { gelirler, giderler } = useGlobalContext();

  const data = {
    labels: gelirler.map((gelir) => {
      return dateFormat(gelir.date);
    }),
    datasets: [
      {
        label: "Gelir",
        data: [
          ...gelirler.map((gelir) => {
            return gelir.amount;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Gider",
        data: [
          ...giderler.map((gider) => {
            return gider.amount;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
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
