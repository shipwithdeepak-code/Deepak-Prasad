# Portfolio v2: locked design decisions

Working brief for the redesign of `shipwithdeepak.ai.studio`. Written at the end of a
long design session so the next session can start building instead of re-deciding.
Read this first.

## Status

Nothing has been built yet. Every decision below is settled; one choice is open.
All exploration lives in published artifacts, linked at the bottom.

## The one open decision

What animates inside the giant "Deepak" name in the hero. Three options, all live in
the final artifact:

- **A. Aurora** — four coloured light fields drifting inside the letters, 26s cycle.
- **B. Starfield** — two dot grids at different scales plus two moving light pools.
- **C. Coral chrome** — one metallic sweep in the single accent colour, 9s cycle. **Recommended.**

C is recommended because A and B introduce three or four extra colours into a system
whose whole discipline is one accent on near black. Swapping the fill later is a single
CSS block, so C is also the most reversible starting point.

## Locked: composition

Hero composition "01", matching the Khaled Batt reference:

- Portrait centre right, name ghosted large behind it, headline bottom left,
  supporting paragraph and links bottom right, nav across the top.
- **Depth is the point.** The name sits at `z-index: 2`, the portrait at `z-index: 3`
  in `mix-blend-mode: screen`. The lit face and shoulder pass in front of the letters
  while the letters show through the shadows. The type must read as being *behind* the
  person, not under them.
- Text never overlaps the portrait. The portrait has its own column.

### The cut-out technique (important, took several attempts to get right)

The portrait must have no rectangular edge. Three effects stacked:

1. `filter: grayscale(1) contrast(2.4) brightness(1.08)` — pushes the navy studio
   backdrop below zero so it becomes pure black.
2. `mix-blend-mode: screen` — black becomes fully transparent.
3. An elliptical `mask-image` — feathers whatever survives.

### Known limitation

The source portrait (`public/deepak_portrait_4x5.jpg`) is a tight square crop with
almost no headroom. The reference works partly because its subject is framed chest up
with air above the hair and light falling off behind the shoulders. A reshoot against a
black backdrop, framed chest up and side lit, would improve the hero more than further
design iteration will.

## Locked: colour

One accent on near black. Nothing else on the page gets colour.

| Token | Hex | Use |
| --- | --- | --- |
| `void` | `#0A0A0B` | Page ground |
| `ghost` | `#1A1B1D` | The name behind the portrait, at rest |
| `mute` | `#8F8F8D` | Secondary text |
| `ivory` | `#F2F2F0` | Primary text |
| `coral` | `#F0977A` | Accent: italic word, assistant caret, nav underline, orbit ring |
| `live` | `#57D98A` | Availability indicator only |

Coral was lifted from the mark in the SLY reference screenshot. It is a placeholder for
a colour intended to come from `bouayaben.com`, which was unreachable. Revisit once that
site can be opened.

### Retired from the current site

The forest green identity is dropped. Green is the default palette for product manager
portfolios, which is the specific thing this redesign exists to avoid. Also retire all
22 stray hexes currently live in `src/components`, including both blues, the purple chip
set and the amber.

## Locked: type

- **Archivo** (variable, width axis) for display. The width axis is what lets one family
  feel like a system: condensed for statements, normal for headings.
- **Outfit** for body.
- **JetBrains Mono** for labels, data and the assistant.
- **Newsreader italic** for the single emphasised word in the headline.

Onest and Playfair Display are both retired. The Playfair-italic-accent-word appears
three times above the fold on the current site and is a recognisable AI-portfolio tell.

Open question on the headline emphasis: the reference mixes a serif italic into a sans
headline, which the anti-slop skill advises against. Archivo's own italic would look
nearly identical and age better. Not yet decided.

## Locked: copy

- Headline: **"I build products for the people software usually ignores."**
  The emphasised word is *ignores*.
- Subtext: "Senior product manager, seven years across marketplaces, AI and subscription
  products. Now building AI tools of my own."
- Availability pill: "Available for senior and lead product roles"

### Naming

"Case Study" is retired everywhere (11 strings in the current codebase). "Track Record"
was also rejected as boastful. Use **"The Work"** as the section heading and **"Work"**
in the nav. "Flagship Case Studies" and "Selected work" currently sit stacked as eyebrow
and h2 in the same block; replace the eyebrow with a count instead.

### Scope rule

**No work content in the hero.** No project names, no metrics, no case content. The hero
carries identity, availability and the assistant only. Work and AI projects are separate
territories below.

## Locked: structure

1. Hero
2. **The Work** — a ruled index, not a card grid. Rows reveal once on entry, hover
   moves a row 10px and opens its padding.
3. **AI projects** — built by me, not managed by me. Product Jury leads, with its five
   jurors (skeptic, advocate, user, engineer, finance). The site's own assistant is the
   second card.
4. Counters run once on entry.

Product Jury is a multi-agent product in development: a panel of agents that argues over
a product decision from several angles before you commit, each juror holding a different
bias on purpose.

## Locked: motion rules

Deliberately less motion than the reference sites use, because a portfolio is read on the
second and third visit and motion that delighted on the first is friction by then.

- Easings: `cubic-bezier(.23,1,.32,1)` for out, `cubic-bezier(.77,0,.175,1)` for in-out.
  Never `ease-in` on UI: it delays the first frame, which is the frame being watched.
- Only `transform`, `opacity` and `clip-path` animate. Never width, height, margin,
  or `transition: all`.
- `scale(.97)` on every pressable element, 160ms.
- Reveals fire once and never again.
- Cursor-driven values go through a spring so they lag and settle. Raw pointer tracking
  feels artificial.
- Stagger 55ms per item, capped.
- `prefers-reduced-motion` resolves everything to its final readable state.

### Cursor mechanic

A carried light. The hero type sits at low opacity and a spring-followed radial mask
lifts a bright duplicate out of the background as the pointer passes. The lag is what
makes it feel like a held object rather than an effect.

## Banned patterns

From the anti-slop skill, and all previously violated in this session:

- Zero em-dashes anywhere in visible page text.
- No decorative status dots except the one real availability indicator.
- No middle-dot separator strings.
- No scroll cues.
- No section-number eyebrows. Max one eyebrow per three sections.
- No `border-t` plus `border-b` on every row of a list.
- No div-based fake screenshots or hand-rolled decorative SVG.
- One corner-radius system, one accent, one theme for the whole page.

## References to re-open

All were blocked by the network egress policy during this session. The allowlist was
updated but binds at environment provision time, so a new session is needed.

| URL | What to take from it |
| --- | --- |
| `rafaelkurosawa.com` | Hero text treatment |
| `bouayaben.com` | Last-word animation, and one colour for the palette |
| `boilerlab.ai` | Section animations |
| `vanlent.dev` | Not yet reviewed |
| `wallofportfolios.in` | Khaled Batt is the locked hero reference |
| `shipwithdeepak.ai.studio` | The live site this replaces |

The SLY screenshot (letters as windows onto animated content) is the source of the
name-fill idea and was the only reference actually seen.

## Artifacts

- Final three, with the sections below the hero: https://claude.ai/code/artifact/caa4ac74-3e63-4bd8-bb64-4bed193a6bdc
- Cut-out fixed three ways: https://claude.ai/code/artifact/3d8f374c-81f2-4f6c-b5e0-d5f5808c9309
- Three cursor mechanics: https://claude.ai/code/artifact/a5068af9-47be-4397-a1b7-d3cc56c77c82
- Five hero concepts, no work content: https://claude.ai/code/artifact/2d24bc25-39d2-4de8-a2b9-f33a67d624d6
- Original audit of the current site, scored 6.4: https://claude.ai/code/artifact/89b27081-b8c5-4339-b085-ddd8a1ad2c84

## Build order

1. Token system into `@theme` in `src/index.css`, so components reference tokens rather
   than inline hexes and a stray hex becomes visible in review.
2. Hero.
3. The Work and AI projects sections.
4. Retire the 11 "Case Study" strings.
5. One shared-element transition from a work row into its detail page.

## Repo note

`.claude/skills/ui-ux-pro-max/scripts/__pycache__/*.pyc` is tracked, so the working tree
goes dirty every time that skill runs. Add `__pycache__/` to `.gitignore` and
`git rm -r --cached` those files.
