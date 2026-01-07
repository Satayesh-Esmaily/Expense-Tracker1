import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses yet. Add your first expense ✅</p>;
  }

  return (
    <ul className="list">
      {expenses.map((exp) => (
        <ExpenseItem
          key={exp.id}
          exp={exp}
          onDelete={onDeleteExpense}
          onEdit={onEditExpense}
        />
      ))}
    </ul>
  );
}
