import { site } from "@/config/site";

// External Whop links open in a new tab; unconfigured placeholders ("#pricing")
// are treated as in-page anchors.
function linkProps(href: string) {
  return href.startsWith("http")
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}

export default function Pricing() {
  const { pricing } = site;
  const c = pricing.coaching;
  return (
    <section id="pricing">
      <div className="wrap">
        <div className="sec-head reveal" style={{ justifyContent: "center", textAlign: "center" }}>
          <div>
            <span className="eyebrow">{pricing.eyebrow}</span>
            <h2>{pricing.heading}</h2>
          </div>
        </div>
        <p className="free-line reveal">
          {pricing.freeLine}{" "}
          <a href={pricing.freeChannelHref} {...linkProps(pricing.freeChannelHref)}>
            {pricing.freeLinkText}
          </a>
        </p>
        <div className="tiers">
          {pricing.tiers.map((t) => (
            <div className={t.featured ? "tier feat reveal" : "tier reveal"} key={t.id}>
              {t.badge ? <span className="badge">{t.badge}</span> : null}
              <h3>{t.name}</h3>
              <div className="price">
                {t.price}
                <span>{t.per}</span>
              </div>
              <p className="hook">{t.hook}</p>
              <a
                href={t.href}
                {...linkProps(t.href)}
                className={t.featured ? "btn btn-primary" : "btn btn-ghost"}
                data-tier={t.id}
                data-checkout={t.configured ? "live" : "unconfigured"}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
        <div className="coach reveal">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h3 style={{ marginTop: "10px" }}>{c.name}</h3>
            <p className="p">{c.body}</p>
            <div className="pr">{c.price}</div>
          </div>
          <a
            href={c.href}
            {...linkProps(c.href)}
            className="btn btn-primary"
            data-tier="coaching"
            data-checkout={c.configured ? "live" : "unconfigured"}
          >
            {c.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
