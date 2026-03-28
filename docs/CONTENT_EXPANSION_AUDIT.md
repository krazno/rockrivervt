# Content + product expansion audit (Rock River VT)

**Source:** `SITE_STATUS_AND_CONTENT.md` (repo root).  
**Goal:** Gaps, improvements, features, roadmap—aligned with neighbor-run, LGBTQ-welcoming, non-corporate tone.

---

## PART 1 — Gap analysis

### What users likely expect but don’t fully get yet

| Gap | Why it matters |
|-----|----------------|
| **Real “open now” / hours for local picks** | `/after-the-river` is editorial; visitors still Google “open Saturday.” Micro-hints exist; structured “best daypart” or seasonal notes per pick would deepen trust. |
| **Single “first visit in 5 minutes” path** | Hero + visit + map exist, but no one **numbered** path (e.g. 1→map 2→parking pin 3→conditions). Power users are fine; anxious first-timers want a ladder. |
| **Historical conditions / “how it usually is in July”** | Live NOAA is strong; **pattern** copy (mud season, holiday weekends, typical August crowd) is scattered—could be one **seasonal playbook** surface. |
| **Accessible / mobility note on trail & shore** | Guidelines touch norms; explicit **access** paragraph (surface, grade, where it gets rough) is a common search—thin or missing as dedicated block. |
| **Clear boundary: this site vs Preservation** | FAQ mentions it; a **small persistent pattern** (footer or visit) “Stewardship & donations → preservation org” reduces “who owns this?” friction. |
| **RSS or “what changed”** | `DAILY_NOTES` exist; no **feed** or changelog for return visitors who want “did anything update?” without reading the whole home stack. |

### Repeating without deepening

- **Conditions story** appears on home (insights, today’s feel, strip, full widgets, `/conditions`, `/weather`, `/rock-river-conditions`)—same **live** data, different chrome. Missing: **one** canonical “how to read the river today” short article that widgets **link into** for depth.
- **Map** on home preview + full `/map` + aliases—good, but **trail narrative** (turn-by-turn emotion, not GIS) is thin compared to widget depth.
- **Community / stewardship** split across `/community`, `/preservation`, guidelines, visitor guide—emotionally aligned but **no single “how to help this week”** line that updates with `DAILY_NOTES` or `WEEKLY_RIVER_NOTES`.

### Complete vs placeholder (honest read)

| Area | Verdict |
|------|---------|
| **Home stack** | **Strong / complete** structurally; risk of **length** for mobile—content is there, pacing is the product question. |
| **Conditions + weather APIs** | **Complete** for v1; “depth” = editorial overlays (interpretation pages). |
| **`LOCAL_PICKS` + after-the-river** | **Solid editorial**; **placeholder-adjacent** until listings have richer fields (seasonality, “pairs with river day” tags). |
| **Area partners / get-featured** | **Promise-heavy** until real listings ship—reads as roadmap, not inventory. |
| **`/resources`** | Often **link dump** tier unless each link has a one-line “why here.” |
| **`/discoveries`, `/land-river`** | **Depth varies**—easy to feel like “chapter exists” vs “living field guide.” |
| **`/research`, `/trading`** | **Intentionally off-guide**—IA risk if discovered via search without `noindex` or disambiguation. |

### SEO surfaces

- **Aliases** (`/rock-river-*`) help queries but duplicate **canonical** story—ensure each has unique intro paragraph + `link rel=canonical`, not thin duplicate body.
- **FAQ JSON-LD** on visit/guidelines: **good**—extend to **HowTo** or **Trip**-adjacent schema for “plan your day” if steps stay stable.
- **Sitemap omits `/research`, `/trading`**—good; add **`noindex`** on those pages if not already to match intent.

### Interactivity gaps

- Crowd check-in exists but **patterns** (day-of-week heat, “typical Saturday”) aren’t surfaced as **human-readable**—only point-in-time.
- **No lightweight “saved plan”** (email me this itinerary PDF or static link)—return visit hook is weak for planners.

---

## PART 2 — Page-by-page improvements

### Home (`/`)

- Tighten **mobile fold**: collapse or shorten one redundant conditions teaser; keep pulse + map + one widget row as “above the fold” story.
- Add **inline link** from “Right now” to a **single** `/conditions#how-to-read` section when you add it.
- **Season banner**: rotate copy from `WEEKLY_RIVER_NOTES` or first line of today’s `DAILY_NOTES` for stronger **daily** freshness signal.
- **Feature idea:** “**Copy today’s snapshot**” (plain-text clipboard) for texting friends—no login.

**Content expansion:** One short **monthly** “field editor’s note” block (2–3 sentences) sourced from `DAILY_NOTES` or new `content/editor-notes.ts`.

---

### Core visitor cluster (`/visit`, `/visitor-guide`, `/conditions`, `/weather`, `/map`, `/gallery`, `/guidelines`)

| Page | Improvements (2–4) | Feature idea | Content expansion |
|------|-------------------|--------------|-------------------|
| **Visit** | Add **parking map deep-link** query param to `/map`; seasonal **“what to pack”** by month; link **preservation** volunteer path prominently once. | **Printable one-pager** (static PDF or print CSS). | **Ice-out to leaf-peep** month-by-month paragraph table. |
| **Visitor guide** | TOC sticky on long scroll; **“5 mistakes first-timers make”** box; cross-link **guidelines** per topic. | **Anchor share links** (`#parking`) with OG description per section. | **One long “day in the life”** narrative chapter. |
| **Conditions** | **Interpretation** module above widgets (“tan water = …”); last-updated **human time** in Vermont. | **Email this snapshot** (mailto with pre-filled body from visible numbers—no server). | **Glossary** of river terms (CFS, clarity) on same page. |
| **Weather** | Link back to **swim vs trail** decision helper one-liner; **severe weather** link to NWS. | **Tomorrow vs today** compare strip (client-side from cached API). | **Micro-FAQ** (3 items) weather-specific. |
| **Map** | **Legend always visible** on mobile; “**you are here**” optional (permission); link **trail film** from pin. | **Share viewport** URL hash (encode bounds). | **Parking ethics** paragraph beside parking layer. |
| **Gallery** | **Curated sets** (“Trail”, “Water”, “People”) as filters; credit line pattern. | **Lightbox** with **next/previous** keyboard. | **Contributor spotlights** (text + 3 photos, mailto-driven). |
| **Guidelines** | **Scenario cards** (“Photography”, “Sound”, “Space”) expandable; link **community** mailto for gray areas. | **“Read time”** + **checklist** PDF. | **Seasonal etiquette** (mud season vs peak summer). |

---

### SEO alias routes (`/rock-river-*`)

- Unique **H1 + 2 paragraphs** per alias; canonical to `/map`, `/conditions`, etc.
- **Breadcrumb** back to hub.
- **Feature:** “**Jump to live data**” button syncing to parent page widgets.

**Content expansion:** **Keyword-specific FAQ** (2–3 Qs) per alias in frontmatter or `visitor-faq` keyed by route.

---

### Community / land / history (`/community`, `/preservation`, `/land-river`, `/history`, `/why-rock-river`, `/discoveries`)

| Group | Improvements | Feature idea | Content expansion |
|-------|--------------|--------------|-------------------|
| **Community** | Surface **last 3 `DAILY_NOTES` headlines** with links; steward **calendar** (static ICS or “third Saturday” copy). | **Volunteer story** pull quote rotator from mailto submissions (manual). | **Code of care** one-pager aligned with guidelines. |
| **Preservation** | Clear **donate / volunteer** CTAs above fold; diff this site vs org in a **table**. | Embed **single** official video or annual report PDF link. | **Timeline** of access milestones (short). |
| **Land & river** | **Map embed** or static watershed diagram; link **history**. | **Reading list** (3 books/links) with affiliate-free notes. | **Geology plain English** (half page). |
| **History** | **Photos** from gallery tagged history; oral-history **quotes** with permission footnote. | **Timeline scrubber** (static HTML). | **Indigenous land acknowledgment** if vetted locally. |
| **Why Rock River** | Pull **quotes** from guidelines + community; stronger **CTA** to visit. | **Share image** custom OG for this page. | **Partner with preservation** joint statement block. |
| **Discoveries** | **Seasonal checklist** (birds, plants); link **sighting** mailto per category. | **Printable field journal** page. | **Kid-friendly** subsection (“look for this rock shape”). |

---

### Planning & local economy (`/daily-updates`, `/plan-your-day`, `/after-the-river`, `/local`, `/local-business`, `/get-featured`)

| Page | Improvements | Feature idea | Content expansion |
|------|--------------|--------------|-------------------|
| **Daily updates** | **Filter by month**; show **related** `WEEKLY_RIVER_NOTES` when in range. | **RSS or JSON feed** of `DAILY_NOTES` (build-time). | **Archive** intro paragraph per season. |
| **Plan your day** | **Map each itinerary** to `LOCAL_PICKS` ids; **time estimates** from river to Brattleboro. | **“Reverse plan”** (half-day vs full-day toggle). | **Rain day** alternate itineraries. |
| **After the river** | **Tags** on cards (vegetarian, dog-friendly); **distance from river** as structured field. | **Sort by town** toggle. | **One “locals’ Sunday”** narrative linking 3 picks. |
| **Local** | **Safety / welcome** copy for LGBTQ+ visitors; link **get-featured** once, not thrice. | **Partner highlight** of the month (static). | **Event stubs** (link out to Brattleboro org calendars). |
| **Local business** | **Real listings** (even 3) beat empty promise; **criteria** sidebar (“how we pick”). | **Application status** line (“we reply within X days”). | **Case study** one business (when live). |
| **Get featured** | **Preview** of listing card; **privacy** note on what you publish. | **Optional** Supabase row “request received” auto-reply later. | **FAQ** (cost, editorial control, LGBTQ+ statement). |

---

### Resources & legal (`/resources`, `/legal`, `/research`, `/trading`)

- **Resources:** Every link gets **one-line verdict** + **last checked** date.
- **Legal:** **Short** summary bullets above long text; link **contact**.
- **Research / trading:** **`noindex`**, **no** header/footer primary nav highlight; optional **password** or **robots disallow** if internal tools.

**Feature:** **“Report broken link”** mailto with page URL query param.

**Content expansion:** **Emergency** numbers / ranger-style “who to call” box on legal or visit (non-911 appropriate).

---

## PART 3 — Ten high-impact features (tone-safe)

1. **River read-of-the-day** — One sentence derived from API + `DAILY_NOTES` headline, pinned under hero or in banner; same copy on `/conditions`—feels human, not a dashboard.
2. **Crowd **patterns** weekly digest** — Supabase or static build: aggregate anonymous check-ins into “last week: mostly quiet weekday mornings”—editorial disclaimer attached.
3. **Photo story of the week** — Pick one gallery image + 100 words from submitter (email workflow); home strip or `/gallery` hero—no login.
4. **Partner “river perk”** — Single labeled line on `/after-the-river` for businesses that offer a **disclosed** perk (coffee discount with photo of river)—monetization without banners.
5. **Itinerary deep links** — `/plan-your-day#brattleboro-loop` with **pre-filled** map bounds (hash or query)—shareable texts to friends.
6. **Seasonal playbook page** — Static `content/season-playbook.ts` driving `/visit/seasons` or section on visit: mud season, black flies, peak swim, foliage—**SEO** + **return visits**.
7. **Sighting log (read-only)** — Curated table from mailto submissions: date, species, “approx. pool”—updated weekly by editor; builds **liveness** without user accounts.
8. **Trail conditions note** — Manual or weekly field note in `DAILY_NOTES` type `trail`; surfaced on map page—answers “muddy?” faster than river CFS.
9. **Email subscribe (double opt-in)** — “Weekly river note” via Buttondown/Beehiiv or Supabase + Resend—**one** paragraph + link to `/daily-updates`; no app account.
10. **Printable map pack** — Static PDF (quarterly) + link on `/map` and `/resources`—serves offline users and reduces “I lost signal” panic.

---

## PART 4 — Daily / automatic systems

### Three ways to update daily (mostly automatic)

1. **Cron + NOAA** — Scheduled job (Vercel cron) hits your existing `/api/weather` / river logic; writes a **snapshot row** in Supabase; home “read-of-the-day” reads latest row + merges `DAILY_NOTES` if present.
2. **`DAILY_NOTES` + Git** — Keep human journal as source of truth; optional **GitHub Action** that opens a PR reminder if no note for Vermont `today` (nudge workflow, not auto-copy).
3. **IG or location scrape (careful)** — Nightly fetch of **public** Instagram location count or last post time—surface as “community pulse” one line with **attribution**—legal/API terms checked first; fallback skip.

### Two “liveness” simulations (light infra)

1. **Rotate `WEEKLY_RIVER_NOTES`** windows in content file on a schedule—but copy still human-written; **date math** only automates which note shows.
2. **Deterministic “opens today” → optional real bump** — Replace hash with **Supabase counter** incremented on `middleware` or edge for `/` only—still small numbers, honest labeling (“visits to this page today”).

### Two return-visit hooks

1. **`/daily-updates` in header** is already there—add **browser push** optional later; for now **bookmark copy** + **RSS** (Part 3).
2. **“This week last year”** line on pulse—static compare from archived `DAILY_NOTES` by month-day—nostalgia + pattern.

---

## PART 5 — Business / monetization (trust-preserving)

1. **Featured partner slot** — One **editorial** card on `/after-the-river` and home teaser: fixed monthly fee, **labeled “Supporter”**, same design as other picks, **no** tracking pixels—story + link only.
2. **Printed map / zine** — Sell at cost+small margin via Stripe link—**proceeds note** (“covers hosting”)—feels merch, not ads.
3. **“River day bundle”** — Partner with one café + one shop—**curated** package text, affiliate-free flat fee from businesses for **inclusion** in copy only.
4. **Sponsored field note** — Rare: **one** labeled paragraph in `DAILY_NOTES` (“Today’s note supported by X”) with **strict** relevance (outdoor/repair)—monthly cap.
5. **White-label guide skin** for **Windham County tourism**—license static export or co-brand **PDF**—B2B, invisible to river visitors.

**Rules:** Always **label** money-adjacent content; never **pretend** organic; **Krazno Design** as transparent publisher.

---

## PART 6 — Priority roadmap

### Tier 1 — Do now

- **`noindex`** `/research` and `/trading` (or remove from accidental discovery).
- **Canonical + unique intro** copy on each `/rock-river-*` alias.
- **One “how to read conditions”** anchor section on `/conditions` + links from home widgets.
- **Real 3–5 `LOCAL_PICKS` enhancements**: `hint` + `mapsUrl` audit; add **daypart** or **closed winter** where true.
- **Area partners:** either **remove** “coming soon” tone or **ship** 3 real stubs with **criteria** sidebar.

### Tier 2 — Next 2–3 weeks

- **RSS or JSON** for `DAILY_NOTES`.
- **Seasonal playbook** page or visit section from `content/` module.
- **Printable visit one-pager** (print CSS on `/visit`).
- **Gallery** curated filters + lightbox polish.
- **Supabase** table for **crowd weekly rollup** (manual or cron).

### Tier 3 — Later

- **Email digest** (weekly river note).
- **Sighting log** curated view.
- **Partner supporter** slot (legal + design contract).
- **PDF map pack** quarterly.
- **Timeline / history** multimedia pass.

---

*This audit is actionable against the current repo; implement in small PRs aligned with `SITE_STATUS_AND_CONTENT.md`.*
