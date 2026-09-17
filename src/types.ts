export interface CaseStudyStat {
  label: string;
  value: string;
  detail?: string;
}

export interface EvaluationRow {
  id: number;
  query: string;
  category: string;
  groundTruthSource: string;
  retrievalHitTop3: boolean;
  similarity: number;
  status: 'Pass' | 'Fallback (Pass)' | 'Fail';
  notes: string;
}

export interface CaseStudySection {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  content: string[];
  highlights?: { title: string; desc: string }[];
  quote?: string;
  tag?: string;
  diagramType?: 'workflow' | 'comparison' | 'bidding' | 'funnel' | 'architecture' | 'safety' | 'evaluation';
  workflowSteps?: { label: string; desc?: string }[];
  comparison?: {
    before: { title: string; steps: string[] };
    after: { title: string; steps: string[] };
  };
  evaluationTable?: EvaluationRow[];
}

/**
 * Ownership scope for a case study. `role` and `timeline` already live on
 * CaseStudyDetail; this carries the three facts hiring managers look for and
 * that prose almost never states: how many people, how much money/surface,
 * and who you answered to. Any field left empty is simply not rendered.
 */
export interface CaseStudyScope {
  /** e.g. "9 people — 4 engineering, 2 design, 3 field ops" */
  team?: string;
  /** e.g. "Reported to the CPO" or "Direct to founders" */
  reportedTo?: string;
  /** The commercial surface you were accountable for.
   *  e.g. "₹20–25 Cr monthly disbursement volume" */
  ownership?: string;
  /** Partner functions you drove, e.g. "Engineering, design, field ops, finance" */
  collaborators?: string;
}

/**
 * The decision spine: the six blocks an interviewer is actually buying.
 * A case study explains WHAT HAPPENED; the spine explains WHAT YOU CHOSE.
 *
 * The spine only renders once `decision` and `outcome` are filled — a partly
 * written spine stays invisible on the live site, so it is safe to draft in
 * place. Individual empty blocks are skipped.
 */
export interface DecisionSpine {
  /** 1. Context — the situation in 2–3 sentences. Where things stood when you arrived. */
  context?: string;
  /** 2. The constraint — the one binding limit that made this hard.
   *  Not a list of problems: the single thing everything else had to bend around. */
  constraint?: string;
  /** 3. Options I rejected — the real alternatives and why each lost.
   *  This block does more for credibility than any metric on the page. */
  optionsRejected?: { option: string; why: string }[];
  /** 4a. What I decided — one sentence, active voice, first person. */
  decision?: string;
  /** 4b. Why — the reasoning, including what you traded away to get it. */
  rationale?: string;
  /** 5. What happened — the outcome, with at least one number and a time frame. */
  outcome?: string;
  /** 6. What I'd do differently — a real one. A spine with no regret in it
   *  reads as marketing and lowers trust in the wins too. */
  retrospect?: string;
}

export interface CaseStudyDetail {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  thesis: string;
  centralQuestion?: string;
  productPhilosophy?: string;
  category: string;
  role: string;
  timeline: string;
  tags: string[];
  proofPoints: string[];
  isStrategyOnly?: boolean;
  statusNotice?: string;
  url?: string;
  label?: string;
  keyStats: CaseStudyStat[];
  sections: CaseStudySection[];
  scope?: CaseStudyScope;
  decisionSpine?: DecisionSpine;
}

export interface MoreWorkItem {
  title: string;
  description: string;
  tags: string[];
  scope: string;
}

export interface MoreWorkCategory {
  category: string;
  description: string;
  items: MoreWorkItem[];
}

export interface ExperienceRole {
  title: string;
  company: string;
  period: string;
  type: string;
  description: string;
  focus?: string[];
  highlights: string[];
  skills: string[];
}

export interface LeadershipInfo {
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface HowIWorkPrinciple {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface CapabilityGroup {
  category: string;
  skills: string[];
}
