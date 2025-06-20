import { useEffect, useState } from "react";
import axios from "axios";

const categories = [
  "Food",
  "Rent",
  "Shopping",
  "Transport",
  "Entertainment",
  "Healthcare",
  "Utilities",
  "Other",
];
type Category = (typeof categories)[number];

type Budgets = {
  [key in Category]?: number;
};

type Alert = {
  category: string;
  budget: number;
  spent: number;
  percentUsed: string;
  status: string;
};

const BudgetManager = () => {
 const [month] = useState<number>(new Date().getMonth());
  const [year] = useState<number>(new Date().getFullYear());
  const [budgets, setBudgets] = useState<Budgets>({});
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleChange = (category:any, value:any) => {
    setBudgets((prev) => ({
      ...prev,
      [category]: Number(value),
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

       await axios.post(
        "https://expense-tracker-gp93.onrender.com/api/v1/user/budget/set",
        { month, year, budgets },
        {
          headers: { Authorization: token },
        }
      );

      setMessage("Budget saved successfully!");
      fetchAlerts(); // Fetch alerts after saving budget
    } catch (err) {
      console.error(err);
      setMessage("Failed to save budget.");
    }
  };

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://expense-tracker-gp93.onrender.com/api/v1/user/budget/alerts", {
        headers: { Authorization: token },
      });
      setAlerts(res.data.alerts || []);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Set Monthly Budgets</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-white">
        {categories.map((cat) => (
          <div key={cat} className="flex flex-col text-white">
            <label>{cat}</label>
            <input
              type="number"
              min="0"
              value={budgets[cat] || ""}
              onChange={(e) => handleChange(cat, e.target.value)}
              className="p-2 text-white rounded"
              placeholder={`Budget for ${cat}`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white"
      >
        Save Budget
      </button>

      {message && <p className="mt-4">{message}</p>}

      <h2 className="text-xl font-semibold mt-10 mb-4">Budget Alerts</h2>

      {alerts.length === 0 ? (
        <p className="text-gray-400">No alerts yet.</p>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert, idx) => (
            <div
              key={idx}
              className={`p-4 border rounded ${
                alert.status === "Over budget"
                  ? "border-red-600 text-red-400"
                  : "border-yellow-600 text-yellow-300"
              }`}
            >
              <p className="font-semibold">{alert.category}</p>
              <p>Spent: ₹{alert.spent}</p>
              <p>Budget: ₹{alert.budget}</p>
              <p>Used: {alert.percentUsed}%</p>
              <p>Status: {alert.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetManager;
