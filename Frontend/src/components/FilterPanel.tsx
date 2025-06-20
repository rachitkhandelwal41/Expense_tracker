import React from "react";

interface FilterProps {
  filters: {
    date: string;
    category: string;
    paymentMethod: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const categories = ["All", "Food", "Rent", "Shopping", "Transport", "Entertainment", "Healthcare", "Utilities", "Other"];
const paymentMethods = ["All", "UPI", "Credit Card", "Debit Card", "Cash", "Net Banking"];

const FilterBar: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex gap-4 mb-4 text-white items-center">
      <input
        type="date"
        value={filters.date}
        onChange={(e) => onFilterChange("date", e.target.value)}
        className="bg-black border border-white px-3 py-1 rounded"
      />
      <select
        value={filters.category}
        onChange={(e) => onFilterChange("category", e.target.value)}
        className="bg-black border border-white px-3 py-1 rounded"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        value={filters.paymentMethod}
        onChange={(e) => onFilterChange("paymentMethod", e.target.value)}
        className="bg-black border border-white px-3 py-1 rounded"
      >
        {paymentMethods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
