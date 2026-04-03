// src/pages/Insights.jsx
import { useApp } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useApp();

  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

  const marchExpenses = expenses.filter((t) => t.date.startsWith("2026-03")).reduce((s, t) => s + t.amount, 0);
  const aprilExpenses = expenses.filter((t) => t.date.startsWith("2026-04")).reduce((s, t) => s + t.amount, 0);
  const marchIncome = income.filter((t) => t.date.startsWith("2026-03")).reduce((s, t) => s + t.amount, 0);
  const aprilIncome = income.filter((t) => t.date.startsWith("2026-04")).reduce((s, t) => s + t.amount, 0);
  const savingsRate = marchIncome > 0 ? (((marchIncome - marchExpenses) / marchIncome) * 100).toFixed(1) : 0;

  const insights = [
    { icon: "🏆", title: "Highest Spending Category", value: topCategory ? `${topCategory[0]} — $${topCategory[1]}` : "No data", color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800" },
    { icon: "📅", title: "March Expenses", value: `$${marchExpenses}`, color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" },
    { icon: "📅", title: "April Expenses (so far)", value: `$${aprilExpenses}`, color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800" },
    {
      icon: marchExpenses > aprilExpenses ? "📉" : "📈",
      title: "Month over Month",
      value: marchExpenses > aprilExpenses ? `Spending down $${marchExpenses - aprilExpenses}` : `Spending up $${aprilExpenses - marchExpenses}`,
      color: marchExpenses > aprilExpenses ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
    },
    { icon: "💸", title: "March Savings Rate", value: `${savingsRate}%`, color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" },
    { icon: "💰", title: "April Income (so far)", value: `$${aprilIncome}`, color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800" },
  ];

  return (
    <div className="pt-14 md:pt-0">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Insights</h2>

      {transactions.length === 0 ? (
        <p className="text-gray-400 text-sm">No data to show insights.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {insights.map((item, i) => (
              <div key={i} className={`rounded-xl border p-4 ${item.color}`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.title}</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">All Category Totals</p>
            <div className="flex flex-col gap-2">
              {Object.entries(categoryMap)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, amt]) => (
                  <div key={cat} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{cat}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">${amt}</span>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
