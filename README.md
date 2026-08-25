# Build With AI — buildwithai.in

Pushpendra Singh's engineering-studio portfolio. Static Astro site, deployed
to Cloudflare Pages at [buildwithai.in](https://buildwithai.in). The flagship
content is a public case study of **AI Job Agent**, a private, local-first
desktop application — this repo presents the case study, not the
application's source.

## Purpose

- Give recruiters/engineers a fast, honest read on the AI Job Agent project:
  the problem, the constraints, the architecture, and what's actually
  implemented vs. planned.
- Run a synthetic, privacy-safe interactive demo of the product's workflow —
  no real accounts, boards, or applications are ever touched.
- Stay a portfolio site, not a product site: no accounts, no tracking, no
  third-party scripts beyond what's declared below.

## Public routes

| Route                     | Purpose                                              |
| -------------------------- | ----------------------------------------------------- |
| `/`                        | Homepage / hero                                       |
| `/about`                   | About the author                                      |
| `/contact`                 | Contact links (email, GitHub, LinkedIn — when set)    |
| `/projects/ai-job-agent`   | The flagship case study                               |
| `/demo/ai-job-agent`       | Synthetic, client-side-only interactive demo          |
| `/architecture`            | Process topology, privacy/safety boundaries, testing  |
| `/changelog`               | Dated development history, sourced from real git log  |
| `/404`                     | Custom not-found page                                 |

## Local setup

```bash
npm ci
npm run dev
```

## Commands

| Command                     | Action                                                |
| ---------------------------- | ------------------------------------------------------ |
| `npm run dev`                 | Local dev server at `localhost:4321`                    |
| `npm run build`                | Production build to `./dist/`                           |
| `npm run preview`              | Preview the production build locally                    |
| `npm run check`                 | Astro type/content check                                 |
| `npm test`                       | Vitest unit tests (`src/**/*.test.ts`)                     |
| `npm run check:links`             | Crawl the built site for broken internal links and stray private-repo URLs |
| `npm run test:e2e`                 | Playwright smoke tests + axe accessibility scan (`tests/**/*.spec.ts`), desktop + mobile |
| `npm run generate:og-image`        | Regenerate `public/og-image.png` from `scripts/og-image.svg` |
| `npm run validate`                    | `check` + `build` + `test` + `check:links` + `test:e2e`, in that order |

## Architecture

- **Astro 7** static site (no server runtime, no API routes, no database).
- **Tailwind v4** via `@tailwindcss/vite`, dark-graphite/electric-cyan design
  system defined in `src/styles/global.css`.
- System font stack only (`--font-sans` / `--font-mono` in `global.css`) —
  no remote font requests.
- `src/lib/links.ts` — a small pure helper (`sourceCta`, `isPublicLink`) that
  decides whether to render a "view source" or personal-link CTA. It never
  fabricates a URL: a `null` config value means the link is hidden or a
  page renders a contextual fallback instead. Unit-tested in
  `src/lib/links.test.ts`.
- `src/pages/demo/ai-job-agent.astro` — the interactive demo. Vanilla
  client-side TypeScript, no framework, no network calls, no backend. All
  data is hardcoded and fictional.

## Content / configuration model

- `src/config.ts` — `siteConfig` (brand copy, optional personal links) and
  `projects.aiJobAgent` (name, version, `sourceUrl`). Every optional link
  (`githubUrl`, `linkedinUrl`, `contactEmail`, `resumeUrl`,
  `projects.aiJobAgent.sourceUrl`) is `string | null`. A `null` value must
  hide the corresponding UI — never guess, infer, or fabricate a URL to fill
  the gap.
- Case-study claims (test counts, platform-support maturity, version number)
  should be re-verified against the real `ai-job-agent` source before
  editing this repo, not copied forward from memory — that project changes
  fast and this site is a snapshot of it.

## Privacy rules

- `ai-job-agent`'s implementation repository is **private**. This repo must
  never link to it, embed its URL in structured data, or imply it's publicly
  browsable.
- Never publish real applicant data, real resumes, real employer names,
  screenshots of the real running desktop app, credentials, `.env` values,
  database files, browser-profile data, or diagnostic exports. Every data
  point in the demo is fictional, generated specifically for this site. Do
  not fabricate product screenshots of the real app — if no real, redacted
  screenshot exists, the site should read completely without one rather
  than substitute an invented mockup (see docs/ROADMAP.md's P1).
- No analytics, no trackers, no third-party scripts, no cookie banners.

## Accessibility expectations

- Semantic HTML first; ARIA only where semantics can't express it.
- A visible-on-focus "Skip to main content" link on every page.
- `aria-current="page"` on the active nav item, both desktop and mobile.
- The mobile nav closes on Escape and returns focus to its trigger.
- Visible focus indicators (`:focus-visible`) everywhere; no focus traps.
- `prefers-reduced-motion` is honored globally.
- The interactive demo is fully keyboard-operable (real `<button>` elements
  throughout) and its status line is an `aria-live="polite"` region that
  only updates on meaningful step changes.
- No horizontal overflow at common mobile/tablet/desktop widths — wide
  content (like the architecture page's process-topology diagram) scrolls
  in its own focusable, labeled region (`tabindex="0"`, `role="region"`)
  instead of the page.
- All of the above is regression-tested by `npm run test:e2e`: an axe-core
  scan of every route on both a desktop and a mobile viewport, plus a
  keyboard-only run through the entire interactive demo.

## Production build

```bash
npm run build
npm run preview   # serve dist/ locally to sanity-check before deploying
```

## Deployment notes

See [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) for the actual hosting setup
(Cloudflare Pages, connected to this GitHub repo) and the production
security headers, which are live via `public/_headers` (Cloudflare Pages'
native mechanism — verified with `curl -I https://buildwithai.in/`).

## What is intentionally private

- The `ai-job-agent` application's source code, database, logs, browser
  profiles, credentials, and any real applicant data. This site only ever
  describes that project; it never exposes it.
- No resume, no fabricated testimonials, no fabricated usage metrics. If a
  personal link (LinkedIn, GitHub profile, resume, contact email) isn't
  configured, it's hidden — not guessed.

## Licensing

No license has been chosen for this repository yet. Until one is added,
default copyright applies (all rights reserved) — this is a documented
placeholder, not an oversight.

## Contribution expectations

This is a personal portfolio, not an open-contribution project. Issues/PRs
from the public aren't expected or actively solicited.
