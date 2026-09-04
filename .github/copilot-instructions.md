# Copilot Instructions — Solar Friend Sin0 Portfolio

Create React App (CRA/react-scripts) portfolio site. No test suite exists yet, no custom ESLint config (CRA's built-in linting applies).

## Architecture: Two Parallel Root Components

> ⚠️ There are **two competing app shells** in [src/](src/). Only one is live.

| File | Status | Wired via |
|---|---|---|
| [src/PortfolioApp.js](src/PortfolioApp.js) | ✅ **Active** — imported by [src/index.js](src/index.js#L4) as `App` | React Router `<Routes>` |
| [src/App.js](src/App.js) | ❌ **Dead code** — not imported anywhere | Legacy manual `viewToPathMap`/`pathToViewMap` + card-stack UI |

* Edit [src/PortfolioApp.js](src/PortfolioApp.js) for real site changes (nav, hero, project cards, routes).
* [src/App.js](src/App.js) still contains the Cloudflare Turnstile captcha-gated contact reveal (char-code-obfuscated email/phone via `getProtectedContactInfo`) — this logic is currently unreachable in production. If reviving it, port it into [src/PortfolioApp.js](src/PortfolioApp.js) rather than re-wiring [src/App.js](src/App.js).
* Routes live in [src/PortfolioApp.js](src/PortfolioApp.js#L116): `/`, `/about`, `/ceramic-art`, `/digital-physical-art`, `/music`, `/dungeon-deck-recorder`, `/rage-engine`. Both `/dungeon-deck-recorder` and `/rage-engine` render the same [src/components/RageEngineShowcase.js](src/components/RageEngineShowcase.js) with different `mode` props — don't create a second component for one of them.
* Two separate stylesheets: [src/styles/App.css](src/styles/App.css) (legacy, dark-mode only) and [src/styles/Portfolio.css](src/styles/Portfolio.css) (active, supports light/dark via `data-theme` attribute toggled in `Shell`). Only edit Portfolio.css for visible changes.
* Gallery components ([src/components/CeramicArtGrid.js](src/components/CeramicArtGrid.js), [src/components/DigitalPhysicalArtGrid.js](src/components/DigitalPhysicalArtGrid.js)) wrap the shared [src/components/BaseGrid.js](src/components/BaseGrid.js), which handles the click-to-enlarge overlay and video/image branching (`item.isVideo`). Add new gallery types by composing BaseGrid, not by duplicating its overlay logic.

## Data Convention: Full-Res + Thumbnail Pairing

Gallery items live in [src/data/ceramicArt.js](src/data/ceramicArt.js), [src/data/digitalPhysicalArt.js](src/data/digitalPhysicalArt.js), [src/data/music.js](src/data/music.js). Each follows this exact pattern — replicate it for new entries:

1. Import full-resolution source from `../images/<category>/` at the top of the data file.
2. Thumbnails are imported separately in [src/data/previews.js](src/data/previews.js) from `../images/previews/<category>/` and exported as named objects (e.g. `ceramicPreviews`).
3. The data file builds an `id → preview` lookup map, then the default export is `array.map(...)` merging `previewUrl` onto each base item (see [src/data/ceramicArt.js](src/data/ceramicArt.js#L95-L113)).
4. Grid components render `item.previewUrl` in the grid; the modal/enlarged view renders `item.imageUrl` (full-res). Don't point both fields at the same asset for new large images — it defeats the thumbnail pipeline.

## Build, Run, and Image Tooling

All commands run from the repo root.

```bash
npm start                    # dev server at http://localhost:3000
npm test                     # react-scripts test (Jest+RTL, interactive watch) — no test files exist yet
npm test -- --watchAll=false # single non-interactive run (use in CI/scripting)
npm test -- -t "test name"   # focused test by name, once test files are added
npm test -- src/components/Foo.test.js  # focused test by file path
npm run build                # production build to build/ (used by CI deploy)
npm run build-linux          # build, then flattens build/* into repo root and deletes build/ — for manual root-deploy hosting only, NOT used by the GitHub Actions workflow
npm run optimize:images      # scripts/optimize-images.js — compresses .jpg/.jpeg/.png in src/images/ IN PLACE via sharp (mozjpeg + palette PNG), skips files that wouldn't shrink
npm run generate:thumbnails  # scripts/generate-thumbnails.js — generates 640px .webp previews into src/images/previews/<category>/ for TARGET_FOLDERS (ceramics, digital_art, music, physical_art); filenames are slugified via sanitizeFileBase (lowercase, non-alnum -> hyphen)
```

> 💡 When adding new gallery images: drop full-res files in `src/images/<category>/`, run `npm run generate:thumbnails`, then import both the source and the matching `-thumb.webp` (via [src/data/previews.js](src/data/previews.js)) in the relevant data file.

## Deployment

[.github/workflows/pages.yaml](.github/workflows/pages.yaml) is the production delivery path:

1. A push to `main` (or manual workflow dispatch) starts deployment; concurrent Pages deployments are canceled in favor of the newest run.
2. The build job uses Node 22, `npm ci`, and `npm run build`. Keep [package-lock.json](package-lock.json) synchronized with [package.json](package.json) because CI installs from the lockfile.
3. The workflow copies [CNAME](CNAME) (`solarfriendsin0.com`) into `build/CNAME`, uploads exactly `build/` as the Pages artifact, then deploys it through the `github-pages` environment.

Do not replace the Pages build with `build-linux`: that script moves the build output into the repository root and deletes `build/`, so it is only for a deliberate manual root-hosting workflow. `homepage` in [package.json](package.json#L35) is `"./"` (relative asset paths); preserve this when changing hosting so the same build works on both Pages and root-flattened hosting.

## Env Config

Optional `REACT_APP_TURNSTILE_SITE_KEY` in `.env.local` enables the Cloudflare Turnstile contact-reveal captcha (currently only wired in the dead [src/App.js](src/App.js) path — see Architecture above).
