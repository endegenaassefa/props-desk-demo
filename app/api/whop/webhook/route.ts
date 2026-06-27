import { verifyWhopWebhook } from "@/lib/whop";

// Needs the Node crypto module and the raw request body, so force the Node.js
// runtime and dynamic (uncached) handling.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Whop webhook receiver. UNTESTED-PENDING-CLIENT: this is fully written and
 * verified at the unit level (see lib/whop.test.ts), but it cannot be exercised
 * end-to-end without the client's real Whop account + WHOP_WEBHOOK_SECRET.
 *
 * Behavior:
 *   - No secret configured  → 503 "not configured" (never crashes; fails closed)
 *   - Bad/again signature   → 401 (fails closed — event is NOT processed)
 *   - Unparseable JSON       → 400
 *   - Verified event         → 200, logged, routed to a fulfillment seam
 *
 * Delivery of access (adding the buyer to the private Telegram) is handled by
 * Whop's own Telegram integration — this endpoint is where you'd later confirm
 * that access, store a receipt, notify the owner, or reconcile refunds/disputes.
 */

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** Pull only non-sensitive identifiers out of an event for logging (no PII). */
function safeMeta(event: Record<string, unknown>): Record<string, unknown> {
  const data = (event?.data ?? {}) as Record<string, unknown>;
  return {
    id: data.id ?? event.id ?? null,
    membership: data.membership ?? data.membership_id ?? null,
    user: data.user_id ?? data.user ?? null,
    plan: data.plan ?? data.plan_id ?? null,
  };
}

export async function POST(req: Request): Promise<Response> {
  const secret = process.env.WHOP_WEBHOOK_SECRET?.trim();

  // Env-gated: until the client wires their Whop webhook secret, we explicitly
  // do nothing and say so. We never process unverified events.
  if (!secret) {
    return jsonResponse(
      { ok: false, error: "Webhook not configured", hint: "Set WHOP_WEBHOOK_SECRET" },
      503
    );
  }

  // The raw body text is required to verify the signature byte-for-byte.
  const rawBody = await req.text();

  const result = verifyWhopWebhook(
    rawBody,
    {
      id: req.headers.get("webhook-id"),
      timestamp: req.headers.get("webhook-timestamp"),
      signature: req.headers.get("webhook-signature"),
    },
    secret
  );

  if (!result.valid) {
    // Do not leak which check failed to the caller; log it server-side only.
    console.warn(`[whop] rejected webhook: ${result.reason}`);
    return jsonResponse({ ok: false, error: "Invalid signature" }, 401);
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
  }

  // Whop payloads carry the event name in `action` (e.g. "payment.succeeded").
  // Fall back to `type` defensively; confirm the exact field with a real test
  // event from the Whop dashboard (see HANDOFF.md).
  const type = String(event.action ?? event.type ?? "unknown");

  switch (type) {
    case "payment.succeeded":
    case "membership.activated":
    case "membership.went_valid":
      // Buyer gained access. Whop adds them to Telegram; confirm/receipt here.
      console.info(`[whop] access granted: ${type}`, safeMeta(event));
      break;

    case "membership.deactivated":
    case "membership.went_invalid":
    case "refund.created":
    case "dispute.created":
      // Access ended or money reversed. Reconcile here.
      console.info(`[whop] access/billing change: ${type}`, safeMeta(event));
      break;

    default:
      console.info(`[whop] unhandled event: ${type}`);
  }

  // Acknowledge quickly so Whop doesn't retry. Heavy work should be queued.
  return jsonResponse({ ok: true }, 200);
}

/**
 * Lightweight health check — confirms the route is deployed and whether the
 * secret is configured, WITHOUT revealing the secret. Handy for HANDOFF
 * verification. Returns 405 semantics are intentionally avoided so a browser
 * GET gives a useful status.
 */
export async function GET(): Promise<Response> {
  const configured = Boolean(process.env.WHOP_WEBHOOK_SECRET?.trim());
  return jsonResponse(
    {
      ok: true,
      endpoint: "whop-webhook",
      configured,
      note: configured
        ? "Secret present. POST deliveries will be verified."
        : "UNTESTED-PENDING-CLIENT: set WHOP_WEBHOOK_SECRET to enable verification.",
    },
    200
  );
}
