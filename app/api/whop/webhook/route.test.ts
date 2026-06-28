import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { POST, GET } from "./route";

const RAW_KEY = crypto.randomBytes(24);
const SECRET = "whsec_" + RAW_KEY.toString("base64");

function nowSec(): number {
  return Math.floor(Date.now() / 1000);
}

function sign(id: string, ts: string, body: string): string {
  const s = crypto.createHmac("sha256", RAW_KEY).update(`${id}.${ts}.${body}`, "utf8").digest("base64");
  return `v1,${s}`;
}

function makeRequest(
  body: string,
  opts: { id?: string; ts?: string; sig?: string } = {}
): Request {
  const id = opts.id ?? "msg_1";
  const ts = opts.ts ?? String(nowSec());
  const signature = opts.sig ?? sign(id, ts, body);
  return new Request("https://example.com/api/whop/webhook", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "webhook-id": id,
      "webhook-timestamp": ts,
      "webhook-signature": signature,
    },
    body,
  });
}

beforeEach(() => {
  process.env.WHOP_WEBHOOK_SECRET = SECRET;
});

test("POST returns 503 when no secret is configured (env-gated, fail closed)", async () => {
  delete process.env.WHOP_WEBHOOK_SECRET;
  const res = await POST(makeRequest(JSON.stringify({ action: "payment.succeeded" })));
  assert.equal(res.status, 503);
});

test("POST returns 200 on a correctly signed event", async () => {
  const body = JSON.stringify({ action: "payment.succeeded", data: { id: "pay_1" } });
  const res = await POST(makeRequest(body, { id: "msg_valid_1" }));
  assert.equal(res.status, 200);
  const json = (await res.json()) as { ok: boolean };
  assert.equal(json.ok, true);
});

test("POST returns 401 on a tampered body", async () => {
  const body = JSON.stringify({ action: "payment.succeeded" });
  const signed = makeRequest(body, { id: "msg_tamper" });
  const tampered = new Request(signed.url, {
    method: "POST",
    headers: signed.headers,
    body: body + " ",
  });
  const res = await POST(tampered);
  assert.equal(res.status, 401);
});

test("POST returns 400 on signed JSON that is null (not an object)", async () => {
  const res = await POST(makeRequest("null", { id: "msg_null" }));
  assert.equal(res.status, 400);
});

test("POST returns 400 on signed JSON that is an array", async () => {
  const res = await POST(makeRequest("[1,2,3]", { id: "msg_arr" }));
  assert.equal(res.status, 400);
});

test("POST is idempotent: a duplicate webhook-id is acknowledged but not reprocessed", async () => {
  const body = JSON.stringify({ action: "payment.succeeded", data: { id: "pay_dup" } });
  const id = "msg_dup_" + nowSec();
  const r1 = await POST(makeRequest(body, { id }));
  const r2 = await POST(makeRequest(body, { id }));
  const j1 = (await r1.json()) as { ok: boolean; duplicate?: boolean };
  const j2 = (await r2.json()) as { ok: boolean; duplicate?: boolean };
  assert.equal(r1.status, 200);
  assert.equal(r2.status, 200);
  assert.notEqual(j1.duplicate, true);
  assert.equal(j2.duplicate, true);
});

test("GET reports configured status without leaking the secret", async () => {
  const res = await GET();
  const json = (await res.json()) as { configured: boolean };
  assert.equal(json.configured, true);
  assert.ok(!JSON.stringify(json).includes(SECRET));
});
