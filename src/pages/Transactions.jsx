// src/pages/Transactions.jsx
import { useState } from "react";
import { useApp } from "../context/AppContext";
import AddTransactionModal from "../components/AddTransactionModal";
import { exportJSON, exportCSV } from "../utils/exportData";

export default function Transactions() {
  const { filtered, transactions, role, filter, setFilter, search, setSearch, editTransaction, deleteTransaction } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [sortBy, setSortBy] = useState("date");

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "amount") return b.amount - a.amount;
    return a.title.localeCompare(b.title);
  });

  function startEdit(tx) {
    setEditId(tx.id);
    setEditData({ title: tx.title, amount: tx.amount, category: tx.category });
  }

  function saveEdit() {
    editTransaction(editId, editData);
    setEditId(null);
  }

  return (
    <div className="pt-14 md:pt-0">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Transactions</h2>

        <div className="flex gap-2 flex-wrap">
          {/* Export buttons - always visible */}
          <button
            onClick={() => exportCSV(transactions)}
            className="border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Export CSV
          </button>
          <button
            onClick={() => exportJSON(transactions)}
            className="border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Export JSON
          </button>

          {role === "admin" && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
            >
              + Add
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm flex-1 min-w-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          className="border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {/* Table — scrollable on mobile */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-x-auto">
        {sorted.length === 0 ? (
          <p className="text-gray-400 text-sm p-6 text-center">No transactions found.</p>
        ) : (
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-left">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                {role === "admin" && <th className="px-4 py-3 font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {sorted.map((tx) => (
                <tr key={tx.id} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {editId === tx.id ? (
                      <input
                        className="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      />
                    ) : (
                      tx.title
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{tx.category}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{tx.date}</td>
                  <td className={`px-4 py-3 font-medium ${tx.type === "income" ? "text-green-600" : "text-red-500"}`}>
                    {editId === tx.id ? (
                      <input
                        className="border border-gray-200 dark:border-gray-600 rounded px-2 py-1 w-20 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        type="number"
                        value={editData.amount}
                        onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
                      />
                    ) : (
                      `${tx.type === "income" ? "+" : "-"}$${tx.amount}`
                    )}
                  </td>
                  {role === "admin" && (
                    <td className="px-4 py-3">
                      {editId === tx.id ? (
                        <button onClick={saveEdit} className="text-blue-600 text-xs font-medium">Save</button>
                      ) : (
                        <div className="flex gap-6">
                          <button onClick={() => startEdit(tx)} className="text-gray-400 text-xs hover:text-blue-600">Edit</button>
                          <button onClick={() => deleteTransaction(tx.id)} className="text-gray-400 text-xs hover:text-red-500">Delete</button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
