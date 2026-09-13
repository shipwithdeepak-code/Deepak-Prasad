# Portfolio V1 — *Product Systems, Clearly*

A standalone Senior Product Manager portfolio for Deepak Prasad, built from
first principles. **This is a separate application from the portfolio in the
repository root.** It shares no components, styles, routes or runtime with it.

---

## Isolation guarantees

| Concern | Existing app (repo root) | Portfolio V1 |
| --- | --- | --- |
| Entry HTML | `/index.html` | `portfolio-v1/index.html` |
| Source | `/src` | `portfolio-v1/src` |
| Build config | `/vite.config.ts` | `portfolio-v1/vite.config.ts` |
| Dependencies | `/package.json` + `/node_modules` | own `package.json` + `node_modules` |
| Build output | `/dist` | `portfolio-v1/dist` |
| Dev port | 3000 (Express + Vite) | 5174 (Vite) |
| Backend | Express + Gemini RAG (`server.ts`) | none — fully static |

The only file outside this folder that was touched is the root `tsconfig.json`,
which gained an `exclude` entry so the existing app's `npm run lint` continues
to typecheck only its own sources. Nothing in `/src`, `/public`, `/app`,
`/components` or `/server.ts` was modified.

## Running it

```bash
cd portfolio-v1
npm install      # first time only
npm run dev      # http://localhost:5174
npm run build    # typecheck + production build → portfolio-v1/dist
npm run preview  # serve the build on :4174
npm run lint     # tsc --noEmit (strict)
```

## Architecture

```
portfolio-v1/
├── index.html            # entry document
├── vite.config.ts        # root/outDir scoped to this folder
├── public/
│   ├── fonts/            # self-hosted woff2 (latin + latin-ext)
│   └── *.pdf             # resume, copied — not referenced from the parent
└── src/
    ├── main.tsx
    ├── App.tsx           # routing + layout shell
    ├── data/
    │   ├── profile.ts    # identity, proof, principles, experience, leadership
    │   ├── cases.ts      # five case studies, typed
    │   └── dipa.ts       # Dīpa's curated corpus + retrieval
    ├── lib/
    │   ├── router.tsx    # ~1KB hash router
    │   └── useReveal.ts  # IntersectionObserver scroll reveal
    ├── components/       # one component per concern, no god-components
    ├── pages/            # Home, CaseStudyPage, NotFound
    └── styles/
        ├── index.css     # design tokens + base + utilities
        └── fonts.css     # generated @font-face rules
```

**Routing** is hash-based (`#/`, `#/work/<slug>`) so the static build works on
any host with no SPA rewrite rule. Section ids double as routes, so `#work`
behaves as an in-page anchor on the homepage and as "go home, then scroll" from
a case-study page.

**Code splitting**: the homepage is the entry payload; `CaseStudyPage` and
`Dipa` are lazy chunks.

## Design system

Direction: **Minimalism & Swiss Style** — editorial/technical documentation,
chosen via the `ui-ux-pro-max` skill's design-system generator (its top match
for documentation-style products). Dials: variance 4, motion 2, density 3.

- **Type**: Inter Tight (UI) · Source Serif 4 (editorial accents, numerals) ·
  JetBrains Mono (labels, diagram nodes)
- **Colour**: monochrome warm-zinc base + a restrained green accent. The
  generator proposed a blue accent; green was substituted per the brief and
  re-validated for contrast.
- **Contrast**: every foreground/background pair is ≥ 4.5:1 in both light and
  dark. Values are documented inline in `styles/index.css`.
- **Motion**: a single 12px fade-in, disabled entirely under
  `prefers-reduced-motion`. Content never depends on JS or motion to be visible.
- **Structure**: hairline rules and a numbered chapter spine carry the grid —
  deliberately no card grids, pills, glass or gradients.

### Regenerating the self-hosted fonts

Fonts are self-hosted to remove a render-blocking third-party request. To
change weights, fetch the css2 URL with a modern browser UA, keep the
`latin`/`latin-ext` `@font-face` blocks, download their `.woff2` into
`public/fonts/`, and rewrite the `url()` to `/fonts/<file>`. Only the weights
actually used are shipped (400/500/600 sans, 400/500 mono, 400 + italic serif).

## Content integrity

This is the part that matters most.

- Every fact traces to the existing portfolio's source data
  (`/src/data/caseStudies.ts`). Nothing is invented.
- **Attribution is enforced by the component API**: `<Metric>` takes an
  `attribution` prop, so a number cannot be rendered without stating whether it
  was personally owned, led with a team, contributed to, or a company outcome
  during tenure. The homepage proof wall carries a legend explaining the marks.
- Each case study has a `contribution` block splitting *what I owned* from
  *what the team owned* and *constraints*.
- **Performance Score is labelled "Not launched"** on the card, in the page
  header, and in its outcome section. No adoption or revenue outcome is claimed.
- **ReshaMudra is never mentioned**, per the standing content rule.
- One correction against the original brief: the proof point "15 days → <2 hrs"
  is **not** supported by the source data, which documents payout being
  triggered automatically at the weighbridge (the product is named "Instant
  Payout") with no verified two-hour figure. The site says
  "15 days → instant" and the note states the mechanism precisely.

## Dīpa

`Ask Dīpa` is portfolio intelligence, built independently of the existing
app's RAG copilot (no shared code, no server, no API key).

It **cannot fabricate**: there is no model in the loop. It performs lexical
retrieval over a curated, fact-checked corpus in `data/dipa.ts` and returns
pre-written answers with a cited source. Below a confidence threshold it states
that the topic isn't documented and routes to a direct conversation rather than
guessing. This is verified by an automated check that asks an out-of-scope
question and asserts the refusal.

## Accessibility

Verified in-browser at 375 / 390 / 768 / 1440px across all seven routes:

- semantic landmarks, one `h1` per page, no heading-level jumps
- skip link as the first tab stop; visible focus ring on every control
- accessible names on all interactive elements
- modal dialog with focus trap, Escape-to-close and focus restoration
- nav disclosure with `aria-expanded` / `aria-controls`
- diagram sequence conveyed by `<ol>` semantics; tone never signalled by colour
  alone (gate/primary/end carry text markers)
- tap targets ≥ 44px; no horizontal overflow at any tested width
- `prefers-reduced-motion` and `prefers-color-scheme` both respected
