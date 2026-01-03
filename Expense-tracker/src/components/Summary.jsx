export default function Summary({ totalAmount, itemsCount, warning, categoryTotals }) {
    return (
      <div className="summaryWrap">
        <div className="summary">
          <SummaryCard label="Total" value={`$${totalAmount}`} />
          <SummaryCard label="Items" value={itemsCount} />
        </div>
  
        {/* ✅ Conditional rendering (Week 2 Day 1) */}
        {warning && (
          <div className="warning">
            ⚠️ High spending! Total is above <b>$100</b>.
          </div>
        )}
  
        <div className="categoryTotals">
          <h3 className="miniTitle">Category Totals (Derived)</h3>
          <div className="chips">
            {Object.keys(categoryTotals).map((cat) => (
              <span className="chip" key={cat}>
                {cat}: ${categoryTotals[cat]}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  function SummaryCard({ label, value }) {
    return (
      <div className="summaryCard">
        <div className="summaryLabel">{label}</div>
        <div className="summaryValue">{value}</div>
      </div>
    );
  }
  