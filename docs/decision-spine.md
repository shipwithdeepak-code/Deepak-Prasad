# Decision spine — fill-in guide

Every case study on the site explains **what happened**. None of them explains
**what you chose**. That gap is the single biggest reason a strong portfolio
still loses to a weaker one in a hiring loop: the reader can't separate the
outcome you caused from the outcome you were standing next to.

The spine fixes that with six blocks per case study. It renders between the
hero and the narrative, so it doubles as the TL;DR for a page that is otherwise
eleven screens long.

## How it works

Both the scope line and the spine live in `src/data/caseStudies.ts`, in a
commented block right under each study's `timeline`. The renderer is in
`src/components/CaseStudyDetailPage.tsx`.

- **Nothing renders until you write it.** The spine appears only once
  `decision` and `outcome` are both non-empty, so you can draft the other four
  blocks in place without anything half-written going live.
- **Empty fields are skipped individually.** A scope with only `team` filled
  renders only `Team:`.
- Types are in `src/types.ts` (`CaseStudyScope`, `DecisionSpine`).

## The scope line

Four facts, appended to the existing Role / Timeline bar under the title.

```ts
scope: {
  team: '9 people - 4 engineering, 2 design, 3 field ops',
  reportedTo: 'Reported to the CPO',
  ownership: 'Rs 20-25 Cr monthly disbursement volume',
  collaborators: 'Engineering, design, field ops, finance',
},
```

`ownership` is the commercial surface you were accountable for — revenue, GMV,
disbursement volume, MAU, a budget. If the honest answer is "no P&L", write the
surface instead: "the full marketplace transaction path, intake to payout".

Don't round up. A team of four described as four is more credible than a team
of four described as nine.

## The six blocks

**01 Context** — 2–3 sentences. Where things stood when you arrived. Not the
industry backdrop; the state of *the thing you were handed*.

**02 The constraint** — the one binding limit everything else had to bend
around. Not a list of problems. If you name three, you haven't found it yet.
Good ones are physical, commercial or organisational: a 48-hour perishability
window, a 5-second attention budget on a trading floor, a fixed headcount, a
regulator's deadline.

**03 Options I rejected** — the real alternatives, and why each lost. Two or
three. This block buys more credibility than any metric on the page, because
it's the only one that proves there *was* a choice. Rule of thumb: if a reader
couldn't have guessed the rejected option was ever on the table, it's a good
entry. If it's a straw man ("we could have done nothing"), cut it.

**04 What I decided / why** — one sentence for the decision, active voice,
first person, "I" not "we". Then the reasoning — and name what you traded away
to get it. A decision with no cost attached reads as a preference.

**05 What happened** — at least one number and a time frame. If it didn't work,
say that; a spine that ends in a miss and a correction is stronger than one
that ends in a win with no mechanism.

**06 What I'd do differently** — a real one. Not "I'd have communicated more".
Something that would have changed the design or the sequencing. A portfolio
with no regret anywhere in it reads as marketing, and that lowers trust in the
wins too.

## Length

150 words per block is plenty; 900 words total per case study. The spine is
meant to be read standing up. If a block runs past 200 words, the material
belongs in the narrative sections below it.

## What to write first

Each case study's stub carries its own guiding questions, drawn from decisions
already visible in that study's prose. Start with ReshaMandi — the
assisted-first call is the clearest decision on the whole site and is currently
described only as a fact, never as a choice.

Order of return:
1. ReshaMandi
2. Behind the Copilot (the evaluation table already implies a standard you set)
3. AI Coach (the AI/deterministic boundary is a decision, written as a feature)
4. Subscription
5. AI Localization
6. Performance Score
