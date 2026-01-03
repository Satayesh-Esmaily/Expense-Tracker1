export default function ExpenseItem({ exp, onDelete }) {
    return (
      <li className="item">
        <div>
          <div className="itemTitle">{exp.title}</div>
          <div className="itemMeta">{exp.category}</div>
        </div>
  
        <div className="itemRight">
          <div className="amount">${exp.amount}</div>
          <button className="btn sm danger" onClick={() => onDelete(exp.id)}>
            Delete
          </button>
        </div>
      </li>
    );
  }
  