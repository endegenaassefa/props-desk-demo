# The Props Desk

A production-grade marketing + subscription site for a sports player-props tipster
(NBA · NFL · ATP/WTA). Built in Next.js, ported 1:1 from the approved design demo,
with Whop-powered checkout + private-Telegram delivery wired in (env-gated).

> **Status:** deployed-ready, content is placeholder, payments are wired but
> UNTESTED-PENDING-CLIENT. See [HANDOFF.md](HANDOFF.md) and [PLACEHOLDERS.md](PLACEHOLDERS.md).
> The original single-file demo is preserved at [`docs/legacy-demo.html`](docs/legacy-demo.html).

---

## What it is

A fast, dark "research-desk" one-pager whose entire job is **credibility to cold
traffic**: a live prop-board terminal, a tracked **loss-inclusive** record, count-up
stats, pricing tiers, testimonials, and FAQ — plus real legal pages and a Whop
checkout/delivery layer. The trust spine is the honest tracked record, not a hero
win-rate.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000

# production
npm run build && npm start

# quality gates
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
npm test           # node --test (Whop webhook unit tests, 23)
```

No env vars are required to run — payment CTAs fall back to a harmless anchor and the
webhook reports "not configured" until you add secrets. Copy `.env.example` →
`.env.local` to wire Whop.

## Project structure

```
app/
  layout.tsx              root shell: fonts, metadata, nav/footer, global chrome
  page.tsx                home one-pager (composes the section components)
  globals.css             the design system, ported VERBATIM from the demo
  terms|disclaimer|refunds|responsible-gaming/   legal pages (draft-for-review)
  not-found.tsx           branded 404
  robots.ts, sitemap.ts, opengraph-image.tsx, icon.svg   SEO
  api/whop/webhook/route.ts   Whop webhook (verify + fulfillment seam), env-gated
components/               Nav, Hero, Terminal, StatStrip, Board, LiveStatCell,
                         Record, HowItWorks, Pricing, Testimonials, FAQ, Closer,
                         Footer, ScrollEffects, Analytics, PreviewBanner, LegalPage
config/site.ts           ⭐ the SINGLE source of all client-specific content
lib/whop.ts              Standard Webhooks signature verification (zero-dep)
lib/whop.test.ts         + app/api/whop/webhook/route.test.ts  (23 tests)
lib/payments-crypto.ts   NOWPayments fallback — documented, not wired
docs/legacy-demo.html    the approved demo, kept for parity reference
docs/verification/       screenshot evidence of visual parity
```

## Design system

Ported verbatim — do not restyle (visual parity is a hard constraint):

- **Aesthetic:** near-black (`--ink #07080a`) research desk, signal-green accent
  (`--signal #37e493`), clay (`--clay #ff7245`) for live/loss, subtle film grain.
- **Type:** Big Shoulders Display (uppercase headlines) · Archivo (body) ·
  IBM Plex Mono (data) — loaded via Google Fonts to preserve the exact CSS.
- **Motion:** ticking ET clock, rotating prop feed, count-ups, scroll reveals,
  record-bar growth, a live climbing board stat — all re-implemented as client
  components that **respect `prefers-reduced-motion`**.

## Non-negotiable constraints (research-backed — do not undo)

1. **Payments = Whop**, never raw Stripe/PayPal (they prohibit handicapping and freeze
   funds). Crypto (NOWPayments) is the only documented fallback, not wired.
2. **Don't lead with a big win-rate.** Hit rate is a secondary stat; the tracked,
   loss-inclusive record carries trust. (The client's claimed "89%" is deliberately
   not used — a big % reads as the #1 scam tell to cold traffic.)
3. **No luxury-flex imagery.** Credibility over flash.
4. **21+ / entertainment-only** framing stays everywhere relevant.

## Verification

Production build is clean (12 routes, ~110 kB First Load JS on home). The home,
board, record, pricing, FAQ, mobile, a legal page, and the 404 were screenshot-
verified against the demo — see [`docs/verification/`](docs/verification/). The
payment code is unit-tested and independently codex-reviewed (see HANDOFF.md).

## Deploy

Build-ready for Vercel (auto-detects Next.js). One-command steps and the env-var map
are in [HANDOFF.md](HANDOFF.md).
