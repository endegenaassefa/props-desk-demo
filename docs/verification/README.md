# Visual parity verification

Screenshots captured from the running production build (`npm start`) with the
headless browser, on 2026-06-27. The app was compared section-by-section against the
approved demo (`docs/legacy-demo.html`).

| File | What it shows |
|---|---|
| `home-desktop.png` | Home hero + terminal + count-up stat strip (1280px) |
| `legacy-home-desktop.png` | The same view in the original demo — for side-by-side parity |
| `board.png` | Today's board (HIT / LIVE / MISS cards, live climbing stat) |
| `record.png` | Tracked record table + monthly units bars (count-ups settled) |
| `pricing.png` | Pricing tiers + featured Monthly + coaching bar |
| `faq-open.png` | FAQ accordion, first item expanded |
| `home-mobile.png` | Home hero at 375px (single column, nav links collapse) |
| `tablet-pricing.png` | Pricing at 768px (tiers collapse to a 2-column grid) |
| `legal-terms.png` | Terms of Service page (draft-for-review banner) |
| `not-found.png` | Branded 404 |
| `og-image.png` | The generated Open Graph / Twitter social card (1200×630) |

Result: **hero and record are pixel-identical** to the demo; board, pricing, FAQ,
mobile, legal, and 404 all render correctly. FAQ accordion toggles with correct
`aria-expanded`. A clean home load produces **zero console errors** and no failed
network requests. The 404 route returns HTTP 404.

These are static evidence, not a substitute for the client's own QA after real
content + Whop links are dropped in.
