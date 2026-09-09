---
description: Safety-check, refresh README, wire up GitHub Pages deploy, and push to origin
allowed-tools: Bash, Read, Edit, Write, Grep, Glob
---

Run the following pipeline in order. Stop and report back (do not push or touch GitHub settings) if any pre-flight check in step 1 fails — don't try to silently work around it.

## 1. Pre-flight safety checks

- Run `git status` and confirm there's a git repo with a remote named `origin`. If either is missing, stop and tell the user.
- Check `.gitignore` covers at minimum: `node_modules`, `dist`, `.env`, `.env.*`, `*.local`. Add any that are missing.
- Secret scan: run `git diff --cached` and `git status --porcelain` to see what would be committed, then grep the actual changed/untracked files (not the whole repo) for likely secrets — patterns like `AKIA[0-9A-Z]{16}`, `sk-[a-zA-Z0-9]{20,}`, `-----BEGIN.*PRIVATE KEY-----`, `ghp_[a-zA-Z0-9]{36}`, and generic `(api[_-]?key|secret|token|password)\s*[:=]\s*['"][^'"]{8,}['"]`. Also flag any `.env` file that isn't gitignored.
  - If something matches, stop and list exactly what matched and where — do not commit or push. Let the user decide (real secret vs. false positive like a placeholder or a `.env.example`).

## 2. Refresh README

Invoke `/readme` to regenerate `README.md` from the current codebase.

## 3. Create/update the Pages deploy workflow

Write `.github/workflows/deploy.yml` with exactly this content (create the `.github/workflows/` directory if it doesn't exist):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

This project's `vite.config.ts` already sets `base: './'`, so the build works unmodified under a GitHub Pages project-page subpath — don't change it.

## 4. Commit and push

- `git add -A`
- Commit with a clear message describing what changed (README refresh + Pages workflow), e.g.:
  ```
  git commit -m "$(cat <<'EOF'
  Add GitHub Pages deploy workflow and refresh README

  Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
  EOF
  )"
  ```
  Skip the commit (and say so) if there's nothing staged.
- Push: `git push origin HEAD:main` (or `git push -u origin main` if `main` has no upstream yet).

## 5. Enable GitHub Pages (build via Actions)

Determine `OWNER/REPO` from `gh repo view --json nameWithOwner -q .nameWithOwner`.

Enable Pages with the workflow build type:

```
gh api repos/OWNER/REPO/pages -X POST -f build_type=workflow
```

If that fails because Pages is already enabled (422), switch to update:

```
gh api repos/OWNER/REPO/pages -X PUT -f build_type=workflow
```

## 6. Set repo metadata

```
gh repo edit OWNER/REPO \
  --description "Marlowe & Ash — bridal & wedding photography studio site" \
  --homepage "https://OWNER.github.io/REPO/" \
  --add-topic react --add-topic typescript --add-topic vite --add-topic tailwindcss --add-topic wedding-photography
```

Adjust the description/topics if the repo name or actual content suggests something more accurate — don't blindly copy the example above if it no longer fits.

## 7. Report the live URL

Print the GitHub Pages URL (`https://OWNER.github.io/REPO/`) and note that the first deploy will take a minute or two to go live — link to the Actions tab (`https://github.com/OWNER/REPO/actions`) so the user can watch the workflow run.
