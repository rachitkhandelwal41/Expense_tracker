import { useEffect, useState } from "react";
import { deleteExpense, getAllExpenses } from "../services/operations/receipt";
import ExpenseRow from "./ExpenseRow";
import { UpdateExpenseModal } from "./UpdateExpenseModal";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterPanel";

const ExpensesTable = ({ refresh }: { refresh: boolean }) => {
  interface Expense {
  _id: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
  description: string;
  notes?: string;
}

const [expenses, setExpenses] = useState<Expense[]>([]);
const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filters, setFilters] = useState({
    date: "",
    category: "All",
    paymentMethod: "All",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await getAllExpenses();
      setExpenses(res.data.expenses);
    } catch (err) {
      alert("Failed to fetch expenses");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      alert("Failed to delete expense");
    }
  };

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
useEffect(() => {
  fetchExpenses();
}, [refresh]);
  useEffect(() => {
    let filtered = [...expenses];

    // Filter by date
    if (filters.date) {
      filtered = filtered.filter((exp) =>
        new Date(exp.date).toISOString().slice(0, 10) === filters.date
      );
    }

    // Filter by category
    if (filters.category !== "All") {
      filtered = filtered.filter((exp) => exp.category === filters.category);
    }

    // Filter by payment method
    if (filters.paymentMethod !== "All") {
      filtered = filtered.filter((exp) => exp.paymentMethod === filters.paymentMethod);
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (exp) =>
          exp.description.toLowerCase().includes(query) ||
          (exp.notes && exp.notes.toLowerCase().includes(query))
      );
    }

    setFilteredExpenses(filtered);
  }, [expenses, filters, searchQuery]);

  return (
    <div className="p-6 bg-black text-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">All Expenses</h1>

      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <table className="w-full text-left border mt-4">
        <thead>
          <tr className="bg-white-100">
            <th className="px-4 py-2 ">Amount</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Date
                
            </th>
            <th className="px-4 py-2">Method</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense: any) => (
            <ExpenseRow
              key={expense._id}
              expense={expense}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>

      {editingExpense && (
        <UpdateExpenseModal
          expense={editingExpense}
          setShowModal={() => setEditingExpense(null)}
          onUpdate={fetchExpenses}
        />
      )}
    </div>
  );
};

export default ExpensesTable;
