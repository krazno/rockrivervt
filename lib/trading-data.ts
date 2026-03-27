/**
 * Static seed data for the daily swing dashboard.
 *
 * TODO(live): Replace `previousClose`, `marketOpen`, `currentPrice`, `gapPercent`
 * with values from your market data provider (Polygon, Alpaca, Yahoo, etc.)
 * — ideally in a Server Component async fetch or a small client hook that polls quotes.
 */

export type RegimeBadgeId =
  | "risk-off"
  | "energy-favored"
  | "spec-tech-caution";

export type FinalDecision = "Top 3" | "Watchlist" | "Rejected";

export type ReportRow = {
  ticker: string;
  originalRank: number;
  originalEntryRange: string;
  originalTarget: string;
  originalConfidence: number;
  finalRuling: string;
  finalDecision: FinalDecision;
};

export type RejectedPick = {
  ticker: string;
  reason: string;
};

export type SellPlan = {
  bestOnPullback: string;
  avoidChasingAbove: string;
  takePartialNear: string;
  exitRemainder: string;
};

export type TopPick = {
  rank: 1 | 2 | 3;
  ticker: string;
  companyName: string;
  thesis: string;
  whyTop3: string;
  /** Display chips on the card (Validated, Event Driven, etc.) */
  statusChips: string[];
  validatedStatus: "Validated" | "Partially Validated";
  riskLevel: "Low" | "Medium" | "High";
  holdWindow: string;
  confidence: number;
  entryZone: string;
  entryLow: number;
  entryHigh: number;
  stopLoss: string;
  stopNumeric: number;
  baseTarget: string;
  baseTargetNumeric: number;
  stretchTarget: string;
  stretchTargetNumeric: number;
  expectedGain: string;
  /** TODO(live): wire quote API */
  previousClose: number;
  /** TODO(live): wire session open from API */
  marketOpen: number;
  /** TODO(live): wire last trade / midpoint */
  currentPrice: number;
  /** TODO(live): compute from open vs prior close, or API field */
  gapPercent: number;
  idealEntry: string;
  reportEntryRange: string;
  reportExitRange: string;
  reportConfidence: number;
  auditNotes: string;
  sellPlan: SellPlan;
  /** Accent for card border / header tint */
  accent: "emerald" | "sky" | "amber";
};

export type MarketRegime = {
  headline: string;
  summary: string;
  signalBadges: string[];
  metrics: { label: string; tone: "up" | "down" | "neutral" }[];
  primaryBadges: { id: RegimeBadgeId; label: string }[];
};

export type HeroHighlights = {
  bestOverall: string;
  safestMacro: string;
  highestVolatility: string;
};

export type AuditBullet = {
  ticker: string;
  bullets: string[];
};

export type TradingDashboardData = {
  /** ISO date string for display */
  sessionDate: string;
  heroTitle: string;
  heroSubtitle: string;
  regime: MarketRegime;
  highlights: HeroHighlights;
  topPicks: TopPick[];
  rejectedPicks: RejectedPick[];
  whyCut: AuditBullet[];
  reportRows: ReportRow[];
  sidebar: {
    bestSetup: string;
    bestEntryStyle: string;
    saferTrade: string;
    highestRiskUpside: string;
    cashSuggestion: string;
    checklist: string[];
  };
};

export const tradingDashboardData: TradingDashboardData = {
  sessionDate: "2025-03-26",
  heroTitle: "Today’s 24–48 Hour Swing Dashboard",
  heroSubtitle:
    "Curated, audited shortlist for first-hour entries — one session, one plan, no noise.",
  regime: {
    headline: "Risk-off tape with oil leadership",
    summary:
      "Equities are favoring defensives and real assets while speculative tech remains fragile. Volatility is elevated but tradable; energy and selective catalyst names offer the cleanest asymmetry for a 24–48 hour window.",
    primaryBadges: [
      { id: "risk-off", label: "Risk-Off Tape" },
      { id: "energy-favored", label: "Energy Favored" },
      { id: "spec-tech-caution", label: "Speculative Tech Caution" },
    ],
    signalBadges: [
      "Breadth cautious",
      "Oil bid intact",
      "VIX firm",
      "Nasdaq lagging",
      "Energy leading",
      "Event names active",
    ],
    metrics: [
      { label: "VIX elevated", tone: "up" },
      { label: "Oil strong", tone: "up" },
      { label: "Nasdaq weaker", tone: "down" },
      { label: "Energy leading", tone: "up" },
    ],
  },
  highlights: {
    bestOverall: "APA",
    safestMacro: "COP",
    highestVolatility: "NAVN",
  },
  topPicks: [
    {
      rank: 1,
      ticker: "APA",
      companyName: "APA Corp.",
      thesis:
        "Best overall swing today with earnings support, oil tailwind, and a cleaner breakout profile.",
      whyTop3:
        "Cleanest risk/reward vs peers: confirmed beat, constructive tape in energy, and a defined range for entries.",
      statusChips: [
        "Validated",
        "Macro Tailwind",
        "Event Driven",
        "Medium Risk",
      ],
      validatedStatus: "Validated",
      riskLevel: "Medium",
      holdWindow: "24–48h",
      confidence: 74,
      entryZone: "41.2–42.2",
      entryLow: 41.2,
      entryHigh: 42.2,
      stopLoss: "39.5",
      stopNumeric: 39.5,
      baseTarget: "44.5",
      baseTargetNumeric: 44.5,
      stretchTarget: "46.0",
      stretchTargetNumeric: 46.0,
      expectedGain: "5–9%",
      previousClose: 40.5,
      marketOpen: 41.85,
      currentPrice: 41.42,
      gapPercent: 3.21,
      idealEntry: "Buy first-hour pullback, avoid chasing opening spike",
      reportEntryRange: "41.0–42.5",
      reportExitRange: "44.0–46.0",
      reportConfidence: 72,
      auditNotes:
        "Aligned with desk view; tightened entry vs original report to reduce chase risk.",
      accent: "emerald",
      sellPlan: {
        bestOnPullback: "Best on first pullback into 41.2–42.0",
        avoidChasingAbove: "Avoid chasing above 42.35 on opening impulse",
        takePartialNear: "Take partial profits near 44.5 (base target)",
        exitRemainder:
          "Exit remainder near 46.0 or by next-day close if momentum stalls",
      },
    },
    {
      rank: 2,
      ticker: "COP",
      companyName: "ConocoPhillips",
      thesis:
        "Strong macro oil trade with high liquidity and risk-off alignment, though more crowded than APA.",
      whyTop3:
        "Highest-quality large-cap energy exposure for this window — deep liquidity, clear macro linkage, manageable gap risk.",
      statusChips: [
        "Partially Validated",
        "Macro Tailwind",
        "Liquid Leader",
        "Medium Risk",
      ],
      validatedStatus: "Partially Validated",
      riskLevel: "Medium",
      holdWindow: "24–48h",
      confidence: 68,
      entryZone: "89–91",
      entryLow: 89,
      entryHigh: 91,
      stopLoss: "86",
      stopNumeric: 86,
      baseTarget: "97",
      baseTargetNumeric: 97,
      stretchTarget: "101",
      stretchTargetNumeric: 101,
      expectedGain: "6–11%",
      previousClose: 88.2,
      marketOpen: 90.05,
      currentPrice: 89.68,
      gapPercent: 2.1,
      idealEntry: "Enter on controlled dip, avoid gap chase",
      reportEntryRange: "88–91.5",
      reportExitRange: "96–101",
      reportConfidence: 70,
      auditNotes:
        "Still valid macro sleeve; watch crowding — size slightly smaller than APA.",
      accent: "sky",
      sellPlan: {
        bestOnPullback: "Best on first pullback toward 89.5–90.2",
        avoidChasingAbove: "Avoid chasing above 91.4 without consolidation",
        takePartialNear: "Take partial profits near 97 (base target)",
        exitRemainder:
          "Trail or exit remainder into 101 if trend holds; otherwise trim into strength",
      },
    },
    {
      rank: 3,
      ticker: "NAVN",
      companyName: "Navan Inc.",
      thesis:
        "Fresh earnings catalyst and momentum continuation candidate, but more volatile and timing-sensitive.",
      whyTop3:
        "Highest beta / catalyst convexity in the book — acceptable for smaller size given defined invalidation.",
      statusChips: [
        "Partially Validated",
        "Event Driven",
        "Higher Risk",
        "Timing Sensitive",
      ],
      validatedStatus: "Partially Validated",
      riskLevel: "High",
      holdWindow: "24–48h",
      confidence: 66,
      entryZone: "8.8–9.2",
      entryLow: 8.8,
      entryHigh: 9.2,
      stopLoss: "8.25",
      stopNumeric: 8.25,
      baseTarget: "10.0",
      baseTargetNumeric: 10.0,
      stretchTarget: "10.8",
      stretchTargetNumeric: 10.8,
      expectedGain: "8–15%",
      previousClose: 8.5,
      marketOpen: 9.08,
      currentPrice: 8.94,
      gapPercent: 6.82,
      idealEntry:
        "Only enter if it holds above 8.8 and does not fade the opening move",
      reportEntryRange: "8.7–9.3",
      reportExitRange: "10.0–11.0",
      reportConfidence: 65,
      auditNotes:
        "Higher variance — size down; requires active management vs energy pair.",
      accent: "amber",
      sellPlan: {
        bestOnPullback: "Best on hold/reclaim of 8.85–9.05 after open",
        avoidChasingAbove: "Avoid chasing above 9.35 without volume confirmation",
        takePartialNear: "Take partial profits near 10.0",
        exitRemainder:
          "Exit remainder near 10.8 or cut if it loses 8.8 on a closing basis",
      },
    },
  ],
  rejectedPicks: [
    { ticker: "FANG", reason: "Secondary offering overhang" },
    { ticker: "TRGP", reason: "Slower mover for this swing window" },
    { ticker: "ARM", reason: "Overbought event chase" },
    { ticker: "AMD", reason: "Stale catalyst vs peers" },
    { ticker: "CME", reason: "Weak chart structure for 24–48h" },
    { ticker: "KOD", reason: "Binary biotech risk" },
    { ticker: "CVX", reason: "Too slow for this swing window" },
  ],
  whyCut: [
    {
      ticker: "APA",
      bullets: [
        "Cleanest technical + fundamental setup in the scan",
        "Earnings beat + sector tailwind",
        "Breakout profile with clear invalidation",
      ],
    },
    {
      ticker: "COP",
      bullets: [
        "Strongest macro alignment (oil, risk-off rotation)",
        "Deep liquidity — easier to size and exit",
        "Safer energy exposure; note crowded positioning",
      ],
    },
    {
      ticker: "NAVN",
      bullets: [
        "Freshest catalyst (earnings / event path)",
        "Highest upside per unit of time — with higher variance",
        "Requires discipline on entry timing",
      ],
    },
  ],
  reportRows: [
    {
      ticker: "APA",
      originalRank: 1,
      originalEntryRange: "41.0–42.5",
      originalTarget: "44.0–46.0",
      originalConfidence: 72,
      finalRuling: "Confirmed / tightened entry",
      finalDecision: "Top 3",
    },
    {
      ticker: "COP",
      originalRank: 2,
      originalEntryRange: "88.0–91.5",
      originalTarget: "96.0–101.0",
      originalConfidence: 70,
      finalRuling: "Confirmed",
      finalDecision: "Top 3",
    },
    {
      ticker: "NAVN",
      originalRank: 3,
      originalEntryRange: "8.7–9.3",
      originalTarget: "10.0–11.0",
      originalConfidence: 65,
      finalRuling: "Confirmed with size caveat",
      finalDecision: "Top 3",
    },
    {
      ticker: "FANG",
      originalRank: 4,
      originalEntryRange: "48.0–50.0",
      originalTarget: "52.0–54.0",
      originalConfidence: 68,
      finalRuling: "Offering overhang",
      finalDecision: "Rejected",
    },
    {
      ticker: "TRGP",
      originalRank: 5,
      originalEntryRange: "102.0–105.0",
      originalTarget: "110.0–114.0",
      originalConfidence: 66,
      finalRuling: "Momentum too slow",
      finalDecision: "Rejected",
    },
    {
      ticker: "ARM",
      originalRank: 6,
      originalEntryRange: "140.0–145.0",
      originalTarget: "155.0–160.0",
      originalConfidence: 64,
      finalRuling: "Overbought chase risk",
      finalDecision: "Rejected",
    },
    {
      ticker: "BABA",
      originalRank: 7,
      originalEntryRange: "85.0–88.0",
      originalTarget: "92.0–95.0",
      originalConfidence: 62,
      finalRuling: "Interesting but not today",
      finalDecision: "Watchlist",
    },
    {
      ticker: "JD",
      originalRank: 8,
      originalEntryRange: "28.0–30.0",
      originalTarget: "32.0–34.0",
      originalConfidence: 60,
      finalRuling: "Secondary vs top energy",
      finalDecision: "Watchlist",
    },
    {
      ticker: "AMD",
      originalRank: 9,
      originalEntryRange: "110.0–115.0",
      originalTarget: "120.0–125.0",
      originalConfidence: 63,
      finalRuling: "Stale catalyst",
      finalDecision: "Rejected",
    },
    {
      ticker: "FDX",
      originalRank: 10,
      originalEntryRange: "220.0–225.0",
      originalTarget: "235.0–240.0",
      originalConfidence: 61,
      finalRuling: "Better setups elsewhere",
      finalDecision: "Watchlist",
    },
    {
      ticker: "CME",
      originalRank: 11,
      originalEntryRange: "210.0–215.0",
      originalTarget: "220.0–225.0",
      originalConfidence: 59,
      finalRuling: "Chart weak for window",
      finalDecision: "Rejected",
    },
    {
      ticker: "KOD",
      originalRank: 12,
      originalEntryRange: "15.0–16.0",
      originalTarget: "18.0–20.0",
      originalConfidence: 58,
      finalRuling: "Binary risk",
      finalDecision: "Rejected",
    },
    {
      ticker: "CVX",
      originalRank: 13,
      originalEntryRange: "145.0–150.0",
      originalTarget: "155.0–160.0",
      originalConfidence: 67,
      finalRuling: "Too slow vs APA/COP",
      finalDecision: "Rejected",
    },
  ],
  sidebar: {
    bestSetup: "APA",
    bestEntryStyle: "Buy pullback — do not chase",
    saferTrade: "COP",
    highestRiskUpside: "NAVN",
    cashSuggestion: "Keep dry powder for better fills",
    checklist: [
      "Wait 5–15 minutes after the open",
      "Watch the first pullback, not the first spike",
      "Avoid euphoric gap-chases without base",
      "Respect stops — no mental adjustments",
      "Plan exits before you enter",
    ],
  },
};
