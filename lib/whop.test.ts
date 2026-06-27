import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { verifyWhopWebhook, parseWhopSecret } from "./whop";

// --- Test helpers ------------------------------------------------------------

// A realistic Standard Webhooks secret: "whsec_" + base64(random 24 bytes).
const RAW_KEY = crypto.randomBytes(24);
const SECRET = "whsec_" + RAW_KEY.toString("base64");

const NOW_MS = 1_750_000_000_000; // fixed "now" for deterministic timestamp tests
const TS = Math.floor(NOW_MS / 1000).toString();

function sign(id: string, timestamp: string, body: string, key: Buffer = RAW_KEY): string {
  const signed = `${id}.${timestamp}.${body}`;
  const sig = crypto.createHmac("sha256", key).update(signed, "utf8").digest("base64");
  return `v1,${sig}`;
}

const BODY = JSON.stringify({ action: "payment.succeeded", data: { id: "pay_123" } });
const ID = "msg_2abc";

function goodHeaders() {
  return { id: ID, timestamp: TS, signature: sign(ID, TS, BODY) };
}

// --- parseWhopSecret ---------------------------------------------------------

test("parseWhopSecret strips the whsec_ prefix and base64-decodes", () => {
  assert.deepEqual(parseWhopSecret(SECRET), RAW_KEY);
});

test("parseWhopSecret accepts a secret with no prefix", () => {
  assert.deepEqual(parseWhopSecret(RAW_KEY.toString("base64")), RAW_KEY);
});

// --- Happy path --------------------------------------------------------------

test("accepts a correctly signed payload", () => {
  const r = verifyWhopWebhook(BODY, goodHeaders(), SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, true);
});

test("accepts when the signature header lists multiple sigs and one matches", () => {
  const headers = goodHeaders();
  headers.signature = `v1,${"A".repeat(44)} ${headers.signature}`;
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, true);
});

// --- Rejection / fail-closed paths ------------------------------------------

test("rejects a tampered body (signature mismatch)", () => {
  const r = verifyWhopWebhook(BODY + " ", goodHeaders(), SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, false);
});

test("rejects a signature made with the wrong secret", () => {
  const headers = goodHeaders();
  headers.signature = sign(ID, TS, BODY, crypto.randomBytes(24));
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, false);
});

test("rejects when any required header is missing", () => {
  for (const drop of ["id", "timestamp", "signature"] as const) {
    const headers: Record<string, string | null> = goodHeaders();
    headers[drop] = null;
    const r = verifyWhopWebhook(BODY, headers as never, SECRET, { nowMs: NOW_MS });
    assert.equal(r.valid, false, `should reject missing ${drop}`);
  }
});

test("rejects an empty secret", () => {
  const r = verifyWhopWebhook(BODY, goodHeaders(), "", { nowMs: NOW_MS });
  assert.equal(r.valid, false);
});

test("rejects a timestamp older than the tolerance (replay protection)", () => {
  const oldTs = (Math.floor(NOW_MS / 1000) - 6000).toString();
  const headers = { id: ID, timestamp: oldTs, signature: sign(ID, oldTs, BODY) };
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS, toleranceSeconds: 300 });
  assert.equal(r.valid, false);
});

test("rejects a timestamp too far in the future", () => {
  const futureTs = (Math.floor(NOW_MS / 1000) + 6000).toString();
  const headers = { id: ID, timestamp: futureTs, signature: sign(ID, futureTs, BODY) };
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS, toleranceSeconds: 300 });
  assert.equal(r.valid, false);
});

test("toleranceSeconds=0 disables the timestamp check", () => {
  const oldTs = (Math.floor(NOW_MS / 1000) - 100000).toString();
  const headers = { id: ID, timestamp: oldTs, signature: sign(ID, oldTs, BODY) };
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS, toleranceSeconds: 0 });
  assert.equal(r.valid, true);
});

test("rejects a signature of the wrong length without throwing (timing-safe guard)", () => {
  const headers = goodHeaders();
  headers.signature = "v1,tooshort";
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, false);
});

test("rejects a bare signature with no 'v1,' version prefix (spec compliance)", () => {
  // The correct HMAC, but delivered without the required "v1," prefix.
  const signed = `${ID}.${TS}.${BODY}`;
  const bare = crypto.createHmac("sha256", RAW_KEY).update(signed, "utf8").digest("base64");
  const headers = { id: ID, timestamp: TS, signature: bare };
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, false);
});

test("rejects an unknown signature version even with a valid v1 sig present is still ok", () => {
  // A v2 entry we can't verify, alongside the real v1 — should still accept.
  const good = goodHeaders();
  good.signature = `v2,${"Z".repeat(44)} ${good.signature}`;
  const r = verifyWhopWebhook(BODY, good, SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, true);
});

test("rejects a non-integer (fractional) timestamp even if correctly signed", () => {
  const fractionalTs = `${Math.floor(NOW_MS / 1000)}.5`;
  const headers = { id: ID, timestamp: fractionalTs, signature: sign(ID, fractionalTs, BODY) };
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, false);
});

test("rejects a non-numeric timestamp like '1e9' even if correctly signed", () => {
  const sciTs = "1e9";
  const headers = { id: ID, timestamp: sciTs, signature: sign(ID, sciTs, BODY) };
  const r = verifyWhopWebhook(BODY, headers, SECRET, { nowMs: NOW_MS });
  assert.equal(r.valid, false);
});
