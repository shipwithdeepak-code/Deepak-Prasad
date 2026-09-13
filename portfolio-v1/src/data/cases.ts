import type {Attribution} from './profile';

/**
 * PORTFOLIO V1 — CASE STUDIES
 *
 * Every case study follows one spine so a reader can compare decision-making
 * across very different problem spaces:
 *   Problem → Insight → Decision → System → Trade-offs → Outcome → Learning
 *
 * CONTENT INTEGRITY: all facts trace to the existing portfolio's source data.
 * `contribution` separates personal ownership from team and company outcomes.
 * Where an initiative did not launch, `status` says so and no outcome is claimed.
 */

export type NodeTone = 'default' | 'gate' | 'accent' | 'terminal';

export interface FlowNode {
  label: string;
  note?: string;
  tone?: NodeTone;
}

export interface Flow {
  caption?: string;
  nodes: FlowNode[];
  /** Optional feedback edge, e.g. "FEEDBACK → CONTEXT". */
  loop?: {from: number; to: number; label: string};
}

export interface Metric {
  value: string;
  label: string;
  attribution: Attribution;
  note?: string;
}

export type ChapterKey =
  | 'problem'
  | 'insight'
  | 'decision'
  | 'system'
  | 'tradeoffs'
  | 'outcome'
  | 'learning';

export interface Chapter {
  key: ChapterKey;
  title: string;
  body: string[];
  flow?: Flow;
  points?: {t: string; d: string}[];
}

export interface CaseStudy {
  slug: string;
  number: string;
  title: string;
  headline: string;
  deck: string;
  category: string;
  role: string;
  timeline: string;
  company: string;
  status?: string;
  tags: string[];
  metrics: Metric[];
  heroFlow: Flow;
  contribution: {
    mine: string[];
    team: string[];
    constraints: string[];
  };
  chapters: Chapter[];
}

export const CHAPTER_ORDER: ChapterKey[] = [
  'problem',
  'insight',
  'decision',
  'system',
  'tradeoffs',
  'outcome',
  'learning',
];

export const CHAPTER_LABEL: Record<ChapterKey, string> = {
  problem: 'Problem',
  insight: 'Insight',
  decision: 'Decision',
  system: 'System',
  tradeoffs: 'Trade-offs',
  outcome: 'Outcome',
  learning: 'Learning',
};

/* ========================================================================
   01 — AI COACH
   ======================================================================== */

const AI_COACH: CaseStudy = {
  slug: 'ai-coach',
  number: '01',
  title: 'AI Coach',
  headline: 'Building an AI Coach people could actually trust.',
  deck: 'Taking an ambiguous "add AI" mandate from concept to production — defining the use cases, the product boundaries, the safety guardrails and the model strategy.',
  category: 'Conversational AI · Consumer',
  role: 'Senior Product Manager · AI & Consumer Engagement',
  timeline: 'Oct 2024 — May 2026',
  company: 'Sportstech',
  tags: ['AI', 'Conversational AI', '0→1', 'Consumer'],
  metrics: [
    {
      value: '~300 → ~2,000',
      label: 'Daily active users',
      attribution: 'led',
      note: 'Within roughly 3 months of launch.',
    },
    {
      value: 'Gemini + fallback',
      label: 'Model architecture',
      attribution: 'owned',
      note: 'Gemini primary, ChatGPT failover.',
    },
    {
      value: 'Safety-first',
      label: 'Product boundaries',
      attribution: 'owned',
      note: 'Deterministic guardrails ahead of open generation.',
    },
    {
      value: '174K+',
      label: 'Users on the platform',
      attribution: 'context',
      note: 'Platform scale the feature launched into.',
    },
  ],
  heroFlow: {
    caption: 'AI Coach request path — every turn passes the safety gate before a model is selected.',
    nodes: [
      {label: 'User', note: 'Asks a question in-app'},
      {label: 'Intent', note: 'Classify: workout, nutrition, recovery, support'},
      {label: 'Context', note: 'Profile, history, device activity'},
      {label: 'Safety gate', note: 'Medical, injury and eligibility boundaries', tone: 'gate'},
      {label: 'Model router', note: 'Gemini primary → ChatGPT fallback', tone: 'accent'},
      {label: 'Structured response', note: 'Constrained format, catalog-linked'},
      {label: 'Action', note: 'Start workout, open plan, hand off'},
      {label: 'Feedback', note: 'Signal for the next iteration', tone: 'terminal'},
    ],
    loop: {from: 7, to: 2, label: 'feedback refines context'},
  },
  contribution: {
    mine: [
      'Defined the atomic use cases — which questions the Coach would answer, and which it would refuse.',
      'Specified the safety boundaries and the deterministic fallback behaviour.',
      'Owned the multi-model strategy: primary model, failover trigger, and cost/latency envelope.',
      'Built the feedback loop that turned real conversations into the next iteration of scope.',
    ],
    team: [
      'Engineering implemented the routing layer, model integration and failover mechanics.',
      'Content and fitness domain experts validated response quality against coaching standards.',
    ],
    constraints: [
      'An executive mandate to "add AI" with no defined use case attached to it.',
      'A consumer audience where a wrong nutrition or injury answer is a real-world safety problem.',
      'Cost and latency budgets that ruled out routing every turn to the most capable model.',
    ],
  },
  chapters: [
    {
      key: 'problem',
      title: 'An ambiguous mandate, not a product brief',
      body: [
        'Leadership wanted AI in the mobile app. That was the entire brief. There was no defined use case, no success metric and no view on where a language model would actually help a person training at home.',
        'Meanwhile the real user problem was concrete and unglamorous: 174K+ users navigated a large content library by hand. Static FAQs, deep catalog browsing and manual filters. If you did not already know what you needed, the product could not tell you.',
        'Conversational LLMs without crisp boundaries become expensive, hallucinatory novelties — tried once, abandoned, and then cited internally as evidence that "AI did not work for us".',
      ],
    },
    {
      key: 'insight',
      title: 'Trust is the adoption constraint, not capability',
      body: [
        'The model was never the bottleneck. A general-purpose LLM could already answer fitness questions fluently. The question was whether a user should act on that answer.',
        'In a fitness context the failure modes are not embarrassing, they are physical: a confident answer about an injury, a dietary restriction, or a medical condition can cause harm. One bad answer does not just lose a session — it ends the user\'s willingness to ask a second question.',
        'So adoption would be governed by trust, and trust would be governed by what the product refused to do.',
      ],
    },
    {
      key: 'decision',
      title: 'Constrain first, generate second',
      body: [
        'I inverted the usual build order. Rather than shipping open-ended chat and adding guardrails after the first incident, the safety gate came first and the generation surface was opened only where we could stand behind the answer.',
      ],
      points: [
        {
          t: 'Bound the use cases',
          d: 'Workout guidance, content discovery, nutrition basics and recovery. Medical, diagnostic and injury-treatment questions route to a deterministic response, not the model.',
        },
        {
          t: 'Route, do not gamble',
          d: 'Gemini as primary for cost and speed, ChatGPT as failover. Availability became an architectural property rather than a dependency on one vendor.',
        },
        {
          t: 'Structure the output',
          d: 'Responses return in a constrained shape linked to real catalog content, so the Coach ends in an action the product can actually perform.',
        },
        {
          t: 'Instrument the refusals',
          d: 'Every blocked question was logged. The refusal set became the highest-signal backlog we had for what to build next.',
        },
      ],
    },
    {
      key: 'system',
      title: 'The request path',
      body: [
        'Each turn passes through classification and context assembly, then the safety gate, before any model is selected. The gate is deterministic — it is not a prompt instruction the model may choose to ignore.',
      ],
      flow: {
        caption: 'Safety is a gate in the path, not a paragraph in the prompt.',
        nodes: [
          {label: 'User', note: 'In-app question'},
          {label: 'Intent', note: 'Workout · nutrition · recovery · support'},
          {label: 'Context', note: 'Profile, history, device activity'},
          {label: 'Safety gate', note: 'Out-of-bounds → deterministic response', tone: 'gate'},
          {label: 'Model router', note: 'Gemini primary → ChatGPT fallback', tone: 'accent'},
          {label: 'Structured response', note: 'Constrained format, catalog-linked'},
          {label: 'Action', note: 'Start workout · open plan · hand off'},
          {label: 'Feedback', note: 'Ratings, refusals, drop-offs', tone: 'terminal'},
        ],
        loop: {from: 7, to: 2, label: 'feedback refines context and scope'},
      },
    },
    {
      key: 'tradeoffs',
      title: 'What we gave up',
      body: [],
      points: [
        {
          t: 'Narrow scope over impressive demos',
          d: 'A tightly bounded Coach demos worse than an open one. We accepted a less impressive first impression in exchange for answers that survived contact with real users.',
        },
        {
          t: 'Latency cost of the gate',
          d: 'Classification and context assembly add milliseconds to every turn. We paid that on all requests to avoid paying it as an incident on a few.',
        },
        {
          t: 'Two model integrations to maintain',
          d: 'A fallback path doubles the integration surface and the evaluation burden. We took the maintenance cost to remove a single point of failure.',
        },
      ],
    },
    {
      key: 'outcome',
      title: 'Adoption followed trust',
      body: [
        'Daily active users of the Coach grew from roughly 300 to roughly 2,000 within about three months of launch — on a platform of 174K+ users, so there is meaningful headroom left, and I would not describe this as a solved problem.',
        'The more durable outcome was organisational: the refusal log gave the team an evidence-based way to argue about scope, which replaced a recurring debate about whether AI should do more.',
      ],
    },
    {
      key: 'learning',
      title: 'The product decides whether the answer should exist',
      body: [
        'The model generates the answer. The product decides whether that answer should exist. That sentence became the operating principle I now bring to every AI feature.',
        'If I were starting again, I would build the evaluation harness before the first production release rather than alongside it. We assembled evaluation under delivery pressure, and it made early quality arguments slower to settle than they needed to be.',
      ],
    },
  ],
};

/* ========================================================================
   02 — SUBSCRIPTION
   ======================================================================== */

const SUBSCRIPTION: CaseStudy = {
  slug: 'subscription',
  number: '02',
  title: 'Subscription',
  headline: 'The paywall wasn’t the product. Recurring value was.',
  deck: 'Designing the end-to-end subscription experience for a free hardware companion app — packaging, onboarding, value realization, conversion and retention.',
  category: 'Monetization · Growth · B2C',
  role: 'Product Manager · Subscription, Monetization & Onboarding',
  timeline: 'Aug 2023 — May 2026',
  company: 'Sportstech',
  tags: ['Growth', 'Monetization', 'Subscription', 'B2C'],
  metrics: [
    {
      value: '12,401',
      label: 'Paid subscribers',
      attribution: 'led',
      note: 'FY2025, against 174,180 freemium users.',
    },
    {
      value: '€659K',
      label: 'FY2025 subscription revenue',
      attribution: 'context',
      note: 'Company revenue outcome on the product I owned the experience for.',
    },
    {
      value: '81.9%',
      label: 'YoY subscriber growth',
      attribution: 'led',
    },
    {
      value: '96.8%',
      label: 'Yearly-plan retention',
      attribution: 'led',
      note: 'Annual cohort commitment.',
    },
  ],
  heroFlow: {
    caption: 'The subscription journey — value realization precedes the paywall, deliberately.',
    nodes: [
      {label: 'Sign up'},
      {label: 'Onboard', note: 'Goal, equipment, level'},
      {label: 'Experience value', note: 'Before any payment ask', tone: 'accent'},
      {label: 'Personalise', note: 'Plan shaped to the user'},
      {label: 'Trial'},
      {label: 'Pay', tone: 'gate'},
      {label: 'Habit', note: 'Weekly training rhythm'},
      {label: 'Retention', tone: 'terminal'},
    ],
  },
  contribution: {
    mine: [
      'Designed signup, onboarding, trial, packaging, paywall and checkout from first principles as the first PM on the platform.',
      'Defined where the paywall sat in the journey — specifically, placing it after first value rather than at the door.',
      'Built the telemetry foundation that made cohort and retention analysis possible at all.',
    ],
    team: [
      'Engineering built the billing pipeline, entitlement logic and store integrations, none of which existed before.',
      'Growth and Content shaped the offer, pricing communication and lifecycle messaging.',
    ],
    constraints: [
      'An audience conditioned over years to believe all app content was free forever.',
      'No billing rails, no trial logic, no subscription infrastructure at the start.',
      'A funding milestone that made predictable recurring revenue a time-boxed mandate.',
    ],
  },
  chapters: [
    {
      key: 'problem',
      title: 'Monetizing an audience that had never been asked to pay',
      body: [
        'The app had been built as a 100% free companion to smart fitness hardware. There was no paywall, no billing pipeline and no subscription infrastructure of any kind.',
        'As leadership prepared for institutional funding, predictable recurring software revenue became a strategic mandate with a deadline attached. I joined as the first Product Manager to design that experience from scratch.',
        'The obvious move — put the existing content behind a paywall — was also the fastest way to convert goodwill into churn and app-store backlash.',
      ],
    },
    {
      key: 'insight',
      title: 'Packaging is a question about value, not price',
      body: [
        'The framing inside the company was "what should we put behind the paywall?" That question assumes the value already exists and only needs gating.',
        'The more useful question was: what recurring value can we create that users would genuinely miss if they left? A hardware buyer already owns the machine. A subscription has to earn its place every month against the option of just using the equipment.',
        'That reframing moved the work from pricing into product: the subscription needed something that compounds — personalisation, progression, new content — rather than a toll gate on what was already free.',
      ],
    },
    {
      key: 'decision',
      title: 'Value first, then the ask',
      body: [
        'I sequenced the journey so that the payment request arrives after the user has felt the product work, not before.',
      ],
      points: [
        {
          t: 'Paywall placement after first value',
          d: 'Users complete onboarding and experience a real session before any payment ask. Conversion rate per impression drops; conversion quality and retention rise.',
        },
        {
          t: 'Onboarding as a personalisation intake',
          d: 'Goal, equipment and level are collected because they change the product, not because they populate a CRM field.',
        },
        {
          t: 'Annual plan as the retention instrument',
          d: 'Packaging deliberately favoured the yearly plan, where commitment and retention are structurally stronger.',
        },
        {
          t: 'Telemetry before optimization',
          d: 'No funnel experiments until the events were trustworthy. Optimizing against bad instrumentation is how teams confidently ship the wrong thing.',
        },
      ],
    },
    {
      key: 'system',
      title: 'The subscription journey',
      body: [
        'Each step exists to make the next one honest. The trial is not a countdown pressure device — it is the point at which personalisation has enough signal to be worth paying for.',
      ],
      flow: {
        caption: 'Conversion without retention is just expensive churn — so the journey does not end at "Pay".',
        nodes: [
          {label: 'Sign up', note: 'Low-friction entry'},
          {label: 'Onboard', note: 'Goal · equipment · level'},
          {label: 'Experience value', note: 'First real session, no gate', tone: 'accent'},
          {label: 'Personalise', note: 'Plan adapts to the intake'},
          {label: 'Trial', note: 'Full access, clear terms'},
          {label: 'Pay', note: 'Packaging favours annual', tone: 'gate'},
          {label: 'Habit', note: 'Weekly training rhythm'},
          {label: 'Retention', note: '96.8% on yearly plans', tone: 'terminal'},
        ],
      },
    },
    {
      key: 'tradeoffs',
      title: 'What we gave up',
      body: [],
      points: [
        {
          t: 'Lower top-of-funnel conversion',
          d: 'Delaying the paywall costs impressions and makes the funnel chart look worse. We optimised for the cohort that stays rather than the number that converts.',
        },
        {
          t: 'Annual bias defers revenue recognition',
          d: 'Favouring yearly plans trades some monthly cash rhythm for retention and lifetime value.',
        },
        {
          t: 'Telemetry work delayed visible shipping',
          d: 'Several weeks went into instrumentation that produced no user-facing change. It made every later decision arguable from evidence.',
        },
      ],
    },
    {
      key: 'outcome',
      title: 'A subscription business, not a paywall',
      body: [
        'FY2025 closed with 12,401 paying subscribers against 174,180 freemium users, 81.9% year-over-year subscriber growth, and 96.8% retention on yearly plans. Platform subscription revenue was €659K for the year.',
        'To be precise about attribution: the revenue figure is a company outcome. What I owned was the experience that produced it — the packaging, the journey and the placement of the ask. Pricing strategy and lifecycle messaging were shared with Growth.',
      ],
    },
    {
      key: 'learning',
      title: 'Conversion without retention is just expensive churn',
      body: [
        'The number that mattered was never conversion rate. It was whether the ninth month looked like the first. Retention is the only metric that tells you the recurring value is real.',
        'What I would change: we validated packaging with too small a set of qualitative interviews before committing. The structure held, but we discovered preferences post-launch that a wider discovery round would have surfaced earlier and cheaper.',
      ],
    },
  ],
};

/* ========================================================================
   03 — RESHAMANDI
   ======================================================================== */

const RESHAMANDI: CaseStudy = {
  slug: 'reshamandi',
  number: '03',
  title: 'ReshaMandi',
  headline: 'Connecting a fragmented marketplace through product systems.',
  deck: 'Digitising physical silk-market workflows — intake, grading, auction, weighing, payment and settlement — without stopping the trading that funded it.',
  category: 'B2B Marketplace · Operational Systems',
  role: 'Product Manager · Core Marketplace, Workflows & Payments',
  timeline: 'Jun 2021 — Sep 2023',
  company: 'ReshaMandi',
  tags: ['B2B', 'Marketplace', 'Workflow', 'Payments', '0→1'],
  metrics: [
    {
      value: '80,000+',
      label: 'Farmers reached',
      attribution: 'context',
      note: 'Scale of the ReshaFarms advisory platform, not a personal deliverable.',
    },
    {
      value: '₹20–25 Cr',
      label: 'Monthly disbursements',
      attribution: 'owned',
      note: 'Scaled from ₹10–15 Cr via the payout workflow I architected.',
    },
    {
      value: '>35%',
      label: 'Bidding value uplift',
      attribution: 'owned',
      note: 'Demonstrated in pilot auction price discovery.',
    },
    {
      value: '99.9%',
      label: 'Payout reliability',
      attribution: 'owned',
      note: 'Automated weighbridge-to-bank settlement.',
    },
  ],
  heroFlow: {
    caption: 'The value chain, as a connected system — each handoff became a digital state change.',
    nodes: [
      {label: 'Farmers', note: '25-day rearing cycle'},
      {label: 'Marketplace', note: 'Intake and grading'},
      {label: 'Bidding', note: 'Transparent price discovery', tone: 'accent'},
      {label: 'Order', note: 'Lot committed to a buyer'},
      {label: 'Payment', note: 'Triggered at the weighbridge', tone: 'gate'},
      {label: 'Settlement', note: 'Reconciled, 99.9% reliable', tone: 'terminal'},
    ],
  },
  contribution: {
    mine: [
      'Owned product discovery, PRDs and delivery for core marketplace, workflow and payment products.',
      'Architected the instant payout workflow — weighbridge trigger, approval queue, bank settlement, automated retry.',
      'Built the real-time cocoon bidding workflow 0→1: Scan → Bid → Watch → Win → Pay.',
      'Specified the assisted vendor KYC flow that gave informal suppliers a verified digital trade identity.',
    ],
    team: [
      'The ML team built and trained the computer-vision cocoon grading model; I productized the workflow around it.',
      'Field operations ran the on-ground rollout across mandi collection centres.',
      'Engineering integrated LeadSquared CRM, Razorpay, SAP and Camunda.',
    ],
    constraints: [
      'A 48-hour perishable window on harvested cocoons — no room for system downtime during trading.',
      'Users operating at 4:30 AM on crowded, noisy trading floors where more than two taps meant abandonment.',
      'Deep, rational distrust of digital ledgers among farmers who had been underpaid by intermediaries for years.',
    ],
  },
  chapters: [
    {
      key: 'problem',
      title: 'A market that worked, informally, against the people in it',
      body: [
        'India is the world’s second-largest silk producer, but its raw-material supply chain ran as a fragmented informal economy. Farmers nurture fragile silkworms through 25-day rearing cycles, ending in perishable cocoon batches that must sell within roughly 48 hours.',
        'At physical mandis that created severe asymmetry: arbitrary visual grading by brokers, no price transparency, commission slicing, and settlement delayed by days or weeks. Farmers carried all the production risk with none of the price certainty, and delayed cash pushed smallholders into high-interest local debt.',
        'Buyers were not winning either — they faced unpredictable batch quality and irregular supply.',
      ],
    },
    {
      key: 'insight',
      title: 'The rejection of software was rational, not cultural',
      body: [
        'Discovery did not happen in a boardroom. It happened on mandi floors in Ramanagara, Sidlaghatta and Dharmapuri before dawn, watching hundreds of live transactions.',
        'The prevailing internal theory was that farmers and agents resisted technology because of literacy. That was wrong. They rejected digital tools because generic apps ignored the physical reality of the work: in a crowded auction hall with shouting traders and moving crates, anything demanding more than two taps or five seconds of latency was dead on arrival.',
        'The second insight was about trust: farmers believed cash in hand, not a promise in an app. Digital trust could not be explained — it had to be proven with immediate liquidity.',
      ],
    },
    {
      key: 'decision',
      title: 'Digitise the process, not the people',
      body: [
        'The discipline we held to was to preserve domain expertise and structure the workflow around it — rather than assume software should replace the judgement of people who had traded silk for decades.',
      ],
      points: [
        {
          t: 'Pay at the weighbridge',
          d: 'Instead of explaining why digital payment was trustworthy, we made settlement trigger automatically at weighing, so the farmer was paid before leaving the mandi. Trust became a property of the system, not a marketing message.',
        },
        {
          t: 'Two taps maximum on the floor',
          d: 'Floor-facing interfaces were built for high contrast, oversized tap targets and zero blocking latency, because the operating environment was the binding constraint.',
        },
        {
          t: 'Migrate progressively, never stop trading',
          d: 'Workflows were digitised incrementally alongside live trading. A cutover would have risked a perishable harvest, which was not a risk that belonged to us to take.',
        },
        {
          t: 'CV grading to settle disputes, not replace graders',
          d: 'Computer-vision grading was positioned as an objective reference in a disagreement — the highest-value place to put a model in a market built on contested judgement.',
        },
      ],
    },
    {
      key: 'system',
      title: 'From physical custody to digital state',
      body: [
        'The system’s job was to make every physical handoff produce an immutable digital state change, so that money, inventory and accountability stayed in sync with what physically happened.',
      ],
      flow: {
        caption: 'Payout is triggered by a physical event — the weighbridge — not by a back-office batch.',
        nodes: [
          {label: 'Farmers', note: 'Rearing + harvest'},
          {label: 'Marketplace', note: 'Intake, KYC, lot creation'},
          {label: 'Bidding', note: 'Scan → Bid → Watch → Win', tone: 'accent'},
          {label: 'Order', note: 'Lot committed to buyer'},
          {label: 'Payment', note: 'Weighbridge trigger → approval → bank', tone: 'gate'},
          {label: 'Settlement', note: 'Reconciled with automated retry', tone: 'terminal'},
        ],
      },
    },
    {
      key: 'tradeoffs',
      title: 'What we gave up',
      body: [],
      points: [
        {
          t: 'Progressive migration over a clean architecture',
          d: 'Running digital and paper workflows in parallel created real complexity and duplicated state. It was the price of never halting a live, perishable market.',
        },
        {
          t: 'Speed over feature depth on the floor',
          d: 'Floor interfaces stayed deliberately thin. Richer functionality moved to back-office surfaces where latency was affordable.',
        },
        {
          t: 'Assisted onboarding does not scale like self-serve',
          d: 'Field-agent-assisted KYC was slower and more expensive per user than self-serve, but self-serve would simply not have completed for this population.',
        },
      ],
    },
    {
      key: 'outcome',
      title: 'What changed, stated precisely',
      body: [
        'Payouts moved from up to 15 days to automatic settlement triggered at the weighbridge, at 99.9% reliability, with monthly disbursements scaling from ₹10–15 Cr to ₹20–25 Cr. Pilot auctions lifted transaction value by more than 35%. The CV grading workflow reached over 90% model accuracy.',
        'On attribution: the 80,000+ farmer figure is the reach of the ReshaFarms platform and a company outcome — I owned core marketplace, workflow and payment products, not the entire company or its full product portfolio.',
      ],
    },
    {
      key: 'learning',
      title: 'The product was the workflow',
      body: [
        'The app was never the product. The workflow was. Every screen that mattered was a thin surface over an operational state machine, and the wins came from getting that machine right.',
        'I also learned how much cheaper field research is than a failed rollout. The two-tap constraint could not have been derived from analytics — it only existed at 4:30 AM on a trading floor.',
      ],
    },
  ],
};

/* ========================================================================
   04 — PERFORMANCE SCORE
   ======================================================================== */

const PERFORMANCE_SCORE: CaseStudy = {
  slug: 'performance-score',
  number: '04',
  title: 'Performance Score',
  headline: 'One body. One score. One ecosystem.',
  deck: 'A development-ready product strategy uniting mobile, Smart Gym and connected-device telemetry behind a single measure of progress — starting with the data fragmentation underneath.',
  category: 'Product Strategy · Connected Ecosystems',
  role: 'Senior Product Manager · Connected Ecosystem Strategy',
  timeline: '2025',
  company: 'Sportstech',
  status: 'Strategy case study · Not launched · Development-ready',
  tags: ['Product Strategy', 'Connected Products', 'Data', '0→1'],
  metrics: [
    {
      value: 'P0 ready',
      label: 'Strategy status',
      attribution: 'owned',
      note: 'Comprehensive cross-platform PRD. Not launched.',
    },
    {
      value: '5 surfaces',
      label: 'Platforms aligned',
      attribution: 'owned',
      note: 'iOS, Android, Display, Smart Gym, Firmware.',
    },
    {
      value: '0–100',
      label: 'Score paradigm',
      attribution: 'owned',
      note: 'Athletic reliability metric.',
    },
    {
      value: 'Dual-write',
      label: 'Migration path',
      attribution: 'owned',
      note: 'Zero-downtime database migration design.',
    },
  ],
  heroFlow: {
    caption: 'From raw device telemetry to a single action the user can take today.',
    nodes: [
      {label: 'Device', note: 'Cardio, Smart Gym, wearables'},
      {label: 'Data', note: 'Unified session model', tone: 'gate'},
      {label: 'Scoring', note: '0–100 athletic reliability', tone: 'accent'},
      {label: 'Insight', note: 'One readable state, not raw graphs'},
      {label: 'User action', note: 'What to do next', tone: 'terminal'},
    ],
  },
  contribution: {
    mine: [
      'Authored the cross-platform product strategy and the comprehensive P0 PRD.',
      'Defined the 0–100 athletic reliability paradigm and its eligibility rules across device tiers.',
      'Specified the dual-write / dual-read migration path to unify siloed hardware and mobile databases without downtime.',
    ],
    team: [
      'Engineering and firmware leads reviewed and pressure-tested the data architecture and migration sequencing.',
    ],
    constraints: [
      'Workout records lived in isolated database tables across mobile and hardware, causing sync discrepancies.',
      'Optional sensors meant any score had to degrade gracefully rather than gate users behind hardware purchases.',
      'Five delivery surfaces with independent release cycles, including firmware.',
    ],
  },
  chapters: [
    {
      key: 'problem',
      title: 'Three products wearing one brand',
      body: [
        'The platform spanned iOS and Android apps, embedded touchscreen displays on cardio equipment, connected Smart Gym strength machines, and optional Bluetooth heart-rate sensors. To the user it was one brand. Structurally it was three disconnected islands.',
        'A treadmill session did not speak to strength sets logged on the Smart Gym, so progress was invisible. The apps showed raw heart-rate graphs, reps and calories — data fatigue rather than insight. And workout records lived in separate database tables, producing sync discrepancies users experienced as the product losing their work.',
      ],
    },
    {
      key: 'insight',
      title: 'You cannot ship one score on top of three databases',
      body: [
        'The tempting version of this project is a scoring algorithm and a beautiful dial. That version fails, because a unified score computed over fragmented, inconsistent session data produces a number that is confidently wrong.',
        'Before promising users one measure of progress, the ecosystem had to behave like one product. That made the first deliverable a data architecture problem wearing a UX problem\'s clothes.',
        'The second insight was commercial: if the score required the optional heart-rate sensor, it becomes a paywall on progress. Hardware should be an aspiration, not a gate.',
      ],
    },
    {
      key: 'decision',
      title: 'Fix the substrate, then design the surface',
      body: [
        'I sequenced the strategy so that the visible feature depends on an invisible correction being made first — and said so explicitly in the PRD, because that sequencing is exactly what gets cut under delivery pressure.',
      ],
      points: [
        {
          t: 'Unified session model first',
          d: 'One canonical representation of a workout regardless of originating surface, as the precondition for any cross-device metric.',
        },
        {
          t: 'Dual-write, dual-read migration',
          d: 'A zero-downtime path from siloed tables to the unified model, so the migration never became a user-visible outage.',
        },
        {
          t: 'Graceful degradation by device tier',
          d: 'The 0–100 score computes from whatever signals a user actually has, with accuracy communicated honestly rather than the feature being withheld.',
        },
        {
          t: 'One insight, not more numbers',
          d: 'The output is a single readable state plus a next action — the opposite of the raw-graph experience it replaces.',
        },
      ],
    },
    {
      key: 'system',
      title: 'Telemetry to action',
      body: [
        'The architecture collapses many device-specific signals into one scoring input, then spends its remaining effort turning that score into something a person can act on this week.',
      ],
      flow: {
        caption: 'The hard part is the second box, not the third.',
        nodes: [
          {label: 'Device', note: 'iOS · Android · Display · Smart Gym · sensors'},
          {label: 'Data', note: 'Unified session model, dual-write migration', tone: 'gate'},
          {label: 'Scoring', note: '0–100, degrades by available signal', tone: 'accent'},
          {label: 'Insight', note: 'One state, one explanation'},
          {label: 'User action', note: 'A concrete next session', tone: 'terminal'},
        ],
      },
    },
    {
      key: 'tradeoffs',
      title: 'What the strategy accepted',
      body: [],
      points: [
        {
          t: 'A long invisible phase before any visible feature',
          d: 'The migration produces no demo. That is a genuine organisational cost and the most likely thing to be descoped.',
        },
        {
          t: 'Accuracy varies by hardware tier',
          d: 'Graceful degradation means two users can hold different-quality scores. We chose honest communication of confidence over hardware gating.',
        },
        {
          t: 'One number hides nuance',
          d: 'A 0–100 score is a deliberate simplification. It trades analytical richness for a state a casual user can actually act on.',
        },
      ],
    },
    {
      key: 'outcome',
      title: 'Where this stands',
      body: [
        'This initiative is a development-ready P0 product strategy, systems architecture and comprehensive cross-platform PRD. It was not launched during my tenure.',
        'There are therefore no adoption, engagement or revenue outcomes to report, and I will not estimate any. It is included here because it shows how I approach architecture, data integrity, hardware/software boundaries and PRD quality — not because it shipped.',
      ],
    },
    {
      key: 'learning',
      title: 'Sequencing is the strategy',
      body: [
        'The intellectual work was not the score. It was recognising that the score was unbuildable until the data model was fixed, and then making that dependency legible enough that it would survive prioritisation conversations.',
        'Writing the trade-off section of a PRD before the solution section changed how the document was received. It moved the review from "do we like this?" to "do we accept these costs?", which is a far more productive argument.',
      ],
    },
  ],
};

/* ========================================================================
   05 — AI LOCALIZATION
   ======================================================================== */

const AI_LOCALIZATION: CaseStudy = {
  slug: 'ai-localization',
  number: '05',
  title: 'AI Localization',
  headline: 'Turning a 3–4 month content operation into a ~3-week AI workflow.',
  deck: 'Redesigning studio video production into an AI-assisted localization pipeline across three European languages — with a human review loop protecting brand integrity.',
  category: 'AI Operations · European Expansion',
  role: 'Senior Product Manager · AI Workflow & Content Pipeline',
  timeline: 'Oct 2024 — May 2026',
  company: 'Sportstech',
  tags: ['AI', 'Operations', 'Content', 'Expansion'],
  metrics: [
    {value: '200+', label: 'Videos localized', attribution: 'led'},
    {
      value: '3 languages',
      label: 'Italian · French · Spanish',
      attribution: 'led',
    },
    {value: '~3 weeks', label: 'Production window', attribution: 'led'},
    {
      value: '~10×',
      label: 'Faster than studio',
      attribution: 'led',
      note: 'Compared to traditional studio filming benchmarks.',
    },
  ],
  heroFlow: {
    caption: 'The redesigned pipeline — six steps replacing seven, with review as a deliberate gate.',
    nodes: [
      {label: 'Source', note: 'Existing catalog video'},
      {label: 'AI processing', note: 'Segmentation and prep', tone: 'accent'},
      {label: 'Translation', note: 'Model-generated, human-checked'},
      {label: 'Voice', note: 'Synthesised native-language audio'},
      {label: 'Review', note: 'Human gate on brand and accuracy', tone: 'gate'},
      {label: 'Publish', note: 'Live in regional catalog', tone: 'terminal'},
    ],
  },
  contribution: {
    mine: [
      'Designed the AI-assisted operating model that replaced studio re-filming.',
      'Defined where AI generated output and where a human review gate was mandatory.',
      'Specified the pipeline stages, handoffs and quality criteria across three languages.',
    ],
    team: [
      'Content and native-language reviewers validated translation quality, tone and brand voice.',
      'Engineering and vendor tooling handled model integration and audio processing.',
    ],
    constraints: [
      'Traditional production: 3–4 months of studio time for roughly 20 videos in one language.',
      'A 200+ video library across three languages would have cost hundreds of thousands of euros and over a year.',
      'Fitness instruction where a mistranslated cue is a safety and brand problem, not a typo.',
    ],
  },
  chapters: [
    {
      key: 'problem',
      title: 'European expansion priced in studio months',
      body: [
        'Driving European subscriber acquisition required native-language workout content for Italy, France and Spain. The established path was to re-film: cast native-speaking trainers, book European studio space, shoot, edit, colour grade and dub.',
        'That path cost 3 to 4 months for roughly 20 videos in a single language. Extended to a 200+ video library across three languages, it meant hundreds of thousands of euros and more than a year — which in practice meant the expansion would not happen on the timeline the business needed.',
      ],
    },
    {
      key: 'insight',
      title: 'The bottleneck was the operating model, not the translation',
      body: [
        'Framed as a translation problem, this is a vendor selection exercise. Framed correctly, the expensive part was never the language — it was re-performing content that already existed.',
        'The source library was already produced to a high standard. The question was whether the performance could be preserved while the language layer was regenerated, rather than shooting the whole thing again.',
        'Technology creates leverage when it reorganizes the operating model. Adding a translation tool to a studio workflow would have produced a marginal gain; removing the studio step entirely produced an order-of-magnitude one.',
      ],
    },
    {
      key: 'decision',
      title: 'Regenerate the language layer, keep the human gate',
      body: [
        'The pipeline uses AI for the mechanical transformations and reserves human judgement for the parts where being wrong is expensive.',
      ],
      points: [
        {
          t: 'Reuse the source performance',
          d: 'Existing high-production video becomes the source rather than the thing being replaced, which removes casting, travel and studio cost from the equation.',
        },
        {
          t: 'Mandatory human review gate',
          d: 'Every asset passes native-language review before publishing. AI models are components in the pipeline; they are not the final authority on brand voice.',
        },
        {
          t: 'Build a repeatable pipeline, not a one-off project',
          d: 'The deliverable was an operating model that a fourth language could enter, not three batches of localized videos.',
        },
      ],
    },
    {
      key: 'system',
      title: 'Before and after',
      body: [
        'The old workflow ran seven sequential stages, most of them requiring physical coordination. The new one runs six, and only one of them requires a human — deliberately placed where errors are most costly.',
      ],
      flow: {
        caption: 'Before — traditional studio production, 3–4 months per ~20 videos.',
        nodes: [
          {label: 'Script'},
          {label: 'Production', note: 'Casting, studio, filming'},
          {label: 'Manual editing'},
          {label: 'Translation'},
          {label: 'Voiceover', note: 'Booth recording'},
          {label: 'Review'},
          {label: 'Publishing', tone: 'terminal'},
        ],
      },
    },
    {
      key: 'tradeoffs',
      title: 'What we gave up',
      body: [],
      points: [
        {
          t: 'Synthesised voice is not a native trainer',
          d: 'We accepted a quality ceiling below a studio-recorded native performance in exchange for reaching three markets within the launch window.',
        },
        {
          t: 'Review is the new bottleneck',
          d: 'Compressing production concentrates the constraint into human review. That is a deliberate choice — it is the stage where being wrong is most expensive.',
        },
        {
          t: 'Source-bound content',
          d: 'The pipeline localizes what already exists. It does not create market-specific content, which remains a separate problem.',
        },
      ],
    },
    {
      key: 'outcome',
      title: 'Three markets, three weeks',
      body: [
        '200+ workout videos shipped across Italian, French and Spanish in roughly three weeks — approximately 10× faster than the traditional studio benchmark it replaced.',
        'The more valuable output was the repeatable operating model for cross-border expansion. The videos were the deliverable; the pipeline was the asset.',
      ],
    },
    {
      key: 'learning',
      title: 'AI pays when it reorganizes the work',
      body: [
        'Adding AI to an existing workflow usually produces a marginal improvement. Restructuring the workflow around what AI makes cheap produces a step change. The gain here came from deleting a stage, not accelerating one.',
        'Keeping a human gate was not a concession to caution. It is what made the speed defensible — the pipeline was fast because review was the only place we had to be slow.',
      ],
    },
  ],
};

export const CASE_STUDIES: CaseStudy[] = [
  AI_COACH,
  SUBSCRIPTION,
  RESHAMANDI,
  PERFORMANCE_SCORE,
  AI_LOCALIZATION,
];

export const getCase = (slug: string): CaseStudy | undefined =>
  CASE_STUDIES.find((c) => c.slug === slug);
