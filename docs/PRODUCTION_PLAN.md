# Solar Friend Sin0 Portfolio Production Plan

## Goal

Present Jacob Pierce as a senior software engineer and creative technologist whose work spans game systems, UI, developer tooling, ceramics, image, and sound. The site must be fast, accessible, honest about project status, and reachable at `https://solarfriendsin0.com`.

## Workstreams

### Art and Design

- Establish a tactile paper, ink, cyan, pink, and acid-yellow visual system inspired by the ceramic and cosmic artwork.
- Lead with a conventional portfolio hierarchy: selected work, ceramics, image and motion, sound, and about/contact.
- Use expressive display typography with a restrained technical mono for labels and metadata.
- Keep artwork-led texture subtle, provide meaningful alt text, and respect reduced-motion preferences.
- Curate finished objects and strongest digital work rather than placing every asset on the homepage.

### Engineering

- Replace card-stack-only discovery with a responsive, keyboard-friendly React shell and persistent navigation.
- Add a recruiter-readable R.A.G.E. case study covering C/raylib architecture, asset contracts, build tooling, and agentic workflows.
- Keep native R.A.G.E. execution honest: link to a public source/release repository instead of pretending it is browser code.
- Add metadata, accessible controls, responsive layout, and reduced-motion behavior.
- Build with `react-scripts`, publish via the existing GitHub Pages workflow, and verify the custom domain after Actions completes.

### Human Resources and Recruiting

- Lead with verified scope: five annual AAA releases, live-service operations, cross-platform UI, and systems/tooling ownership.
- Use outcome-based summaries for WWE 2K, Disney Heroes, Dungeon Deck Recorder, and R.A.G.E.
- Group skills by role family: gameplay/UI, backend/platform, graphics/tools, and agentic workflows.
- Avoid unsupported claims about Go, Ruby, GraphQL, regulated systems, or hands-on iOS specialization.
- Make contact and GitHub access obvious without hiding essential information behind a challenge.

## Release Gates

1. `npm run build` completes without errors.
2. Homepage, `/rage-engine`, `/about`, and existing gallery routes load on desktop and mobile widths.
3. All external links use explicit HTTPS destinations and `rel="noreferrer"` where applicable.
4. GitHub Pages publishes from `main` to `gh-pages` and preserves `CNAME`.
5. `https://solarfriendsin0.com` serves the new title and homepage copy.
6. The R.A.G.E. source repository and release artifacts are published separately when GitHub repository creation access is available.

## Current Delivery State

- Portfolio shell, case-study route, visual system, metadata, and plan are implemented.
- Local production build passes.
- DNS resolves to GitHub Pages.
- Portfolio publication is pending the GitHub Pages workflow push.
- R.A.G.E. source publication is blocked by the absence of a public GitHub repository and GitHub CLI authentication in this environment.