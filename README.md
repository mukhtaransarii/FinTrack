# Finance Dashboard

A simple finance dashboard built for the Zorvyn Frontend Developer Intern assignment.

---

## Tech Stack

- React 18
- React Router DOM v6
- Tailwind CSS v3
- Vite

---

## Setup

```bash
# 1. Create folder structure (Mac/Linux)
mkdir -p finance-dashboard/src/{context,components,pages,utils}

# 2. Install dependencies
cd finance-dashboard
npm install

# 3. Start dev server
npm run dev
```

Open http://localhost:5173

---

## Features

### Dashboard
- Summary cards: Total Balance, Income, Expenses
- Bar chart showing monthly expense trends (last 3 months)
- Category spending breakdown with progress bars
- Recent transactions list

### Transactions
- Full table with all transactions
- Search by title or category
- Filter by type (All / Income / Expense)
- Sort by Date, Amount, or Title
- Export data as **CSV** or **JSON** (buttons always visible)
- Admin can inline edit title and amount

### Insights
- Highest spending category
- March vs April comparison
- Month-over-month trend
- Savings rate calculation
- Full category totals breakdown

### Role-Based UI
Switch roles using the dropdown in the sidebar:
- **Viewer** — read-only, no add/edit buttons
- **Admin** — can add new transactions and edit existing ones

### Dark Mode
Toggle using the 🌙 button in the sidebar. Preference is saved to localStorage.

### Data Persistence
All transactions are saved to `localStorage` automatically. Changes survive page refresh.

---

## Project Structure

```
src/
  App.jsx                        # routes + layout
  main.jsx                       # entry point
  index.css                      # tailwind imports
  context/
    AppContext.jsx                # global state: transactions, role, filters, darkMode
  components/
    Sidebar.jsx                  # nav + role switcher + dark mode toggle (responsive)
    SummaryCard.jsx              # reusable summary card
    AddTransactionModal.jsx      # modal for adding transactions (admin only)
  pages/
    Dashboard.jsx                # overview with charts
    Transactions.jsx             # table with filters + export
    Insights.jsx                 # spending analysis
  utils/
    exportData.js                # CSV and JSON export helpers
```

---

## Responsive Design

- Mobile: top navigation bar with hamburger menu
- Tablet/Desktop: fixed sidebar
- Tables scroll horizontally on small screens
- Cards stack vertically on mobile

---

## Optional Features Implemented

- ✅ Dark mode
- ✅ Data persistence (localStorage)
- ✅ Export functionality (CSV + JSON)
- ✅ Role-based UI simulation
