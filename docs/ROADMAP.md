# Internal Roadmap

Internal planning document. Not linked from the public site.

## P0 — Launch correctness

- [x] Private-source links removed (config-driven `sourceUrl: string | null`,
      contextual fallback CTAs, no `ai-job-agent` GitHub URLs left in
      rendered HTML or structured data)
- [x] Claims corrected (Naukri profile persistence vs. per-application
      isolation; demo language now "Simulate applicant confirmation"; ATS
      platform maturity labeled implemented/live-validated/experimental)
- [x] Optional links (LinkedIn, GitHub profile, resume, contact email)
      safely hidden when absent — config uses `string | null`, nothing
      guessed
- [x] Genuine 404 implemented (`src/pages/404.astro`; Cloudflare Pages
      serves `dist/404.html` with a real 404 status automatically)
- [x] Accessibility blockers fixed (skip link, `aria-current`, Escape +
      focus return on mobile nav, visible focus rings, reduced-motion)

## P1 — Trust and recruiter conversion

- [x] Verified LinkedIn supplied by the owner (2026-08-26) and wired in
- [ ] Redacted real product screenshots — **not done on purpose**. No
      approved real screenshot of the actual running desktop app exists.
      Per explicit instruction, this repo does not fabricate product
      screenshots to fill that gap; the case-study page reads as a
      complete design without one. Needs the owner to capture and redact
      real screenshots (or explicitly approve a clearly-labeled
      illustrative mockup instead).
- [x] Strong project outcome/evidence section (case-study page's
      "Engineering evidence" / "Lessons learned" sections)
- [x] Custom social card (`public/og-image.png`, generated locally, no
      private data)
- [x] Custom favicon shipped (`public/favicon.svg`, a terminal `>_` mark,
      replacing the default Astro rocket icon) — design is a placeholder
      pending the owner's sign-off, not a default
- [x] Contact journey tested (email/LinkedIn/GitHub links verified to
      render only when configured; no dead placeholder CTAs)

## P2 — Engineering credibility

- [x] CI verification workflow added (`.github/workflows/verify.yml`) —
      build + check + test + link-check + browser smoke/a11y tests on
      every push/PR; it does not deploy
- [x] Architecture/data-flow documentation (`/architecture` page; process
      topology sourced from the real ADRs)
- [x] Browser smoke tests (`tests/smoke.spec.ts`, `tests/mobile-nav.spec.ts`,
      `tests/not-found.spec.ts`, `tests/demo-keyboard.spec.ts`) — Playwright,
      desktop + mobile viewports, wired into `npm run test:e2e` / CI. Astro
      7's `dev`/`preview` always daemonize themselves now, which breaks
      Playwright's built-in `webServer` process management — worked around
      with `scripts/run-e2e.mjs` (start the dev daemon, poll until ready,
      run tests, always stop it after).
- [x] Accessibility regression tests — `tests/accessibility.spec.ts` runs an
      axe-core scan against every route on both viewports (14 scans, zero
      violations) plus horizontal-overflow checks at 320/390/768px and a
      `prefers-reduced-motion` check. This is real coverage, not aspirational:
      writing it caught and fixed a genuine bug — the architecture page's
      scrollable process-topology diagram wasn't keyboard-focusable
      (`tabindex="0"` + `role="region"` added).
- [ ] Performance budget — not defined yet
- [x] Link checker (`scripts/check-links.mjs`, wired into `npm run
      validate` and CI)

## P3 — Hosting hardening

- [x] Production headers enabled at the real host — `public/_headers` was
      committed, pushed (2026-08-26), and deployed. Verified live via
      `curl -I https://buildwithai.in/`: HSTS, CSP, Permissions-Policy,
      Referrer-Policy, X-Content-Type-Options, X-Frame-Options all present.
- [x] Automated deployment already exists (Cloudflare Pages ← GitHub App,
      confirmed from account evidence) — no change needed here
- [x] Rollback documented (`docs/DEPLOYMENT.md`)
- [x] Domain and HTTPS checks — re-run against production after the
      2026-08-26 deploy; headers confirmed live, unknown routes confirmed
      to return a real 404

## P4 — Future portfolio growth

- [ ] Additional projects with the same evidence standard
- [ ] Engineering notes / development journal
- [ ] Privacy-safe release history (the public `/changelog` already covers
      part of this)
- [ ] Optional privacy-preserving analytics — only after an explicit,
      separate decision; nothing implemented or planned by default
