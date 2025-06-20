import React from "react";

interface ExpenseRowProps {
  expense: any;
  onDelete: (id: string) => void;
  onEdit: (expense: any) => void;
}

const ExpenseRow: React.FC<ExpenseRowProps> = ({ expense, onDelete, onEdit }) => {
  return (
    <tr className="border-b">
      <td className="px-4 py-2">{expense.amount}</td>
      <td className="px-4 py-2">{expense.category}</td>
      <td className="px-4 py-2">{new Date(expense.date).toLocaleDateString()}</td>
      <td className="px-4 py-2">{expense.paymentMethod}</td>
      <td className="px-4 py-2">{expense.description}</td>
      <td className="px-4 py-2">{expense.notes}</td>
      <td className="px-4 py-2 flex gap-2">
        <button onClick={() => onEdit(expense)} className="text-blue-500">Edit</button>
        <button onClick={() => onDelete(expense._id)} className="text-red-500">Delete</button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
