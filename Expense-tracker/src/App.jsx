import { useState } from "react";
import "./App.css";
import Card from "./components/Card";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Summary from "./components/Summary";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  const [expenses, setExpenses] = useState([
    { id: createId(), title: "Food", amount: 20, category: "Food" },
    { id: createId(), title: "Taxi", amount: 12, category: "Transport" },
  ]);

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const itemsCount = expenses.length;
  
  const warning = totalAmount > 100;
  
  // categories list (same categories used for form)
  const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Other"];
  // derived category totals (NOT stored in useState)
  const categoryTotals = CATEGORIES.reduce((acc, c) => {
    acc[c] = 0;
    return acc;
  }, {});

  for (const e of expenses) {
    categoryTotals[e.category] += e.amount;
  }
  const [filter, setFilter] = useState("All");
  const visibleExpenses =
    filter === "All" ? expenses : expenses.filter((e) => e.category === filter);

  function handleAddExpense(data) {
    const newExpense = {
      id: createId(),
      ...data,
    };

    setExpenses((prev) => [newExpense, ...prev]);
  }

  function handleDeleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }


  return (
    <div className="page">
      <header className="header">
        <div>
          <h1 className="title">Expense Tracker</h1>
          <p className="subtitle">Week 1 + Week 2 Practice Project</p>
        </div>
      </header>
      <Summary
        totalAmount={totalAmount}
        itemsCount={itemsCount}
        warning={warning}
        categoryTotals={categoryTotals}
      />


      <Card title="Add Expense">
        <ExpenseForm onAddExpense={handleAddExpense} />
      </Card>

      <Card
        title="Expenses"
        right={
          <select className="input" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Other">Other</option>
          </select>
        }
      >
        <ExpenseList expenses={visibleExpenses} onDeleteExpense={handleDeleteExpense} />
      </Card>


    </div>
  );
}