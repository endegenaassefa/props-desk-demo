import { site } from "@/config/site";

export default function HowItWorks() {
  const { how } = site;
  return (
    <section id="how" style={{ background: "var(--ink-2)" }}>
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">{how.eyebrow}</span>
            <h2>{how.heading}</h2>
          </div>
        </div>
        <div className="steps reveal">
          {how.steps.map((s, i) => (
            <div className="step" key={i}>
              <div className="num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
