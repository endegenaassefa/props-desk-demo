# SCOPE — systematized from the client intake transcript

This is the single map of everything discussed, sorted so we can see exactly what
"deliver the $600 website and get paid" actually requires vs. what's a separate
future project. Built from the real intake recording.

Attribution matters below: **[CLIENT]** = what the picks guy said he wants;
**[TEAM]** = what we pitched on top; **[DECISION]** = not settled yet, blocks delivery.

---

## 1. The client (real facts, from his own words)

- **Positioning (use this — it's gold):** "I'm a **professional sports consultant, not a bettor**. I study players, leagues, coaches, and referees." A bettor throws 5–10 plays a day; he reads situational matchups (who's hurt, who's matching up, the refs, the lines/patterns).
- **Vibe / why:** "I'm not in it for the money — I want to help people elevate / supplement income because the economy is hard." Low-key, helper energy.
- **Background:** athletics — ran track (100/200/400) at **Ole Miss**. ~34. Sports betting seriously **8 years**.
- **Expertise:** **NBA player props + tennis (ATP/WTA)**. "I don't pick teams. I only bet superstar players — I know who performs and how much, from patterns/trends." (Football was floated by us as a package; it is NOT his core. → DECISION below.)
- **Claim:** **89% win rate**; big tennis months ($50K in Feb 2023), "regular" $2–3K/wk, one $42K week. ⚠️ see Integrity flag #2.
- **Audience:** **127 Telegram subs** (~30 paying), zero ads, all word-of-mouth (meets people at casinos). 8,000 DMs last month.
- **Proof he already has:** **1,379 photos + 150 videos** of tracked picks in Telegram; members see full history after joining. Real client quotes exist ("you helped me turn $100 into $1,000"; a member vouching for him to a stranger on the spot).
- **Other businesses (context, not the picks site):** box-truck company "Baker's Interstate" (MS), licensed cannabis dispensary + restaurant, "Anakin" merch/clothing line, past music/tour management.
- **Brand/entity:** goes by **"B" / "J. Baker"**, business name possibly **"Sports Money Games (Inc.)"**. → DECISION: confirm the brand name. (Demo currently uses placeholder "THE PROPS DESK".)

---

## 2. THE $600 WEBSITE — the actual paid deliverable

What he literally bought: a premium trust-building **sales/landing site** that shows who he is + his proof, presents the offers, and **drives buyers to pay → auto-deliver private, non-shareable Telegram/Discord access + auto receipt**, with legal protection.

**Status: ~90% built** (it's done, on `main`, screenshot-verified). What's already done:
hero + live prop terminal, tracked-record table + chart, board, pricing tiers, testimonials, FAQ, legal pages (Terms/Disclaimer/Refund/Responsible-Gaming), 404, SEO, the Whop webhook (verify + auto-access seam), the typed content system, all gates green.

**What's left for the site is NOT code — it's 4 decisions + his real content + deploy** (see §3, §4, §7).

---

## 3. OPEN DECISIONS that block delivery (this is the real critical path)

| # | Decision | Options | Recommendation |
|---|---|---|---|
| D1 | **Payment method** | [CLIENT] Venmo/Zelle/cards · [TEAM] Stripe · [RESEARCH] **Whop** | **Whop.** It's the only one that does picks + recurring + **auto private-Telegram/Discord delivery + anti-resharing**. ⚠️ Venmo/Zelle can't automate or recur. Stripe freezes picks money. **You cannot give him both "Venmo/Zelle" AND the "auto-invite/auto-kick" he wants — pick.** |
| D2 | **Delivery platform** | [CLIENT] Telegram (has 127 subs) · [TEAM] Discord (role-gated by sport, community, live streams) | Either works — **Whop auto-assigns roles on BOTH Telegram and Discord.** Recommend: keep Telegram for OG subs, add Discord for new/coaching/live. No extra build if Whop drives it. |
| D3 | **Brand name** | "Sports Money Games", his name, or new | Confirm one. Drives all site copy/metadata. |
| D4 | **Pricing + tiers** | his numbers vs the package idea | His real prices: Day $10 / **Week $30** (demo has $35) / Month $100 (OG grandfathered) / Props Pro $150 / **Coaching $500/mo** (demo has $1,500). [TEAM] add a high-ticket tier + per-sport packages (NBA / Tennis / [Football?]) with an "all-access" option. Confirm the ladder. |
| D5 | **The 89% positioning** | lead with it vs. anchor it | ⚠️ Integrity flag #2 — keep 89% as HIS claim but lead with the verifiable receipts (incl. losses), not the hero number. Delicate client conversation. |

---

## 4. CONTENT to drop in (ready-to-use, drafted from the transcript)

Most of his "questionnaire/bio" is already answered in the recording. Ready to drop into `config/site.ts` the moment D1–D5 are settled (~1 hr of work):

- **Bio (draft):** "I'm a professional sports consultant, not a bettor. I study players, leagues, coaches, and referees, and I read the situational matchups most people miss. I ran track — the 100, 200, and 400 — at Ole Miss, and I've done this seriously for eight years. My lane is NBA player props and tennis, ATP and WTA. I'm not in it for the money; I run a few businesses. I do this because earning is hard right now and I'd rather help people supplement income with a disciplined read than sell hype."
- **Sports:** lead **NBA + tennis** (his real lane). Decide whether to keep NFL/football (aspirational).
- **Proof:** use his **1,379 real pick photos** for the record + screenshots (pick the dated wins/losses). Real testimonials from his actual clients.
- **Still needed FROM him:** confirmed brand, final prices, the per-sport tracked numbers (W–L, units, ROI — ideally exported), 3–5 real dated testimonials (with consent), socials/Telegram links.

---

## 5. UPSELLS — separate paid projects, NOT part of the $600 (don't fold into the timeline)

Your team explicitly told him these cost "way more than $600," "$3–4K+," "2 weeks+." They are real revenue but they are NOT required to deliver the website or get paid for it:

1. **AI automation suite** — AI sales agent that answers DMs across IG/Snap/etc., funnels + converts leads, owner dashboard (revenue, signups, conversations). [TEAM est: 2 weeks, $3–4K+.]
2. **Social content package** — shoot/edit/post his lifestyle content, one video → all platforms (TikTok/IG/Threads/YT Shorts/Snap). Monthly retainer. ⚠️ Integrity flag #4.
3. **Discord community build** — role-gated server by sport package, live trades, community. Separate from the $600.
4. **Other websites** — Anakin clothing brand, cannabis dispensary, box-truck company. Each its own site.
5. **Looksmaxing app** (facial-biometrics) — different product, complex, separate.
6. **AI sports-prediction model** — train an AI on his 1,379 past picks to mimic his pattern read. Speculative/hard; the partner is excited but it's R&D, not a deliverable. Don't promise it.
7. **High-ticket coaching offer design** ($1,500–$10K) — packaging + sales, ties to D4.

---

## 6. SEPARATE VENTURE (not this client) — "Follow the Vibe"

The transcript also contains a different project: an underground pop-up **event series** (music/culture, "leave no trace," 30–75 people, LA/Burbank, sponsorships, roles: ops lead, content lead "Abi", sponsorship/partnerships lead = you). This is **not** the picks client's website. Parked here so it's not lost — needs its own scope doc if/when we pursue it.

---

## 7. INTEGRITY FLAGS (protect the client and us)

1. **Payment truth:** Venmo/Zelle = no automation + against their TOS for this; Stripe = freeze/seizure risk for handicapping; **Whop = the fit.** His payment preference conflicts with his automation want (D1).
2. **89% is a scam-trigger to cold traffic** (legit handicappers ~54–57%; >60% reads as fake). It's his identity, so anchor it in verifiable, loss-inclusive receipts — don't make the big % the hero. Client-education needed.
3. **Do NOT fabricate testimonials.** The recording floated "we can generate testimonials" — that's an FTC violation and a trust bomb. He has 1,379 real receipts + real client quotes. Use only those.
4. **Luxury-flex belongs on his personal IG, not the picks site.** Research: flex imagery lowers trust for COLD sports-betting traffic on the site. Keep the site proof-led; luxury content is a marketing-channel tactic, not site design.

---

## 8. THE ESTIMATE — to deliver the $600 site and get paid

**Engineering left is small. The blockers are the 5 decisions + his account/content, not code.**

| Payment path (D1) | My work left on the site | Auto invite/kick? | Recurring? | Risk |
|---|---|---|---|---|
| **Whop** (recommended; already built) | **~3–4 hrs** (drop content + wire his links/secret) | ✅ Telegram or Discord | ✅ | low — needs his acct + KYC |
| Venmo/Zelle (his pref) | ~3–5 hrs (manual flow) | ❌ manual add/remove | ❌ | TOS risk; loses the automation he wants |
| Stripe (team floated) | ~8–12 hrs (+ custom invite bot) | ✅ via custom bot | ✅ | HIGH freeze risk |

- **My total work, Whop path:** ~4–5 hrs core + your appearance changes (TBD, ~2–5 hrs) + deploy/QA (~1–2 hrs) = **~6–9 focused hours**, most of it fast and most of it waiting on his inputs.
- **Calendar to delivered + paid:** **2–4 days if he moves fast** (gated by his Whop KYC, 1–5 business days). **1–2 weeks** if D1–D5 drag or content/legal/domain stall.
- **The "way more" (§5):** separate $-projects, weeks each. NOT part of getting paid for the website.

**Billing move:** deliver the $600 site, collect the $600, quote §5 as separate SOWs. Don't hold your $600 hostage to the big vision or his KYC.
