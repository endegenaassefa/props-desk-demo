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
              {t.screenshot ? (
                <div className="q-shot">
                  {/* Real member DM screenshot (varying dimensions) — plain img is correct here. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.screenshot} alt={`Message from ${t.name}`} loading="lazy" decoding="async" />
                </div>
              ) : (
                <blockquote>
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
              )}
              <figcaption className="by">
                <span className="av" aria-hidden="true">
                  {t.initials}
                </span>
                <div>
                  <div className="nm">{t.name}</div>
                  <div className="dt">{t.source ? `${t.source} · ${t.date}` : t.date}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
