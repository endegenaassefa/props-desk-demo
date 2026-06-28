import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${site.brandPlain} — a player-prop research and information service. 21+, entertainment only.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="June 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
        {site.brandPlain} (the &ldquo;Service&rdquo;), operated by {site.legalEntity}. By accessing
        the Service, subscribing to a plan, or joining a channel, you agree to these Terms. If you do
        not agree, do not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 21 years old (or the minimum legal age for sports wagering in your
        jurisdiction, whichever is higher) and legally permitted to receive this information where
        you live. You are solely responsible for ensuring your use of the Service is lawful in your
        jurisdiction.
      </p>

      <h2>2. What the Service Is — and Is Not</h2>
      <p>
        The Service provides sports information, statistics, opinions, and analysis regarding player
        props and related markets for <strong>entertainment purposes only</strong>. It is{" "}
        <strong>not</strong> betting, financial, investment, legal, or tax advice, and{" "}
        <strong>not</strong> a recommendation, solicitation, or instruction to place any wager. We do
        not accept, place, or facilitate bets, and we do not handle wager funds.
      </p>

      <h2>3. No Guarantee of Results</h2>
      <p>
        Sports outcomes are uncertain. We do not guarantee any result, profit, win rate, or return.
        Any past performance, record, or statistic shown is historical and illustrative and does not
        guarantee future results. You alone are responsible for any decisions you make and any money
        you risk.
      </p>

      <h2>4. Accounts, Access &amp; Delivery</h2>
      <p>
        Paid plans are sold and fulfilled through our third-party commerce provider (Whop), which
        handles checkout, billing, and access to our private channels (for example, a private
        Telegram channel). You are responsible for keeping your access credentials and invite links
        confidential.
      </p>

      <h2>5. Payment, Billing &amp; Renewal</h2>
      <ul>
        <li>Prices are shown at checkout and may change for future billing periods.</li>
        <li>
          Subscription plans renew automatically at the stated interval until cancelled. You can
          cancel at any time through your Whop account; day and week passes simply expire.
        </li>
        <li>
          Billing, payment methods, and receipts are managed by Whop under its own terms and privacy
          policy.
        </li>
        <li>See our <a className="inline" href="/refunds">Refund Policy</a> for cancellations and refunds.</li>
      </ul>

      <h2>6. License &amp; Acceptable Use</h2>
      <p>
        Content is licensed to you for personal, non-commercial use only. You may not copy,
        redistribute, resell, screenshot-for-resale, forward, or publicly share picks, analysis, or
        channel access. Re-sharing access defeats the Service and is grounds for immediate
        termination without refund.
      </p>

      <h2>7. Third-Party Services</h2>
      <p>
        The Service relies on third parties such as Whop (commerce) and Telegram (delivery). Your use
        of those services is governed by their respective terms. We are not responsible for outages,
        actions, or policies of third parties.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
        warranties of any kind, express or implied, including merchantability, fitness for a
        particular purpose, and non-infringement. See our{" "}
        <a className="inline" href="/disclaimer">Disclaimer</a> for more.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, {site.legalEntity} will not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or for any betting,
        trading, or financial losses, arising from your use of the Service. Our total liability for
        any claim is limited to the amount you paid us in the three (3) months before the claim.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {site.legalEntity} from claims arising out of your
        use of the Service or your violation of these Terms.
      </p>

      <h2>11. Termination</h2>
      <p>
        We may suspend or terminate access for any violation of these Terms, including sharing access
        or unlawful use, without refund.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update these Terms from time to time. Continued use after changes means you accept the
        updated Terms.
      </p>

      <h2>13. Governing Law</h2>
      <p>
        These Terms are governed by the laws of the client&rsquo;s state/country of incorporation
        (to be finalized by the client&rsquo;s attorney), without regard to conflict-of-laws rules.
      </p>

      <h2>14. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a className="inline" href={`mailto:${site.contact.email}`}>
          {site.contact.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
