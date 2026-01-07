export default function TextInput({ label, value, onChange, placeholder, type = "text" }) {
    return (
      <div className="field">
        <label className="label">{label}</label>
        <input
          className="input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          type={type}
        />
      </div>
    );
  }
  