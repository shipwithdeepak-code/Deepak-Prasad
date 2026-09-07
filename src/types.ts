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
