# Mind to Machine

A responsive national-level hackathon landing page for **GDGoC CUI Wah**.

## Deploy on Vercel

Import this GitHub repository into Vercel. The included `vercel.json` sets the framework to Other, disables installation/build steps, and serves `public/`. No environment variables are needed.

## Run locally

```sh
npm start
```

Requires Python 3. Open http://localhost:8000. No npm install is necessary.

## Edit

- `public/index.html`: content, sponsor slots, schedule, judges, organizers, contributors, pricing, FAQ, and developer credit.
- `public/mtm/style.css`: responsive styles and animations.
- `public/mtm/site.js`: mobile navigation, registration status dialog, reveals, scrambling, and parallax.
- `public/assets/mtm-logo.svg`: MTM wordmark.
- `public/mtm/gdg-mark-3d.svg`: transparent 3D bracket mark.

Event date, timings, exact venue, sponsor logos, judges, team profiles, registration URL, and fee/team details remain placeholders. Registration buttons currently show a status dialog; connect them to the official form when available.

## Credits

Built with caffeine & questionable sleep by [Muhammad Ismail](https://github.com/mrismail-m) · [LinkedIn](https://www.linkedin.com/in/mrismail/).

Adapted from the publicly served TechTO landing page, retaining its downloaded typography and selected decorative assets. Third-party assets and bundled libraries remain subject to their respective owners’ licenses. The repository includes only active site files, not the original full download archive.
