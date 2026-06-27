import { site } from "@/config/site";

// A units/ROI value is "positive" (green) unless it starts with a minus sign.
function isPos(v: string): boolean {
  const t = v.trim();
  return !t.startsWith("-") && !t.startsWith("−");
}

export default function Record() {
  const { record } = site;
  return (
    <section id="record">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">{record.eyebrow}</span>
            <h2>{record.heading}</h2>
          </div>
          <span className="vbadge">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} aria-hidden="true">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            {record.badge}
          </span>
        </div>
        <div className="ledger-wrap">
          <div className="ltable reveal">
            <div className="lrow h">
              <span>Market</span>
              <span>Record</span>
              <span>Units</span>
              <span>ROI</span>
            </div>
            {record.rows.map((r, i) => (
              <div className={r.total ? "lrow tot" : "lrow"} key={i}>
                <span className="sport">{r.market}</span>
                <span>{r.record}</span>
                <span className={isPos(r.units) ? "u pos" : "u"}>{r.units}</span>
                <span className={isPos(r.roi) ? "r pos" : "r"}>{r.roi}</span>
              </div>
            ))}
          </div>
          <div className="chart reveal">
            <div className="ct">{record.chartTitle}</div>
            <div className="bars" id="bars">
              {record.bars.map((b, i) => (
                <span key={i} className={b.loss ? "loss" : undefined} data-h={b.height}></span>
              ))}
            </div>
            <div className="lab">
              {record.bars.map((b, i) => (
                <span key={i}>{b.month}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
