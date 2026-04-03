// src/components/AddTransactionModal.jsx
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useApp();
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  function handleSubmit() {
    if (!form.title || !form.amount || !form.category) return;
    addTransaction({ ...form, amount: Number(form.amount) });
    onClose();
  }

  const inputClass =
    "border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 w-full";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Add Transaction</h2>

        <div className="flex flex-col gap-3">
          <input className={inputClass} placeholder="Title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className={inputClass} placeholder="Amount" type="number" value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <input className={inputClass} placeholder="Category" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <select className={inputClass} value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input className={inputClass} type="date" value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>

        <div className="flex gap-2 mt-4">
          <button onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2 text-sm font-medium">
            Add
          </button>
          <button onClick={onClose}
            className="flex-1 border border-gray-200 dark:border-gray-600 rounded-lg py-2 text-sm text-gray-600 dark:text-gray-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
