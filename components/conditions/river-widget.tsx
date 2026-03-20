"use client";

import { useEffect, useState } from "react";

type RiverData = {
  flow: number;
  gageHeight: number;
  timestamp: string;
};

export function RiverWidget() {
  const [data, setData] = useState<RiverData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadRiver() {
      try {
        const res = await fetch("/api/river", { cache: "no-store" });
        if (!res.ok) return;

        const json = (await res.json()) as RiverData;
        if (!isMounted) return;
        setData(json);
      } catch {
        // Keep placeholders on failure.
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    loadRiver();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatNumber = (n: number | null | undefined) => {
    if (typeof n !== "number" || Number.isNaN(n)) return "—";
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const lastUpdatedText = (() => {
    if (!data?.timestamp) return "—";
    const d = new Date(data.timestamp);
    if (Number.isNaN(d.getTime())) return data.timestamp;
    return d.toLocaleString();
  })();

  return (
    <div className="rounded-2xl border border-[#c2d0c6] bg-[#f8f8f3] p-5">
      <h3 className="text-sm font-semibold tracking-[0.12em] text-[#4e6870] uppercase">
        River conditions
      </h3>

      <div className="mt-2 space-y-1.5">
        <p className="text-sm leading-6 text-[#38594f]">
          Flow:{" "}
          <span className="font-semibold">
            {loading ? "—" : formatNumber(data?.flow)}
          </span>
        </p>
        <p className="text-sm leading-6 text-[#38594f]">
          Gage height:{" "}
          <span className="font-semibold">
            {loading ? "—" : formatNumber(data?.gageHeight)}
          </span>
        </p>
        <p className="text-sm leading-6 text-[#38515a]">
          Last updated:{" "}
          <span className="font-semibold">{loading ? "—" : lastUpdatedText}</span>
        </p>
      </div>
    </div>
  );
}

