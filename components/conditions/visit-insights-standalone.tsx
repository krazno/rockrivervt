"use client";

import { useHomeVisitSnapshot } from "@/components/home/use-home-visit-snapshot";
import { VisitInsightsWidget } from "@/components/conditions/visit-insights-widget";

/** Single fetch for conditions/utility pages (same APIs as the home “plan today” card). */
export function VisitInsightsStandalone() {
  const snapshot = useHomeVisitSnapshot();
  return <VisitInsightsWidget variant="default" snapshot={snapshot} />;
}
