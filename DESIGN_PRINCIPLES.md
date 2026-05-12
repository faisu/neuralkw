# NeuralKW — design principles

Enforceable visual and UX standards for the App Router landings. Product and SEO rules stay in [`plan.md`](plan.md); this file is the **UI contract** for implementation.

## 1. Brand and copy guardrails

- Do **not** use *AI*, *agent*, *LLM*, *powered by*, or similar on any landing headline, sub, body, FAQ, CTA, or trust strip. The **only** allowed “agent” mention is the footer about-line in [`app/_components/SiteFooter.tsx`](app/_components/SiteFooter.tsx).
- Four cluster routes are four **distinct front doors** (tone, hero treatment, accent). Do not merge copy or positioning across clusters except the shared chrome (header, footer pattern).
- Cross-cluster discovery lives in the footer **“Also available in”** list, not in competing body copy (see `plan.md`).

## 2. Layout grid

- Content width: `max-w-6xl` with `px-4 sm:px-6` unless a full-bleed band is intentional.
- Header: sticky `top-0 z-40`, translucent bar with blur; do not place interactive elements under it without scroll padding.
- Cluster landing: two-column band uses `lg:grid-cols-12` with sticky aside (`lg:sticky lg:top-20`) for the bill tool; keep mobile order logical (hero → trust → primary task).
- Reserve space for [`StickyMobileCTA`](app/_components/StickyMobileCTA.tsx): primary actions in the decoder must not sit flush against the bottom safe area.

## 3. Color and clusters

- Accents come from the cluster wrapper class on `<main>` (`cluster-electricity`, `cluster-power`, `cluster-bijli`, `cluster-light`) and CSS variables in [`app/globals.css`](app/globals.css): `--color-accent`, `--color-accent-muted`, and fixed `--color-accent-electricity` where needed (e.g. footer links).
- Do **not** hard-code one cluster’s hex on another route. Prefer `bg-[var(--color-accent)]`, `text-[var(--color-accent)]`, `ring-[var(--color-accent)]`, or Tailwind `zinc` neutrals.
- Muted fills: use `*-50` / `*-100` tied to the same hue family as the cluster accent.

## 4. Typography

- Default: Geist Sans from [`app/layout.tsx`](app/layout.tsx). Devanagari stack applies under `.cluster-bijli` for `[lang="hi"]` and `.font-devanagari` per globals.
- Headings: `text-balance`; marketing paragraphs: `text-pretty`. Maintain clear step-down from `h1` → section titles → body.
- Currency: use `₹` with consistent numeral grouping style used elsewhere on the site.

## 5. Components and states

- Links and ghost buttons: `hover:text-[var(--color-accent)]` (or underline pattern used in footer) for consistency with header nav.
- Primary CTA pills: `rounded-full`, `bg-[var(--color-accent)]`, `text-white`, adequate padding; loading/disabled states must not rely on colour alone.
- Cards: prefer `rounded-2xl`, `border`, subtle `shadow-sm` / `shadow-lg` for elevation steps—not flat grey slabs beside each other without hierarchy.

## 6. Accessibility

- Minimum **44×44px** touch targets on primary nav and CTAs (see [`SiteHeader`](app/_components/SiteHeader.tsx)).
- Global `:focus-visible` uses the cluster accent; do not remove focus rings for “cleaner” UI.
- Decorative hero panels: `aria-hidden` on purely illustrative mockups. Real controls must stay in the tab order with visible focus.
- Respect **`prefers-reduced-motion`**: no auto-play motion that cannot be reduced (see hero CSS in [`Hero.tsx`](app/_components/Hero.tsx)).

## 7. Performance and SEO UX

- Landings favour **CSS-only** hero illustrations (no heavy bitmaps for core LCP regions unless explicitly approved).
- Avoid layout shift when loading strips or logos; reserve height where assets may load later.
- When adding images: meaningful `alt`, dimensions or aspect ratio reserved.

## 8. Review gate

Before merge:

1. `pnpm run build && pnpm run lint`
2. Spot-check `/`, `/power-bill`, `/bijli-bill`, `/light-bill` at **~390px and ~1280px** width.
3. Confirm cluster accent and hero differentiation still read clearly at a glance.

## 9. Audit trail

- Visual audits: store dated screenshots and short notes under [`design-audit/`](design-audit/) (see `design-audit/2026-05-12/AUDIT_NOTES.md`).
