/**
 * Homepage v3 presentation data.
 *
 * Everything here is a short form of something already stated in
 * caseStudies.ts. The case studies stay the source of truth; this file only
 * decides what fits on a card, a chip or a moving strip. Each entry carries
 * the case study it was shortened from, so a number on the homepage can be
 * checked against the page that argues for it.
 */

/** One figure and what it measures. Shown in the strip under the hero. */
export interface ProofMetric {
  value: string;
  label: string;
}

/** The strip is the track record in one line. Every figure below appears in
 *  full, with its context, inside the case study it came from. */
export const PROOF_METRICS: ProofMetric[] = [
  { value: '₹20-25 Cr', label: 'monthly disbursement at 99.9%' }, // reshamandi
  { value: '80,000+', label: 'farmers reached upstream' },       // reshamandi
  { value: '12,401', label: 'paying subscribers' },              // subscription
  { value: '€659K', label: 'FY2025 subscription revenue' },      // subscription
  { value: '+81.9%', label: 'YoY subscriber growth' },           // subscription
  { value: '174,180', label: 'platform users' },                 // subscription
  { value: '3,200+', label: 'AI Coach daily actives' },          // ai-coach
  { value: '200+', label: 'videos localised in 3 languages' },     // ai-localization
  { value: '19/20', label: 'golden-set accuracy' },              // behind-ai-copilot
  { value: '+40%', label: 'monthly orders' },                    // LionCircuits, EXPERIENCE_ROLES
];

/** The four families the work sorts into. Used for the filter chips, and
 *  deliberately shorter than the `category` string on the case study, which
 *  is written to be read rather than pressed. */
export type WorkFamily = 'ai' | 'marketplace' | 'growth' | 'hardware';

export const WORK_FAMILY_LABELS: Record<WorkFamily, string> = {
  ai: 'Applied AI',
  marketplace: 'Marketplace',
  growth: 'Growth',
  hardware: 'Connected hardware',
};

/** What a case study looks like on a card: its family, the single number
 *  worth putting under the title, and the years it ran. */
export interface RailEntry {
  family: WorkFamily;
  metric: string;
  years: string;
}

export const RAIL_ENTRIES: Record<string, RailEntry> = {
  reshamandi: { family: 'marketplace', metric: '₹20-25 Cr a month, 99.9% reliable', years: '2021-23' },
  subscription: { family: 'growth', metric: '12,401 paying, €659K FY25', years: '2023-26' },
  'ai-coach': { family: 'ai', metric: '300 to 3,200+ DAU in 3 months', years: '2024-26' },
  'ai-localization': { family: 'ai', metric: '200+ videos in 3 languages', years: '2025' },
  'performance-score': { family: 'hardware', metric: 'Five surfaces, one number', years: '2025' },
  'behind-ai-copilot': { family: 'ai', metric: '45 chunks, cites its sources', years: '2025' },
};

/**
 * The two things I designed and wrote myself, rather than managed. One of
 * them is answering questions at the top of this page; the other is still in
 * development, and the card says so rather than implying a launch.
 */
export interface AIBuild {
  name: string;
  status: string;
  description: string;
  facts: string[];
  /** The cover art, by slug, when there is a real image for it. A build with
   *  no artwork gets the key frame alone: a placeholder would be a lie about
   *  how finished it is. */
  coverSlug?: string;
  /** Where the card goes. The copilot opens itself; the jury has no page yet,
   *  so its card asks the copilot about it instead of linking nowhere. */
  action: { kind: 'copilot'; question: string } | { kind: 'navigate'; path: string };
}

export const AI_BUILDS: AIBuild[] = [
  {
    name: 'Product Jury',
    status: 'In development',
    description:
      'A panel of agents that argues one product decision from five seats, each juror holding a different bias on purpose: skeptic, advocate, user, engineer, finance.',
    facts: ['Multi-agent', 'Five jurors', 'In development'],
    action: { kind: 'copilot', question: 'What is Product Jury?' },
  },
  {
    name: 'The Copilot',
    status: 'Live on this page',
    description:
      'Transparent in-memory retrieval over my own record. No vector database, and the evaluation set is published with its failures.',
    facts: ['45 chunks', '0 external DBs', '19/20 golden set'],
    coverSlug: 'behind-ai-copilot',
    action: { kind: 'navigate', path: '/work/behind-ai-copilot' },
  },
];

/** The retrieval path, in the order it actually runs. Rendered as one row so
 *  the architecture is readable without opening the case study. */
export const COPILOT_PIPELINE = [
  'Your question',
  'embed',
  'cosine similarity over 45 chunks',
  'top 3 to 4',
  'Gemini Flash Lite',
  'answer plus its sources',
];
