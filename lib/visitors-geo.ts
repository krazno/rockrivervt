/** Geo derived from platform headers (e.g. Vercel edge) — not persisted by the visitors API. */
export type VisitorsGeo = {
  country: string | null;
  region: string | null;
  city: string | null;
};

export function geoFromRequest(request: Request): VisitorsGeo {
  const h = request.headers;
  const cityRaw = h.get("x-vercel-ip-city");
  let city: string | null = null;
  if (cityRaw) {
    try {
      city = decodeURIComponent(cityRaw.replace(/\+/g, " "));
    } catch {
      city = cityRaw;
    }
  }
  return {
    country: h.get("x-vercel-ip-country"),
    region: h.get("x-vercel-ip-country-region"),
    city,
  };
}

/** One friendly line for the welcome ribbon (no precise coordinates). */
export function formatVisitorGeoLine(geo: VisitorsGeo | null | undefined): string | null {
  if (!geo) return null;
  const { city, region, country } = geo;
  if (city) return `Looks like you’re near ${city}.`;
  if (country === "US" && region) {
    try {
      const dn = new Intl.DisplayNames(["en"], { type: "region" });
      const state = dn.of(`US-${region}`);
      if (state) return `Browsing from ${state}.`;
    } catch {
      /* ignore */
    }
  }
  if (country) {
    try {
      const dn = new Intl.DisplayNames(["en"], { type: "region" });
      const c = dn.of(country);
      if (c) return `Browsing from ${c}.`;
    } catch {
      /* ignore */
    }
  }
  return null;
}
