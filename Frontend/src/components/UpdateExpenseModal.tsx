import React, { useState } from "react";
import { updateExpense } from "../services/operations/receipt";

interface UpdateExpenseModalProps {
  expense: any;
  setShowModal: (value: boolean) => void;
  onUpdate: () => void;
}

export const UpdateExpenseModal: React.FC<UpdateExpenseModalProps> = ({
  expense,
  setShowModal,
  onUpdate
}) => {
  const [form, setForm] = useState({ ...expense });

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setForm((prev:any) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateExpense(expense._id, form);
      onUpdate();
      setShowModal(false);
    } catch (err) {
      alert("Failed to update expense");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="bg-black p-6 rounded-lg w-[400px] space-y-4">
        <h2 className="text-xl font-bold">Update Expense</h2>

        <input name="amount" value={form.amount} onChange={handleChange} type="number" className="border p-2 w-full" />
        <input name="category" value={form.category} onChange={handleChange} type="text" className="border p-2 w-full" />
        <input name="paymentMethod" value={form.paymentMethod} onChange={handleChange} type="text" className="border p-2 w-full" />
        <input name="description" value={form.description} onChange={handleChange} type="text" className="border p-2 w-full" />
        <input name="notes" value={form.notes} onChange={handleChange} type="text" className="border p-2 w-full" />

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};
