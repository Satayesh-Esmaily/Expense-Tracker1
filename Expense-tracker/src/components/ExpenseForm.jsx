import { useState, useEffect } from "react";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

const CATEGORIES = ["Food", "Transport", "Bills", "Shopping", "Other"];

export default function ExpenseForm({ onAddExpense, editingExpense, onUpdateExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
      setDate(editingExpense.date ? editingExpense.date.slice(0, 10) : "");
    }
  }, [editingExpense]);

  function submit() {
    setError("");

    const cleanTitle = title.trim();
    const numberAmount = Number(amount);

    if (!cleanTitle) return setError("Title is required.");
    if (!Number.isFinite(numberAmount) || numberAmount <= 0)
      return setError("Amount must be > 0.");
    if (!date) return setError("Date is required.");

    const expenseData = { title: cleanTitle, amount: numberAmount, category, date };

    if (editingExpense) {
      onUpdateExpense({ ...editingExpense, ...expenseData });
    } else {
      onAddExpense(expenseData);
    }

    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  }

  return (
    <div>
      <div className="row">
        <TextInput label="Title" value={title} onChange={setTitle} placeholder="e.g., Pizza" />
        <TextInput label="Amount" value={amount} onChange={setAmount} placeholder="e.g., 15" type="number" />
        <SelectInput label="Category" value={category} onChange={setCategory} options={CATEGORIES} />
        <TextInput label="Date" value={date} onChange={setDate} type="date" />
      </div>

      {error ? <p className="error">{error}</p> : null}

      <button className="btn primary" onClick={submit}>
        {editingExpense ? "Update" : "Add"}
      </button>
    </div>
  );
}
