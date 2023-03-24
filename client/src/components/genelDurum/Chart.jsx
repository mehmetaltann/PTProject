import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../../context/globalContext";
import {
  dateFormat,
  dateFormatMonths,
  dateFormatYears,
} from "../../utils/help-functions";
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
  const { butceData, activeTarih } = useGlobalContext();

  const result = (type, timeFunc) => {
    const dateAmountList = Object.values(
      butceData
        .filter((data) => data.type === type)
        .reduce((r, o) => {
          let tarih = timeFunc(o.date);
          r[tarih] = r[tarih] || { date: tarih, amount: 0 };
          r[tarih].amount += +o.amount;
          return r;
        }, {})
    );
    return dateAmountList;
  };

  const dataFunc = (type) => {
    switch (activeTarih) {
      case 1:
        return result(type, dateFormat);
      case 2:
      case 3:
      case 4:
        return result(type, dateFormatMonths);
      case 5:
      case 0:
        return result(type, dateFormatYears);
      default:
        return result(type, dateFormat);
    }
  };

  const grafikData = (tip) => {
    const data = {
      labels: dataFunc(tip).map((data) => data.date),
      datasets: [
        {
          label: tip,
          data: [...dataFunc(tip).map((data) => data.amount)],
          backgroundColor: tip === "gelir" ? "green" : "red",
          tension: 0.4,
        },
      ],
    };
    return data;
  };

  return (
    <>
      <ChartStyled>
        <Line
          data={grafikData("gelir")}
          options={{ maintainAspectRatio: false }}
        />
      </ChartStyled>
      <ChartStyled>
        <Line
          data={grafikData("gider")}
          options={{ maintainAspectRatio: false }}
        />
      </ChartStyled>
    </>
  );
};

const ChartStyled = styled.div`
  flex: 1;
  width: 100%;
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
