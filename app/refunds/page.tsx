import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Refund and cancellation policy for ${site.brandPlain} subscriptions and passes. Billing handled by Whop.`,
  alternates: { canonical: "/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalPage title="Refund &amp; Cancellation Policy" updated="June 2026">
      <p>
        {site.brandPlain} sells access to digital information delivered instantly through our commerce
        provider, Whop. Because access and content are delivered immediately, the following policy
        applies. This is a starting template — final terms must be confirmed with the client and
        reconciled with Whop&rsquo;s policies and applicable consumer law.
      </p>

      <h2>Subscriptions (Monthly / Pro)</h2>
      <ul>
        <li>
          You can <strong>cancel anytime</strong> from your Whop account. Cancellation stops the next
          renewal; it does not retroactively refund the current period.
        </li>
        <li>
          Access continues until the end of the period you have already paid for. We do not pro-rate
          partial periods.
        </li>
      </ul>

      <h2>Day &amp; Week Passes</h2>
      <ul>
        <li>
          Day and week passes grant immediate access to time-sensitive content and are{" "}
          <strong>generally non-refundable</strong> once access has been delivered.
        </li>
        <li>Passes simply expire at the end of their term — there is nothing to cancel.</li>
      </ul>

      <h2>Coaching</h2>
      <p>
        1-on-1 coaching is a limited, scheduled service. Refund and rescheduling terms are agreed in
        writing at the time of purchase.
      </p>

      <h2>Exceptions</h2>
      <p>
        We may grant refunds at our discretion in cases such as a duplicate charge, a technical
        failure that prevented access, or where required by applicable law. Reach out and we&rsquo;ll
        make it right.
      </p>

      <h2>Billing Is Handled by Whop</h2>
      <p>
        Payments, receipts, and refunds are processed by Whop under its own terms. Depending on your
        payment method, an approved refund may take several business days to appear.
      </p>

      <h2>Chargebacks</h2>
      <p>
        Please contact us before initiating a chargeback — most issues are resolved quickly.
        Fraudulent chargebacks may result in loss of access without refund.
      </p>

      <h2>How to Reach Us</h2>
      <p>
        Email{" "}
        <a className="inline" href={`mailto:${site.contact.email}`}>
          {site.contact.email}
        </a>{" "}
        with your order details and we&rsquo;ll help.
      </p>
    </LegalPage>
  );
}
