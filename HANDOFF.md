# HANDOFF — The Props Desk

This site is **deployed-ready and production-grade**, but it is **not** "100% done
and live," and this document is honest about why. Everything buildable without the
client's private accounts is finished and verified. Everything that needs the
client's own identity/accounts is wired but **env-gated and marked
UNTESTED-PENDING-CLIENT**. Drop in the values below and ship.

---

## TL;DR completion status

- ✅ **Built + verified:** the whole front-end (1:1 with the approved demo, screenshot-
  verified), 4 legal pages + 404, SEO (sitemap/robots/OG/favicon), the typed content
  system, the Whop webhook verifier (23 unit tests, codex-reviewed), env-gating,
  accessibility, clean production build, zero console errors.
- 🟡 **Wired but UNTESTED-PENDING-CLIENT:** Whop checkout links + webhook (need the
  client's Whop account), live Telegram delivery, any real end-to-end payment.
- 🔴 **Only the client can do:** the checklist below.

A correct ~90% you can trust beats a fake 100%. The remaining ~10% is genuinely
gated on the client's accounts, not on engineering.

---

## The client-gated checklist (the ~7 things only the client can do)

| # | Task | Why only the client can do it | Maps to |
|---|---|---|---|
| 1 | **Create a Whop account + seller profile**, complete KYC + connect a payout bank | Whop requires the client's legal identity + bank; controls the money | `whop.com` dashboard |
| 2 | **Create the products/plans** in Whop (Day, Week, Monthly, Props Pro, Coaching) and copy each **checkout link** | Links are unique to the client's Whop products | `NEXT_PUBLIC_WHOP_CHECKOUT_*` |
| 3 | **Connect the private Telegram channel** to Whop (Whop's native integration auto-adds/removes buyers) | Needs the client's Telegram channel + admin rights | Whop ↔ Telegram setting |
| 4 | **Create a Whop webhook** → copy the signing secret | Secret is generated in the client's Whop dashboard | `WHOP_WEBHOOK_SECRET` |
| 5 | **Replace placeholder content** with real tracked record, prices, testimonials, brand | It's the client's real, third-party-tracked data | `config/site.ts` (see PLACEHOLDERS.md) |
| 6 | **Have an attorney review** the 4 legal pages and confirm governing law + entity | Legal sign-off; not something to fake | `app/{terms,disclaimer,refunds,responsible-gaming}` |
| 7 | **Point the domain** + run one real test purchase end-to-end | Needs the live Whop account + domain DNS | Vercel domains + Whop |

After 1–7: set `site.showPreviewBanner = false` in `config/site.ts`, redeploy, done.

---

## Environment variable map

Copy [`.env.example`](.env.example) → `.env.local` and fill in. **Never commit `.env.local`.**
In Vercel, add these under Project → Settings → Environment Variables.

| Variable | Public? | Purpose | Without it |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | canonical URLs, sitemap, OG | falls back to `site.url` |
| `NEXT_PUBLIC_WHOP_CHECKOUT_DAY` | yes | Day pass checkout | CTA → `#pricing` placeholder |
| `NEXT_PUBLIC_WHOP_CHECKOUT_WEEK` | yes | Week checkout | same |
| `NEXT_PUBLIC_WHOP_CHECKOUT_MONTH` | yes | Monthly checkout | same |
| `NEXT_PUBLIC_WHOP_CHECKOUT_PROPS` | yes | Props Pro checkout | same |
| `NEXT_PUBLIC_WHOP_CHECKOUT_COACHING` | yes | Coaching CTA | same |
| `NEXT_PUBLIC_FREE_CHANNEL_URL` | yes | free Telegram link | "Join free" → `#pricing` |
| `WHOP_WEBHOOK_SECRET` | **no (secret)** | verify incoming webhooks | `/api/whop/webhook` returns 503 (never crashes) |
| `WHOP_API_KEY`, `WHOP_APP_ID` | no | optional, for future server-side confirmation | not required for base build |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` *or* `NEXT_PUBLIC_GA_MEASUREMENT_ID` | yes | analytics (off by default) | no analytics loaded |

`NOWPAYMENTS_*` are for the documented crypto fallback only — leave blank unless you
deliberately enable it (see `lib/payments-crypto.ts`).

---

## The Whop webhook (UNTESTED-PENDING-CLIENT)

- Endpoint: `POST /api/whop/webhook`. Health check: `GET /api/whop/webhook` returns
  `{ configured: true|false }` without leaking the secret — use it to verify deploy.
- It verifies the **Standard Webhooks** signature (Whop's scheme) in
  [`lib/whop.ts`](lib/whop.ts): HMAC-SHA256, base64 secret, `v1,` signatures,
  constant-time compare, replay/timestamp protection. It **fails closed** — a bad or
  missing signature is never processed.
- It is **unit-tested** (`lib/whop.test.ts` + `app/api/whop/webhook/route.test.ts`,
  23 tests) and **independently reviewed by codex**, but it has **not** been run
  against a real Whop delivery because that needs the client's account. Mark it tested
  only after you see a real event verify in the logs.
- **Delivery of access** (adding the buyer to Telegram) is handled by **Whop's own
  Telegram integration** — the webhook is where you'd later confirm access, store
  receipts, or notify the owner. That fulfillment logic is intentionally a documented
  seam, not invented.
- **Idempotency caveat (important for production):** the route has a best-effort
  in-memory dedupe on `webhook-id`, but Vercel runs multiple stateless instances, so
  it is **not** a cross-instance guarantee. Before wiring real fulfillment that must
  run exactly once, back it with a durable store (Vercel KV / Redis / a DB unique
  constraint on `webhook-id`). The seam is marked in `route.ts`.
- To swap in Whop's official SDK instead of the hand-rolled verifier: replace the
  `verifyWhopWebhook(...)` call with `whopSdk.webhooks.unwrap(rawBody, { headers })`
  (`@whop/api`, secret base64-encoded). The rest of the route is unchanged.

---

## Deploy steps

The app is build-ready (`npm run build` passes clean). To deploy on Vercel:

```bash
# one-time
npm i -g vercel
vercel link                 # link to a Vercel project (interactive)

# add env vars (or via the Vercel dashboard)
vercel env add WHOP_WEBHOOK_SECRET production
# ...repeat for each NEXT_PUBLIC_WHOP_CHECKOUT_* etc.

# deploy
vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard for automatic deploys on push
(recommended). Framework preset auto-detects **Next.js**; no special build config
needed. After deploy, set the Whop webhook URL to
`https://<your-domain>/api/whop/webhook`.

> Vercel was **not** auto-deployed from here because this environment isn't
> authenticated to the client's Vercel account. The build is verified locally; the
> commands above are the exact one-time setup.

---

## How to swap placeholders (5 minutes)

1. Open [`config/site.ts`](config/site.ts) — it's one typed file with every value.
2. Replace per [`PLACEHOLDERS.md`](PLACEHOLDERS.md) (🔴 first).
3. Put Whop links + secret in `.env.local` / Vercel env.
4. Attorney signs off on the legal pages.
5. `site.showPreviewBanner = false`.
6. `npm run build` → deploy.

---

## Decision log (calls made while building unattended)

- **Fonts via Google Fonts `<link>`** (not `next/font`) to keep the approved CSS
  verbatim (it references the exact family names). Migrating to `next/font` is an
  optional perf win that would require porting font-family refs to CSS vars.
- **Plain CSS in `app/globals.css`**, ported byte-for-byte from the demo. No Tailwind
  (design parity is a hard constraint).
- **Whop checkout links are `NEXT_PUBLIC_`** because they're public URLs rendered into
  anchors; only the webhook secret is server-only.
- **Unconfigured CTAs fall back to `#pricing`** (a harmless anchor) rather than a dead
  `#`, and the PREVIEW banner explains the sample state. Honest over fake.
- **Webhook fails closed + returns 503 when unconfigured** so a missing secret is a
  clear state, never a crash, and never a fail-open.
- **Added a best-effort in-memory idempotency guard** after codex flagged replay; the
  durable-store requirement for production is documented above rather than faked.
- **Legal pages are real drafts with a visible "review" banner** — substantive, but
  explicitly not a substitute for the client's attorney.
