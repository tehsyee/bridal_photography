# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page marketing/booking site for a bridal & wedding photography studio ("Marlowe & Ash"), built with React 19 + TypeScript + Vite + Tailwind CSS v4. No backend, no auth, no test framework — this is a static, client-rendered site whose primary conversion action is a booking enquiry form.

## Commands

```bash
npm install       # install deps
npm run dev       # start Vite dev server (http://localhost:5173)
npm run build     # tsc -b (typecheck via project references) && vite build
npm run preview   # serve the production build locally
npm run lint       # oxlint (fast Rust-based linter, config in .oxlintrc.json)
```

There is no test suite configured.

**Important:** never open `index.html` (source or `dist/index.html`) directly via `file://` (e.g. double-clicking it). Chromium browsers block ES module scripts and their CSS under the `file://` origin via CORS, so the page renders blank — this is expected browser behavior, not an app bug. Always view the app through `npm run dev` or `npm run preview`.

## Architecture

### Section composition
`src/App.tsx` renders a fixed, ordered list of top-level section components (`Hero`, `BrandStatement`, `Portfolio`, `Experience`, `Packages`, `About`, `Testimonials`, `FAQ`, `BookingForm`, `FinalCTA`) between a `Navbar` and `Footer`. Each section is a self-contained component in `src/components/` with its own `id` attribute; `Navbar`/`Footer` link to these ids for in-page navigation.

Because `Navbar` is `position: fixed`, `src/index.css` sets `scroll-margin-top` on every `section[id]` to offset the navbar height — this is required for anchor scrolling (nav links, footer links, the `#contact` pre-fill flow) to land with the heading visible instead of hidden under the bar.

### Content lives in `src/data/`, not in components
All editable business content — package pricing/features (`packages.ts`), testimonials, FAQ copy, the 4-step experience timeline, and photography image references (`images.ts`, `portfolio.ts`) — is kept in typed data files, imported by the components that render them. When asked to change pricing, copy, or photos, edit the relevant file in `src/data/`, not the component markup.

Images are Unsplash photos referenced by CDN photo ID (not full URLs) and composed on demand via the `unsplash(id, w, h?, q?)` helper in `src/data/images.ts`, which lets each usage request its own crop/size. To swap photography, replace the id strings; to point at self-hosted images instead, change what `unsplash()` returns.

### `src/lib/` — framework-agnostic logic
- `submitBooking.ts` — the entire backend integration surface for the booking form. `submitBookingEnquiry()` is currently a stub (delay + `console.info` in dev). It's intentionally the single swap point for wiring a real backend (Formspree/Resend/Supabase/Firebase/custom API) — see the comment block in that file for exact examples. Nothing in `BookingForm.tsx` should need to change when this is implemented.
- `validateBooking.ts` — all form validation rules plus `todayIsoDate()` (used to block past wedding dates).
- `packageSelection.ts` — a tiny `window` `CustomEvent` pub/sub (`requestPackage()` / `PACKAGE_SELECT_EVENT`) that lets the "Enquire About This Package" buttons in `Packages.tsx` pre-select a package in `BookingForm.tsx`'s dropdown, since the two components aren't in a parent/child relationship.

### Scroll-reveal animation
`src/hooks/useInView.ts` (IntersectionObserver) + `src/components/Reveal.tsx` (wrapper component) implement the fade/slide-in-on-scroll effect used throughout, rather than an animation library. `prefers-reduced-motion` is handled globally in `src/index.css`, not per-component.

### Tailwind v4 — CSS-first config, no `tailwind.config.js`
Theme tokens (palette, fonts, easing) are declared in `src/index.css` under `@theme`, following Tailwind v4's CSS-first configuration — there is no JS/TS Tailwind config file. Custom tokens: ivory/charcoal/champagne/gold color scale, `--font-display` (Cormorant Garamond) / `--font-sans` (Jost), and `--ease-editorial`.

**Gotcha:** the base layer sets `h1, h2, h3, h4 { color: var(--color-charcoal) }` explicitly. Because this targets the heading element directly, it overrides an inherited `text-ivory` (or similar) set on a parent wrapper — inheritance always loses to a direct rule regardless of CSS layer order. Any heading placed on a dark section background (`Hero`, `FinalCTA`, `BookingForm`'s dark section) must set its own text color utility class explicitly rather than relying on a parent's text color.

### Build output
`vite.config.ts` sets `base: './'` so production builds use relative asset paths (portable to any host subpath). This does not make `file://` double-click viewing work (see Commands above) — that's a separate, unrelated browser restriction.
