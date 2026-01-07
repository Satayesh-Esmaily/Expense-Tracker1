export default function ExpenseItem({ exp, onDelete, onEdit }) {
  const formattedDate = exp.date ? new Date(exp.date).toLocaleDateString() : "";

  return (
    <li className="item">
      <div>
        <div className="itemTitle">{exp.title}</div>
        <div className="itemMeta">
          {exp.category} | {formattedDate}
        </div>
      </div>

      <div className="itemRight">
        <div className="amount">${exp.amount}</div>
        <button className="btn sm primary" onClick={() => onEdit && onEdit(exp)}>
          Edit
        </button>
        <button className="btn sm danger" onClick={() => onDelete(exp.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
