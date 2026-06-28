import { site } from "@/config/site";

export default function Testimonials() {
  const { proof } = site;
  return (
    <section id="proof">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">{proof.eyebrow}</span>
            <h2>{proof.heading}</h2>
          </div>
          <span className="note">{proof.note}</span>
        </div>
        <div className="quotes">
          {proof.testimonials.map((t, i) => (
            <figure className="q reveal" key={i}>
              <blockquote>
                <p>&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="by">
                <span className="av" aria-hidden="true">
                  {t.initials}
                </span>
                <div>
                  <div className="nm">{t.name}</div>
                  <div className="dt">{t.date}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
