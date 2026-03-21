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
    ? `<div class="text-[11px] text-[#4d6d61] mt-0.5">${escapeHtml(cat)}</div>`
    : "";
  const descLine = desc
    ? `<p class="text-[11px] text-[#38594f] mt-1.5 leading-snug">${escapeHtml(desc)}</p>`
    : "";
  return `<div class="font-sans max-w-[220px]"><strong class="text-[13px] text-[#1f3a30]">${title}</strong>${catLine}${descLine}</div>`;
}

function styleForFeature(feature: GeoJSON.Feature): L.PathOptions {
  const p = (feature.properties ?? {}) as Record<string, unknown>;
  const stroke =
    typeof p.stroke === "string" && p.stroke ? p.stroke : "#4d6d61";
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
}: InteractiveMapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

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
                : "#35584c";
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
            map.fitBounds(b, { padding: [20, 24], maxZoom: 17 });
          } else {
            map.setView([42.948, -72.645], 14);
          }
        } catch {
          map.setView([42.948, -72.645], 14);
        }

        setLoaded(true);
        setError(null);
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
  }, [geoJsonUrl, mode, showControls]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className="z-0 w-full overflow-hidden rounded-2xl border border-[#d0ddd3] bg-[#e8ede5]"
        style={{ height }}
        role="region"
        aria-label="Interactive map preview"
      />
      {!loaded && !error ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-[#eef2ea]/80 text-sm text-[#5c786e]"
          style={{ height }}
        >
          Loading map…
        </div>
      ) : null}
      {error ? (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#f4f7f1]/95 p-4 text-center text-sm text-[#5a5140]"
          style={{ height }}
        >
          {error}
        </div>
      ) : null}
      {showLegend && !error ? (
        <div className="pointer-events-none absolute bottom-3 left-3 z-[500] max-w-[11rem] rounded-lg border border-[#d0ddd3] bg-[#f8faf6]/95 px-2.5 py-2 text-[10px] text-[#38594f] shadow-sm backdrop-blur-sm">
          <p className="font-semibold text-[#224035]">Legend</p>
          <ul className="mt-1.5 space-y-1">
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full border border-[#35584c] bg-[#35584c]"
                aria-hidden
              />
              Points
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-0.5 w-4 shrink-0 bg-[#4d6d61]"
                aria-hidden
              />
              Paths
            </li>
            <li className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-4 shrink-0 rounded-sm border border-[#4d6d61] bg-[#c5d4ce]/50"
                aria-hidden
              />
              Areas
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
