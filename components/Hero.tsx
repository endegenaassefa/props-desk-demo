import Link from "next/link";
import { site } from "@/config/site";
import Terminal from "./Terminal";
import StatStrip from "./StatStrip";

export default function Hero() {
  const { hero } = site;
  return (
    <section className="hero">
      <div className="glow" aria-hidden="true"></div>
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow reveal">{hero.eyebrow}</span>
          <h1 className="reveal">
            {hero.headlineLine1}
            <br />
            <span className="it">{hero.headlineEmphasis}</span> {hero.headlineRest}
          </h1>
          <p className="sub reveal">{hero.sub}</p>
          <div className="hero-cta reveal">
            <Link href="/#pricing" className="btn btn-primary">
              {hero.ctaPrimary}
            </Link>
            <Link href="/#record" className="btn btn-ghost">
              {hero.ctaSecondary}
            </Link>
          </div>
          {/* Trust microcopy — the green words are deliberate accents (constraint #2). */}
          <div className="micro reveal">
            <span>
              <b>Wins + losses</b> shown
            </span>
            <span>Tracked daily</span>
            <span>21+ · entertainment only</span>
          </div>
        </div>
        <Terminal />
      </div>
      <StatStrip />
    </section>
  );
}
