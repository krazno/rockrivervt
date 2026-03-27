import type { Metadata } from "next";

import { TradingDashboard } from "@/components/trading/trading-dashboard";

export const metadata: Metadata = {
  title: "24–48h Swing Dashboard",
  description:
    "Daily curated swing-trade dashboard: regime, top picks, audit notes, and execution plan.",
  robots: { index: false, follow: false },
};

export default function TradingPage() {
  return <TradingDashboard />;
}
