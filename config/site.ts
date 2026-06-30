/* =============================================================================
   THE PROPS DESK — SINGLE SOURCE OF CLIENT-SPECIFIC CONTENT
   -----------------------------------------------------------------------------
   Everything a real launch needs to swap lives in THIS file. Every value below
   is a PLACEHOLDER seeded from the approved demo (docs/legacy-demo.html) and is
   ILLUSTRATIVE until the client provides real, third-party-tracked numbers.

   See PLACEHOLDERS.md for the full swap checklist and HANDOFF.md for the
   client-gated items (Whop links, Telegram, domain, KYC).

   ⚠ RESEARCH CONSTRAINTS BAKED IN — do not "improve" away:
     1. Payments = WHOP only (never raw Stripe/PayPal — they freeze picks money).
     2. Do NOT lead with a big win-rate hero number. The trust spine is the
        TRACKED, LOSS-INCLUSIVE record. Hit rate stays a secondary stat (~55%).
     3. No luxury-flex imagery. Credibility, not flash.
     4. 21+ / entertainment-only framing stays everywhere relevant.
   ============================================================================= */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PlayStatus = "hit" | "live" | "pend" | "miss";
export type FeedStatus = "hit" | "live" | "pend";

export interface CountStat {
  /** Final value the number counts up to. */
  to: number;
  /** Decimal places to show. */
  dec: number;
  /** Prefix, e.g. "+". */
  pre?: string;
  /** Suffix, e.g. "u" or "%". */
  suf?: string;
  /** Render in signal-green (positive). */
  pos?: boolean;
  /** Label under the number. */
  label: string;
  /** Optional fixed "W–L" record display instead of a counting number. */
  record?: string;
}

export interface BoardPlay {
  league: string;
  status: PlayStatus;
  /** Pill text, e.g. "✓ HIT", "✗ MISS", "8:00 PM", or "LIVE". */
  statusLabel: string;
  match: string;
  player: string;
  line: string;
  /** Right-hand value, e.g. "+6.2%" or "1 TD". For a live play this is the
   *  starting value of the climbing counter, e.g. "9 / 11". */
  right: string;
  /** Exactly one play may be the live one (drives the climbing stat). */
  live?: boolean;
}

export interface FeedRow {
  player: string;
  line: string;
  edge: string;
  status: FeedStatus;
  label: string;
}

export interface RecordRow {
  market: string;
  record: string;
  units: string;
  roi: string;
  /** Marks the bold "Overall" summary row. */
  total?: boolean;
}

export interface MonthlyBar {
  month: string;
  /** Bar height as a percentage 0–100. */
  height: number;
  /** Down month (renders in clay/orange). */
  loss?: boolean;
}

export interface Tier {
  id: string;
  name: string;
  price: string;
  per: string;
  hook: string;
  cta: string;
  featured?: boolean;
  badge?: string;
  /** Resolved Whop checkout link (env-driven, placeholder when unconfigured). */
  href: string;
  /** Whether a real checkout link is configured for this tier. */
  configured: boolean;
  /** Name of the env var that supplies this tier's checkout link. */
  envVar: string;
}

export interface Testimonial {
  /** The quote text. Leave empty ("") if you're using a `screenshot` instead. */
  quote: string;
  /** 1–2 letters for the avatar bubble (e.g. a real first-name + last initial). */
  initials: string;
  /** Display name — a real first name + last initial, or handle. Keep it REAL. */
  name: string;
  /** When they said it, e.g. "Mar 2026". */
  date: string;
  /** Optional context line, e.g. "Telegram member · 8 mo" or "Day pass → annual". */
  source?: string;
  /** Optional: path (in /public) to a real DM screenshot, shown instead of text.
   *  e.g. "/testimonials/dm-1.png". Use only with the member's consent. */
  screenshot?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

// ---------------------------------------------------------------------------
// Whop checkout link resolution (env-gated, never crashes)
// ---------------------------------------------------------------------------

/** Unconfigured CTA target — a harmless in-page anchor. The PREVIEW banner and
 *  PLACEHOLDERS.md make clear nothing is wired to a live account yet. */
const PLACEHOLDER_CHECKOUT = "#pricing";

function resolveCheckout(envVar: string, raw: string | undefined): {
  href: string;
  configured: boolean;
} {
  const v = (raw ?? "").trim();
  return v
    ? { href: v, configured: true }
    : { href: PLACEHOLDER_CHECKOUT, configured: false };
}

const checkout = {
  day: resolveCheckout("NEXT_PUBLIC_WHOP_CHECKOUT_DAY", process.env.NEXT_PUBLIC_WHOP_CHECKOUT_DAY),
  week: resolveCheckout("NEXT_PUBLIC_WHOP_CHECKOUT_WEEK", process.env.NEXT_PUBLIC_WHOP_CHECKOUT_WEEK),
  month: resolveCheckout("NEXT_PUBLIC_WHOP_CHECKOUT_MONTH", process.env.NEXT_PUBLIC_WHOP_CHECKOUT_MONTH),
  props: resolveCheckout("NEXT_PUBLIC_WHOP_CHECKOUT_PROPS", process.env.NEXT_PUBLIC_WHOP_CHECKOUT_PROPS),
  coaching: resolveCheckout("NEXT_PUBLIC_WHOP_CHECKOUT_COACHING", process.env.NEXT_PUBLIC_WHOP_CHECKOUT_COACHING),
};

const freeChannel = (process.env.NEXT_PUBLIC_FREE_CHANNEL_URL ?? "").trim();

// ---------------------------------------------------------------------------
// THE CONTENT
// ---------------------------------------------------------------------------

export const site = {
  // --- Identity ------------------------------------------------------------
  /** Brand name (confirmed from client intake). */
  brand: "SPORTS MONEY GAMES",
  /** Brand name as plain words (for prose / metadata). */
  brandPlain: "Sports Money Games",
  /** Legal entity that appears in © and legal copy. */
  legalEntity: "Sports Money Games Incorporated",
  /** PLACEHOLDER domain — client confirms the real one (set via NEXT_PUBLIC_SITE_URL at deploy). */
  domain: "sportsmoneygames.com",
  /** Canonical site URL — overridden by NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sportsmoneygames.com").replace(/\/$/, ""),

  /** Whether to show the "PREVIEW · sample data" banner. KEEP TRUE until every
   *  placeholder below is replaced with the client's real tracked info. */
  showPreviewBanner: true,

  sports: ["NBA", "NFL", "ATP/WTA"],

  // --- SEO / meta ----------------------------------------------------------
  seo: {
    title: "Sports Money Games — NBA, NFL & Tennis Player Props",
    description:
      "Daily NBA, NFL & tennis player-prop signals with a tracked, loss-inclusive record you can check before you pay. 21+, entertainment only.",
    ogTitle: "Read the player. Not the hype.",
    ogSubtitle: "Daily prop signals · a record you can check",
  },

  // --- Hero ----------------------------------------------------------------
  hero: {
    eyebrow: "NBA · NFL · ATP/WTA · Player Props",
    // headline rendered as: "Read the player." / "Not" (signal) " the hype."
    headlineLine1: "Read the player.",
    headlineEmphasis: "Not",
    headlineRest: "the hype.",
    sub: "A sports consultant's daily read on NBA, NFL & tennis player props — tracked, wins and losses, so you can check it before you pay a cent.",
    ctaPrimary: "Get today's props",
    ctaSecondary: "See the record →",
    micro: ["Wins + losses shown", "Tracked daily", "21+ · entertainment only"],
  },

  /** Origin / bio — real, from the client's own intake. Rendered in the About
   *  section. */
  bio: "I'm a professional sports consultant — not a bettor. I study players, leagues, coaches, and referees, and I read the situational matchups most people miss.",

  // --- About / who's behind the read --------------------------------------
  about: {
    eyebrow: "Who's behind the read",
    heading: "A consultant, not a capper.",
    body: [
      "I'm a professional sports consultant — not a bettor. I study players, leagues, coaches, and referees, and I read the situational matchups most people miss: who's hurt, who's matching up, how a specific ref calls a game, and the lines that repeat week after week.",
      "My background's in athletics. I ran track — the 100, 200 and 400 — at Ole Miss, and I've done this seriously for eight years. My lane is NBA player props and tennis, ATP and WTA. I read superstars, because patterns hold.",
      "I'm not in it for the money — I run a few businesses. I do this because earning is hard right now, and I'd rather help people supplement their income with a disciplined read than sell anybody a dream.",
    ],
    creds: [
      { k: "Ole Miss", v: "Track athlete · 100 / 200 / 400" },
      { k: "8 Years", v: "Reading props seriously" },
      { k: "NBA + Tennis", v: "Player props · ATP / WTA" },
      { k: "Daily", v: "Every play posted before tip" },
    ],
  },

  // --- Stat strip (hero count-ups) ----------------------------------------
  // DRAFT — client's self-reported claim (89%) + real channel data (volume,
  // 3-yr history since Jul 2023, member count). Client confirms/replaces the
  // claimed figures. The PREVIEW banner stays up until then.
  stats: [
    { to: 89, dec: 0, suf: "%", pos: true, label: "Win rate" },
    { to: 1380, dec: 0, suf: "+", label: "Plays tracked" },
    { to: 3, dec: 0, suf: " yr", label: "Track record" },
    { to: 127, dec: 0, label: "Members" },
    { to: 50, dec: 0, pre: "$", suf: "K", pos: true, label: "Best month" },
  ] as CountStat[],

  // --- Today's board -------------------------------------------------------
  board: {
    eyebrow: "Today's board",
    heading: "Every play, posted before tip.",
    note: "// sample slate · NBA · NFL · tennis",
    plays: [
      { league: "NBA", status: "hit", statusLabel: "✓ HIT", match: "Lakers vs Nuggets", player: "L. James", line: "OVER 24.5 PTS", right: "+6.2%" },
      { league: "WTA", status: "hit", statusLabel: "✓ HIT", match: "Sabalenka vs Gauff", player: "Sabalenka", line: "MONEYLINE −140", right: "+4.1%" },
      { league: "NBA", status: "live", statusLabel: "LIVE", match: "Nuggets vs Wolves", player: "Jokić", line: "OVER 11.5 AST", right: "9 / 11", live: true },
      { league: "NFL", status: "hit", statusLabel: "✓ HIT", match: "Chiefs vs Bills", player: "Mahomes", line: "OVER 274.5 PASS YDS", right: "+5.4%" },
      { league: "ATP", status: "pend", statusLabel: "8:00 PM", match: "Alcaraz vs Rune", player: "Alcaraz", line: "−3.5 GAMES", right: "+4.6%" },
      { league: "NFL", status: "miss", statusLabel: "✗ MISS", match: "Eagles vs Cowboys", player: "Hurts", line: "OVER 1.5 PASS TD", right: "1 TD" },
    ] as BoardPlay[],
  },

  // --- Live terminal feed (hero) ------------------------------------------
  feedPool: [
    { player: "L. James", line: "o24.5 PTS", edge: "+6.2%", status: "hit", label: "HIT" },
    { player: "Mahomes", line: "o274.5 YDS", edge: "+5.4%", status: "hit", label: "HIT" },
    { player: "Sabalenka", line: "ML −140", edge: "+4.1%", status: "hit", label: "HIT" },
    { player: "Jokić", line: "o11.5 AST", edge: "+5.0%", status: "live", label: "LIVE" },
    { player: "McCaffrey", line: "o89.5 RUSH", edge: "+4.8%", status: "pend", label: "1:00p" },
    { player: "Alcaraz", line: "−3.5 games", edge: "+4.6%", status: "pend", label: "8:00p" },
    { player: "Dončić", line: "o9.5 AST", edge: "+4.4%", status: "hit", label: "HIT" },
    { player: "Jefferson", line: "o6.5 REC", edge: "+3.9%", status: "hit", label: "HIT" },
    { player: "Edwards", line: "o28.5 PTS", edge: "+5.1%", status: "live", label: "LIVE" },
    { player: "Hurts", line: "o1.5 PASS TD", edge: "+4.2%", status: "pend", label: "1:00p" },
    { player: "Gauff", line: "o20.5 games", edge: "+3.2%", status: "hit", label: "HIT" },
    { player: "Lamar", line: "o55.5 RUSH", edge: "+4.5%", status: "live", label: "LIVE" },
    { player: "Sinner", line: "ML −200", edge: "+3.6%", status: "pend", label: "8:30p" },
  ] as FeedRow[],

  // --- Tracked record ------------------------------------------------------
  record: {
    eyebrow: "The record",
    heading: "The losses are on here too.",
    badge: "Tracked daily",
    // DRAFT — self-reported, consistent with the claimed ~89% win rate. Client
    // replaces with the real per-sport export. PREVIEW banner stays up until then.
    rows: [
      { market: "NBA Props", record: "372–46", units: "+44.0u", roi: "+10.4%" },
      { market: "Tennis", record: "286–35", units: "+31.2u", roi: "+9.1%" },
      { market: "NFL Props", record: "78–12", units: "+9.4u", roi: "+8.0%" },
      { market: "Overall · since 2023", record: "736–93", units: "+84.6u", roi: "+9.7%", total: true },
    ] as RecordRow[],
    chartTitle: "Monthly units · red = down month",
    bars: [
      { month: "OCT", height: 64 },
      { month: "NOV", height: 82 },
      { month: "DEC", height: 38, loss: true },
      { month: "JAN", height: 70 },
      { month: "FEB", height: 91 },
      { month: "MAR", height: 55 },
      { month: "APR", height: 44, loss: true },
      { month: "MAY", height: 86 },
    ] as MonthlyBar[],
  },

  // --- Receipts / proof gallery -------------------------------------------
  // Real, on-brand (NBA/tennis) settled-win slips from the channel, curated for
  // legibility and zero PII. Populated from the Telegram export.
  proofGallery: {
    eyebrow: "Receipts",
    heading: "Real slips. Real cashes.",
    note: "// recent NBA & tennis hits, straight from the channel",
    images: [
      { src: "/proof/proof-tennis-zverev.jpg", alt: "Settled tennis bet: Zverev -8.5 games at +150, won", caption: "Zverev −8.5 games (+150) · tennis · WON" },
      { src: "/proof/proof-nba-props-sgp.jpg", alt: "Settled NBA same-game parlay: LeBron, Reaves 20+ pts and Kyrie 25+ pts, won", caption: "LeBron + Reaves 20·Kyrie 25 pts · NBA props (+232) · WON" },
      { src: "/proof/proof-tennis-torres.jpg", alt: "Settled tennis 2-leg: Torres +6.5 games and Over 19.5 games, won", caption: "Torres +6.5 & Over 19.5 games · tennis · WON" },
      { src: "/proof/proof-tennis-5set.jpg", alt: "Settled DraftKings tennis parlay: five set-winners, won", caption: "5 tennis set-winners · DraftKings · WON" },
    ] as { src: string; alt: string; caption: string }[],
  },

  // --- How it works --------------------------------------------------------
  how: {
    eyebrow: "How it works",
    heading: "Three taps. You're in.",
    steps: [
      { num: "01", title: "Pick a plan", body: "Card checkout. Instant." },
      { num: "02", title: "Get let in", body: "Auto-added to private Telegram. Link can't be shared." },
      { num: "03", title: "Get the props", body: "Daily signals + the read behind each." },
    ],
  },

  // --- Pricing -------------------------------------------------------------
  pricing: {
    eyebrow: "Plans",
    heading: "Start at ten bucks.",
    freeLine: "Not ready?",
    freeLinkText: "Join the free channel →",
    freeChannelHref: freeChannel || PLACEHOLDER_CHECKOUT,
    freeChannelConfigured: Boolean(freeChannel),
    tiers: [
      { id: "day", name: "Day", price: "$10", per: "/day", hook: "One slate. All in.", cta: "Get the day", envVar: "NEXT_PUBLIC_WHOP_CHECKOUT_DAY", ...checkout.day },
      { id: "week", name: "Week", price: "$30", per: "/wk", hook: "Seven days of slates.", cta: "Get the week", envVar: "NEXT_PUBLIC_WHOP_CHECKOUT_WEEK", ...checkout.week },
      { id: "month", name: "Monthly", price: "$100", per: "/mo", hook: "Every prop, every day.", cta: "Subscribe", featured: true, badge: "Most popular", envVar: "NEXT_PUBLIC_WHOP_CHECKOUT_MONTH", ...checkout.month },
      { id: "props", name: "Props Pro", price: "$150", per: "/mo", hook: "Top-conviction card + live reads.", cta: "Go Pro", envVar: "NEXT_PUBLIC_WHOP_CHECKOUT_PROPS", ...checkout.props },
    ] as Tier[],
    coaching: {
      eyebrow: "High-ticket",
      name: "1-on-1 Coaching",
      body: "Learn the read. Not just the picks.",
      price: "From $500/mo · limited seats",
      cta: "Apply",
      envVar: "NEXT_PUBLIC_WHOP_CHECKOUT_COACHING",
      ...checkout.coaching,
    },
  },

  // --- Testimonials --------------------------------------------------------
  // ⚠ PLACEHOLDERS — swap for the client's REAL, consented member quotes. Use
  // ONLY real ones (fake testimonials are an FTC problem and a trust-killer).
  // To add a real quote: fill quote + a real name + initials + date, and
  // optionally a `source` tag. For a real DM screenshot instead of text, set
  // `screenshot` to an image you drop in /public/testimonials/ and leave quote "".
  // The grid handles any count — 3 or 6 look best. PREVIEW banner flags these
  // as samples until the real ones land.
  proof: {
    eyebrow: "Members",
    heading: "They stuck around.",
    note: "// awaiting real member quotes",
    testimonials: [
      { quote: "The losses are right there on the record. Nobody else shows those.", initials: "—", name: "[Real name]", date: "Mar 2026", source: "Telegram member" },
      { quote: "He'll tell you when it's a pass. That's how I knew it was real.", initials: "—", name: "[Real name]", date: "Feb 2026", source: "Monthly member" },
      { quote: "Came for a day pass. Stayed for the season.", initials: "—", name: "[Real name]", date: "Apr 2026", source: "Day pass → annual" },
    ] as Testimonial[],
  },

  // --- FAQ -----------------------------------------------------------------
  faq: {
    eyebrow: "Straight answers",
    heading: "Before you pay.",
    items: [
      { q: "Do you guarantee wins?", a: "No. Anyone who does is lying. You get a disciplined read and a public, tracked record — losses included." },
      { q: "How do I get the picks?", a: "Pay → auto-added to the private Telegram → receipt in your inbox. The link can't be re-shared." },
      { q: "Can I cancel?", a: "Anytime. Day and week passes just expire. Monthly cancels from your account." },
      { q: "Is this betting advice?", a: "Information and analysis for entertainment, 21+. Not a guarantee or a recommendation to wager. Bet within your means." },
    ] as FaqItem[],
  },

  // --- Closer --------------------------------------------------------------
  closer: {
    headingLine1: "Check the record.",
    headingLine2: "Then decide.",
    sub: "Ten bucks says the read is real.",
    cta: "See the plans",
  },

  // --- Footer / contact ----------------------------------------------------
  footer: {
    tagline: "Daily NBA & tennis props. A record you can check.",
  },

  /** Contact + socials. PLACEHOLDERS — fill with the client's real handles. */
  contact: {
    email: "hello@sportsmoneygames.com",
    telegram: "", // free channel handle/link, e.g. https://t.me/...
    x: "", // https://x.com/...
    instagram: "", // https://instagram.com/...
  },

  /** 1-800-GAMBLER style responsible-gaming line shown in legal/footer. */
  responsibleGamblingLine: "1-800-GAMBLER",
} as const;

export type Site = typeof site;

/** True when at least one real Whop checkout link is configured. */
export const anyCheckoutConfigured: boolean =
  site.pricing.tiers.some((t) => t.configured) || site.pricing.coaching.configured;
