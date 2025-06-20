import { useEffect, useState } from "react";
import { getAllExpenses } from "../services/operations/receipt";
import CategoryPieChart from "../components/CategoryPieChart";
import SpendingLineChart from "../components/SpendingLineChart";
import SummaryCard from "../components/SummaryCard";

const ReportsPage = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllExpenses();
      setExpenses(res.data.expenses || []);
    };
    fetchData();
  }, []);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses.filter((exp: any) => {
    const date = new Date(exp.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const totalSpent = monthlyExpenses.reduce((acc: number, curr: any) => acc + curr.amount, 0);

  const categoryStats = monthlyExpenses.reduce((acc: any, exp: any) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryStats).sort((a:any, b:any) => b[1] - a[1])[0]?.[0] || "N/A";

  const paymentStats = monthlyExpenses.reduce((acc: any, exp: any) => {
    acc[exp.paymentMethod] = (acc[exp.paymentMethod] || 0) + 1;
    return acc;
  }, {});

  const topPaymentMethods = Object.entries(paymentStats)
    .sort((a:any, b:any) => b[1] - a[1])
    .slice(0, 3)
    .map(([method]) => method);

  return (
    <div className="bg-black text-white min-h-screen overflow-y-auto">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Reports Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SummaryCard title="Total Spent This Month" value={`₹${totalSpent.toFixed(2)}`} />
          <SummaryCard title="Top Category" value={topCategory} />
          <SummaryCard title="Top Payment Methods" value={topPaymentMethods.join(", ")} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryPieChart expenses={monthlyExpenses} />
          <SpendingLineChart expenses={monthlyExpenses} />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
