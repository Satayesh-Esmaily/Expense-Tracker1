import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Summary from "./components/Summary";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: createId(), title: "Food", amount: 20, category: "Food", date: new Date().toISOString() },
    { id: createId(), title: "Taxi", amount: 12, category: "Transport", date: new Date().toISOString() },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const visibleExpenses = expenses.filter((exp) => {
    const matchSearch = exp.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filter === "All" ? true : exp.category === filter;
    const matchMonth =
      !selectedMonth || !exp.date
        ? true
        : new Date(exp.date).getMonth().toString() === selectedMonth;

    return matchSearch && matchCategory && matchMonth;
  });

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const itemsCount = expenses.length;
  const warning = totalAmount > 100;

  const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Other"];
  const categoryTotals = CATEGORIES.reduce((acc, c) => {
    acc[c] = 0;
    return acc;
  }, {});
  for (const e of expenses) {
    categoryTotals[e.category] += e.amount;
  }

  function handleAddExpense(data) {
    const newExpense = {
      id: createId(),
      ...data,
    };
    setExpenses((prev) => [newExpense, ...prev]);
  }

  function handleUpdateExpense(updatedExpense) {
    setExpenses((prev) =>
      prev.map((e) => (e.id === updatedExpense.id ? updatedExpense : e))
    );
    setEditingExpense(null);
  }

  function handleDeleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="page">
      <header className="header">
        <h1 className="title">Expense Tracker</h1>
      </header>

      <Summary
        totalAmount={totalAmount}
        itemsCount={itemsCount}
        warning={warning}
        categoryTotals={categoryTotals}
      />

      <Card title="Add / Edit Expense">
        <ExpenseForm
          onAddExpense={handleAddExpense}
          editingExpense={editingExpense}
          onUpdateExpense={handleUpdateExpense}
        />
      </Card>

      <Card
        title="Expenses"
        right={
          <select
            className="input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        }
      >
        <input
          className="input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          <option value="0">January</option>
          <option value="1">February</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>

        <ExpenseList
          expenses={visibleExpenses}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={(expense) => setEditingExpense(expense)}
        />
      </Card>
    </div>
  );
}
