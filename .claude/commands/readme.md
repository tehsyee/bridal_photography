---
description: Regenerate README.md from the current state of the codebase
---

Regenerate `README.md` at the repo root so it accurately describes the project as it exists right now. Do not just touch up the existing file — read the current sources and rebuild the content from them.

Before writing, gather facts (do not skip this — stale facts are the whole failure mode this command exists to prevent):

- Read `CLAUDE.md` for the project description, stack, and architecture notes.
- Read `package.json` for the name, dependencies, and the exact `scripts` block.
- List `src/components/` and `src/data/` to confirm the section list and content files are current.
- Note any tooling specifics that affect setup (e.g. Tailwind v4 CSS-first config, no `tailwind.config.js`; no test suite).

Write `README.md` with:

1. Project title and a one/two-sentence description (single-page marketing/booking site, React + TypeScript + Vite + Tailwind v4, no backend).
2. Tech stack, bulleted.
3. Setup instructions: clone, `npm install`, `npm run dev`.
4. All scripts from `package.json`'s `scripts` block, each with a one-line explanation — copy the exact command strings, don't paraphrase them.
5. A short "Project structure" section pointing at `src/components/` (sections), `src/data/` (editable content), `src/lib/` (framework-agnostic logic), matching what `CLAUDE.md` documents.
6. The `file://` double-click caveat from `CLAUDE.md` (Chromium blocks ES modules under `file://`; always use `npm run dev`/`npm run preview`).
7. Skip anything not true of this repo (no license badge unless a `LICENSE` file exists, no CI badge unless a workflow exists at the time this runs — check `.github/workflows/` before adding one).

Keep it concise — this is a README for a small static site, not a monorepo. No placeholder sections, no marketing fluff beyond what's needed to say what the site is.

After writing, show a short diff summary of what changed and why.
