# Neural Kilowatt — SEO Pilot Plan

> Source brief: `BridgeIT SEO Pilot — UI/UX Plan` (4 keywords: *electricity bills*, *power bill*, *bijli bill*, *light bill*), rebranded to **Neural Kilowatt** (`neuralkw.com`).
>
> This plan is structured so each task is a self-contained work unit that one agent can pick up without coordinating with others. Tasks in the same **phase** can run in parallel. Tasks in later phases assume earlier phases are merged.

---

## Decisions baked in (do not re-litigate)

- **Brand:** "Neural Kilowatt" (short form **NeuralKW**, domain `neuralkw.com`). Wordmark is `Neural` + stylised `kW` glyph. Full name "Neural Kilowatt" appears only in: footer about-line and structured-data `Organization.name`.
- **AI positioning:** the words *AI*, *agent*, *intelligent*, *powered by*, *LLM* never appear on any landing page copy, headline, sub, body, FAQ, CTA, or trust strip. The single exception is the footer about-line in [`app/_components/SiteFooter.tsx`](app/_components/SiteFooter.tsx): *"Neural Kilowatt — an electricity intelligence agent. Made in India · Bill data stored in India under DPDP Act 2023."*
- **Four cluster landings are four front doors**, not localised templates. Same engine (bill explainer + audit + qualification), four tones.
- **No keyword cannibalisation:** cluster pages only cross-reference via the footer "Also available in" small print.
- **Stack:** Next.js 16 App Router, React 19, Tailwind v4, no extra runtime deps unless a phase explicitly adds one.
- **Storage for the pilot:** leads → `data/leads.jsonl` (gitignored). Replace with a managed store in Phase 2+ if needed.

---

## Phase 0 — Foundation (DONE)

Built and verified by `pnpm run build` + `pnpm run lint`.

- [x] **F0.1** Root layout + globals: Geist + Noto Sans Devanagari, cluster accent tokens, `overflow-x: hidden`, sticky header — [`app/layout.tsx`](app/layout.tsx), [`app/globals.css`](app/globals.css). Visual standards for UI work: [`DESIGN_PRINCIPLES.md`](DESIGN_PRINCIPLES.md).
- [x] **F0.2** Cluster config + DISCOM seed list — [`app/_data/clusters.ts`](app/_data/clusters.ts), [`app/_data/discoms.ts`](app/_data/discoms.ts)
- [x] **F0.3** Shared server components — [`Wordmark`](app/_components/Wordmark.tsx), [`SiteHeader`](app/_components/SiteHeader.tsx), [`SiteFooter`](app/_components/SiteFooter.tsx), [`Hero`](app/_components/Hero.tsx), [`ThreeUpCards`](app/_components/ThreeUpCards.tsx), [`HowItWorks`](app/_components/HowItWorks.tsx), [`ContentBody`](app/_components/ContentBody.tsx), [`DiscomGrid`](app/_components/DiscomGrid.tsx), [`FaqAccordion`](app/_components/FaqAccordion.tsx), [`TrustStrip`](app/_components/TrustStrip.tsx), [`JsonLd`](app/_components/JsonLd.tsx)
- [x] **F0.4** Client components — [`BillExplainer`](app/_components/BillExplainer.tsx) (2 tabs, typeahead, capture, qualification, dynamic CTA), [`BeforeAfterSlider`](app/_components/BeforeAfterSlider.tsx), [`StickyMobileCTA`](app/_components/StickyMobileCTA.tsx), [`WhatsAppShareButton`](app/_components/WhatsAppShareButton.tsx), [`UseCaseStrip`](app/_components/UseCaseStrip.tsx)
- [x] **F0.5** Server action + tier logic split — [`app/_actions/submit-lead.ts`](app/_actions/submit-lead.ts), [`app/_lib/lead-tier.ts`](app/_lib/lead-tier.ts), `data/leads.jsonl` gitignored
- [x] **F0.6** Four landing pages + `/tools/bill-explainer` (noindex) + `/privacy` skeleton — [`app/page.tsx`](app/page.tsx), [`app/power-bill/page.tsx`](app/power-bill/page.tsx), [`app/bijli-bill/page.tsx`](app/bijli-bill/page.tsx), [`app/light-bill/page.tsx`](app/light-bill/page.tsx), [`app/tools/bill-explainer/page.tsx`](app/tools/bill-explainer/page.tsx), [`app/privacy/page.tsx`](app/privacy/page.tsx)
- [x] **F0.7** SEO plumbing — [`app/sitemap.ts`](app/sitemap.ts) with hreflang, [`app/robots.ts`](app/robots.ts) disallows `/tools/`, [`app/_lib/metadata.ts`](app/_lib/metadata.ts), [`app/_lib/json-ld.ts`](app/_lib/json-ld.ts) (Organization, WebSite, WebPage, BreadcrumbList, FAQPage)

Status snapshot (verify with `pnpm run build && pnpm run lint`):
```
Route (app)
┌ ○ /
├ ○ /bijli-bill
├ ○ /light-bill
├ ○ /power-bill
├ ○ /privacy
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /tools/bill-explainer
```

---

## Phase 1 — Polish the four landings (parallelisable)

Each task touches mostly one file; pick any task and merge independently.

- [ ] **P1.1 — Curate the DISCOM list**
  - Owner files: [`app/_data/discoms.ts`](app/_data/discoms.ts)
  - Current state: ~110 rows including transmission/legacy entries used as filler. Trim to a clean **73-row** distribution-only list with accurate `acronym`, `name`, `state`, `consumerHint` (verify against each DISCOM's official site).
  - Done when: no duplicate `slug`, no "transmission" rows, every `consumerHint` matches the real bill layout, ≥10 of the top-revenue DISCOMs verified.

- [ ] **P1.2 — Replace anonymised trust strip with real client tagline (or keep anonymised, but make it crisper)**
  - Owner files: [`app/_components/TrustStrip.tsx`](app/_components/TrustStrip.tsx)
  - Per §10 the copy must stay AI-free. If client logos get approved, add a sprite-rendered logo row instead of text. If not, tighten the current text strip.
  - Done when: no logo causes layout shift; LCP unaffected.

- [ ] **P1.3 — Hero visual polish per cluster**
  - Owner files: [`app/_components/Hero.tsx`](app/_components/Hero.tsx), per-cluster mood per §3.2–3.5 of the brief.
  - `/`: CSS-only annotated charge mockup (already stubbed). `/power-bill`: arrows-over-bill stub. `/bijli-bill`: WhatsApp-card aesthetic in hero (currently generic). `/light-bill`: shop-signage palette.
  - Done when: each cluster's hero block visually differs at a glance — no shared photographic asset, all CSS.

- [ ] **P1.4 — Power-bill before/after slider: real two-state mockup**
  - Owner files: [`app/_components/BeforeAfterSlider.tsx`](app/_components/BeforeAfterSlider.tsx)
  - Today: a static 2-column card. Convert to a real "clip-path on slider position" overlay between two CSS-drawn bill mockups, animated on scroll-into-view.
  - Done when: dragging the range visibly slides the reveal; reduced-motion preference respected.

- [ ] **P1.5 — `/bijli-bill` Hinglish copy pass**
  - Owner files: [`app/_data/clusters.ts`](app/_data/clusters.ts) (`bijli-bill` entry)
  - Have a native Hindi/Hinglish writer review the H1, sub, threeUp, howItWorks, contentBody, faqs. Keep loanwords in Latin script (`bill`, `consumer number`, `DISCOM`), verbs in Hindi (`check karein`, `bachayein`).
  - Done when: a native speaker signs off; no Devanagari used for English loanwords.

- [ ] **P1.6 — `/light-bill` use-case strip prefill**
  - Owner files: [`app/_components/UseCaseStrip.tsx`](app/_components/UseCaseStrip.tsx), [`app/_components/BillExplainer.tsx`](app/_components/BillExplainer.tsx)
  - Today the prefill only sets `consumerNumber`. Add a `discomSlug` to each archetype so the typeahead also pre-selects a sensible DISCOM.
  - Done when: clicking "Kirana store" sets both fields and scrolls.

- [ ] **P1.7 — Privacy policy real content**
  - Owner files: [`app/privacy/page.tsx`](app/privacy/page.tsx)
  - Replace placeholder with: data categories collected, retention (90 days for bill files), grievance officer contact, DPDP Act 2023 references, opt-out path. Legal-reviewed.

- [ ] **P1.8 — Lead storage hardening**
  - Owner files: [`app/_actions/submit-lead.ts`](app/_actions/submit-lead.ts)
  - Add: per-IP rate limit (memory-backed for now), basic spam heuristics (honeypot field added to [`BillExplainer`](app/_components/BillExplainer.tsx)), email-vs-WhatsApp explicit storage, `referer` capture.
  - Done when: bot floods are rejected without writing rows; honest submits unaffected.

- [ ] **P1.9 — Methodology page (`/methodology`)**
  - New file: `app/methodology/page.tsx`
  - Brief §4.3 says each savings card links to "How we calculated this". Build a single methodology page with anchors per finding type (contract demand, PF, FPPCA, tariff category, estimated reads).
  - Done when: card links from the audit-output stub (later phase) resolve to anchors on this page.

---

## Phase 2 — Conversion engine for real (parallelisable in pairs)

This is the audit/output flow the brief specifies but Phase 0 stubbed. Pair an extraction agent with a UI agent.

- [ ] **P2.1 — Tariff knowledge graph (data layer)**
  - New: `app/_data/tariff/` directory of per-DISCOM, per-category, per-effective-date JSON files. Schema includes `energySlabs`, `demandRate`, `fixedCharge`, `dutyPct`, `fppcaRate`, `pfPenaltyThreshold`.
  - Companion: `app/_lib/tariff.ts` resolver that takes `(discomSlug, category, date)` and returns the active record.
  - Done when: schema versioned, three DISCOMs (MSEDCL, BESCOM, TANGEDCO) seeded and unit-tested.

- [ ] **P2.2 — Bill extraction service (server)**
  - New: `app/_actions/extract-bill.ts` (server action) + `app/_lib/extract/*` with two adapters: `upload` (OCR via chosen vendor; record in `package.json`) and `autofetch` (DISCOM portal scraper or API).
  - Returns a structured `BillRead` (DISCOM, category, charges array, period, MD, consumerNumber, kWh).
  - Done when: a real MSEDCL bill upload returns a valid `BillRead` in <12s; failures fall back per §4.4.

- [ ] **P2.3 — Findings engine**
  - New: `app/_lib/findings.ts` — pure rules over `BillRead` + tariff record producing the four card types (green/yellow/red) per §4.3.
  - Each rule emits `{ id, severity, title, body, savingsRange?, methodologyAnchor }`.
  - Done when: snapshot tests for contract-demand, PF, FPPCA, category, estimated-reading rules.

- [ ] **P2.4 — Audit output UI (Section 1 / 2 / 3)**
  - New: `app/_components/AuditOutput.tsx` (`'use client'`).
  - Section 1: bill summary callout + line-item table (desktop) / stacked cards (mobile). Section 2: findings cards with cluster-aware colour. Section 3: existing qualification form (lift from [`BillExplainer`](app/_components/BillExplainer.tsx)).
  - Wire [`BillExplainer`](app/_components/BillExplainer.tsx) to render `AuditOutput` once `extractBill` resolves (replacing the current straight-to-qualify behaviour). Keep the existing stub flow behind a `?stub=1` query for SEO previews.

- [ ] **P2.5 — Processing screen (real stages, min 3s, max 12s)**
  - New: `app/_components/ProcessingScreen.tsx` — streamed stage updates from `extractBill`. Falls back to "we'll email you" after 12s.
  - Done when: WebSocket or Server-Sent-Events stream renders the four stages from §4.2 with check-marks.

- [ ] **P2.6 — Out-of-scope DISCOM lead capture**
  - When a `BillRead.discomSlug` isn't in the tariff graph: show Section 1 only + email capture per §4.4, write a `tier: 'waitlist'` row with the DISCOM slug.

---

## Phase 3 — Programmatic SEO engine

- [ ] **P3.1 — `/electricity-bill/[discom]/` route**
  - New: `app/electricity-bill/[discom]/page.tsx`. Server component with `generateStaticParams` from the DISCOM seed.
  - Render the eight-section template from §5.1, JSON-LD `WebPage` + `BreadcrumbList` + `FAQPage`. Reuse [`BillExplainer`](app/_components/BillExplainer.tsx) with `selected` pre-locked to that DISCOM.
  - Done when: at least 5 DISCOMs render with real DISCOM facts (consumers, area, regulator, last-tariff-order date — pulled from `app/_data/discoms-meta.ts`).

- [ ] **P3.2 — Per-DISCOM annotated bill image**
  - Owner: design + content writer pair. Output: one `public/discoms/[slug]/sample-bill.webp` per DISCOM + an `annotations` JSON keyed to that image (callouts).
  - Render via new `app/_components/AnnotatedBill.tsx` (CSS-positioned callouts over the image).
  - Done when: a `next build` of `/electricity-bill/msedcl` ships an LCP ≤ 1.5s with the annotated bill above the fold.

- [ ] **P3.3 — Known issues + tariff slabs blocks**
  - New: `app/_components/DiscomKnownIssues.tsx`, `app/_components/TariffSlabsTable.tsx`. Both read from the tariff KG (P2.1) and `app/_data/discoms-issues.ts`.
  - Done when: MSEDCL page mentions monsoon estimated reads, FAC volatility, kVAh switch (each dated + sourced).

- [ ] **P3.4 — City pages `/electricity-bill/[discom]/[city]/`**
  - New: `app/electricity-bill/[discom]/[city]/page.tsx`. `generateStaticParams` gated on `urbanConsumers > 50_000` per `app/_data/cities.ts`.
  - Adds CGRF/Ombudsman addresses, sub-divisions, MIDC-style local industrial notes.
  - **Hard rule:** if a city has no real local content, skip it. Empty templates are forbidden.

- [ ] **P3.5 — Drip-feed indexing**
  - New: `app/_lib/programmatic-publish.ts` returns "publish-able" status per page based on `publishAt` in `discoms-meta.ts` (≤ 5 new pages/day for the first 30 days per §8.6).
  - `app/sitemap.ts` reads this so unpublished pages stay out of the sitemap.

- [ ] **P3.6 — Segmented sitemaps**
  - Update [`app/sitemap.ts`](app/sitemap.ts) to emit `sitemap-clusters.xml`, `sitemap-articles.xml`, `sitemap-discoms.xml`. Submitted separately in Search Console (manual step outside this repo).

---

## Phase 4 — Long-tail cluster articles (40 pages)

- [ ] **P4.1 — Article route + MDX support**
  - New: `app/articles/[cluster]/[slug]/page.tsx`. Add MDX via `@next/mdx` (one new dep — record in `package.json`).
  - Each article frontmatter: `{ cluster, title, description, date, author, primaryKeyword, secondaryKeywords[] }`.
  - Internal linking rule per §8.3 enforced in lint: an article links up to its cluster landing in first paragraph + conclusion, plus exactly two sibling articles.

- [ ] **P4.2 — Article authoring**
  - Owner: content writers, one per cluster.
  - Deliver 8–12 articles per cluster (32–48 total). Track them in `app/_data/articles.ts`.

- [ ] **P4.3 — Article schema**
  - JSON-LD `Article` with author/dates/image emitted per article via [`JsonLd`](app/_components/JsonLd.tsx).

---

## Phase 5 — Performance, analytics, ops

- [ ] **P5.1 — Image strategy**
  - Move per-DISCOM annotated bills to `next/image` with explicit `width/height` and `priority` on the LCP image. Verify CLS ≤ 0.05.

- [ ] **P5.2 — Analytics gate**
  - Add `app/_components/Analytics.tsx` (client) that loads after 5s idle or on scroll-to-footer per §7. Wire to a self-hosted endpoint or Plausible.

- [ ] **P5.3 — CWV measurement**
  - Add `app/_lib/web-vitals.ts` reporting to the analytics endpoint. Dashboard out of repo.

- [ ] **P5.4 — Multi-lockfile warning**
  - Today's `pnpm run build` prints: "Detected additional lockfiles". Either set `turbopack.root` in [`next.config.ts`](next.config.ts) to the repo dir, or remove the parent lockfile.

- [ ] **P5.5 — Lead routing**
  - Replace `data/leads.jsonl` append with a real sink (e.g. Resend for `tier: 'high'` calendar-invite emails, Postgres or a managed JSON store for archive). Keep the local file as a dev fallback.

---

## Phase 6 — Out of scope for the pilot

Listed here so they don't accidentally get added without an explicit prompt.

- Residential / B2C product.
- Native mobile apps (PWA installability is enough).
- Vernacular languages beyond Hinglish (Tamil, Telugu, Marathi, Bengali) — deferred.
- Free-tier dashboard / account features — deferred until the first 100 leads.

---

## Orchestration notes (for multi-agent runs)

- **Single-file tasks** (P1.1, P1.2, P1.4, P1.7, P5.4) are perfect for one-shot subagents. Provide the file path + acceptance criteria from the bullet above.
- **Pair tasks**: P2.1 + P2.2 + P2.3 must merge in order (data → extraction → rules); P2.4 + P2.5 can branch off after P2.2 with a stubbed extractor; P3.1 unlocks P3.2/P3.3/P3.4 in parallel.
- **Forbidden moves for every agent** (re-state in every prompt):
  1. Don't introduce "AI"/"agent"/"intelligent"/"powered by"/"LLM" anywhere except the footer about-line in [`app/_components/SiteFooter.tsx`](app/_components/SiteFooter.tsx).
  2. Don't add cross-cluster body links — only the footer "Also available in" block.
  3. Don't generate a programmatic page that doesn't add real local detail.
  4. Don't add a runtime dep without recording it in `package.json` and noting it in the relevant task bullet.
- **Acceptance gate per task:** `pnpm run lint && pnpm run build` must pass with no new warnings.

---

## Success criteria at week 12 (from the brief, unchanged)

- **Indexation:** 4/4 cluster landings indexed; ≥60% programmatic DISCOM pages indexed; ≥80% cluster articles indexed.
- **Ranking:** top-30 for at least one of the 4 primary keywords; top-10 for ≥5 long-tail variants per cluster; top-5 for ≥10 DISCOM-specific queries.
- **Behaviour:** ≥35% scroll-to-tool, ≥18% tool completion, ≥60% qualification-view, ≥12% lead submit.
- **Leads:** ≥5 sales-routed leads (6+ connections or ₹5L+ spend) attributable to the pilot.
