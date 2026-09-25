# Aaghaaz – A Beginning · Website

A complete, immersive single-site build for **Aaghaaz – A Beginning**, a non-profit
organisation based in Jalandhar, Punjab, working for the betterment of
less-privileged women through vocational training, the Aaghaaz Boutique and the
Aaghaaz Magazine.

## Tech

Vanilla **HTML + CSS + JS only — no build step, no frameworks**. The site runs
as-is on any static host.

- Display type: **Fraunces** (Google Fonts), body: **Manrope**
- Palette: logo magenta `#A02080`, warm ivory `#FAF5EC`, deep plum `#2B0F26`,
  gold accent `#C99B4A`
- Full-screen parallax hero, scroll-reveal animations (IntersectionObserver),
  sticky nav with scroll state + mobile menu, active-section highlighting,
  embedded Google Map (no API key needed)
- Responsive: desktop → tablet → mobile; `prefers-reduced-motion` respected

## Structure

```
website/
├── index.html          # all sections
├── css/
│   └── styles.css      # design system + responsive
├── js/
│   └── main.js         # nav, reveal, parallax, scroll-spy
└── assets/
    ├── logo.png        # organisation logo
    └── img/
        ├── hero.jpg        # hero — tailoring classroom
        ├── stitching.jpg   # vocational training card
        ├── beautician.jpg  # beautician training
        ├── english.jpg     # English-speaking class
        ├── boutique.jpg    # boutique band + card
        └── celebration.jpg # our story / community
```

Sections: Hero → Our Story → Programs (3 cards + training focus) →
Boutique → Magazine → Voices (Audre Lorde quote) → Get Involved
(Volunteer + Donate) → Contact → Footer.

## Deploy on GitHub Pages

1. Create a new repo (e.g. `aaghaaz-website`) and push this folder's contents
   to the repo root.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch* →
   branch `main`, folder `/ (root)` → Save.
3. The site goes live at `https://<username>.github.io/aaghaaz-website/`.

No build command or output directory is needed.

## Content honesty

All copy is drawn from the organisation's own site and Facebook page. No
impact statistics are claimed anywhere on the site. The "Donate Now!" button
opens a pre-addressed email to the organisation (`aaghaazbegin@gmail.com`);
wire it to a payment link if/when the NGO provides one.

## Contact (as published by the organisation)

96, Guru Ravidass Nagar, Jalandhar, Punjab 144003, India ·
+91 181 501 0011 · aaghaazbegin@gmail.com ·
[facebook.com/ouraaghaaz](https://www.facebook.com/ouraaghaaz)
