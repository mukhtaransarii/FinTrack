// src/context/AppContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const initialTransactions = [
  { id: 1, date: "2026-03-01", title: "Salary", amount: 5000, category: "Income", type: "income" },
  { id: 2, date: "2026-03-03", title: "Rent", amount: 1200, category: "Housing", type: "expense" },
  { id: 3, date: "2026-03-05", title: "Groceries", amount: 150, category: "Food", type: "expense" },
  { id: 4, date: "2026-03-08", title: "Netflix", amount: 15, category: "Entertainment", type: "expense" },
  { id: 5, date: "2026-03-10", title: "Freelance", amount: 800, category: "Income", type: "income" },
  { id: 6, date: "2026-03-12", title: "Electricity", amount: 90, category: "Utilities", type: "expense" },
  { id: 7, date: "2026-03-15", title: "Dining Out", amount: 60, category: "Food", type: "expense" },
  { id: 8, date: "2026-03-18", title: "Transport", amount: 40, category: "Transport", type: "expense" },
  { id: 9, date: "2026-03-20", title: "Gym", amount: 30, category: "Health", type: "expense" },
  { id: 10, date: "2026-03-22", title: "Bonus", amount: 500, category: "Income", type: "income" },
  { id: 11, date: "2026-04-01", title: "Salary", amount: 5000, category: "Income", type: "income" },
  { id: 12, date: "2026-04-02", title: "Rent", amount: 1200, category: "Housing", type: "expense" },
  { id: 13, date: "2026-04-03", title: "Groceries", amount: 130, category: "Food", type: "expense" },
];

const AppContext = createContext();

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem("role");
    return saved ? JSON.parse(saved) : "viewer";
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // persist transactions
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  
  // persist role
  useEffect(() => {
    localStorage.setItem("role", JSON.stringify(role));
  }, [role]);

  // persist + apply dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  function addTransaction(tx) {
    setTransactions((prev) => [...prev, { ...tx, id: Date.now() }]);
  }

  function editTransaction(id, updated) {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updated } : tx))
    );
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }

  const filtered = transactions.filter((tx) => {
    const matchType = filter === "all" || tx.type === filter;
    const matchSearch =
      tx.title.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <AppContext.Provider
      value={{
        transactions,
        filtered,
        role,
        setRole,
        filter,
        setFilter,
        search,
        setSearch,
        addTransaction,
        editTransaction,
        deleteTransaction,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
