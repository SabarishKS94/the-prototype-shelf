# Project assets

One folder per project. Screenshots and images referenced from a project's `detail` block in `src/demos/flows.js` live here.

Paths in `flows.js` are absolute from the deployed root — e.g. `/projects/nba/enhancement-1-before.png`. Vite serves the `public/` folder at that root in dev and copies it into `dist/` for the GitHub Pages build.

## Naming

Keep filenames explicit so it's clear what each image is doing:

- `enhancement-1-before.png`, `enhancement-1-after.png` — paired before/after per enhancement
- `spec-<name>.png` — design specs
- `hero.png` — optional hero shot at the top of the detail page

Prefer PNG or WebP under ~500KB each. Longer screens can be cropped in half if the top and bottom tell different stories.
