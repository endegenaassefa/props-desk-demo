import crypto from "node:crypto";

/**
 * Whop webhook signature verification.
 *
 * Whop delivers webhooks using the Standard Webhooks spec (https://standardwebhooks.com),
 * the same scheme Svix uses. This module verifies a delivery WITHOUT pulling in
 * the Whop SDK, so it has zero runtime dependencies and is trivially testable.
 *
 * Scheme (confirmed against docs.whop.com/developer/guides/webhooks):
 *   headers:  webhook-id, webhook-timestamp (unix seconds), webhook-signature
 *   secret:   base64, optionally prefixed with "whsec_"
 *   signed:   `${id}.${timestamp}.${rawBody}`
 *   sig:      base64( HMAC_SHA256(base64-decoded secret, signed) )
 *   header:   space-separated list of `v1,<base64sig>` entries
 *
 * SECURITY: this verifier FAILS CLOSED. Any missing header, bad timestamp, or
 * non-matching signature returns { valid: false }. The caller must not process
 * an event unless valid === true.
 *
 * To swap in Whop's official SDK later, replace the call site with
 * `whopSdk.webhooks.unwrap(rawBody, { headers })` — see HANDOFF.md.
 */

export interface WhopVerifyResult {
  valid: boolean;
  /** Machine-readable reason a delivery was rejected (never includes secrets). */
  reason?: string;
}

export interface WhopVerifyOptions {
  /**
   * Maximum allowed age (and future skew) of the webhook timestamp, in seconds.
   * Defaults to 300 (5 minutes) per the Standard Webhooks spec for replay
   * protection. Set to 0 to disable the timestamp check entirely — only do this
   * if you knowingly accept replays (NOT recommended).
   */
  toleranceSeconds?: number;
  /** Injectable "now" in ms, for deterministic tests. Defaults to Date.now(). */
  nowMs?: number;
}

const SIGNATURE_VERSION = "v1";

/**
 * Parse a Standard Webhooks secret into raw key bytes. Accepts an optional
 * `whsec_` prefix; the remainder is base64.
 */
export function parseWhopSecret(secret: string): Buffer {
  const trimmed = (secret ?? "").trim();
  const b64 = trimmed.startsWith("whsec_") ? trimmed.slice("whsec_".length) : trimmed;
  return Buffer.from(b64, "base64");
}

interface WhopHeaders {
  id?: string | null;
  timestamp?: string | null;
  signature?: string | null;
}

export function verifyWhopWebhook(
  rawBody: string,
  headers: WhopHeaders,
  secret: string,
  options: WhopVerifyOptions = {}
): WhopVerifyResult {
  const { id, timestamp, signature } = headers;

  if (!id || !timestamp || !signature) {
    return { valid: false, reason: "missing webhook headers" };
  }
  if (!secret) {
    return { valid: false, reason: "missing secret" };
  }

  // Replay protection: reject stale or future-dated timestamps.
  const tolerance = options.toleranceSeconds ?? 300;
  if (tolerance > 0) {
    const ts = Number(timestamp);
    if (!Number.isFinite(ts)) {
      return { valid: false, reason: "invalid timestamp" };
    }
    const nowSec = Math.floor((options.nowMs ?? Date.now()) / 1000);
    const age = nowSec - ts;
    if (age > tolerance) {
      return { valid: false, reason: "timestamp too old" };
    }
    if (age < -tolerance) {
      return { valid: false, reason: "timestamp in the future" };
    }
  }

  const key = parseWhopSecret(secret);
  if (key.length === 0) {
    return { valid: false, reason: "invalid secret" };
  }

  const signedContent = `${id}.${timestamp}.${rawBody}`;
  const expected = crypto.createHmac("sha256", key).update(signedContent, "utf8").digest("base64");
  const expectedBuf = Buffer.from(expected, "utf8");

  // The header is a space-separated list of `<version>,<signature>` entries.
  // Compare against every entry, constant-time, and accept if any matches.
  const candidates = signature
    .split(" ")
    .map((part) => {
      const comma = part.indexOf(",");
      if (comma === -1) return { version: SIGNATURE_VERSION, sig: part };
      return { version: part.slice(0, comma), sig: part.slice(comma + 1) };
    })
    .filter((c) => c.version === SIGNATURE_VERSION && c.sig.length > 0);

  const matched = candidates.some((c) => {
    const candidateBuf = Buffer.from(c.sig, "utf8");
    // timingSafeEqual throws on length mismatch — guard first so a wrong-length
    // forgery can't cause an exception (and we still avoid early-exit compares).
    if (candidateBuf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(candidateBuf, expectedBuf);
  });

  return matched ? { valid: true } : { valid: false, reason: "signature mismatch" };
}
