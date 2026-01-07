export default function SelectInput({ label, value, onChange, options }) {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
  