"use client";

import { useEffect, useState } from "react";
import { LineChart } from "lucide-react";

type VisitorsJson = {
  configured?: boolean;
  count?: number | null;
};

export function HomeVisitorCounter() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch("/api/visitors", { cache: "no-store" });
        const json = (await res.json()) as VisitorsJson;
        if (cancelled) return;

        if (!json.configured) {
          setLabel(null);
          return;
        }

        let n = typeof json.count === "number" ? json.count : 0;

        if (
          typeof window !== "undefined" &&
          window.sessionStorage.getItem("rr_home_visit_tick") !== "1"
        ) {
          const post = await fetch("/api/visitors", { method: "POST" });
          const pj = (await post.json()) as { count?: number | null; ok?: boolean };
          if (!cancelled && typeof pj.count === "number") {
            n = pj.count;
          }
          try {
            window.sessionStorage.setItem("rr_home_visit_tick", "1");
          } catch {
            /* ignore */
          }
        }

        if (!cancelled) {
          setLabel(
            `${n.toLocaleString()} visits to this guide counted (all time, all visitors)`,
          );
        }
      } catch {
        if (!cancelled) setLabel(null);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!label) return null;

  return (
    <p className="flex items-center justify-center gap-1.5 text-[11px] font-medium tabular-nums text-[var(--rr-text-muted)] sm:justify-start sm:text-xs">
      <LineChart className="h-3.5 w-3.5 shrink-0 text-[var(--rr-mint)]" aria-hidden />
      <span>{label}</span>
    </p>
  );
}
