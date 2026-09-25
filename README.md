# Aaghaaz – A Beginning — Website v2

Modern, blazing-fast static website for **Aaghaaz – A Beginning**, a non-profit
organisation in Jalandhar, Punjab, empowering less-privileged women through
vocational training (stitching, English-speaking, beautification), the Aaghaaz
Boutique, and the annual Aaghaaz Magazine.

## Stack

Vanilla HTML + CSS + JS. Zero frameworks, zero icon libraries (inline SVG only).
Google Fonts (Fraunces + Manrope) via `preconnect` + `display=swap`.

## Structure

```
index.html          — all content sections
css/styles.css      — single stylesheet
js/main.js          — <4KB: menu, reveals, scroll-spy, parallax, back-to-top
assets/logo.png     — organisation logo
assets/img/         — generated imagery (hero, programs, illustrations, texture)
_headers            — Cloudflare Pages cache headers
```

## Performance

- One CSS file, one JS file, no build step
- `loading="lazy"` + `decoding="async"` on below-fold images, explicit
  `width`/`height` (no layout shift), `fetchpriority="high"` on the hero
- `_headers` sets immutable 1-year caching for `/assets/*`, revalidation for HTML
- `prefers-reduced-motion` respected throughout

## Deploy on Cloudflare Pages

**Option A — drag & drop:** Cloudflare dashboard → Workers & Pages → Create →
Pages → Upload assets → drop this folder. Done.

**Option B — git:** push this folder to a repo, then Pages → Connect to Git →
pick the repo → build settings: framework preset `None`, build command empty,
output directory `/` (or the folder name).

**Option C — wrangler:** `npx wrangler pages deploy . --project-name=aaghaaz`

## Notes

- All copy is truthful to the NGO's published content — no invented statistics.
- The **Donate** buttons open a pre-addressed email to `aaghaazbegin@gmail.com`
  because the NGO has no online payment link yet. When one exists, replace the
  `mailto:` hrefs with the payment URL.
- Contact details: 96, Guru Ravidass Nagar, Jalandhar, Punjab 144003 ·
  +91 181 501 0011 · aaghaazbegin@gmail.com · facebook.com/ouraaghaaz
