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
      <Line data={data} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  height: 100%;
  width: 100%;
`;

export default Chart;
