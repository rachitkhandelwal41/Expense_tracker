
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SpendingLineChart = ({ expenses }: { expenses: any[] }) => {
  const groupedByDate: { [key: string]: number } = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.date).toISOString().split("T")[0];
    groupedByDate[date] = (groupedByDate[date] || 0) + exp.amount;
  });

  const sortedDates = Object.keys(groupedByDate).sort();
  const amounts = sortedDates.map((date) => groupedByDate[date]);

  const data = {
    labels: sortedDates,
    datasets: [
      {
        label: "Daily Spending",
        data: amounts,
        borderColor: "#4F46E5",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-xl mb-2">Spending Over Time</h2>
      <Line data={data} />
    </div>
  );
};

export default SpendingLineChart;
