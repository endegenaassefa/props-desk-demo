import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Responsible Gaming",
  description: `Responsible gaming resources and help. ${site.brandPlain} is 21+, entertainment only. If gambling stops being fun, help is available.`,
  alternates: { canonical: "/responsible-gaming" },
};

export default function ResponsibleGamingPage() {
  return (
    <LegalPage title="Responsible Gaming" updated="June 2026">
      <p>
        {site.brandPlain} is for entertainment, and only for adults 21+. Sports information should add
        to the fun — never put your finances or wellbeing at risk. Bet only what you can comfortably
        afford to lose.
      </p>

      <h2>Stay in Control</h2>
      <ul>
        <li>Set a budget and a time limit before you start, and stick to them.</li>
        <li>Never chase losses or bet to &ldquo;win it back.&rdquo;</li>
        <li>Don&rsquo;t gamble with money meant for rent, bills, or essentials.</li>
        <li>Don&rsquo;t gamble to escape stress, or while under the influence.</li>
        <li>Take regular breaks — it&rsquo;s entertainment, not income.</li>
      </ul>

      <h2>Warning Signs</h2>
      <p>
        Spending more than you intended, hiding it from people close to you, feeling anxious or
        irritable when not gambling, or borrowing to gamble are signs it may be time to step back and
        get support.
      </p>

      <h2>Where to Get Help (U.S.)</h2>
      <ul>
        <li>
          <strong>National Problem Gambling Helpline:</strong> call or text{" "}
          <a className="inline" href="tel:18004262537">
            {site.responsibleGamblingLine}
          </a>{" "}
          — free, confidential, 24/7.
        </li>
        <li>
          <strong>National Council on Problem Gambling:</strong>{" "}
          <a className="inline" href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer">
            ncpgambling.org
          </a>
        </li>
        <li>
          <strong>Gamblers Anonymous:</strong>{" "}
          <a className="inline" href="https://www.gamblersanonymous.org" target="_blank" rel="noopener noreferrer">
            gamblersanonymous.org
          </a>
        </li>
      </ul>
      <p>
        If you&rsquo;re outside the U.S., contact your local problem-gambling helpline or a healthcare
        professional. The client should add the resources required for their licensed jurisdictions.
      </p>

      <h2>Self-Exclusion</h2>
      <p>
        If you&rsquo;d like to stop receiving our content, cancel from your Whop account or email{" "}
        <a className="inline" href={`mailto:${site.contact.email}`}>
          {site.contact.email}
        </a>{" "}
        and we&rsquo;ll remove your access.
      </p>
    </LegalPage>
  );
}
