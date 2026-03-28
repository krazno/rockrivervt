# Rock River VT — site status, content inventory & link map

**Purpose:** Single reference for content strategy, IA review, and automated recommendations. **Content is prioritized** over implementation detail.

**Production URL:** `https://rockrivervt.com` (`SITE_URL` in `lib/seo.ts`)  
**Brand / maintainer:** **Krazno Design** — contact: **kraznodesign@gmail.com** (all primary `mailto:` flows use this inbox unless noted).

**Positioning (editorial):** Neighbor-run, **LGBTQ-welcoming** field guide to Rock River (Newfane / Windham County, southern Vermont). **Not** a government, town, or official agency site. Tone: calm, honest, outdoor/editorial.

**Tech stack (brief):** Next.js App Router, content mostly in `content/*.ts` and TS modules (no headless CMS for core copy). Live widgets use NOAA / APIs where noted.

---

## 1. Where content lives (edit these first)

| Source | What it drives |
|--------|----------------|
| `content/daily-notes.ts` | **`DAILY_NOTES`** — journal entries for `/daily-updates` and the home **Daily pulse** (date, headline, body; optional photo override). |
| `content/local-ecosystem.ts` | **`LOCAL_PICKS`** — curated “after the river” places (food, coffee, town, scenic, evening, practical, culture); **`WEEKLY_RIVER_NOTES`** — dated windows for home “This week” / river intelligence strip. |
| `content/plan-itineraries.ts` | **`PLAN_ITINERARIES`** — example day plans on `/plan-your-day` (steps with optional internal `href`). |
| `content/visitor-faq.ts` | **`VISIT_PAGE_FAQ`**, **`GUIDELINES_PAGE_FAQ`** — Q&A for `/visit`, `/guidelines`, and FAQ JSON-LD. |
| `content/sourced/source-registry.ts` | Sourcing / attribution registry (supporting pages as wired). |
| `lib/seo.ts` | Default titles, OG copy, homepage meta, `SITE_NAME_*`, canonical base. |
| `lib/site.ts` | Email, studio name, `mailto` templates, Instagram location URL, social scaffold. |
| `lib/nav.ts` | Header (`HEADER_PRIMARY_NAV`, `HEADER_COMMUNITY`), footer **`primaryNav`** / **`secondaryNav`**. |
| `data/media.ts` | Image catalog, ordering, homepage carousel filters, hero picks, gallery. |
| `lib/people-media.ts` | Curated people-forward images per page and homepage slots. |
| Page `page.tsx` files | Page-specific metadata (`buildPageMetadata`), layout composition, prose blocks unique to that route. |
| `components/home/*` | Homepage sections (hero, conditions teasers, bands, etc.) — mostly assembled from libs above. |

---

## 2. Global navigation & repeated links

### Header (desktop / mobile drawer)

Grouped as **Explore** / **Visit** / **About** (`lib/nav.ts` — `headerNavByGroup()`):

| Label | Path | Notes |
|-------|------|--------|
| Map | `/map` | Also matches `/rock-river-map` for active state |
| Conditions | `/conditions` | Also `/rock-river-conditions` |
| Updates | `/daily-updates` | |
| After river | `/after-the-river` | |
| Plan day | `/plan-your-day` | |
| Visit | `/visit` | |
| Photos | `/gallery` | |
| History | `/history` | |
| Guidelines | `/guidelines` | |
| Community | `/community` | Separate constant `HEADER_COMMUNITY` |

### Footer — “Explore” (`primaryNav`)

`/visit`, `/conditions`, `/map`, `/discoveries`, `/community`, `/preservation`, `/gallery`, `/resources`

### Footer — “Also” (`secondaryNav`)

`/daily-updates`, `/plan-your-day`, `/after-the-river`, `/get-featured`, `/local-business`, `/local`, `/land-river`, `/history`, `/guidelines`

### Footer — contact & social

- Mail: `mailto:kraznodesign@gmail.com` (subject variants for “Rock River VT” / site note).
- Instagram (live): Instagram **location** grid for Rock River VT — URL in `lib/site.ts` (`INSTAGRAM_ROCK_RIVER_LOCATION_URL`).
- Reddit, Facebook, YouTube: **scaffold** (`href: null` until URLs added in `lib/site.ts`).

---

## 3. Homepage (`/`) — content blocks (top → bottom)

**Rendering:** `app/page.tsx` → `HomePageClient` (`dynamic` for Vermont “today” on pulse).  
**Meta title:** “Rock River Vermont | Welcoming LGBTQ-friendly river guide · Newfane”  
**Meta description:** Neighbor-run guide — map, snapshot, conditions, trail, pools; LGBTQ-welcoming; not government.

Approximate **content order** (for audits):

1. **Site header** — nav above  
2. **Monthly welcome modal** (once/month/device) — seasonal / studio line  
3. **Season banner** — season note, place line (“Newfane · Windham County…”), **welcome ribbon** (welcome back, “opened roughly *n* times today” — deterministic daily number 102–603 Vermont date, illustrative not analytics)  
4. **Gallery backdrop** — full-page low-opacity photo wash  
5. **Disclaimer line** — neighbor-run field guide, not government  
6. **Hero** — large river/landscape visual, headline, CTAs, rotating circle gallery  
7. **People splash** — small overlapping visitor circles → `/gallery`  
8. **Right now** — Vermont date, seasonal note, **visit insights** widget (live snapshot)  
9. **Today’s feel** — one editorial line from weather/river/crowd + single people accent  
10. **Daily pulse** — from `DAILY_NOTES` + optional weather line + side photo  
11. **River intelligence** — `WEEKLY_RIVER_NOTES` + forecast window hint + small people accent  
12. **Map & trail** — embedded map preview + trail film (when included)  
13. **Visitor guide block** — “Plan with the local guide” style CTA cards (map, swim, conditions, parking, guidelines, community)  
14. **Today strip** — weather / river / crowd summary + jump links  
15. **Conditions widgets** — weather, river, crowd (live)  
16. **Photo carousel** — gallery subset (deduped vs hero/splash/moments)  
17. **Local ecosystem teaser** — featured picks from `LOCAL_PICKS` → `/after-the-river`  
18. **Visitor moments** — people row → `/gallery`  
19. **Why people love** — bullet reasons + link `/why-rock-river`  
20. **Business teaser** — cafés/shops/stay, Krazno Design / get featured / area partners  
21. **Connection strip** — field note, photo submission mailtos  
22. **Where to next** — `PhotoAccentRow` (scenic accents) + grid links to: `/visitor-guide`, `/visit`, `/guidelines`, `/local`, `/resources`, `/community`, `/discoveries`, `/preservation`  
23. **Footer**

**Atmosphere (non-content):** Flow spine SVG, leaf-shadow blobs, `rr-home-band` washes — decorative only.

---

## 4. Page-by-page inventory

Paths are **site root relative**. Titles below are **metadata `title` segments** (full browser title uses template `%s | Rock River Vermont` unless `absolute` on home).

### Core visitor journey

| Path | Title (segment) | Primary content intent | Notable links out / in |
|------|------------------|-------------------------|-------------------------|
| `/` | (absolute home title) | Full dashboard above | Many internal anchors; mailtos via connection strip |
| `/visit` | Visit | First trip, parking, seasons, FAQ (`VISIT_PAGE_FAQ`) | Map, guidelines, preservation, official org |
| `/visitor-guide` | Visitor guide | Long-form context & safety | Internal guide sections |
| `/conditions` | Conditions | Live river / weather / visit framing | Widgets, `/weather` |
| `/weather` | Weather | Forecast-focused view | NOAA / API-backed |
| `/map` | Map | Interactive map, pins, trail context | `/rock-river-map`, full map |
| `/gallery` | Photos & gallery | Image grid, submission CTA | `mailto` photo submission |
| `/guidelines` | Guidelines | Shoreline norms, etiquette, FAQ (`GUIDELINES_PAGE_FAQ`) | Preservation, community |

### Place & SEO alias routes (`/rock-river-*`)

Keyword-oriented mirrors; content overlaps canonical hubs:

| Path | Title (segment) | Typical role |
|------|-----------------|--------------|
| `/rock-river-vermont` | Rock River Vermont overview | Overview / landing variant |
| `/rock-river-swimming-hole` | Rock River swimming hole | Swim-focused |
| `/rock-river-trail-vermont` | Rock River trail Vermont | Trail + film reference |
| `/rock-river-conditions` | Rock River conditions | Conditions alias |
| `/rock-river-map` | Rock River map | Map alias |

### Community, land, history

| Path | Title (segment) | Content focus |
|------|-----------------|---------------|
| `/community` | Community | Stewardship, participation, mailtos (field note, sighting, photo) |
| `/preservation` | Preservation | Land/access; **external** preservation contact email on page |
| `/land-river` | Land & river | Landscape / river relationship |
| `/history` | History | Historical context |
| `/why-rock-river` | Why Rock River | Editorial “why this place matters” |
| `/discoveries` | Discoveries | Stones, plants, seasons-style discovery content |

### Planning & local economy

| Path | Title (segment) | Content focus |
|------|-----------------|---------------|
| `/daily-updates` | Daily updates | `DAILY_NOTES` journal list + pulse context |
| `/plan-your-day` | Plan your day | `PLAN_ITINERARIES` |
| `/after-the-river` | After the river | Full `LOCAL_PICKS` by category (food, coffee, town, scenic, evening, practical, culture) |
| `/local` | Local area | LGBTQ-friendly local context (Newfane / Brattleboro) |
| `/local-business` | Area partners | Partner program, Krazno Design, mailto partners |
| `/get-featured` | Get featured | Form → mailto get-featured template |

### Resources & legal

| Path | Title (segment) | Content focus |
|------|-----------------|---------------|
| `/resources` | Resources | Maps, external links collection |
| `/legal` | Legal & disclaimers | Disclaimers, not official site |
| `/research` | Research lab (test) | **Internal/test** — title says “test” |
| `/trading` | 24–48h Swing Dashboard | **Separate tool** — not main guide content |

---

## 5. Sitemap vs actual routes

**Included in `app/sitemap.ts`:** All major marketing URLs above **except** `/research` and `/trading` (not listed in sitemap file — confirm if intentional for SEO).

**Robots:** `app/robots.ts` allows `/` and points to `sitemap.xml`.

---

## 6. API routes (data, not editorial copy)

| Route | Role |
|-------|------|
| `/api/weather` | Weather / forecast JSON for widgets |
| `/api/river` | River-related context |
| `/api/crowd` | Crowd / beach feel reporting |
| `/api/visitors` | Optional geo hint for ribbon (homepage had static welcome; API may still run elsewhere) |

---

## 7. Mailto flows (all use `kraznodesign@gmail.com` unless noted)

Defined in `lib/site.ts`:

- Visitor field note  
- Sighting / season note  
- Photo for gallery  
- Get featured (structured body from form)  
- Area partners / business listing  

**Preservation page** uses its **own** org email (`rockriverpreservation@gmail.com`) where cited — not the studio inbox.

---

## 8. External dependencies (for recommendation systems)

- **NOAA** (weather) — conditions honesty / disclaimers on site  
- **Instagram** — location URL for social proof  
- **Google Maps** — optional on `LOCAL_PICKS` entries (`mapsUrl`)  
- **rockriverpreservation.org** — referenced as formal steward (visit FAQ, guidelines)  

---

## 9. Gaps / flags for reviewers

1. **`/research`** — marked as test; clarify indexability and IA.  
2. **`/trading`** — financial dashboard; distinct from river guide; may confuse IA if linked from main nav.  
3. **Social:** Only Instagram is live; other networks are placeholders.  
4. **Area partners** — editorial directory in progress; copy promises future listings.  
5. **Daily opens counter** on ribbon — **illustrative** (deterministic hash of Vermont date, 102–603), not server analytics.  
6. **Content updates** require file edits (TypeScript arrays), not CMS — note for workflow recommendations.

---

## 10. Quick internal link targets (homepage “Where to next” grid)

`/visitor-guide`, `/visit`, `/guidelines`, `/local`, `/resources`, `/community`, `/discoveries`, `/preservation`

---

*Generated from repository structure and key modules. For line-level copy, open the listed `content/*` files and individual `app/**/page.tsx` files.*
