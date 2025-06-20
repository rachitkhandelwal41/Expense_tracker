
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ expenses }: { expenses: any[] }) => {
  const categoryTotals: any = {};

  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Spending by Category",
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#FCD34D", "#818CF8"
        ],
      },
    ],
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-xl mb-2">Category-wise Spending</h2>
      <Pie data={data} />
    </div>
  );
};

export default CategoryPieChart;
