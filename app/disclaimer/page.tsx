import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${site.brandPlain}. Information and analysis for entertainment only — not betting, financial, or investment advice. 21+.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="June 2026">
      <h2>Entertainment &amp; Information Only</h2>
      <p>
        All content provided by {site.brandPlain} — including picks, player-prop analysis,
        statistics, records, and opinions — is for <strong>informational and entertainment purposes
        only</strong>. Nothing here is betting advice, financial advice, investment advice, or a
        recommendation, solicitation, or instruction to place any wager.
      </p>

      <h2>No Guarantee of Outcomes</h2>
      <p>
        We do not guarantee any win, profit, win rate, or return. Sports are inherently
        unpredictable. <strong>Past performance does not guarantee future results.</strong> Any
        record, units figure, ROI, or hit rate shown is historical, may be illustrative, and should
        not be relied upon as a promise of future performance.
      </p>

      <h2>You Are Responsible</h2>
      <p>
        You alone are responsible for your decisions and for any money you choose to risk. Only ever
        risk what you can comfortably afford to lose. Do your own research and consider seeking advice
        from a licensed professional before making financial decisions.
      </p>

      <h2>Legal &amp; Age Requirements</h2>
      <p>
        This Service is intended for adults 21+ (or the legal wagering age in your jurisdiction,
        whichever is higher) in places where receiving such information is legal. It is your
        responsibility to know and follow the laws that apply to you.
      </p>

      <h2>Odds, Lines &amp; Third Parties</h2>
      <p>
        Odds and lines referenced are illustrative, move constantly, and may differ from what any
        sportsbook offers at any moment. We are independent and are not affiliated with, endorsed by,
        or partnered with any sportsbook, league, team, or player unless explicitly stated.
      </p>

      <h2>Gamble Responsibly</h2>
      <p>
        If gambling stops being entertainment, help is available. Call {site.responsibleGamblingLine}{" "}
        or visit our <a className="inline" href="/responsible-gaming">Responsible Gaming</a> page.
      </p>
    </LegalPage>
  );
}
