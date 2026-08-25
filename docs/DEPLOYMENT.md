# Deployment

## Actual hosting method (verified from repo/account evidence, not guessed)

This site is deployed on **Cloudflare Pages**, connected directly to this
GitHub repository via the "Cloudflare Workers and Pages" GitHub App:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- Framework preset: Astro
- Custom domains attached to the Pages project: `buildwithai.in` and
  `www.buildwithai.in` (the latter 301-redirects to the apex via a Cloudflare
  Redirect Rule)
- Every push to `main` triggers an automatic build + deploy — there is no
  separate manual deploy step and no deploy key/token stored in this repo.

## Production security headers

`public/_headers` is committed in this repo and uses Cloudflare Pages'
native `_headers` file support — **Cloudflare Pages reads this file from
the build output automatically**, so once this file is committed and
deployed, the headers below become active with no further host-side
configuration:

- `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=()`
- `X-Frame-Options: DENY` (clickjacking protection; `frame-ancestors 'none'`
  in the CSP below does the same job for CSP-aware browsers)
- `Content-Security-Policy` — see the honest caveat below.

**Until this file is committed and a new deployment runs, none of these
headers are active in production.** That is the one remaining manual step:
commit `public/_headers`, push, and let the already-configured automatic
deploy run.

### CSP honesty note

The shipped CSP is `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`.

`'unsafe-inline'` is present in `script-src` and `style-src` because:

- Astro inlines a couple of small `<script type="module">` blocks (the
  mobile-nav toggle, the interactive demo) directly into the HTML rather
  than always emitting external files.
- The interactive demo sets one inline `style="width:…"` per fit-score bar.

This is a real, deliberate tradeoff, not an oversight: this site loads zero
third-party scripts, so `'unsafe-inline'` here only widens what the site's
*own* first-party code can already do — it does not open the door to any
external origin. Tightening this further (moving those scripts to external
files, replacing the inline width style with a CSS custom property) is
possible and is tracked in `docs/ROADMAP.md`, not done here to keep this
change reviewable and scoped.

## Rollback

Cloudflare Pages keeps every deployment for this project. To roll back:
Cloudflare dashboard → Workers & Pages → `buildwithai-portfolio` →
Deployments → pick a prior deployment → "Rollback to this deployment".
This re-points production traffic at that build without a new git push.

## Domain and HTTPS checks

```bash
curl -sI https://buildwithai.in | head -20
curl -sI https://www.buildwithai.in | head -5   # expect a 301 to the apex
```

Confirm the response includes the headers above once `public/_headers` is
live, and that the domain serves over HTTPS with a valid certificate
(Cloudflare's Universal SSL, already provisioned for this zone).
