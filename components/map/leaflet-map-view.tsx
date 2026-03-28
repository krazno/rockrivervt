"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
  escapeHtml,
  getCategory,
  getDescription,
  getFeatureTitle,
} from "@/lib/geojson-labels";
import { trackRrInteraction } from "@/lib/analytics";

export type MapMode = "preview" | "full";

export type InteractiveMapViewProps = {
  mode?: MapMode;
  /** CSS pixel height for the map pane */
  height?: number;
  showLegend?: boolean;
  showControls?: boolean;
  /** Public URL to GeoJSON (default: site bundle) */
  geoJsonUrl?: string;
  className?: string;
  /** Light tiles on light UI vs. dark editorial shell */
  tone?: "light" | "dark";
  /** Accessible name for the map region */
  ariaLabel?: string;
  /** When set, fires once per map mount after GeoJSON loads — GA4 `rr_interaction`. */
  analyticsSurface?: string;
};

const DEFAULT_GEOJSON = "/geo/map.geojson";

function popupHtml(
  props: Record<string, unknown>,
  geometryType: string,
): string {
  const title = escapeHtml(getFeatureTitle(props));
  const cat = getCategory(props, geometryType);
  const desc = getDescription(props);
  const catLine = cat
    ? `<div class="text-[11px] text-[#5a6f7a] mt-0.5">${escapeHtml(cat)}</div>`
    : "";
  const descLine = desc
    ? `<p class="text-[11px] text-[#38594f] mt-1.5 leading-snug">${escapeHtml(desc)}</p>`
    : "";
  return `<div class="font-sans max-w-[220px]"><strong class="text-[13px] text-[#1e2d38]">${title}</strong>${catLine}${descLine}</div>`;
}

function styleForFeature(feature: GeoJSON.Feature): L.PathOptions {
  const p = (feature.properties ?? {}) as Record<string, unknown>;
  const stroke =
    typeof p.stroke === "string" && p.stroke ? p.stroke : "#5a7a8a";
  const fill =
    typeof p.fill === "string" && p.fill ? p.fill : "rgba(77, 109, 97, 0.15)";
  const sw =
    typeof p["stroke-width"] === "number"
      ? p["stroke-width"]
      : typeof p["stroke-width"] === "string"
        ? Number(p["stroke-width"]) || 2
        : 2;
  const fo =
    typeof p["fill-opacity"] === "number"
      ? p["fill-opacity"]
      : typeof p["fill-opacity"] === "string"
        ? Number(p["fill-opacity"])
        : 0.35;
  const so =
    typeof p["stroke-opacity"] === "number"
      ? p["stroke-opacity"]
      : typeof p["stroke-opacity"] === "string"
        ? Number(p["stroke-opacity"])
        : 0.9;

  return {
    color: stroke,
    weight: sw,
    opacity: Number.isFinite(so) ? so : 0.9,
    fillColor: fill,
    fillOpacity: Number.isFinite(fo) ? fo : 0.35,
  };
}

export function LeafletMapView({
  mode = "preview",
  height = mode === "full" ? 520 : 420,
  showLegend = true,
  showControls = true,
  geoJsonUrl = DEFAULT_GEOJSON,
  className = "",
  tone = "light",
  ariaLabel = "Interactive map",
  analyticsSurface,
}: InteractiveMapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const analyticsSent = useRef(false);

  useEffect(() => {
    analyticsSent.current = false;
  }, [analyticsSurface, mode, geoJsonUrl]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const map = L.map(el, {
      zoomControl: showControls,
      attributionControl: true,
      scrollWheelZoom: mode === "full",
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      },
    ).addTo(map);

    let cancelled = false;

    fetch(geoJsonUrl)
      .then((r) => {
        if (!r.ok) throw new Error("Map data could not be loaded.");
        return r.json() as Promise<GeoJSON.GeoJSON>;
      })
      .then((data) => {
        if (cancelled) return;

        const layer = L.geoJSON(data, {
          filter: (feature) =>
            Boolean(feature && (feature as GeoJSON.Feature).geometry),
          style: (feature) =>
            styleForFeature(feature as GeoJSON.Feature) as L.PathOptions,
          pointToLayer(feature, latlng) {
            const p = (feature.properties ?? {}) as Record<string, unknown>;
            const mc =
              typeof p["marker-color"] === "string" && p["marker-color"]
                ? String(p["marker-color"])
                : "#4a6b7a";
            return L.circleMarker(latlng, {
              radius: mode === "full" ? 7 : 6,
              color: mc,
              weight: 2,
              opacity: 0.95,
              fillColor: mc,
              fillOpacity: 0.88,
            });
          },
          onEachFeature(feature, layer) {
            const gt =
              feature.geometry && "type" in feature.geometry
                ? feature.geometry.type
                : "Feature";
            const html = popupHtml(
              (feature.properties ?? {}) as Record<string, unknown>,
              gt,
            );
            layer.bindPopup(html);
          },
        }).addTo(map);

        try {
          const b = layer.getBounds();
          if (b.isValid()) {
            /* Keep the frame on the Rock River corridor — not too tight, not regional */
            map.fitBounds(b, { padding: [28, 28], maxZoom: 15 });
          } else {
            map.setView([42.948, -72.645], 14);
          }
        } catch {
          map.setView([42.948, -72.645], 14);
        }

        setLoaded(true);
        setError(null);
        if (analyticsSurface && !analyticsSent.current) {
          analyticsSent.current = true;
          trackRrInteraction("map", "layers_ready", { map_context: analyticsSurface });
        }
        requestAnimationFrame(() => map.invalidateSize());
      })
      .catch(() => {
        if (!cancelled) {
          setError("Map data could not be loaded.");
          map.setView([42.948, -72.645], 14);
        }
      });

    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    ro.observe(el);

    return () => {
      cancelled = true;
      ro.disconnect();
      map.remove();
    };
  }, [analyticsSurface, geoJsonUrl, mode, showControls, tone]);

  const frame =
    tone === "dark"
      ? "rounded-[var(--rr-radius-lg)] border border-white/12 bg-[#0a1210]"
      : "rounded-2xl border border-[#d0ddd3] bg-[#e8ede5]";

  const legend =
    tone === "dark"
      ? "border-white/12 bg-[#0c1815]/92 text-[#c5ddd4]"
      : "border-[#d0ddd3] bg-[#f8faf6]/95 text-[#38594f]";

  const legendTitle = tone === "dark" ? "text-white/95" : "text-[#2a3842]";

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className={`z-0 w-full overflow-hidden ${frame}`}
        style={{ height }}
        role="region"
        aria-label={ariaLabel}
      />
      {!loaded && !error ? (
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl text-sm ${
            tone === "dark"
              ? "bg-[#0a1210]/90 text-white/45"
              : "bg-[#eef2ea]/80 text-[#5c786e]"
          }`}
          style={{ height }}
        >
          Loading map…
        </div>
      ) : null}
      {error ? (
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-2xl p-4 text-center text-sm ${
            tone === "dark"
              ? "bg-[#0a1210]/95 text-white/65"
              : "bg-[#f4f7f1]/95 text-[#5a5140]"
          }`}
          style={{ height }}
        >
          {error}
        </div>
      ) : null}
      {showLegend && !error ? (
        <div
          className={`pointer-events-none absolute bottom-3 left-3 z-[500] max-w-[11rem] rounded-lg border px-2.5 py-2 text-[10px] shadow-sm backdrop-blur-sm ${legend}`}
        >
          <p className={`font-semibold ${legendTitle}`}>Legend</p>
          <ul className="mt-1.5 space-y-1">
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full border border-[#4a6b7a] bg-[#4a6b7a]"
                aria-hidden
              />
              Parking &amp; points
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-0.5 w-4 shrink-0 bg-[#5a7a8a]"
                aria-hidden
              />
              Trails
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-4 shrink-0 rounded-sm border border-[#5a7a8a] bg-[#b8c9d4]/45"
                aria-hidden
              />
              Beaches &amp; areas
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
