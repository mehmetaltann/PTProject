import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BudgetDataTableChart = ({ dataList, lab, color }) => {
  const labels = dataList.map((_, i) => i + 1);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: lab,
        data: dataList.map((data) => data.amount).reverse(),
        borderColor: color,
        backgroundColor: color,
        tension: 0.4,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default BudgetDataTableChart;
