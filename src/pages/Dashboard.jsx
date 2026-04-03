// src/pages/Dashboard.jsx
import { useApp } from "../context/AppContext";
import SummaryCard from "../components/SummaryCard";
 import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

function BarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 mt-4" style={{ height: "120px" }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1" style={{ height: "100%" }}>
          <div className="w-full" style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
            <div
              className="w-full bg-blue-400 rounded-t"
              style={{ height: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryList({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const colors = ["bg-red-400", "bg-yellow-400", "bg-green-400", "bg-purple-400", "bg-pink-400"];
  return (
    <div className="flex flex-col gap-2 mt-4">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-300">{d.label}</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">${d.value}</span>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`${colors[i % colors.length]} h-2 rounded-full`}
              style={{ width: `${(d.value / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const { transactions } = useApp();

  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;

  const months = ["Feb", "Mar", "Apr"];
  const monthData = months.map((m, i) => {
    const month = (i + 2).toString().padStart(2, "0");
    const total = transactions
      .filter((t) => t.date.includes(`-${month}-`) && t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    return { label: m, value: total || 10 };
  });

  const categoryMap = {};
  transactions.filter((t) => t.type === "expense").forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  const categoryData = Object.entries(categoryMap)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="pt-14 md:pt-0">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard title="Total Balance" amount={balance} color="text-blue-600" icon={<Wallet size={20} />} />
        <SummaryCard title="Total Income" amount={income} color="text-green-600" icon={<TrendingUp size={20} />} />
        <SummaryCard title="Total Expenses" amount={expenses} color="text-red-500" icon={<TrendingDown size={20} />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Monthly Expenses</p>
          <BarChart data={monthData} />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Spending by Category</p>
          <CategoryList data={categoryData} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">Recent Transactions</p>
        {recent.length === 0 ? (
          <p className="text-gray-400 text-sm">No transactions yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {recent.map((tx) => (
              <div key={tx.id} className="flex justify-between items-center py-1 border-b border-gray-50 dark:border-gray-800 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{tx.title}</p>
                  <p className="text-xs text-gray-400">{tx.category} • {tx.date}</p>
                </div>
                <span className={`text-sm font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-500"}`}>
                  {tx.type === "income" ? "+" : "-"}${tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
