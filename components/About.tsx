import { site } from "@/config/site";

export default function About() {
  const { about } = site;
  return (
    <section id="about">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">{about.eyebrow}</span>
            <h2>{about.heading}</h2>
          </div>
        </div>
        <div className="about-grid reveal">
          <div className="about-lede">
            {about.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="creds">
            {about.creds.map((c, i) => (
              <div className="cred" key={i}>
                <div className="k">{c.k}</div>
                <div className="v">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
