import { site } from "@/config/site";

/**
 * Hero count-up stat strip. Renders the data-* attributes the demo used; the
 * actual count-up animation is driven globally by <ScrollEffects/> when the
 * strip scrolls into view (preserving the demo's single-observer behavior).
 *
 * Constraint #2: the hit rate is intentionally a modest stat here, NOT a hero
 * number. Net units + the tracked record carry trust.
 */
export default function StatStrip() {
  return (
    <div className="statstrip reveal">
      {site.stats.map((s, i) => {
        if (s.record) {
          return (
            <div className="s" key={i}>
              <div className="n" data-rec={s.record}>
                0–0
              </div>
              <div className="k">{s.label}</div>
            </div>
          );
        }
        const initial = `${s.pre ?? ""}${(0).toFixed(s.dec)}${s.suf ?? ""}`;
        return (
          <div className="s" key={i}>
            <div
              className={s.pos ? "n pos" : "n"}
              data-to={s.to}
              data-pre={s.pre}
              data-suf={s.suf}
              data-dec={s.dec}
            >
              {initial}
            </div>
            <div className="k">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
