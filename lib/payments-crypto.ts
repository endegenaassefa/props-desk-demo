/* =============================================================================
   CRYPTO FALLBACK — NOWPayments (DOCUMENTED, NOT WIRED)
   -----------------------------------------------------------------------------
   Per the research constraints, WHOP is the primary (and recommended) processor
   because it explicitly permits picks and does checkout + private-Telegram
   delivery natively. Stripe/PayPal are OFF the table (they prohibit handicapping
   and freeze funds).

   NOWPayments is the ONLY documented fallback, for the scenario where Whop is
   ever unavailable. It is intentionally left as a commented outline — do NOT
   enable it without a deliberate decision, real keys, and its own review.

   If you do enable it later:
     1. Create a NOWPayments account; set NOWPAYMENTS_API_KEY + NOWPAYMENTS_IPN_SECRET.
     2. Implement createCryptoInvoice() to POST to NOWPayments' /v1/invoice.
     3. Implement verifyNowPaymentsIpn() — NOWPayments signs IPN callbacks with
        HMAC-SHA512 over the JSON body with keys SORTED, using NOWPAYMENTS_IPN_SECRET,
        delivered in the `x-nowpayments-sig` header. Verify it the same fail-closed
        way lib/whop.ts verifies Whop, then fulfill access.
     4. Build a separate /api/nowpayments/ipn route mirroring the Whop webhook route.

   Crypto fulfillment does NOT auto-add to Telegram the way Whop does, so you'd
   also need a delivery mechanism (e.g. a bot that issues one-time invite links).
   ============================================================================= */

export const CRYPTO_FALLBACK_ENABLED = false;

export interface CryptoInvoice {
  invoiceUrl: string;
  invoiceId: string;
}

/* Outline only — uncomment and complete if you deliberately enable crypto.

import crypto from "node:crypto";

export async function createCryptoInvoice(params: {
  priceUsd: number;
  orderId: string;
  successUrl: string;
}): Promise<CryptoInvoice> {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  if (!apiKey) throw new Error("NOWPAYMENTS_API_KEY not set");

  const res = await fetch("https://api.nowpayments.io/v1/invoice", {
    method: "POST",
    headers: { "x-api-key": apiKey, "content-type": "application/json" },
    body: JSON.stringify({
      price_amount: params.priceUsd,
      price_currency: "usd",
      order_id: params.orderId,
      success_url: params.successUrl,
    }),
  });
  if (!res.ok) throw new Error(`NOWPayments invoice failed: ${res.status}`);
  const data = await res.json();
  return { invoiceUrl: data.invoice_url, invoiceId: String(data.id) };
}

// Verify a NOWPayments IPN callback. Fails closed, like the Whop verifier.
export function verifyNowPaymentsIpn(rawBody: string, signature: string, ipnSecret: string): boolean {
  // NOWPayments: HMAC-SHA512 over the JSON body with keys sorted alphabetically.
  const sorted = JSON.stringify(sortKeysDeep(JSON.parse(rawBody)));
  const expected = crypto.createHmac("sha512", ipnSecret).update(sorted).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, k) => {
        acc[k] = sortKeysDeep((value as Record<string, unknown>)[k]);
        return acc;
      }, {});
  }
  return value;
}

*/
