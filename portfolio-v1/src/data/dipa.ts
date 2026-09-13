/**
 * DĪPA — portfolio intelligence.
 *
 * Built independently of the existing application's copilot. Design choices:
 *
 *  1. NO FABRICATION BY CONSTRUCTION. Dīpa cannot generate prose. It retrieves
 *     pre-written, fact-checked answers from this file. There is no model in
 *     the loop, so there is no hallucination surface.
 *  2. NO SERVER, NO KEY, NO NETWORK. Retrieval is lexical and runs in the
 *     browser, so the feature works offline, costs nothing, and adds no
 *     backend coupling to the V1 app.
 *  3. HONEST FALLBACK. Below the confidence threshold it says it does not know
 *     and routes to a real conversation rather than guessing.
 *  4. TRANSPARENT. Every answer cites where the claim comes from.
 */

export interface Entry {
  id: string;
  /** Question phrasings and salient terms used for matching. */
  keys: string[];
  question: string;
  answer: string[];
  source: string;
  /** Optional case-study slug to deep-link. */
  link?: {label: string; slug: string};
}

export const SUGGESTED = [
  "What is Deepak's strongest AI case study?",
  'How does he approach product strategy?',
  'What did he actually own?',
  'Tell me about his leadership style.',
  'Why should I interview him?',
];

export const KNOWLEDGE: Entry[] = [
  {
    id: 'strongest-ai',
    keys: [
      'strongest ai case study',
      'best ai work',
      'ai project',
      'ai coach',
      'conversational ai',
      'llm',
      'gemini',
      'chatbot',
      'guardrails',
      'safety',
    ],
    question: "What is Deepak's strongest AI case study?",
    answer: [
      'The AI Coach at Sportstech. He took an ambiguous executive mandate to "add AI" and turned it into a production conversational product — defining the use cases, the safety boundaries, the multi-model strategy and the feedback loop.',
      'The design decision that distinguishes it: the safety gate is a deterministic step in the request path, not an instruction in the prompt. Out-of-bounds questions (medical, diagnostic, injury treatment) never reach a model. Gemini runs primary with ChatGPT as failover, so availability is architectural rather than vendor-dependent.',
      'Adoption grew from ~300 to ~2,000 daily active users within roughly three months of launch, on a platform of 174K+ users.',
    ],
    source: 'Case study 01 — AI Coach',
    link: {label: 'Read the AI Coach case study', slug: 'ai-coach'},
  },
  {
    id: 'strategy',
    keys: [
      'approach product strategy',
      'how does he think',
      'product thinking',
      'methodology',
      'framework',
      'principles',
      'process',
      'discovery',
      'prioritisation',
      'prioritization',
    ],
    question: 'How does he approach product strategy?',
    answer: [
      'Four principles run through the work. Start with the system — the interface is usually the visible symptom of a deeper product problem. AI needs boundaries — the model generates the answer, the product decides whether that answer should exist. Ship the smallest useful system — optimize for learning velocity, not feature volume. Outcomes need attribution — be precise about what you changed versus what the team changed.',
      'In practice that means sequencing matters more than features. On Performance Score, for instance, he argued the score was unbuildable until the underlying data fragmentation was fixed, and wrote that dependency into the PRD so it would survive prioritization pressure.',
      'He also writes the trade-off section of a PRD before the solution section, which moves a review from "do we like this?" to "do we accept these costs?"',
    ],
    source: 'How I think · Case study 04 — Performance Score',
    link: {label: 'Read the Performance Score case study', slug: 'performance-score'},
  },
  {
    id: 'ownership',
    keys: [
      'what did he actually own',
      'ownership',
      'his contribution',
      'personally',
      'responsible for',
      'attribution',
      'did he build',
      'scope of work',
      'credit',
    ],
    question: 'What did he actually own?',
    answer: [
      'This portfolio is deliberate about that distinction, so here it is plainly.',
      'Owned directly: the AI Coach product definition, safety boundaries and model strategy; the end-to-end subscription experience (onboarding, packaging, trial, paywall, checkout); the ReshaMandi instant payout workflow, cocoon bidding 0→1 and vendor KYC; the Performance Score strategy and cross-platform PRD; the AI localization operating model.',
      'Shared with teams: engineering built the routing, billing and settlement implementations; the ML team built the computer-vision grading model, which he productized around; Growth and Content shaped pricing communication and lifecycle messaging; native-language reviewers validated localization quality.',
      'Company outcomes, not personal claims: the 80,000+ farmer reach at ReshaMandi is platform scale — he owned core marketplace, workflow and payment products, not the whole company. The €659K FY2025 subscription revenue is a business outcome on a product whose experience he owned.',
    ],
    source: 'Contribution sections across all case studies',
  },
  {
    id: 'leadership',
    keys: [
      'leadership style',
      'how does he lead',
      'manage team',
      'team',
      'mentor',
      'cross functional',
      'stakeholder',
      'alignment',
      'authority',
      'distributed',
      'remote',
    ],
    question: 'Tell me about his leadership style.',
    answer: [
      'He leads through alignment rather than authority — largely because the structure gave him no alternative. At Sportstech the model was an ODC: product and engineering in India, sales and operations at the Germany HQ, with no reporting line between them.',
      'That meant prioritization had to be earned. He set quarterly OKRs both sides signed off on, so disputes resolved against a written artifact instead of seniority. He established telemetry reporting standards, which moved arguments from opinion to shared evidence.',
      'Directly: led and mentored a 6-person cross-functional pod — 3 PMs, Growth and Content — across subscription, AI and connected-product tracks.',
    ],
    source: 'Leadership section · Sportstech, Oct 2024 — May 2026',
  },
  {
    id: 'why-interview',
    keys: [
      'why should i interview him',
      'why hire',
      'good fit',
      'strengths',
      'what makes him different',
      'value',
      'candidate',
      'recruit',
    ],
    question: 'Why should I interview him?',
    answer: [
      'Because the range is unusual and the method is consistent. He has shipped 0→1 in three quite different environments: a B2B agri-marketplace where users worked at 4:30 AM on noisy trading floors, a consumer subscription business with no billing infrastructure, and a conversational AI product with real safety stakes.',
      'In each case the pattern is the same — find the constraint that actually governs the system, then design around it. At ReshaMandi that was trust, solved by paying farmers at the weighbridge rather than explaining why digital payment was safe. On the AI Coach it was trust again, solved by constraining what the product would answer.',
      'And he is precise about attribution, which is rarer than it should be. Every number on this site says whether it was his, his team\'s, or the company\'s.',
    ],
    source: 'Selected work · Proof wall',
  },
  {
    id: 'subscription',
    keys: [
      'subscription',
      'monetization',
      'monetisation',
      'paywall',
      'pricing',
      'revenue',
      'growth',
      'retention',
      'churn',
      'conversion',
      'b2c',
    ],
    question: 'What did he do on subscription and monetization?',
    answer: [
      'He was the first PM on a free hardware companion app with no paywall, no billing pipeline and no subscription infrastructure, and designed the whole subscription experience from first principles.',
      'The central decision was placing the paywall after first value rather than at the door. That lowers conversion per impression and makes the funnel chart look worse — accepted deliberately in exchange for conversion quality and retention.',
      'FY2025 results: 12,401 paying subscribers against 174,180 freemium users, 81.9% YoY subscriber growth, 96.8% yearly-plan retention, and €659K platform subscription revenue. The revenue figure is a company outcome; what he owned was the experience that produced it.',
    ],
    source: 'Case study 02 — Subscription',
    link: {label: 'Read the Subscription case study', slug: 'subscription'},
  },
  {
    id: 'reshamandi',
    keys: [
      'reshamandi',
      'marketplace',
      'b2b',
      'farmers',
      'agri',
      'payments',
      'payout',
      'silk',
      'bidding',
      'kyc',
      'workflow',
    ],
    question: 'What did he do at ReshaMandi?',
    answer: [
      'He was Product Manager for core marketplace, workflows and payments in India\'s sericulture value chain — digitising intake, grading, auction, weighing, payment and settlement without halting live trading on a 48-hour perishable window.',
      'The defining insight came from field research on mandi floors before dawn: farmers were not rejecting technology because of literacy, but because generic apps ignored the physical reality of the work. Anything needing more than two taps or five seconds was dead on arrival.',
      'Results he owned: payouts moved from up to 15 days to automatic settlement triggered at the weighbridge at 99.9% reliability, with monthly disbursements scaling from ₹10–15 Cr to ₹20–25 Cr. Pilot auctions lifted transaction value by more than 35%.',
    ],
    source: 'Case study 03 — ReshaMandi',
    link: {label: 'Read the ReshaMandi case study', slug: 'reshamandi'},
  },
  {
    id: 'performance-score',
    keys: [
      'performance score',
      'connected products',
      'hardware',
      'iot',
      'wearable',
      'smart gym',
      'data architecture',
      'prd',
      'not launched',
      'strategy case',
    ],
    question: 'What is the Performance Score case study?',
    answer: [
      'A development-ready product strategy for unifying mobile, Smart Gym and connected-device telemetry behind a single 0–100 athletic reliability score across five surfaces.',
      'It did not launch during his tenure, and the portfolio states that plainly — there are no adoption or revenue outcomes claimed for it. It is included because it shows architecture and PRD quality, not because it shipped.',
      'The core argument: a unified score computed over fragmented session data is confidently wrong, so the first deliverable was a unified session model and a dual-write migration path, not a scoring algorithm.',
    ],
    source: 'Case study 04 — Performance Score (not launched)',
    link: {label: 'Read the Performance Score case study', slug: 'performance-score'},
  },
  {
    id: 'localization',
    keys: [
      'localization',
      'localisation',
      'content',
      'video',
      'translation',
      'europe',
      'expansion',
      'ai workflow',
      'operations',
      'pipeline',
    ],
    question: 'Tell me about the AI localization work.',
    answer: [
      'He redesigned a 3–4 month studio video production process into an AI-assisted pipeline that shipped 200+ workout videos across Italian, French and Spanish in roughly three weeks — about 10× faster than the studio benchmark.',
      'The reframe was that the expensive part was never translation, it was re-performing content that already existed. So the pipeline regenerates the language layer over the existing source instead of re-filming.',
      'A mandatory human review gate stays in the pipeline. That is what makes the speed defensible — it was fast because review was the only place they had to be slow.',
    ],
    source: 'Case study 05 — AI Localization',
    link: {label: 'Read the AI Localization case study', slug: 'ai-localization'},
  },
  {
    id: 'experience',
    keys: [
      'experience',
      'background',
      'career',
      'years',
      'worked',
      'companies',
      'resume',
      'cv',
      'history',
      'where has he worked',
    ],
    question: 'What is his background?',
    answer: [
      'Seven-plus years in product. Currently an independent Product Consultant (via Tejmonvi Softwares) advising healthtech AI, M&A and music-rights ventures.',
      'Before that: Senior Product Manager then Product Manager at Sportstech (Aug 2023 — May 2026), covering consumer AI, subscription and connected products. Product Manager at ReshaMandi (Jun 2021 — Sep 2023) on B2B marketplace workflows and payments. Associate Product Manager at LionCircuits (Jul 2018 — May 2020) on IoT and PCB manufacturing platforms.',
    ],
    source: 'Experience section',
  },
  {
    id: 'contact',
    keys: [
      'contact',
      'reach him',
      'email',
      'hire',
      'get in touch',
      'talk',
      'call',
      'available',
      'linkedin',
    ],
    question: 'How do I get in touch?',
    answer: [
      'Email is shipwithdeepak@gmail.com, and there is a booking link plus LinkedIn and GitHub in the contact section at the bottom of this page.',
      'If you have a complex product problem you are trying to make simpler, that is the conversation he is most interested in.',
    ],
    source: 'Contact',
  },
];

/** Words carrying no retrieval signal. */
const STOP = new Set([
  'what', 'is', 'the', 'a', 'an', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'his', 'he',
  'him', 'deepak', 'does', 'do', 'did', 'how', 'why', 'who', 'tell', 'me', 'about', 'i',
  'you', 'your', 'can', 'with', 'at', 'it', 'was', 'were', 'be', 'been', 'has', 'have',
  'that', 'this', 'there', 'their', 'them', 'they', 'would', 'should', 'could', 'us',
]);

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9₹€\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

export interface Match {
  entry: Entry;
  score: number;
}

/**
 * Lexical retrieval. Scores an entry by how much of the question's signal it
 * covers, with a bonus for phrase-level matches against its key phrasings.
 */
export function retrieve(query: string): Match[] {
  const q = tokens(query);
  if (q.length === 0) return [];

  const lower = query.toLowerCase();

  const scored = KNOWLEDGE.map((entry) => {
    const haystack = tokens(
      `${entry.question} ${entry.keys.join(' ')} ${entry.answer.join(' ')}`,
    );
    const set = new Set(haystack);

    let hits = 0;
    for (const term of q) {
      if (set.has(term)) hits += 1;
      // partial credit for stem-ish prefix matches (lead/leadership, pay/payout)
      else if (haystack.some((h) => h.startsWith(term) || term.startsWith(h))) hits += 0.5;
    }

    let score = hits / q.length;

    // strong boost when the user's phrasing contains one of the key phrases
    for (const key of entry.keys) {
      if (key.includes(' ') && lower.includes(key)) {
        score += 0.5;
        break;
      }
    }

    return {entry, score};
  });

  return scored.filter((m) => m.score > 0).sort((a, b) => b.score - a.score);
}

export const CONFIDENCE_THRESHOLD = 0.34;
