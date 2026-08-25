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
      private data) — [ ] custom favicon still pending (default Astro icon
      still in place as of this pass; needs a small design decision, not
      just an engineering one)
- [x] Contact journey tested (email/LinkedIn/GitHub links verified to
      render only when configured; no dead placeholder CTAs)

## P2 — Engineering credibility

- [x] CI verification workflow added (`.github/workflows/verify.yml`) —
      build + check + test + link-check on every push/PR; it does not
      deploy
- [x] Architecture/data-flow documentation (`/architecture` page; process
      topology sourced from the real ADRs)
- [ ] Browser smoke tests — not added this pass (no browser-automation
      dependency existed in this repo yet; adding Playwright is
      straightforward but was left out to keep this change's dependency
      footprint reviewable — flagged here rather than silently skipped)
- [x] Accessibility regression tests — partial: covered by the CI build +
      manual verification in this pass, not yet an automated axe-core
      check. Automating that is the natural next step alongside browser
      smoke tests above.
- [ ] Performance budget — not defined yet
- [x] Link checker (`scripts/check-links.mjs`, wired into `npm run
      validate` and CI)

## P3 — Hosting hardening

- [ ] Production headers enabled at the real host — `public/_headers` is
      written and documented in `docs/DEPLOYMENT.md`, but is **not yet
      live** until it's committed, pushed, and a new Cloudflare Pages
      deployment runs (explicitly out of scope for this pass — no
      deploys were performed)
- [x] Automated deployment already exists (Cloudflare Pages ← GitHub App,
      confirmed from account evidence) — no change needed here
- [x] Rollback documented (`docs/DEPLOYMENT.md`)
- [ ] Domain and HTTPS checks — commands documented in
      `docs/DEPLOYMENT.md`; not re-run against production as part of this
      pass since no deploy happened

## P4 — Future portfolio growth

- [ ] Additional projects with the same evidence standard
- [ ] Engineering notes / development journal
- [ ] Privacy-safe release history (the public `/changelog` already covers
      part of this)
- [ ] Optional privacy-preserving analytics — only after an explicit,
      separate decision; nothing implemented or planned by default
