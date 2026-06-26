# The Props Desk — Sports-Picks Website (front-end demo)

A front-end demo for a sports-betting **player-props** tipster site (NBA · NFL · ATP/WTA tennis).
Built to close a client on a $600 build. This repo is the **front-end only** — the goal now is to
wire up real content + payments + delivery and ship it.

> **Brand name `THE PROPS DESK` is a placeholder** for the client's real personal brand.

---

## Run it locally

No build step. It's a single self-contained `index.html` (inline CSS + vanilla JS, Google Fonts via CDN).

```bash
# option A — just open it
open index.html        # or double-click

# option B — serve it (recommended; matches how we've been viewing it)
python3 -m http.server 8080
# → http://localhost:8080
```

---

## What's here

- `index.html` — the entire site (hero + live prop-board terminal, today's board, tracked-record
  table + units chart, how-it-works, pricing tiers, testimonials, FAQ, footer + legal disclaimer).
- Live touches: ticking clock, auto-rotating prop feed, count-up metrics, a climbing live in-game stat.

## Design system (keep it consistent)

- **Fonts:** `Big Shoulders Display` (uppercase headlines — athletic/varsity), `Archivo` (body),
  `IBM Plex Mono` (data/terminal).
- **Theme:** dark ink (`--ink #07080a`), warm cream text, single signal-green accent (`--signal #37e493`),
  clay (`--clay`) for losses/misses. CSS variables live in `:root`.
- **Direction:** "research desk," NOT a neon capper site. This is intentional — see constraints below.

---

## Everything that's a PLACEHOLDER (swap with real client info)

Look for the `PREVIEW · sample data` strip and HTML comments. Replace:

- Brand name `THE PROPS DESK` → client's real brand.
- The record numbers (`+106.7u`, `414–326`, `+9.4%`, the per-sport table, the monthly bars).
- The prop board cards + the rotating terminal `POOL` array (sample players/lines).
- Testimonials (the `[Member]` quotes).
- About/origin copy (we collect this via the client questionnaire + a 2-min voice intro).
- Pricing — confirm with client (currently Day $10 / Week $35 / Monthly $100 / Props Pro $150 / Coaching $1,500+).
- All `#` links (socials, Telegram, contact, legal pages).

---

## Next steps to make it real (the actual remaining work)

1. **Swap in real content** from the client's questionnaire answers.
2. **Payments + delivery — use WHOP.** ⚠️ Critical: **Stripe and PayPal prohibit sports-picks/handicapping
   and will freeze funds.** Whop *explicitly allows* picks businesses and natively does checkout +
   subscriptions + **auto private-Telegram delivery + anti-resharing**. Wire each pricing CTA to the
   client's Whop product/checkout. Crypto (NOWPayments) is the documented fallback.
   - Note: Whop is not a liability shield — seller still owns chargebacks; keep refund terms clear.
3. **Verifiable record:** link/embed a real tracked record (Pikkit `BookSync` or Betstamp public profile)
   that shows wins **and** losses. This is the trust spine.
4. **Legal pages:** real Terms / Disclaimer / Refund + 21+ / responsible-gambling. The footer already has
   the entertainment-only disclaimer language to expand.
5. **Deploy** (Vercel/Netlify, static) once content + Whop links are in.

---

## Hard constraints (research-backed — do NOT undo these)

- **Don't lead with the "89% win rate."** Believable handicapper rates are ~54–57%; a big % reads as the
  #1 scam tell to cold traffic. Lead with the *tracked, loss-inclusive record* instead.
- **No luxury-flex imagery** (cars/cash/watches) on this site — it lowers trust for cold sports-betting
  traffic. (Fine for the client's personal IG, not here.)
- **Don't promise Stripe/PayPal** for payments (see step 2).

---

## Status

Front-end demo, ready for content + payment wiring. Client docs (proposal, questionnaire) live outside
this repo. Built with research grounded in real competitor sites (DubClub, Betstamp, WagerTalk).
