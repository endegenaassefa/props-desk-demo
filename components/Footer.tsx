import Link from "next/link";
import { site } from "@/config/site";

const NBSP = String.fromCharCode(160);
const brandNbsp = site.brand.split(" ").join(NBSP);

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-top">
          <div>
            <Link href="/" className="brand" aria-label={`${site.brandPlain} — home`}>
              <span className="dot" aria-hidden="true"></span>
              {brandNbsp}
            </Link>
            <p>{site.footer.tagline}</p>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h4>Plans</h4>
              <Link href="/#pricing">Day</Link>
              <Link href="/#pricing">Monthly</Link>
              <Link href="/#pricing">Coaching</Link>
            </div>
            <div className="foot-col">
              <h4>Trust</h4>
              <Link href="/#record">Record</Link>
              <Link href="/#board">Today&apos;s board</Link>
              <Link href="/#faq">FAQ</Link>
            </div>
            <div className="foot-col">
              <h4>Legal</h4>
              <Link href="/terms">Terms</Link>
              <Link href="/disclaimer">Disclaimer</Link>
              <Link href="/refunds">Refunds</Link>
              <Link href="/responsible-gaming">Responsible Gaming</Link>
            </div>
          </div>
        </div>
        <div className="disc">
          <span className="age">21+</span>
          For entertainment purposes only. Nothing here is a recommendation to wager, financial
          advice, or a guarantee of any outcome. Past performance does not guarantee future results.
          You alone are responsible for your decisions. {site.responsibleGamblingLine}. ·{" "}
          <Link href="/terms">Terms</Link> / <Link href="/disclaimer">Disclaimer</Link> /{" "}
          <Link href="/refunds">Refunds</Link> /{" "}
          <Link href="/responsible-gaming">Responsible&nbsp;Gaming</Link> · ©{" "}
          {new Date().getFullYear()} {site.legalEntity}.
        </div>
      </div>
    </footer>
  );
}
