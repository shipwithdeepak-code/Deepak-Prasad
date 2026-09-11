/**
 * PORTFOLIO V1 — PROFILE DATA
 *
 * CONTENT INTEGRITY CONTRACT
 * Every fact here is carried over from the existing portfolio's source data
 * (src/data/caseStudies.ts). Nothing is invented, rounded up, or re-attributed.
 *
 * Each metric declares an `attribution` so the UI can state plainly what was
 * personally owned versus what was a product or company outcome during tenure:
 *   'owned'       — designed / specified / drove directly
 *   'led'         — led the initiative with a team
 *   'contributed' — contributed to as one of several owners
 *   'context'     — company/product scale; context, not a personal claim
 */

export type Attribution = 'owned' | 'led' | 'contributed' | 'context';

export const ATTRIBUTION_LABEL: Record<Attribution, string> = {
  owned: 'My contribution',
  led: 'Led with team',
  contributed: 'Contributed',
  context: 'Company outcome during tenure',
};

export const IDENTITY = {
  name: 'Deepak Prasad',
  eyebrow: 'Senior Product Manager · AI · Systems · Growth',
  headline: 'Building AI-powered products, platforms & growth systems.',
  supporting:
    'I turn ambiguous problems into products that ship — from conversational AI and B2C monetization to complex marketplaces, connected ecosystems and operational platforms.',
  capabilities: ['AI', '0→1', 'Growth', 'Platforms', 'Systems', 'Product Strategy'],
  positioning:
    'Senior Product Manager · AI Product Leader · Product Strategist · Systems Thinker',
  location: 'Bengaluru, India',
} as const;

export const CONTACT = {
  email: 'shipwithdeepak@gmail.com',
  linkedin: 'https://www.linkedin.com/in/prasad-deepak/',
  github: 'https://github.com/shipwithdeepak-code',
  calendly: 'https://calendly.com/shipwithdeepak/chit-chat-with-deepak',
  resume: './Deepak_Prasad_Senior_Product_Manager_Resume.pdf',
} as const;

/** The narrative spine of the site: ambiguity → … → learning. */
export const STORY_ARC = [
  'Ambiguity',
  'Product thinking',
  'Systems',
  'Decisions',
  'Execution',
  'Outcomes',
  'Learning',
] as const;

export interface ProofPoint {
  value: string;
  label: string;
  note: string;
  attribution: Attribution;
}

/**
 * PROOF WALL — evidence instead of biography.
 *
 * Note on the payout metric: the source data documents payouts moving from
 * "up to 15 days" to automatic settlement triggered at the weighbridge before
 * the farmer leaves the mandi. No verified "under 2 hours" figure exists in
 * the source, so it is deliberately not claimed here.
 */
export const PROOF_POINTS: ProofPoint[] = [
  {
    value: '7+ years',
    label: 'Product leadership',
    note: 'Manufacturing platforms, B2B marketplaces, consumer AI and subscription products.',
    attribution: 'owned',
  },
  {
    value: '0 → 1',
    label: 'AI · SaaS · Platforms',
    note: 'Conversational AI, subscription infrastructure and marketplace workflows built from zero.',
    attribution: 'owned',
  },
  {
    value: '80K+',
    label: 'Farmers reached',
    note: 'Scale of the ReshaFarms advisory platform. I owned core marketplace, workflow and payment products, not the whole company.',
    attribution: 'context',
  },
  {
    value: '12,401',
    label: 'Paid subscribers',
    note: 'FY2025 paying subscribers on a platform whose subscription experience I designed end to end.',
    attribution: 'led',
  },
  {
    value: '300 → 2K+',
    label: 'AI Coach DAU',
    note: 'Adoption within roughly 3 months of launch, on the AI Coach I took from concept to production.',
    attribution: 'led',
  },
  {
    value: '15 days → instant',
    label: 'Payout transformation',
    note: 'Farmer settlement moved from up to 15 days to automatic payout triggered at the weighbridge, at 99.9% reliability.',
    attribution: 'owned',
  },
];

export interface Principle {
  n: string;
  title: string;
  body: string;
}

export const PRINCIPLES: Principle[] = [
  {
    n: '01',
    title: 'Start with the system.',
    body: 'The interface is often the visible symptom of a deeper product problem. Before redesigning a screen, I map the workflow, the data and the incentives underneath it — because that is usually where the real defect lives.',
  },
  {
    n: '02',
    title: 'AI needs boundaries.',
    body: 'The model generates the answer. The product decides whether that answer should exist. Guardrails, fallbacks and deterministic paths are not constraints on an AI product — they are the product.',
  },
  {
    n: '03',
    title: 'Ship the smallest useful system.',
    body: 'Optimize for learning velocity, not feature volume. Isolate the atomic value loop, make the trade-offs explicit, validate the mechanism, and only then expand.',
  },
  {
    n: '04',
    title: 'Outcomes need attribution.',
    body: 'Be precise about what you changed, what the team changed, and what simply happened during your tenure. Credibility compounds; inflated ownership does not survive a second interview.',
  },
];

export interface Capability {
  domain: string;
  items: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    domain: 'Product',
    items: ['0→1', 'Strategy', 'Discovery', 'PRDs', 'Roadmaps'],
  },
  {
    domain: 'AI',
    items: ['LLM Products', 'AI UX', 'Evaluation', 'Guardrails', 'AI Workflows'],
  },
  {
    domain: 'Growth',
    items: ['Monetization', 'Activation', 'Retention', 'Subscription'],
  },
  {
    domain: 'Systems',
    items: ['Platforms', 'APIs', 'Data', 'Hardware', 'Operational Workflows'],
  },
  {
    domain: 'Leadership',
    items: ['Cross-functional', 'Alignment', 'Distributed Teams'],
  },
];

export interface Role {
  title: string;
  company: string;
  period: string;
  scope: string;
  products: string[];
  evidence: string[];
}

export const EXPERIENCE: Role[] = [
  {
    title: 'Product Consultant',
    company: 'Independent (via Tejmonvi Softwares)',
    period: 'May 2026 — Present',
    scope: 'Advisory & strategy · Bengaluru',
    products: ['Healthtech AI', 'M&A platform', 'Music-rights platform'],
    evidence: [
      'Product strategy for TNSQAI, a pre-commercial AI radiology diagnostics venture: benchmarked 7 global radiology AI players and structured a Now / Next / Later roadmap.',
      'Advising an M&A marketplace on deal-flow digitisation, broker verification and confidential buyer–seller matchmaking.',
    ],
  },
  {
    title: 'Senior Product Manager',
    company: 'Sportstech',
    period: 'Oct 2024 — May 2026',
    scope: 'Consumer AI, subscription & connected products · 174K+ users',
    products: ['AI Coach', 'Subscription', 'Performance Score', 'AI Localization'],
    evidence: [
      'Took the conversational AI Coach 0→1 (Gemini primary, ChatGPT fallback); adoption grew from ~300 to ~2,000 DAU in roughly 3 months.',
      'Owned subscription strategy across 174,180 freemium and 12,401 paying users — 81.9% YoY subscriber growth, 96.8% yearly-plan retention.',
      'Led a 6-person cross-functional pod (3 PMs, Growth, Content) in an ODC model with Germany HQ.',
    ],
  },
  {
    title: 'Product Manager',
    company: 'Sportstech',
    period: 'Aug 2023 — Sep 2024',
    scope: 'First PM on the platform · 0→1 foundations',
    products: ['Onboarding', 'Pricing & packaging', 'Paywall & checkout'],
    evidence: [
      'Designed signup, onboarding, trial, packaging, paywall and checkout from first principles.',
      'Established the platform’s telemetry tracking foundation alongside engineering and design.',
    ],
  },
  {
    title: 'Product Manager',
    company: 'ReshaMandi',
    period: 'Jun 2021 — Sep 2023',
    scope: 'Core marketplace, workflows & payments · B2B agri-tech',
    products: ['Instant Payouts', 'Cocoon Bidding', 'Vendor KYC', 'CV grading'],
    evidence: [
      'Architected the instant payout workflow — weighbridge-to-bank settlement at 99.9% reliability, scaling disbursements from ₹10–15 Cr to ₹20–25 Cr per month.',
      'Built real-time cocoon bidding 0→1 (Scan → Bid → Watch → Win → Pay); pilot auctions lifted transaction value by more than 35%.',
      'Partnered with the ML team to productize computer-vision cocoon grading at >90% model accuracy.',
    ],
  },
  {
    title: 'Associate Product Manager',
    company: 'LionCircuits',
    period: 'Jul 2018 — May 2020',
    scope: 'IoT & PCB manufacturing platform',
    products: ['Assembly ordering', 'Auto-quote engine', 'BOM scrubbing'],
    evidence: [
      'Led concept-to-launch of a B2B assembly ordering platform, contributing to a 40% increase in monthly orders.',
      'Built an automated quote generation engine and BOM-scrubbing tool for complex electronics manufacturing.',
    ],
  },
];

export const LEADERSHIP = {
  headline: 'I lead through alignment, not authority.',
  model:
    'An ODC (Offshore Development Center) model: product and engineering in India, sales and operations at the Germany HQ. No reporting line ran between them — so prioritization had to be earned, not issued.',
  flow: [
    {
      place: 'Germany',
      detail: 'Sales · Operations · HQ',
      body: 'Commercial urgency, market context and executive priorities originated here.',
    },
    {
      place: 'Cross-border prioritization',
      detail: 'The actual job',
      body: 'Translating commercial pressure into a sequenced roadmap: quarterly OKRs, shared telemetry standards, and one agreed definition of what "done" meant.',
    },
    {
      place: 'India',
      detail: 'Product · Engineering',
      body: 'A 6-person cross-functional pod — 3 PMs, Growth and Content — executing across subscription, AI and connected-product tracks.',
    },
  ],
  practices: [
    'Set quarterly OKRs that both sides signed off on, so priority disputes resolved against a written artifact rather than seniority.',
    'Established telemetry reporting standards, which moved arguments from opinion to shared evidence.',
    'Bridged timezone and cultural gaps between European executive leadership, German marketing and high-velocity engineering pods in India.',
  ],
} as const;
