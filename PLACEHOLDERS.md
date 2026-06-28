# PLACEHOLDERS — what to swap before launch

Every client-specific value lives in **one file: [`config/site.ts`](config/site.ts)**
(plus a few Whop links in env vars). Nothing else needs editing for a content
swap. The on-site **PREVIEW · sample data** banner stays up until you flip
`site.showPreviewBanner` to `false` (do that last, once everything below is real).

Legend: 🔴 = must be real before launch (credibility/legal/▶money) · 🟡 = recommended · 🟢 = optional.

---

## 1. Brand & identity — `config/site.ts`

| Field | Shows up on | Replace with | Pri |
|---|---|---|---|
| `site.brand` | nav + footer logo (uppercased) | Real brand name | 🔴 |
| `site.brandPlain` | metadata, OG image, page titles | Brand name in normal case | 🔴 |
| `site.legalEntity` | © line + all legal pages | Legal business name (LLC, etc.) | 🔴 |
| `site.domain` | metadata fallback | Real domain | 🟡 |
| `site.url` ← `NEXT_PUBLIC_SITE_URL` | canonical URLs, sitemap, OG | Production URL (set in Vercel) | 🔴 |
| `site.showPreviewBanner` | the top "PREVIEW · sample data" strip | `false` — only after all 🔴 done | 🔴 |

## 2. The tracked record (the trust spine) — `config/site.ts`

> ⚠ Constraint: this is the single most important credibility asset. It must be
> **real and third-party tracked**. Do not inflate. See `bio`/hit-rate note below.

| Field | Shows up on | Replace with | Pri |
|---|---|---|---|
| `site.stats[]` | hero count-up strip (net units, ROI, record, hit rate, CLV) | Real tracked figures | 🔴 |
| `site.record.rows[]` | the ledger table (per-sport W–L, units, ROI) | Real per-market record incl. **losses** | 🔴 |
| `site.record.bars[]` | monthly units chart (red = down month) | Real monthly results, keep the down months | 🔴 |
| `site.record.badge` | "Third-party tracked" pill | Name the tracker (e.g. "Verified by Pikkit") | 🟡 |

> ⚠ **Do NOT lead with the 89% win rate.** Hit rate stays a *secondary* stat
> (~54–57% is believable; a big % reads as a scam to cold traffic). The trust
> comes from the loss-inclusive record, not a hero number. Keep it that way.

## 3. Today's board (sample slate) — `config/site.ts`

These are illustrative and labeled "// sample slate". They can stay as a styled
sample (the PREVIEW banner covers it), or you can refresh them to a recent real
slate for the screenshot. They are **not** wired to live data.

| Field | Shows up on | Replace with | Pri |
|---|---|---|---|
| `site.board.plays[]` | the 6 board cards (HIT/LIVE/MISS) | A representative real slate, or leave as sample | 🟡 |
| `site.feedPool[]` | the hero terminal's rotating feed | Same | 🟢 |

## 4. Pricing & checkout — `config/site.ts` + env

| Field | Shows up on | Replace with | Pri |
|---|---|---|---|
| `site.pricing.tiers[].price` / `.per` / `.name` / `.hook` | the 4 pricing cards | Real plan names + prices | 🔴 |
| `site.pricing.coaching.*` | the coaching bar | Real coaching offer + price | 🟡 |
| `NEXT_PUBLIC_WHOP_CHECKOUT_DAY` | "Get the day" CTA | Whop checkout link for the day pass | 🔴▶ |
| `NEXT_PUBLIC_WHOP_CHECKOUT_WEEK` | "Get the week" CTA | Whop checkout link | 🔴▶ |
| `NEXT_PUBLIC_WHOP_CHECKOUT_MONTH` | "Subscribe" CTA | Whop checkout link | 🔴▶ |
| `NEXT_PUBLIC_WHOP_CHECKOUT_PROPS` | "Go Pro" CTA | Whop checkout link | 🔴▶ |
| `NEXT_PUBLIC_WHOP_CHECKOUT_COACHING` | "Apply" CTA | Whop checkout link (or form) | 🟡▶ |
| `NEXT_PUBLIC_FREE_CHANNEL_URL` | "Join the free channel →" | Free Telegram invite link | 🟡▶ |

(▶ = lives in env, requires the client's Whop account — see HANDOFF.md.)
Until set, each CTA falls back to a harmless `#pricing` anchor.

## 5. Testimonials — `config/site.ts`

| Field | Shows up on | Replace with | Pri |
|---|---|---|---|
| `site.proof.testimonials[]` | the 3 quote cards | **Real, dated** member quotes (with consent) | 🔴 |

Current values are `[Member]` placeholders with `DJ/RM/KT` initials. Use real
first-name-or-initial + month. Fake testimonials are both a trust killer and an
FTC problem — only use real ones.

## 6. Contact & socials — `config/site.ts`

| Field | Shows up on | Replace with | Pri |
|---|---|---|---|
| `site.contact.email` | legal pages, mailto links | Real support email | 🔴 |
| `site.contact.telegram` / `.x` / `.instagram` | reserved for footer/social | Real handles | 🟢 |

## 7. Copy you may want to tweak — `config/site.ts`

🟢 All optional — the demo copy is good defaults: `site.hero.*`, `site.bio`,
`site.how.steps[]`, `site.faq.items[]`, `site.closer.*`, `site.footer.tagline`,
and the per-section eyebrows/headings (`site.board.heading`, etc.).

## 8. SEO / metadata — `config/site.ts`

🟡 `site.seo.title`, `site.seo.description`, `site.seo.ogTitle/ogSubtitle`. The OG
image at [`app/opengraph-image.tsx`](app/opengraph-image.tsx) reads brand + stats
automatically; restyle only if you want.

## 9. Legal pages — `app/{terms,disclaimer,refunds,responsible-gaming}/page.tsx`

🔴 Real, substantive drafts are in place but each carries a **"Draft for review"**
banner. The client's attorney must review and finalize (governing law, entity
name, refund specifics) before launch. Most variable bits already pull from
`config/site.ts` (entity, email, responsible-gaming line).

---

## Quick swap recipe

1. Edit `config/site.ts` top-to-bottom, replacing 🔴 then 🟡 values.
2. Put the Whop links + secret in `.env.local` (copy from `.env.example`).
3. Have the attorney sign off on the four legal pages.
4. Set `site.showPreviewBanner = false`.
5. `npm run build` → deploy. Done.
