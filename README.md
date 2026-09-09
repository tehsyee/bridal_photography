# Marlowe & Ash

A single-page marketing/booking site for a bridal & wedding photography studio. React + TypeScript + Vite + Tailwind CSS v4, client-rendered with no backend — the primary conversion action is a booking enquiry form.

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (dev server / build)
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config via `@theme` in `src/index.css`, no `tailwind.config.js`
- [oxlint](https://oxc.rs/) — Rust-based linter
- [lucide-react](https://lucide.dev/) — icons

## Setup

```bash
git clone <repo-url>
cd App03
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

> **Don't open `index.html` via `file://`** (e.g. double-clicking it). Chromium browsers block ES module scripts and their CSS under the `file://` origin via CORS, so the page renders blank — this is expected browser behavior, not an app bug. Always use `npm run dev` or `npm run preview`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`, via project references) and build for production with Vite |
| `npm run lint` | Lint the codebase with oxlint |
| `npm run preview` | Serve the production build locally |

There is no test suite configured.

## Project structure

- `src/components/` — one self-contained component per page section (`Hero`, `Portfolio`, `Packages`, `BookingForm`, etc.), each with its own `id` for in-page navigation, composed in order by `src/App.tsx`.
- `src/data/` — all editable business content: package pricing/features, testimonials, FAQ copy, the experience timeline, and photography image references. Change pricing, copy, or photos here, not in component markup.
- `src/lib/` — framework-agnostic logic: `submitBooking.ts` (the backend integration stub for the booking form), `validateBooking.ts` (form validation), `packageSelection.ts` (cross-component package pre-select event).
- `src/hooks/useInView.ts` + `src/components/Reveal.tsx` — the scroll-reveal animation, implemented via `IntersectionObserver` rather than an animation library.

See [CLAUDE.md](./CLAUDE.md) for full architecture notes.
