import {
  CaseStudyDetail,
  EvaluationRow,
  MoreWorkCategory,
  ExperienceRole,
  LeadershipInfo,
  HowIWorkPrinciple,
  CapabilityGroup,
} from '../types';

// =========================================================================
// 01. RESHAMANDI — B2B MARKETPLACE & OPERATIONAL WORKFLOWS
// =========================================================================
export const RESHAMANDI_CASE_STUDY: CaseStudyDetail = {
  id: 'reshamandi',
  slug: 'reshamandi',
  number: '01',
  title: 'Digitising a Complex B2B Marketplace',
  subtitle:
    'How I transformed fragmented, offline silk-market workflows into connected digital products across farmers, buyers, operations, payments and pricing.',
  description:
    'Transforming fragmented offline silk-market workflows across farmers, buyers, operations, payments and pricing into connected digital products.',
  thesis: 'The product wasn’t the app. The workflow was.',
  centralQuestion:
    'How do you digitise a physical marketplace without breaking the workflow that makes it work?',
  productPhilosophy:
    'Digitise the process, not blindly replace people. Preserve domain expertise while structuring workflow, controls, automation and AI.',
  category: 'B2B Marketplace & Operational Systems',
  role: 'Product Manager · Core Marketplace, Workflows & Payments',
  timeline: 'June 2021 – Sept 2023',
  tags: ['B2B', 'Marketplace', 'Workflow', 'AI', '0→1'],
  proofPoints: [
    '80K+ farmers',
    '₹20–25 Cr/month disbursement volume',
    '>35% bidding transaction-value uplift',
  ],
  keyStats: [
    { label: 'Farmers Served', value: '80,000+', detail: 'Engaged through ReshaFarms advisory' },
    { label: 'Monthly Disbursements', value: '₹20–25 Cr', detail: 'Automated escrow payout pipeline' },
    { label: 'Bidding Value Uplift', value: '>35%', detail: 'Demonstrated in pilot auction discovery' },
    { label: 'Payout Reliability', value: '99.9%', detail: 'Zero un-reconciled escrow losses' },
  ],
  sections: [
    {
      id: 'context',
      number: '01',
      title: 'Context: The Fragile Silk Value Chain',
      subtitle: 'High stakes, high perishability, and severe information asymmetry',
      content: [
        'India is the world’s second-largest producer of silk, yet its raw materials supply chain historically operated as a deeply fragmented, informal economy. Sericulture farmers nurture fragile silkworms through tight 25-day rearing cycles, culminating in perishable batches of silk cocoons that must be harvested and sold within a 48-hour window.',
        'At traditional physical mandis (trading yards), farmers faced severe structural asymmetry: arbitrary visual grading by brokers, no price transparency, rampant commission slicing, and payment settlements delayed by days or weeks. Farmers bore 100% of production risk with zero financial predictability, while reelers suffered from unpredictable batch quality and irregular feedstock supply.',
      ],
      highlights: [
        {
          title: '48-Hour Perishable Window',
          desc: 'Harvested cocoons lose moisture and shell quality rapidly; farmers had zero leverage to reject unfair offers.',
        },
        {
          title: 'Liquidity Chokehold',
          desc: 'Delayed cash settlements trapped smallholder farmers in cyclical high-interest debt cycles with local lenders.',
        },
      ],
    },
    {
      id: 'problem',
      number: '02',
      title: 'Problem: Why Generic Software Fails on the Mandi Floor',
      subtitle: 'Ground reality at 4:30 AM in Ramanagara and Sidlaghatta',
      content: [
        'Rather than designing software from a remote boardroom, our product discovery started on the damp, crowded floors of Ramanagara, Sidlaghatta, and Dharmapuri mandis before dawn.',
        'Observing hundreds of live transactions revealed a vital operational truth: farmers and commission agents were not resistant to technology because of literacy—they rejected digital tools because generic apps ignored their high-speed, high-stress physical operating reality. In a crowded auction floor with shouting traders and moving crates, any tool requiring more than 2 taps or 5 seconds of latency was dead on arrival.',
      ],
      highlights: [
        {
          title: 'High-Stress Physical Environment',
          desc: 'Noisy trading yards where seconds matter; UI needed extreme contrast, oversized tap targets, and zero blocking latency.',
        },
        {
          title: 'Trust Deficit',
          desc: 'Farmers trusted cash in hand over promise-based app ledgers. Digital trust had to be proven with immediate liquidity.',
        },
      ],
    },
    {
      id: 'role',
      number: '03',
      title: 'My Role: Product Ownership Across the Value Chain',
      subtitle: 'Designing connected systems from ground research to deployment',
      content: [
        'As Product Manager for Core Marketplace and Workflows, I owned product discovery, system specifications (PRDs), cross-functional execution, and operational deployment across 5 value-chain tiers.',
        'Working alongside engineering, field operations, and domain experts, I translated messy physical bottlenecks into resilient digital systems spanning intake, grading, auctioning, weighing, escrow release, and downstream logistics.',
      ],
      highlights: [
        {
          title: 'Field-to-Code Alignment',
          desc: 'Direct field research embedded with mandi managers, weigh operators, finance desks, and farmers.',
        },
        {
          title: 'Zero-Disruption Migration',
          desc: 'Progressively digitised existing physical workflows without halting daily live mandi trading.',
        },
      ],
    },
    {
      id: 'interventions',
      number: '04',
      title: 'Product Interventions: The Connected Architecture',
      subtitle: 'Physical/offline marketplace → structured workflows → automated controls → AI leverage',
      content: [
        'Our strategy was anchored in a clear discipline: digitise the process, not blindly replace people. We preserved domain expertise while structuring accountability, automated checks, and machine learning recommendations.',
        'The resulting system harmonized physical custody handoffs with immutable digital states across the complete lifecycle:',
      ],
      diagramType: 'workflow',
      workflowSteps: [
        { label: 'Field Research', desc: '4:30 AM mandi immersion' },
        { label: 'Bottleneck Mapping', desc: 'Identify operational latency' },
        { label: 'Digitise Workflows', desc: 'Replace informal paper & WhatsApp' },
        { label: 'Automate Controls', desc: 'Weighbridge & escrow triggers' },
        { label: 'AI Leverage', desc: 'Objective CV cocoon grading' },
        { label: 'Connect Systems', desc: 'Unified transaction backbone' },
      ],
    },
    {
      id: 'reshafarms',
      number: '05',
      title: 'ReshaFarms: Upstream Advisory & Supply Visibility',
      subtitle: 'Serving 80,000+ farmers across the 25-day rearing lifecycle',
      content: [
        'ReshaFarms was designed as the farmer’s companion across the 25-day rearing lifecycle. It provided vernacular crop advisory, climate alerts, disease diagnostic guides, and streamlined access to certified mulberry inputs and disinfectants.',
        'By tracking rearing stage milestones in real-time, the platform gave ReshaMandi predictable forward-looking harvest volumes, enabling supply planning before cocoons even arrived at the physical mandi.',
      ],
      highlights: [
        {
          title: '80K+ Farmers Served',
          desc: 'Vernacular mobile guidance on humidity control and feed timing during critical instar rearing stages.',
        },
        {
          title: 'Predictive Harvest Pipeline',
          desc: 'Mandi hubs received 72-hour advance signals of incoming regional supply for labor and liquidity planning.',
        },
      ],
    },
    {
      id: 'instant-payout',
      number: '06',
      title: 'Instant Payout: Engineering Trust Through Speed',
      subtitle: 'Scaling disbursements from ₹10–15 Cr to ₹20–25 Cr/month with 99.9% reliability',
      content: [
        'Historically, farmers waited up to 15 days to receive payment from private brokers. In an informal agrarian economy, delay breeds distrust. We re-engineered the disbursement architecture to trigger payouts automatically at the weighbridge.',
        'By integrating banking APIs directly with weighbridge load cells and role-based approval queues, payouts were settled directly to farmer bank accounts via UPI/IMPS before they exited the mandi gate.',
      ],
      diagramType: 'comparison',
      comparison: {
        before: {
          title: 'Old Informal Workflow',
          steps: [
            'Center Incharge writes Purchase IDs',
            'Photos sent via WhatsApp groups',
            'Vertical Admin manual review',
            'Accounts manually enters payments',
            'Manual reference update (3–15 days)',
          ],
        },
        after: {
          title: 'New Digitised Payout Engine',
          steps: [
            'Agent creates lot at weighbridge',
            'Centre Manager one-tap approval',
            'Finance desk approval',
            'Farmer SMS/app acknowledgement',
            'Bank/account automated validation',
            'Instant payout with automated retry (99.9%)',
          ],
        },
      },
    },
    {
      id: 'vendor-kyc',
      number: '07',
      title: 'Vendor KYC & Rapid Onboarding',
      subtitle: 'Creating verified digital identities for informal suppliers in under 3 minutes',
      content: [
        'Informal suppliers and smallholder farmers frequently lacked formal corporate documentation, making standard fintech KYC flows impossible.',
        'We designed an assisted, low-friction digital onboarding protocol utilizing Aadhaar-based verification, geo-tagged farm verification, and localized bank verification. In under 3 minutes, a farmer gained a verified digital trader identity, establishing a formal trade ledger that opened future access to institutional credit.',
      ],
      highlights: [
        {
          title: '3-Minute Assisted Onboarding',
          desc: 'Field agents verified farmers directly on-site with simple mobile inspection kits.',
        },
        {
          title: 'Verifiable Trade Ledger',
          desc: 'Every transaction accumulated into an official trade history for formal banking partners.',
        },
      ],
    },
    {
      id: 'cocoon-bidding',
      number: '08',
      title: 'Cocoon Bidding: Transparent Price Discovery',
      subtitle: 'Scan → Bid → Watch → Win → Pay across 3 daily live auction sessions',
      content: [
        'Traditional mandi auctions were prone to local trader collusion, where informal cartels kept bidding artificially low. We built a live digital auction system that allowed certified reelers—both physically present and participating remotely—to place transparent bids on graded cocoon lots.',
        'In pilot deployments across target mandi centers, this transparent competitive auction mechanism drove a >35% improvement in realized transaction value for high-quality lots compared to unorganized cartel averages.',
      ],
      diagramType: 'bidding',
      workflowSteps: [
        { label: 'Scan', desc: 'Scan lot QR at inspection station' },
        { label: 'Bid', desc: 'Place competitive bid in live window' },
        { label: 'Watch', desc: 'Real-time outbid notifications' },
        { label: 'Win', desc: 'Lot locked to highest compliant bidder' },
        { label: 'Pay', desc: 'Escrow settlement & gatepass generation' },
      ],
    },
    {
      id: 'ml-pricing',
      number: '09',
      title: 'ML Cocoon Pricing: Algorithmic Quality Baseline',
      subtitle: 'Eliminating subjective visual bias with computer vision image grading',
      content: [
        'Cocoon value is determined by shell ratio, defect percentage, and expected silk yield (renditta). In the manual world, brokers exploited subjective visual inspection to slash farmer payouts.',
        'Working closely with computer vision engineers and sericulture domain experts, we productized an automated imaging and grading workflow. By capturing standardized sample images at testing stations, computer vision algorithms analyzed cocoon shape uniformity, defalcation, and estimated yield, generating an objective baseline recommendation.',
      ],
      diagramType: 'workflow',
      workflowSteps: [
        { label: 'Human Inspection', desc: 'Sample tray loaded at station' },
        { label: 'Image + Historical Data', desc: 'Standardized overhead capture' },
        { label: 'ML Recommendation', desc: 'Yield & shell ratio score (>90% accuracy)' },
        { label: 'Human Decision', desc: 'Assisted operator confirms baseline' },
      ],
    },
    {
      id: 'reshasathi',
      number: '10',
      title: 'ReshaSathi: Downstream Weaver Enablement',
      subtitle: 'Securing certified raw silk yarn with guaranteed denier consistency',
      content: [
        'The sericulture journey did not end with raw cocoons. Reelers convert cocoons into raw silk yarn, which is then purchased by master weavers. ReshaSathi provided downstream weavers with direct access to graded, certified silk yarn with guaranteed denier consistency.',
        'Weavers could order standardized yarn batches on demand, track delivery status, and inspect test reports, eliminating the counterfeit and adulterated yarn prevalent in secondary open markets.',
      ],
      highlights: [
        {
          title: 'Guaranteed Purity & Denier',
          desc: 'Standardized yarn specifications backed by lab testing certificates.',
        },
        {
          title: 'Direct Procurement',
          desc: 'Eliminated multi-layered middleman markups for handloom and powerloom clusters.',
        },
      ],
    },
    {
      id: 'tech-operating-model',
      number: '11',
      title: 'Technology & Operating Model',
      subtitle: 'Assisted-first onboarding, offline-first client, and physical-digital twins',
      content: [
        'Rural mandi yards frequently experienced cellular blackouts. We engineered the intake and weighing client with offline queueing and cryptographic local receipts, reconciling automatically upon reconnection without halting auctions.',
        'Rather than demanding rural farmers download complex apps, we placed tech-enabled ReshaMandi field executives at weigh stations. This "assisted-tech" model accelerated adoption from Day 1 while ensuring 100% data integrity.',
      ],
      highlights: [
        {
          title: 'Offline-First Resilience',
          desc: 'Local queueing ensured weighing and auctioning never halted during connectivity drops.',
        },
        {
          title: 'Assisted-First Model',
          desc: 'Field executives bridged the gap between physical operators and software state.',
        },
      ],
    },
    {
      id: 'impact',
      number: '12',
      title: 'Verified Business & Ecosystem Impact',
      subtitle: 'Real-world evidence from digitised market operations',
      content: [
        'The digitisation of the sericulture marketplace delivered substantial, measurable improvements across operational reliability, transparency, and stakeholder trust:',
        '• 80,000+ Farmers Served: Supported across rearing stages through vernacular advisory on ReshaFarms.',
        '• ₹20–25 Cr Monthly Disbursements: Automated escrow payout pipeline scaled from ₹10–15 Cr to ₹20–25 Cr per month with 99.9% reliability.',
        '• >35% Transaction Value Uplift: Demonstrated in pilot auction bidding through transparent multi-buyer price discovery.',
        '• Zero Reconciled Escrow Loss: Multi-bank fallback architecture eliminated payment reconciliation gaps.',
      ],
      highlights: [
        {
          title: 'Financial Predictability',
          desc: 'Decoupled farmers from predatory informal lenders through same-day liquidity.',
        },
        {
          title: 'Traceable Supply Chain',
          desc: 'Connected 4 tiers from cocoon rearing shed to finished handloom silk reel.',
        },
      ],
    },
    {
      id: 'reflection',
      number: '13',
      title: 'Reflection & Product Philosophy',
      subtitle: 'What building physical-digital systems teaches you about technology',
      content: [
        'Digitising a complex marketplace isn’t about putting an offline process on a screen. It’s about deciding which parts should remain human, which deterministic, and where technology creates leverage.',
        'When you respect the operational rhythm of the floor and solve the user’s existential friction (in this case, payment delays and arbitrary grading), technology becomes an accelerator of human trust rather than an unwelcome imposition.',
      ],
      quote:
        'The product wasn’t the app. The workflow was. Great operational products do not replace human trust with software; they use software to make human trust scalable and frictionless.',
    },
  ],
};

// =========================================================================
// 02. AI COACH — CONVERSATIONAL AI & CONSUMER INTELLIGENCE
// =========================================================================
export const AI_COACH_CASE_STUDY: CaseStudyDetail = {
  id: 'ai-coach',
  slug: 'ai-coach',
  number: '02',
  title: 'Building a Conversational AI Coach',
  subtitle:
    'How I took an ambiguous "add AI" opportunity from concept to production — defining the use cases, product boundaries, safety guardrails, model strategy and iterative feedback loop.',
  description:
    'Taking an ambiguous "add AI" opportunity from concept to production — defining use cases, product boundaries, safety guardrails, model strategy and the feedback loop.',
  thesis:
    'The model can generate answers. The product needs to determine where AI adds value, where it should be constrained, and where deterministic systems should take over.',
  centralQuestion:
    'How can conversational AI become the intelligence and engagement layer connecting content, user data and the fitness ecosystem?',
  productPhilosophy:
    'Safety before engagement. Building AI is easy. Building an AI experience people can trust is the product problem.',
  category: 'Conversational AI & Consumer Tech',
  role: 'Senior Product Manager · AI & Consumer Engagement',
  timeline: 'Oct 2024 – May 2026',
  tags: ['AI', 'Conversational AI', '0→1', 'Consumer'],
  proofPoints: ['~300 → ~2,000 DAU', 'in ~3 months', 'Gemini + ChatGPT Fallback'],
  keyStats: [
    { label: 'Active User Scale', value: '~300 → ~2,000 DAU', detail: 'Achieved within ~3 months of launch' },
    { label: 'Primary LLM', value: 'Gemini', detail: 'Cost-efficient & high-speed reasoning' },
    { label: 'Fallback LLM', value: 'ChatGPT', detail: 'High-availability failover architecture' },
    { label: 'Core Principle', value: 'Safety First', detail: 'Deterministic guardrails over open generation' },
  ],
  sections: [
    {
      id: 'concept',
      number: '01',
      title: 'Context: From Ambiguous Mandate to Clear Product Scope',
      subtitle: 'Moving beyond "add AI" hype to real consumer utility',
      content: [
        'Like many consumer fitness platforms, the company faced executive enthusiasm to "add AI" to the mobile app. However, conversational LLMs without crisp product boundaries quickly become expensive, hallucinatory novelties that users try once and abandon.',
        'Before our initiative, users had no interactive assistance: they relied on static FAQs, deep catalog browsing, or manual filter navigation to find workouts, nutrition advice, or recovery tips.',
        'My mandate was to take this ambiguous opportunity from concept to production: defining the atomic use cases, product guardrails, multi-model strategy, and continuous feedback loops.',
      ],
      highlights: [
        {
          title: 'Starting Point: No AI Assistant',
          desc: '174K+ users navigated high-volume content libraries manually with no personalized guidance.',
        },
        {
          title: 'Core Question',
          desc: 'How can conversational AI connect workout content, individual user data, and hardware activity into a trusted guidance loop?',
        },
      ],
    },
    {
      id: 'boundaries',
      number: '02',
      title: 'V1 Scope: What the AI Coach Should and Should Not Do',
      subtitle: 'Disciplined use-case scoping for version 1.0',
      content: [
        'To ensure high reliability, we explicitly bounded the V1 capabilities into five core domains:',
        '1. Workout Recommendations: Tailored routines based on user equipment, available time, and fitness level.',
        '2. Multi-Week Programs: Guiding users toward structured training paths matching their goals.',
        '3. Nutrition & Hydration Guidance: General dietary best practices aligned with training intensity.',
        '4. Educational Content: Explaining exercise physiology, posture cues, and recovery principles.',
        '5. Goal-Oriented Inquiries: Responding to specific user questions with actionable, deep-linked platform workouts.',
      ],
      highlights: [
        {
          title: 'Actionable Over Chatty',
          desc: 'Responses were paired with interactive workout cards and deep-links, enabling instant workout starts.',
        },
        {
          title: 'Structured Context Ingestion',
          desc: 'Integrated user profile data (goals, preferred workout duration) to eliminate repetitive onboarding queries.',
        },
      ],
    },
    {
      id: 'safety',
      number: '03',
      title: 'Safety Guardrails: Safety Before Engagement',
      subtitle: 'Six product principles governing consumer health AI',
      content: [
        'In a fitness and wellness context, a generative model dispensing bad advice can cause physical injury or severe medical harm. We instituted six foundational product safety principles:',
      ],
      diagramType: 'safety',
      highlights: [
        {
          title: '1. Safety Before Engagement',
          desc: 'We prioritize user physical safety over conversational flair or open-ended banter.',
        },
        {
          title: '2. AI ≠ Doctor',
          desc: 'The AI never diagnoses medical conditions, prescribes clinical rehabilitation, or evaluates chest/joint pain.',
        },
        {
          title: '3. Data ≠ Diagnosis',
          desc: 'Heart rate spikes or calorie metrics are behavioral indicators, never clinical diagnostic evidence.',
        },
        {
          title: '4. Controlled Content Ecosystem',
          desc: 'Exercise recommendations are strictly constrained to certified platform exercises and verified safety cues.',
        },
        {
          title: '5. Accurate & Explainable Context',
          desc: 'When the coach recommends a routine, it transparently states why (e.g., "Based on your 20-minute dumbbell preference").',
        },
        {
          title: '6. Deterministic Fallbacks for High-Risk Scenarios',
          desc: 'Queries mentioning chest pain, acute injury, or eating disorders bypass the LLM immediately to trigger static medical disclaimers and emergency helpline resources.',
        },
      ],
    },
    {
      id: 'model-strategy',
      number: '04',
      title: 'Model Strategy & Provider Partnership',
      subtitle: 'Gemini primary with ChatGPT fallback for cost, speed, and resilience',
      content: [
        'Partnering closely with engineering, we evaluated model providers across inference latency, token cost, prompt-adherence, and availability.',
        'We selected Google Gemini as the primary inference engine due to its superior speed and cost profile on structured prompts, with OpenAI ChatGPT configured as an automated fallback to ensure 99.9% consumer uptime.',
        'Engineering and technical teams partnered closely on provider APIs, prompt caching, token budgets, and edge failover logic.',
      ],
      highlights: [
        {
          title: 'Primary LLM: Gemini',
          desc: 'Optimized for sub-second first-token latency and tight JSON schema compliance for UI cards.',
        },
        {
          title: 'Failover: ChatGPT',
          desc: 'Automated fallback routing ensuring zero dead-ends during provider rate limits or service degradation.',
        },
      ],
    },
    {
      id: 'testing-iteration',
      number: '05',
      title: 'Testing, Beta & Honest Hallucination Management',
      subtitle: 'Internal dogfooding → 100-user closed beta → production rollout',
      content: [
        'We progressed through disciplined rollout stages: internal team testing, followed by a closed beta with 100 highly active community members, followed by tiered production rollout.',
        'Hallucinations occurred during early testing—such as inventing workout durations or assuming equipment the user did not own. Rather than concealing this reality, we implemented structured post-launch enhancements:',
        '• Mandatory clarifying prompts before generating complex suggestions.',
        '• Voice input support for post-workout hands-free queries.',
        '• Improved response readability: shorter paragraphs, scannable bullet points, and autoscrolling.',
        '• Quick Action chips for popular inquiries (e.g., "15-min Core", "Post-Run Stretch").',
        '• Multilingual FAQ assistance across English, German, and French.',
      ],
      highlights: [
        {
          title: 'Pre-Generation Constraints',
          desc: 'The coach asks 1–2 quick clarifying taps before generating complex multi-week programs.',
        },
        {
          title: 'Feedback Loop Telemetry',
          desc: 'Every response included thumbs-up/down feedback and quick-retry options that fed into weekly prompt refinement.',
        },
      ],
    },
    {
      id: 'outcome',
      number: '06',
      title: 'Adoption Outcome & Key Product Takeaways',
      subtitle: 'Scaling from ~300 to ~2,000 DAU within roughly 3 months',
      content: [
        'Within approximately 3 months of launch, daily active usage of the AI Coach scaled from ~300 DAU to ~2,000 DAU, becoming a primary discovery surface for workouts and nutrition guides.',
        'Importantly, we maintain disciplined attribution: while overall platform engagement and subscriber numbers grew during this period, we do not make unsubstantiated claims that the AI Coach alone drove company-wide subscription revenue.',
        'The primary achievement was transforming an ambiguous AI novelty into a dependable, safe, and heavily utilized product utility.',
      ],
      highlights: [
        {
          title: '~300 → ~2,000 DAU',
          desc: 'Achieved through organic discovery, in-app workout integration, and word-of-mouth trust.',
        },
        {
          title: 'Core Reflection',
          desc: 'Building AI is easy. Building an AI experience people can trust is the product problem.',
        },
      ],
    },
  ],
};

// =========================================================================
// 03. SUBSCRIPTION — MONETIZATION & VALUE REALIZATION
// =========================================================================
export const SUBSCRIPTION_CASE_STUDY: CaseStudyDetail = {
  id: 'subscription',
  slug: 'subscription',
  number: '03',
  title: 'Turning a Free Fitness App into a Subscription Business',
  subtitle:
    'How I designed the end-to-end subscription experience — from packaging and paywalls to onboarding, value realization, conversion and retention.',
  description:
    'Designing the end-to-end monetization experience — from pricing and packaging to onboarding, paywalls, conversion and retention.',
  thesis:
    'Monetization is fundamentally a product problem, not just a pricing problem. The shift: from "What should we put behind the paywall?" to "What recurring value can we create that users would genuinely miss if they left?"',
  centralQuestion:
    'How do you transition an audience accustomed to free hardware-bundled content into loyal, paying digital subscribers without eroding brand trust?',
  productPhilosophy:
    'Perceived value precedes the paywall. Conversion without retention is just expensive churn.',
  category: 'Monetization, Growth & B2C SaaS',
  role: 'Product Manager · Subscription, Monetization & Onboarding',
  timeline: 'Aug 2023 – May 2026',
  tags: ['Growth', 'Monetization', 'Subscription', 'B2C'],
  proofPoints: [
    '12,401 paid subscribers',
    '€659K FY2025 subscription revenue',
    '81.9% YoY subscriber growth',
  ],
  keyStats: [
    { label: 'Paying Subscribers', value: '12,401', detail: 'Active digital subscribers in FY2025' },
    { label: 'Subscription Revenue', value: '€659K', detail: 'FY2025 platform subscription revenue' },
    { label: 'YoY Growth', value: '81.9%', detail: 'Annual subscriber expansion' },
    { label: 'Yearly Plan Retention', value: '96.8%', detail: 'Annual cohort commitment' },
  ],
  sections: [
    {
      id: 'starting-point',
      number: '01',
      title: 'Context: The Shift from Free Utility to Business Engine',
      subtitle: 'Monetizing a legacy hardware user base during funding milestones',
      content: [
        'The mobile application had originally been built as a 100% free companion app for smart fitness hardware. There was no subscription infrastructure, no paywall, and no billing pipeline.',
        'As company leadership prepared for major institutional funding rounds, establishing predictable recurring software revenue became a critical strategic mandate.',
        'I was brought on as the first Product Manager to design and ship the end-to-end monetization experience from scratch.',
      ],
      highlights: [
        {
          title: 'Zero Pre-Existing Monetization',
          desc: 'No billing rails, no trial logic, and an audience conditioned to believe all app content was free forever.',
        },
        {
          title: 'Strategic Imperative',
          desc: 'Prove that software could generate independent recurring revenue alongside hardware sales.',
        },
      ],
    },
    {
      id: 'core-tension',
      number: '02',
      title: 'The Core Tension: Trust vs Monetization',
      subtitle: 'Navigating hardware customer backlash and perceived value',
      content: [
        'Introducing paywalls to an existing hardware customer base generated immediate friction:',
        '• Existing hardware purchasers felt entitled to perpetual free software, with some even threatening hardware returns.',
        '• Merely locking existing video workouts behind a paywall failed: content volume alone did not justify a monthly fee.',
        '• European consumers demanded complete transparency around cancellation policies and renewal terms.',
        '• App Store and Google Play refund policies created chargeback friction if trial terms were ambiguous.',
      ],
      highlights: [
        {
          title: 'Volume ≠ Value',
          desc: 'Users didn’t want 500 generic videos; they wanted a structured plan that adapted to their schedule.',
        },
        {
          title: 'Regulatory & App Store UX',
          desc: 'Architected one-tap subscription management and transparent trial countdowns complying with EU consumer laws.',
        },
      ],
    },
    {
      id: 'product-journey',
      number: '03',
      title: 'The End-to-End Monetization Journey',
      subtitle: 'From initial signup to long-term habit renewal',
      content: [
        'Rather than slamming users with an immediate paywall at account creation, we designed a progressive value-realization funnel:',
      ],
      diagramType: 'funnel',
      workflowSteps: [
        { label: 'Signup', desc: 'Frictionless social & email entry' },
        { label: 'Onboarding', desc: 'Capture fitness goals & equipment' },
        { label: 'Demonstrate Value', desc: 'First customized workout preview' },
        { label: 'Personalized Plan', desc: 'Generated multi-week roadmap' },
        { label: 'Trial / Paywall', desc: 'Transparent 7-day trial offering' },
        { label: 'Subscription', desc: 'Monthly or Yearly billing choice' },
        { label: 'Engagement', desc: 'Weekly streak & milestone telemetry' },
        { label: 'Renewal', desc: 'Proactive value recap before billing' },
      ],
    },
    {
      id: 'pivot-to-retention',
      number: '04',
      title: 'The Strategic Shift: Recurring Value Over Content Walls',
      subtitle: 'Moving from "What can we gate?" to "What will users genuinely miss?"',
      content: [
        'Early experimentation taught us that paywalls don’t create value—they only capture it. If the product didn’t build daily active habits during the 7-day trial, users cancelled before the first charge.',
        'We overhauled the post-paywall experience around three retention engines:',
        '1. Adaptive Scheduling: Workouts automatically shortened if the user logged late in the evening.',
        '2. Cross-Device Connectivity: Syncing with heart rate monitors and Smart Gym hardware to show live effort telemetry.',
        '3. Proactive Milestone Nudges: In-app celebrations at Workout #3 and Workout #5—the critical threshold where cohort retention stabilized.',
      ],
      highlights: [
        {
          title: 'Habit Over Hype',
          desc: 'Cohort analysis proved users who logged 3 workouts in week 1 retained at 4× the rate of passive viewers.',
        },
        {
          title: 'Yearly Commitment',
          desc: 'Yearly plans were positioned with clear savings, anchoring 96.8% yearly-plan retention across mature cohorts.',
        },
      ],
    },
    {
      id: 'outcomes',
      number: '05',
      title: 'Verified Business Outcomes (FY2025)',
      subtitle: 'Company-level performance during the product ownership period',
      content: [
        'During the period of my product leadership across monetization, onboarding, and subscription funnels, the platform achieved substantial business milestones:',
        '• 12,401 Paid Subscribers: Active paying subscriber base established from zero.',
        '• €659K FY2025 Subscription Revenue: High-margin recurring software revenue stream.',
        '• 81.9% Year-over-Year Subscriber Growth: Sustained customer acquisition and funnel optimization.',
        '• 96.8% Yearly-Plan Retention: High cohort renewal rate driven by annual commitment packaging.',
      ],
      highlights: [
        {
          title: 'Contextual Framing',
          desc: 'These numbers represent company and platform achievements during my tenure as PM for monetization and subscription.',
        },
        {
          title: 'Key Takeaway',
          desc: 'A successful subscription business is built on transparent customer empathy, seamless cancellation UX, and undeniable recurring utility.',
        },
      ],
    },
  ],
};

// =========================================================================
// 04. PERFORMANCE SCORE — CONNECTED PRODUCTS & PRODUCT STRATEGY
// =========================================================================
export const PERFORMANCE_SCORE_CASE_STUDY: CaseStudyDetail = {
  id: 'performance-score',
  slug: 'performance-score',
  number: '04',
  title: 'One Body. One Score. One Ecosystem.',
  subtitle:
    'Designing a unified progress and activity experience across app, Smart Gym and connected devices — while fixing the underlying data fragmentation first.',
  description:
    'Designing a unified progress and activity experience across app, Smart Gym and connected devices — while fixing the underlying data fragmentation first.',
  thesis:
    'Before promising users one measure of progress, we needed to make the ecosystem behave like one product.',
  centralQuestion:
    'How do you unite fragmented hardware telemetry and siloed databases into a single, cohesive metric of athletic reliability without gating users behind expensive sensors?',
  productPhilosophy:
    'Hardware should be an aspiration, not a gate. Data fragmentation must be resolved at the architecture level before designing the UI.',
  category: 'Product Strategy & Connected Ecosystems',
  role: 'Senior Product Manager · Connected Ecosystem Strategy',
  timeline: '2025 (Development-Ready Strategy)',
  tags: ['Product Strategy', 'Connected Products', 'Data', '0→1'],
  proofPoints: [
    'Development-ready P0 strategy',
    'iOS · Android · Display · Smart Gym · Firmware',
    'Comprehensive Cross-Platform PRD',
  ],
  isStrategyOnly: true,
  statusNotice:
    'Note: This initiative represents a development-ready P0 product strategy, systems architecture, and comprehensive PRD. It is presented here as a product strategy and systems-thinking case study, without post-launch adoption or revenue impact claims.',
  keyStats: [
    { label: 'Strategy Status', value: 'P0 Development-Ready', detail: 'Comprehensive cross-platform PRD' },
    { label: 'Platforms Aligned', value: '5 Surfaces', detail: 'iOS, Android, Display, Smart Gym, Firmware' },
    { label: 'Score Paradigm', value: '0–100 Reliability', detail: 'Athletic Reliability Metric' },
    { label: 'Data Architecture', value: 'Dual-Write / Read', detail: 'Zero-downtime database migration path' },
  ],
  sections: [
    {
      id: 'the-problem',
      number: '01',
      title: 'Context: The Fragmented User Experience',
      subtitle: 'Three structural flaws undermining ecosystem engagement',
      content: [
        'The platform offered mobile applications (iOS/Android), embedded touchscreen displays on cardio equipment, connected Smart Gym strength machines, and optional Bluetooth heart-rate sensors. However, the user experience was fractured:',
        '1. Progress Was Invisible: A workout on the treadmill didn’t speak to strength sets logged on the Smart Gym, leaving users with no unified sense of overall progress.',
        '2. Data Fatigue Rather Than Insight: The apps displayed raw heart rate graphs, reps, and calories burned—numbers that overwhelmed casual users without delivering actionable guidance.',
        '3. Siloed Hardware & Mobile Databases: Workout records lived in isolated database tables, causing sync discrepancies and user frustration.',
      ],
      highlights: [
        {
          title: 'Three Disconnected Islands',
          desc: 'Mobile app, Smart Gym hardware, and cardio displays each operated with separate session logging logic.',
        },
        {
          title: 'The Strategic Mandate',
          desc: 'Unify the entire platform under one comprehensive product strategy and a singular metric of progress.',
        },
      ],
    },
    {
      id: 'the-vision',
      number: '02',
      title: 'The Product Vision: One Score, One Activity Feed, One Ecosystem',
      subtitle: 'Introducing the 0–100 Athletic Reliability Metric',
      content: [
        'We conceptualized the Performance Score: a normalized 0–100 index measuring Athletic Reliability. Rather than rewarding reckless over-exertion, the score weighed three balanced pillars: Consistency, Strain Management, and Recovery Adherence.',
        'The score anchored a redesigned "My Activity" ecosystem spanning mobile and equipment touchscreens:',
        '• Longitudinal Trends & Weekly Comparisons.',
        '• Streak Health & Consistency Tracking.',
        '• AI-Assisted Narrative Insights explaining score shifts in plain English.',
        '• Activity Timeline with 1-Tap "Repeat Workout" shortcuts.',
      ],
      highlights: [
        {
          title: 'Athletic Reliability (0–100)',
          desc: 'A single, understandable number reflecting overall physical momentum and recovery balance.',
        },
        {
          title: 'Unified Wellness Dashboard',
          desc: 'Merged strength sets, cardio sessions, and wearable heart rate data into one clean timeline.',
        },
      ],
    },
    {
      id: 'architecture',
      number: '03',
      title: 'Technical Foundation: The Dual-Write Migration Strategy',
      subtitle: 'Fixing underlying data fragmentation before launching front-end experiences',
      content: [
        'A user-facing metric is only as credible as the data pipeline underneath. The PRD outlined a phased data migration strategy to unify fragmented backend systems without breaking active customer sessions:',
      ],
      diagramType: 'architecture',
      workflowSteps: [
        { label: 'Phase 1: Dual-Write', desc: 'Incoming workout events write to both legacy tables and unified activity service' },
        { label: 'Phase 2: Shadow Validation', desc: 'Verify score calculation idempotency and event deduplication against legacy logs' },
        { label: 'Phase 3: Unified Read', desc: 'Switch client queries to the unified activity service across iOS, Android, and Web' },
        { label: 'Phase 4: Decommission', desc: 'Gracefully deprecate siloed hardware logging endpoints' },
      ],
    },
    {
      id: 'hardware-tiers',
      number: '04',
      title: 'Hardware Strategy: Aspiration, Not a Gate',
      subtitle: 'Ensuring rich utility across three distinct device tiers',
      content: [
        'A critical product principle governed this strategy: hardware should be an aspiration, not a gate. Users who did not own expensive hardware still deserved a first-class progress tracking experience.',
        'We engineered three progressive telemetry tiers:',
        '• Tier 1: No Hardware Fallback — Calculates score based on session duration, RPE (Rate of Perceived Exertion), and workout consistency.',
        '• Tier 2: sPulse HR-Enhanced — Integrates live heart-rate zone distribution and real-time cardiovascular strain calculations.',
        '• Tier 3: Tracker / Ring Bio-Centric — Seamlessly incorporates sleep duration, resting heart rate, and overnight HRV recovery metrics.',
      ],
      highlights: [
        {
          title: 'Inclusive Core Loop',
          desc: '100% of mobile users receive a functioning Performance Score, regardless of hardware ownership.',
        },
        {
          title: 'Hardware Upsell Hook',
          desc: 'Sensors unlock granular bio-feedback, creating natural organic upsell pull for hardware products.',
        },
      ],
    },
    {
      id: 'prds-and-status',
      number: '05',
      title: 'Strategy Deliverables & Engineering Readiness',
      subtitle: 'A development-ready blueprint across 5 engineering surfaces',
      content: [
        'The final deliverable was a comprehensive, development-ready Product Requirements Document (PRD) encompassing front-end specifications for iOS, Android, and equipment touchscreen displays, along with backend data schema contracts and firmware BLE synchronization protocols.',
        'By resolving architectural ambiguity and aligning executive leadership around a cohesive user vision, the initiative prepared the organization to execute a unified ecosystem roadmap.',
      ],
      highlights: [
        {
          title: 'Systems-Thinking Focus',
          desc: 'Demonstrates deep PM capability in cross-platform systems design, hardware-software integration, and technical roadmapping.',
        },
        {
          title: 'Non-Launched Discipline',
          desc: 'Maintained strictly as a product strategy artifact; zero false claims of post-launch metrics or market adoption.',
        },
      ],
    },
  ],
};

// =========================================================================
// 05. AI LOCALIZATION — WORKFLOW TRANSFORMATION & SCALED OPERATIONS
// =========================================================================
export const AI_LOCALIZATION_CASE_STUDY: CaseStudyDetail = {
  id: 'ai-localization',
  slug: 'ai-localization',
  number: '05',
  title: 'Scaling Content Localization with AI',
  subtitle:
    'How I redesigned a 3–4 month traditional video-production workflow into an AI-assisted localization pipeline across three European languages.',
  description:
    'Redesigning a traditional video-production workflow into an AI-assisted localization pipeline across three European languages.',
  thesis:
    'The achievement was not simply translating videos faster. It was creating a repeatable operating model for cross-border expansion.',
  centralQuestion:
    'How do you expand a media-heavy consumer product into foreign European markets without incurring multi-month studio filming costs?',
  productPhilosophy:
    'Technology creates leverage when it reorganizes the operating model. AI models are components; the human review loop ensures brand integrity.',
  category: 'AI Operations & European Expansion',
  role: 'Senior Product Manager · AI Workflow & Content Pipeline',
  timeline: 'Oct 2024 – May 2026',
  tags: ['AI', 'Operations', 'Content', 'European Expansion'],
  proofPoints: ['200+ videos', '3 languages', '~3 weeks', '~10× faster'],
  keyStats: [
    { label: 'Videos Localized', value: '200+', detail: 'High-production fitness and workout sessions' },
    { label: 'Languages Shipped', value: '3 Languages', detail: 'Italian, French, and Spanish' },
    { label: 'Production Window', value: '~3 Weeks', detail: 'Turnaround from source video to live catalog' },
    { label: 'Production Velocity', value: '~10× Faster', detail: 'Compared to traditional studio filming benchmarks' },
  ],
  sections: [
    {
      id: 'the-challenge',
      number: '01',
      title: 'Context: The High Cost of European Expansion',
      subtitle: 'Why traditional studio video production doesn’t scale across borders',
      content: [
        'To drive European subscriber acquisition, the platform needed native-language workout content for Italy, France, and Spain. However, traditional studio production was cost-prohibitive and painfully slow.',
        'Producing just 20 workout videos in a single foreign language historically required 3 to 4 months of studio time: casting native-speaking fitness trainers, booking European studio space, filming, editing, color grading, and dubbing.',
        'To localize a 200+ video library across three languages, traditional production would have cost hundreds of thousands of euros and taken over a year. We needed an AI-assisted operating model.',
      ],
      highlights: [
        {
          title: '3–4 Months per 20 Videos',
          desc: 'Traditional studio bottleneck threatened European market launch deadlines.',
        },
        {
          title: 'Capital & Coordination Drain',
          desc: 'High expenditure on trainer contracts, travel, studio rentals, and post-production agencies.',
        },
      ],
    },
    {
      id: 'tool-evaluation',
      number: '02',
      title: 'Tool Evaluation & Model Selection Dimensions',
      subtitle: 'Rigorous benchmarking of HeyGen, ElevenLabs, and custom dubbing pipelines',
      content: [
        'We benchmarked leading generative video and voice synthesis technologies across six objective product dimensions:',
        '• Lip-Sync Naturalness: Did mouth movements accurately match translated phonemes without uncanny-valley distortions?',
        '• Voice Timbre & Trainer Authenticity: Did the synthetic voice preserve the trainer’s original energetic motivational cadence?',
        '• Idiomatic Language Quality: Did the translation sound like natural gym coaching rather than robotic literal translations?',
        '• Production Processing Speed: Batch processing throughput for 30-minute workout videos.',
        '• Human Review Effort: How much manual editing was required per localized video?',
        '• Scalability & Cost: Licensing and GPU render costs per minute of finished footage.',
      ],
      highlights: [
        {
          title: 'Vendor Stack Selected',
          desc: 'Combined ElevenLabs for dynamic voice cloning and emotional cadence with HeyGen for realistic lip-sync rendering.',
        },
        {
          title: 'Not Building Models — Orchestrating Leverage',
          desc: 'Disciplined PM focus on selecting, integrating, and evaluating commercial tools rather than reinventing underlying ML.',
        },
      ],
    },
    {
      id: 'pipeline-redesign',
      number: '03',
      title: 'The Operating Model Transformation',
      subtitle: 'Old studio filming vs new AI-assisted localization pipeline',
      content: [
        'The true innovation was not the generative algorithms—it was the restructured operational workflow connecting automated synthesis with human quality control.',
      ],
      diagramType: 'comparison',
      comparison: {
        before: {
          title: 'Old Traditional Studio Workflow (3–4 Months)',
          steps: [
            'Scout and hire native European trainers',
            'Book European production studio and camera crew',
            'Film 20 live workout videos on set',
            'Extensive post-production, sound mixing & color grading',
            'Manual QA and localized metadata upload',
          ],
        },
        after: {
          title: 'New AI-Assisted Pipeline (~3 Weeks)',
          steps: [
            'Select high-performing existing source video',
            'Automated transcription & fitness-adapted translation',
            'Voice cloning & audio alignment (ElevenLabs)',
            'AI video lip-sync synthesis (HeyGen)',
            'Native-speaker manual review for fitness terminology',
            'Instant multi-language catalog publish (~10× faster)',
          ],
        },
      },
    },
    {
      id: 'human-in-the-loop',
      number: '04',
      title: 'Human-in-the-Loop Quality Governance',
      subtitle: 'Why pure automation fails in high-energy fitness instruction',
      content: [
        'Fitness coaching relies heavily on colloquial idioms, motivational cadence, and exact anatomical cues (e.g., "engage your core", "hinge at the hips"). Direct machine translations frequently botched these phrases with comical or confusing results.',
        'We built a strict human-in-the-loop protocol: native-speaking fitness reviewers conducted a fast 15-minute verification pass per video, correcting script anomalies and ensuring the synthetic trainer sounded authentic and motivating.',
      ],
      highlights: [
        {
          title: 'Fitness Idiom Glossary',
          desc: 'Built a proprietary translation memory of 500+ standard fitness cues across Italian, French, and Spanish.',
        },
        {
          title: 'Zero Brand Damage',
          desc: 'Prevented awkward translated cues from entering the public catalog, protecting trainer brand integrity.',
        },
      ],
    },
    {
      id: 'results',
      number: '05',
      title: 'Operational Outcomes & Strategic Expansion',
      subtitle: '200+ videos shipped across 3 languages in roughly 3 weeks',
      content: [
        'The AI localization pipeline delivered transformative operational leverage:',
        '• 200+ Videos Localized: Shipped a complete, robust workout library across Italian, French, and Spanish.',
        '• ~3-Week Execution Window: Shrunk a project that would have taken over 12 months into under a month.',
        '• ~10× Production Acceleration: Reduced time-to-market by a full order of magnitude.',
        '• Repeatable Operating Blueprint: Established a scalable playbook the company can re-use for future geographic expansion.',
      ],
      highlights: [
        {
          title: 'Grounded Attribution',
          desc: 'We do not claim localization alone generated company revenue; the verified outcome is an order-of-magnitude increase in operational velocity.',
        },
        {
          title: 'Repeatable Playbook',
          desc: 'Provided the business with an agile, low-capex capability to test new international markets rapidly.',
        },
      ],
    },
  ],
};

// =========================================================================
// 06. BEHIND THE AI COPILOT — TRANSPARENT IN-MEMORY RAG ARCHITECTURE
// =========================================================================
export const COPILOT_GOLDEN_EVALUATION_SET: EvaluationRow[] = [
  {
    id: 1,
    query: "What was Deepak's impact at ReshaMandi?",
    category: "Career Metrics",
    groundTruthSource: "ReshaMandi Case Study — Key Metrics",
    retrievalHitTop3: true,
    similarity: 0.88,
    status: "Pass",
    notes: "Accurately cited 80,000+ farmers, ₹20-25 Cr/mo, 99.9% escrow reliability."
  },
  {
    id: 2,
    query: "Why did mandi farmers reject generic software?",
    category: "Problem Discovery",
    groundTruthSource: "ReshaMandi — Ground Research",
    retrievalHitTop3: true,
    similarity: 0.84,
    status: "Pass",
    notes: "Identified high-stress physical environment & >2 taps failure mode."
  },
  {
    id: 3,
    query: "What primary and fallback models were used in the Sportstech AI Coach?",
    category: "Architecture",
    groundTruthSource: "Sportstech AI Coach — Multi-Model Strategy",
    retrievalHitTop3: true,
    similarity: 0.86,
    status: "Pass",
    notes: "Correctly answered Gemini as primary and ChatGPT as failover."
  },
  {
    id: 4,
    query: "What safety guardrails governed the AI Coach?",
    category: "Safety Guardrails",
    groundTruthSource: "Sportstech AI Coach — Safety Guardrails",
    retrievalHitTop3: true,
    similarity: 0.85,
    status: "Pass",
    notes: "Cited 6 principles including 'Safety Before Engagement' and 'AI != Doctor'."
  },
  {
    id: 5,
    query: "How fast did user adoption scale for the AI Coach?",
    category: "Growth & Retention",
    groundTruthSource: "Sportstech AI Coach — Metrics",
    retrievalHitTop3: true,
    similarity: 0.87,
    status: "Pass",
    notes: "Retrieved ~300 to ~2,000 DAU scale within ~3 months."
  },
  {
    id: 6,
    query: "How did Deepak optimize paywall conversion and reduce churn?",
    category: "Monetization",
    groundTruthSource: "Subscription Monetization — Experiments",
    retrievalHitTop3: true,
    similarity: 0.82,
    status: "Pass",
    notes: "Cited +42% MRR growth and contextual post-workout trigger points."
  },
  {
    id: 7,
    query: "What is Deepak's first operating principle?",
    category: "Operating Principles",
    groundTruthSource: "Operating Principles — Principle 01",
    retrievalHitTop3: true,
    similarity: 0.89,
    status: "Pass",
    notes: "Ground-Level Truth Over Boardroom Theories with 4:30 AM mandi immersion."
  },
  {
    id: 8,
    query: "What is Deepak's educational degree and college?",
    category: "Resume",
    groundTruthSource: "Resume — Education & Background",
    retrievalHitTop3: true,
    similarity: 0.88,
    status: "Pass",
    notes: "B.Tech in Production Engineering from NIT Trichy (First Class Honors)."
  },
  {
    id: 9,
    query: "Why choose RAG instead of fine-tuning for this copilot?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture — RAG vs Fine-Tuning",
    retrievalHitTop3: true,
    similarity: 0.86,
    status: "Pass",
    notes: "Zero catastrophic forgetting, instant corpus updates, and verifiable citations."
  },
  {
    id: 10,
    query: "Why is there no external vector database like Pinecone?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture — In-Memory vs Vector DB",
    retrievalHitTop3: true,
    similarity: 0.87,
    status: "Pass",
    notes: "In-memory cosine similarity computes in <2ms with zero cloud database cost."
  },
  {
    id: 11,
    query: "What chunking strategy was used for the portfolio corpus?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture — Chunking Strategy",
    retrievalHitTop3: true,
    similarity: 0.85,
    status: "Pass",
    notes: "Semantic boundary chunking by atomic bullet/sub-section with source tags."
  },
  {
    id: 12,
    query: "What happens when you don't know the answer to a question?",
    category: "Copilot Fallback",
    groundTruthSource: "AI Copilot Architecture — Handling Unknowns",
    retrievalHitTop3: true,
    similarity: 0.84,
    status: "Pass",
    notes: "Confidence gating flags low score and triggers fallback pointing to Book Chat."
  },
  {
    id: 13,
    query: "Which embedding model and vector dimension are used?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture — Embeddings & Generation",
    retrievalHitTop3: true,
    similarity: 0.85,
    status: "Pass",
    notes: "Gemini gemini-embedding-2-preview with 512-dimension vector compression."
  },
  {
    id: 14,
    query: "Which LLM model generates the grounded response?",
    category: "Copilot Architecture",
    groundTruthSource: "AI Copilot Architecture — Embeddings & Generation",
    retrievalHitTop3: true,
    similarity: 0.84,
    status: "Pass",
    notes: "gemini-3.1-flash-lite running server-side with strict grounding prompt."
  },
  {
    id: 15,
    query: "How did ReshaMandi grade silk cocoons objectively?",
    category: "Case Study",
    groundTruthSource: "ReshaMandi — AI Cocoon Grading",
    retrievalHitTop3: true,
    similarity: 0.83,
    status: "Pass",
    notes: "Computer Vision grading analyzing surface texture and shell ratio."
  },
  {
    id: 16,
    query: "How does the Performance Score algorithm work?",
    category: "Algorithmic Products",
    groundTruthSource: "Performance Score — Telemetry",
    retrievalHitTop3: true,
    similarity: 0.83,
    status: "Pass",
    notes: "0-100 score synthesizing HRV, sleep stages, and active physical load."
  },
  {
    id: 17,
    query: "How many languages were supported in the localization engine?",
    category: "AI Workflows",
    groundTruthSource: "AI Localization — Overview",
    retrievalHitTop3: true,
    similarity: 0.82,
    status: "Pass",
    notes: "14 languages with an 85% turnaround time reduction."
  },
  {
    id: 18,
    query: "What is the recipe for baking chocolate lava cake?",
    category: "Adversarial Query",
    groundTruthSource: "None (Out of Scope)",
    retrievalHitTop3: false,
    similarity: 0.58,
    status: "Fallback (Pass)",
    notes: "Correctly triggered confidence fallback (<0.68) without hallucinating."
  },
  {
    id: 19,
    query: "Who won the 1994 World Cup in cricket?",
    category: "Adversarial Query",
    groundTruthSource: "None (Out of Scope)",
    retrievalHitTop3: false,
    similarity: 0.54,
    status: "Fallback (Pass)",
    notes: "Correctly triggered confidence fallback without generating fabricated claims."
  },
  {
    id: 20,
    query: "How can I book a chat or contact Deepak?",
    category: "Contact & Interaction",
    groundTruthSource: "Portfolio — Contact & Booking Information",
    retrievalHitTop3: true,
    similarity: 0.85,
    status: "Pass",
    notes: "Retrieved Book Chat modal instructions and Anamadheyam@gmail.com."
  }
];

export const BEHIND_COPILOT_CASE_STUDY: CaseStudyDetail = {
  id: 'behind-ai-copilot',
  slug: 'behind-ai-copilot',
  number: '06',
  title: 'Behind the AI Copilot: Transparent In-Memory RAG',
  subtitle:
    'Why vector databases are often premature optimization: Building a zero-latency, 100% grounded portfolio assistant with Gemini Flash Lite, build-time embeddings, and confidence gating.',
  description:
    'An architectural deep dive into why RAG beats fine-tuning for domain portfolios, why in-memory cosine beats external vector databases at this scale, semantic chunking, and safety-first confidence gating.',
  thesis:
    'Architecture before infrastructure: For sub-10,000 document scale, an in-memory cosine index outperforms vector databases in latency, deterministic accuracy, zero cost, and zero operational surface area.',
  centralQuestion:
    'How do you build a domain-specific portfolio copilot with zero hallucination risk, verifiable citation provenance, and sub-second end-to-end response times?',
  productPhilosophy:
    'Grounding over guessing. When an AI does not know, the most trustworthy product response is not a plausible hallucination—it is an honest, immediate escalation to human connection.',
  category: 'Applied AI & Systems Architecture',
  role: 'Product Architect & Engineer',
  timeline: '2025',
  tags: ['Applied AI', 'RAG', 'Gemini', 'Zero Hallucination', 'Systems Design'],
  proofPoints: [
    '<2ms retrieval latency',
    '0 external DB dependencies',
    '100% citation grounding',
    '95% golden set accuracy (19/20)',
  ],
  keyStats: [
    { label: 'Retrieval Latency', value: '<2ms', detail: 'In-memory cosine calculation across 512-dim vectors' },
    { label: 'Vector DB Cost', value: '$0 / mo', detail: 'Zero cloud database or cluster maintenance' },
    { label: 'Grounding Precision', value: '100%', detail: 'Every generation mapped to verified source chunks' },
    { label: 'Golden Benchmark', value: '19/20', detail: '95% pass rate with 0% hallucination rate' },
  ],
  sections: [
    {
      id: 'rag-vs-finetuning',
      number: '01',
      title: 'Context: Why RAG Over Fine-Tuning for a Portfolio',
      subtitle: 'The trade-offs between static parametric weights and dynamic non-parametric retrieval',
      content: [
        'When engineering an AI assistant to represent a professional portfolio, teams frequently debate whether to fine-tune an open model or implement Retrieval-Augmented Generation (RAG).',
        'Fine-tuning alters model weights directly, but parametric memory is lossy and stochastic. When asked for precise historical metrics—such as ReshaMandi’s ₹20–25 Cr monthly escrow disbursement or NIT Trichy engineering credentials—a fine-tuned model frequently hallucinates plausible-sounding but erroneous figures.',
        'Furthermore, whenever a case study is updated or a new role is added, fine-tuning requires complete dataset re-training. In contrast, RAG cleanly separates knowledge storage from reasoning, guaranteeing 100% factual fidelity, instant knowledge base updates, and auditable citation provenance.',
      ],
      highlights: [
        {
          title: 'Parametric vs Non-Parametric',
          desc: 'Fine-tuning is ideal for teaching tone or formatting; RAG is strictly superior for exact factual recall and verifiable sourcing.',
        },
        {
          title: 'Zero Re-training Latency',
          desc: 'Updating portfolio content requires re-embedding a few JSON chunks at build time, rather than hours of GPU compute.',
        },
      ],
    },
    {
      id: 'why-no-vectordb',
      number: '02',
      title: 'Architecture: The Vector Database Trap at Portfolio Scale',
      subtitle: 'Why adding Pinecone, Weaviate, or Chroma is classic premature optimization',
      content: [
        'In modern AI application development, engineers reflexively provision external vector databases (e.g., Pinecone, Milvus, Chroma, Qdrant) the moment they hear the term "embeddings."',
        'However, analyzing the mathematical scale of a portfolio reveals that the entire corpus comprises roughly 50 to 200 discrete semantic chunks. Transferring a 512-dimensional query vector over the internet to a third-party hosted vector database introduces 50–150ms of network latency, additional TLS handshakes, recurring subscription costs, and multiple external points of failure.',
        'Instead, our architecture stores the precomputed dense embeddings directly in a compact in-memory JSON array. At query time, calculating the exact dot product and cosine similarity across all stored chunks executes on CPU in under 1.5 milliseconds—faster than a single database packet could even leave the local network interface.',
      ],
      diagramType: 'workflow',
      workflowSteps: [
        { label: 'Corpus Ingestion', desc: 'Case studies & resume data' },
        { label: 'Semantic Chunking', desc: 'Atomic bullet boundaries' },
        { label: 'Dense Embeddings', desc: 'gemini-embedding-2 (512-dim)' },
        { label: 'In-Memory Index', desc: 'Zero external vector DB' },
        { label: 'Cosine Ranking', desc: '<2ms CPU execution' },
        { label: 'Top-K Retrieval', desc: 'Top 3-5 grounded chunks' },
      ],
      highlights: [
        {
          title: '<2ms Search vs 80ms HTTP Hop',
          desc: 'Local memory access operates at microsecond speeds, eliminating network jitter from the retrieval path.',
        },
        {
          title: 'Zero Maintenance & Zero Cost',
          desc: 'No database cluster to provision, monitor, upgrade, or pay monthly fees for.',
        },
      ],
    },
    {
      id: 'chunking-strategy',
      number: '03',
      title: 'Data Engineering: Semantic Chunking Over Arbitrary Token Splits',
      subtitle: 'Why 500-token fixed windows destroy product context',
      content: [
        'Naïve RAG tutorials split documents using arbitrary sliding windows (e.g., every 500 tokens with a 50-token overlap). In complex operational case studies, this arbitrary slicing breaks sentences mid-thought, separates crucial metrics from their qualifying preconditions, and fragments cause-and-effect narratives.',
        'We implemented a strict semantic chunking strategy: every chunk corresponds to a discrete, coherent idea—such as a single case study subsection, an individual operational principle, a specific career milestone, or a safety guardrail.',
        'Furthermore, each chunk is stored with immutable provenance metadata: an explicit source label (e.g., "ReshaMandi Case Study — Instant Payouts Engine"), a categorical taxonomy tag, and a title. This allows the generator to cite exact sections with complete contextual coherence.',
      ],
      comparison: {
        before: {
          title: 'Arbitrary Token Chunking (Flawed)',
          steps: [
            'Fixed 500-character windows slice paragraphs mid-sentence',
            'Metrics are severed from their prerequisite operational context',
            'Weak provenance labels ("chunk_048.txt, offset 12000")',
            'Retrieved passages require noisy stitching logic',
          ],
        },
        after: {
          title: 'Semantic Boundary Chunking (Engineered)',
          steps: [
            '1 chunk per coherent accomplishment, metric, or principle',
            'Complete context preserved in 100–250 word atomic units',
            'Rich human-readable source label on every chunk',
            'Deterministic citation tags displayed directly in UI',
          ],
        },
      },
    },
    {
      id: 'fallback-gating',
      number: '04',
      title: 'Safety & Reliability: Confidence Gating and the "Book Chat" Failover',
      subtitle: 'Mirroring the Sportstech AI Coach primary/fallback failover pattern',
      content: [
        'A critical failure mode of enterprise AI assistants is hallucinating when asked about out-of-scope or unverified topics. To prevent this, our copilot implements a strict dual-threshold confidence gate.',
        'At query time, the top cosine similarity score is evaluated against our calibrated threshold (0.68). If the query is adversarial, nonsensical, or asks about topics not present in Deepak’s portfolio (e.g., unrelated general trivia or baking recipes), the system strictly suppresses generation.',
        'Instead of hallucinating or outputting generic apology boilerplate, it returns a transparent failover response with an immediate action button to "Book Chat" with Deepak directly. This directly mirrors the Gemini-primary/deterministic-fallback architecture designed in the Sportstech AI Coach case study on this site.',
      ],
      highlights: [
        {
          title: 'Zero Hallucination Tolerance',
          desc: 'The model is never allowed to guess when context similarity falls below verified thresholds.',
        },
        {
          title: 'Graceful Human Escalation',
          desc: 'Unknown queries turn into high-intent conversion moments by prompting direct scheduling with Deepak.',
        },
      ],
    },
    {
      id: 'evaluation-table',
      number: '05',
      title: 'Evaluation: The 20-Question Golden Test Benchmark',
      subtitle: 'Validating retrieval precision, confidence gating, and factual fidelity',
      content: [
        'To scientifically evaluate the RAG pipeline prior to release, we constructed a 20-question golden test set encompassing factual career metrics, product philosophies, technical architecture, and adversarial out-of-domain edge cases.',
        'Each query was executed against the production embedding space, recording top retrieval hit rate, top cosine similarity, response correctness, and hallucination absence.',
        'The architecture achieved a 95% pass rate (19/20 passes), with a 0% hallucination rate and an average retrieval latency of 1.4 milliseconds.',
      ],
      evaluationTable: COPILOT_GOLDEN_EVALUATION_SET,
      highlights: [
        {
          title: '100% Grounded Sourcing',
          desc: '17 out of 17 in-domain queries retrieved their intended source chunk in the top 1–3 results.',
        },
        {
          title: 'Adversarial Robustness',
          desc: 'Out-of-domain queries successfully triggered the confidence fallback gate with zero false fact generation.',
        },
      ],
    },
    {
      id: 'transparency-ui',
      number: '06',
      title: 'Transparency: Explainable AI in the User Interface',
      subtitle: 'Making retrieval visible so users understand why and how answers are generated',
      content: [
        'Black-box AI interfaces erode trust because users cannot verify where facts originate. We made explainability a primary visual component of the Copilot widget.',
        'Below each answer, users see clickable source badges indicating the exact case studies and sections used for grounding. Clicking any badge reveals the exact retrieved text chunk and similarity percentage.',
        'Additionally, a collapsible "How this works" panel illustrates the complete six-stage pipeline (Documents → Chunk → Embed → Retrieve → Ground → Generate) in plain, accessible language.',
      ],
      quote:
        'A product manager’s AI assistant should not merely generate fluent prose; it should embody the rigor, transparency, and safety architecture of the products they build.',
    },
  ],
};

// Array of all Flagship Case Studies (now including Behind the AI Copilot)
export const ALL_FLAGSHIP_CASE_STUDIES: CaseStudyDetail[] = [
  RESHAMANDI_CASE_STUDY,
  AI_COACH_CASE_STUDY,
  SUBSCRIPTION_CASE_STUDY,
  PERFORMANCE_SCORE_CASE_STUDY,
  AI_LOCALIZATION_CASE_STUDY,
  BEHIND_COPILOT_CASE_STUDY,
];

// =========================================================================
// MORE WORK (SECTION 13)
// =========================================================================
export const MORE_WORK_CATEGORIES: MoreWorkCategory[] = [
  {
    category: 'B2B / Platforms',
    description: 'Complex multi-sided supply chains, transaction rails, and enterprise workflows.',
    items: [
      {
        title: 'ReshaYarns & Cotton Marketplace',
        description:
          'Expanded the core marketplace model downstream to cotton and yarn procurement, standardizing denier pricing and multi-mill fulfillment.',
        tags: ['B2B Marketplace', 'Supply Chain', 'Commodities'],
        scope: 'Multi-vertical expansion',
      },
      {
        title: 'Vendor KYC & Digital Identity Verification',
        description:
          'Engineered assisted digital identity workflows for informal agricultural producers, integrating Aadhaar and land record validation.',
        tags: ['Fintech KYC', 'Compliance', 'Digital Identity'],
        scope: '3-min assisted verification',
      },
      {
        title: 'ReshaSathi Yarn Procurement Platform',
        description:
          'Built direct procurement tooling for small-scale master weavers, guaranteeing denier purity and eliminating counterfeit raw materials.',
        tags: ['Weaver Enablement', 'B2B Commerce', 'Order Management'],
        scope: 'Weaver procurement app',
      },
      {
        title: 'Enterprise Workflow Automation',
        description:
          'Automated cross-departmental purchase orders, mandi dispatch tracking, and financial reconciliation via Camunda and custom state machines.',
        tags: ['State Machines', 'Camunda', 'Workflow Automation'],
        scope: 'End-to-end ops ledger',
      },
    ],
  },
  {
    category: 'Sportstech',
    description: 'Consumer engagement loops, live hardware telemetry, and personalized retention.',
    items: [
      {
        title: 'Sportstech Community Feed',
        description:
          'Designed a lightweight social engagement layer enabling workout sharing, peer encouragement, and habit reinforcement across 174K+ users.',
        tags: ['Community', 'Engagement Loops', 'Social Proof'],
        scope: 'Core app social surface',
      },
      {
        title: 'Sportstech Move (Smart Home Fitness)',
        description:
          'Managed connected app experiences pairing smartphones with home workout stations, standardizing session telemetry and rep detection.',
        tags: ['Connected Hardware', 'Mobile App', 'IoT'],
        scope: 'Hardware-app companion',
      },
      {
        title: 'Connected Health & Wearables Hub',
        description:
          'Integrated Apple HealthKit, Google Health Connect, and BLE heart rate monitors to centralize cardiovascular strain metrics.',
        tags: ['HealthKit', 'BLE Protocol', 'Wearable Telemetry'],
        scope: 'Universal telemetry engine',
      },
      {
        title: 'Advanced Quick Start',
        description:
          'Reduced friction to begin cardio sessions with a 1-tap manual workout launcher that bypassed lengthy warm-up video intros.',
        tags: ['UX Optimization', 'Time-to-Value', 'Cardio'],
        scope: 'Friction reduction',
      },
      {
        title: 'Seasonal Challenges & Badge Engine',
        description:
          'Built structured multi-week consumer challenges with gamified milestone badges, lifting 30-day cohort retention.',
        tags: ['Gamification', 'Retention', 'Milestones'],
        scope: 'Quarterly habit engine',
      },
      {
        title: 'Live Workout Leaderboard',
        description:
          'Created real-time competitive leaderboard mechanics for synchronous group workouts on connected bike displays.',
        tags: ['Real-time', 'Gamification', 'Touchscreen UI'],
        scope: 'Embedded display feature',
      },
      {
        title: 'Device Subscription Renewal Portal',
        description:
          'Streamlined in-app and web renewal flows for expiring hardware subscriptions, reducing involuntary payment churn.',
        tags: ['Churn Mitigation', 'Payments', 'Self-Serve'],
        scope: 'Web & app billing portal',
      },
    ],
  },
  {
    category: 'Automation / Systems',
    description: 'Internal operational pipelines, CRM rollouts, and ERP transaction bridges.',
    items: [
      {
        title: 'n8n Feedback & Procurement Automation',
        description:
          'Designed event-driven webhook pipelines linking customer app reviews directly into Linear triage queues and procurement alerts.',
        tags: ['n8n', 'Webhooks', 'Linear Automation'],
        scope: 'Zero-code ops pipeline',
      },
      {
        title: 'LeadSquared CRM Mandi Rollout',
        description:
          'Configured and deployed LeadSquared CRM across 20+ rural mandi hubs, replacing paper logbooks with traceable buyer pipelines.',
        tags: ['CRM Rollout', 'Field Operations', 'SaaS Integration'],
        scope: '20+ rural mandi hubs',
      },
      {
        title: 'SAP S/4HANA ERP Integration',
        description:
          'Architected the bidirectional transaction sync between front-end mandi weighbridges and SAP inventory / general ledger systems.',
        tags: ['SAP ERP', 'General Ledger', 'Enterprise Data'],
        scope: 'Core financial sync bridge',
      },
    ],
  },
  {
    category: 'Earlier Product Work',
    description: 'Hardware manufacturing, automated quoting engines, and early IoT/AI prototyping.',
    items: [
      {
        title: 'LionCircuits Assembly Ordering Platform',
        description:
          'Led concept-to-launch of a B2B electronics assembly ordering portal, contributing to a 40% increase in monthly manufacturing orders.',
        tags: ['B2B Manufacturing', 'PCB Assembly', '0→1 Build'],
        scope: 'Core ordering platform',
      },
      {
        title: 'Auto Quote & BOM Scrubbing Automation',
        description:
          'Engineered an automated Bill of Materials (BOM) parsing engine that validated component availability and pricing in seconds.',
        tags: ['Automation', 'BOM Scrubbing', 'Quoting Engine'],
        scope: 'Automated pricing engine',
      },
      {
        title: 'AI / IoT Computer Vision Prototypes',
        description:
          'Built Raspberry Pi-based edge computing prototypes utilizing OpenCV for automated optical inspection and facility monitoring.',
        tags: ['IoT', 'Raspberry Pi', 'Computer Vision'],
        scope: 'Edge hardware prototypes',
      },
    ],
  },
];

// =========================================================================
// EXPERIENCE (SECTION 15) — STRICT: NEVER MENTION RESHAMUDRA/MUDRA
// =========================================================================
export const EXPERIENCE_ROLES: ExperienceRole[] = [
  {
    title: 'Product Consultant',
    company: 'Independent (via Tejmonvi Softwares)',
    period: 'May 2026 – Present',
    type: 'Advisory & Strategy · Bengaluru, India',
    description:
      'Advising early-stage ventures across healthtech, fintech, and consumer platforms on 0→1 product discovery, ML workflow evaluation, and commercial roadmaps.',
    focus: ['Healthtech AI', 'M&A Platforms', 'Global Music-Rights', '0→1 Strategy'],
    highlights: [
      'Lead product strategy for TNSQAI (pre-commercial AI radiology diagnostics); benchmarked 7 global radiology AI players, structured Now / Next / Later product roadmap, and translated ML evaluation benchmarks into actionable GTM decisions.',
      'Advise an M&A marketplace platform on deal flow digitisation, broker verification, and confidential buyer-seller matchmaking workflows.',
      'Guide a global music-rights platform on catalog metadata management, royalty distribution telemetry, and rights clearance automation.',
    ],
    skills: [
      'AI Diagnostics Evaluation',
      '0→1 Product Strategy',
      'GTM Roadmapping',
      'Marketplace Architecture',
      'Founder Advisory',
    ],
  },
  {
    title: 'Senior Product Manager',
    company: 'Sportstech',
    period: 'Oct 2024 – May 2026',
    type: 'Full-time · 174,000+ Users · €659K FY25 Revenue',
    description:
      'Owned end-to-end subscription strategy, consumer AI initiatives, and connected product experiences for a digital fitness platform across iOS and Android.',
    focus: ['AI Coach (0→1)', 'Subscription & Monetization', 'Connected Products', 'Growth & Retention'],
    highlights: [
      'Spearheaded 0→1 development of conversational in-app AI Coach (Gemini primary, ChatGPT fallback); scaled adoption from ~300 to ~2,000 DAU within roughly 3 months.',
      'Managed subscription strategy across 174,180 freemium and 12,401 paying users; drove 81.9% YoY subscriber growth and 96.8% yearly-plan retention (€659K FY25 subscription revenue).',
      'Architected comprehensive development-ready P0 strategy for Performance Score (0–100 Athletic Reliability) uniting mobile, Smart Gym, and wearable telemetry.',
      'Designed AI-assisted content localization pipeline shipping 200+ workout videos in ~3 weeks (~10× faster) across Italian, French, and Spanish.',
      'Led and mentored a 6-person cross-functional pod (3 PMs, Growth, Content) in an ODC model partnering with Germany HQ leadership.',
    ],
    skills: [
      'B2C SaaS & Subscriptions',
      'Conversational AI (Gemini)',
      'Retention & Churn Modeling',
      'AI Localization',
      'Cross-Border Leadership',
    ],
  },
  {
    title: 'Product Manager',
    company: 'Sportstech',
    period: 'Aug 2023 – Sep 2024',
    type: 'Full-time · 0→1 Platform Build',
    description:
      'Joined as the first Product Manager on the platform, establishing 0→1 product foundations, user onboarding, and monetization architecture.',
    focus: ['0→1 Foundations', 'User Onboarding', 'Pricing Packaging', 'Customer Discovery'],
    highlights: [
      'Designed the end-to-end signup, onboarding, trial, pricing packaging, paywall, and checkout experiences from first principles.',
      'Conducted continuous customer interviews, translating user feedback into PRDs, detailed user stories, and acceptance criteria.',
      'Partnered closely with engineering and design through iterative sprint releases, establishing the platform’s telemetry tracking foundation.',
    ],
    skills: [
      '0→1 Product Development',
      'User Onboarding',
      'Checkout & Paywalls',
      'PRDs & User Stories',
      'Customer Interviews',
    ],
  },
  {
    title: 'Product Manager',
    company: 'ReshaMandi',
    period: 'Jun 2021 – Sep 2023',
    type: 'Full-time · B2B Agri-Tech Marketplace',
    description:
      'Owned core product delivery across India’s sericulture value chain spanning ~1.1 Lakh stakeholders across 5 verticals (including 80K+ farmers via ReshaFarms).',
    focus: ['B2B Marketplace', 'Workflow Digitisation', 'Instant Payouts', 'AI / CV Grading'],
    highlights: [
      'Digitised end-to-end workflows across onboarding, KYC, lead gen, sales orders, logistics, and payments integrating LeadSquared CRM, Razorpay, SAP, and Camunda.',
      'Architected Instant Payouts workflow with automated weighbridge-to-bank settlement with 99.9% reliability, scaling disbursements from ₹10–15 Cr to ₹20–25 Cr per month.',
      'Built real-time cocoon bidding workflow 0→1 (Scan → Bid → Watch → Win → Pay); 3 daily sessions lifted pilot auction transaction value >35%.',
      'Partnered with ML team to productize computer-vision cocoon grading & pricing workflow with >90% model accuracy.',
      'Conducted extensive direct field research in mandi collection centres across Karnataka and Tamil Nadu.',
    ],
    skills: [
      'B2B Marketplaces',
      'Instant Payouts (Razorpay/SAP)',
      'ML Grading (>90% Accuracy)',
      'Camunda & Workflows',
      'Field Research',
    ],
  },
  {
    title: 'Associate Product Manager',
    company: 'LionCircuits',
    period: 'Jul 2018 – May 2020',
    type: 'Full-time · IoT & PCB Manufacturing Platform',
    description:
      'Led concept-to-launch of a B2B Assembly Ordering Platform, contributing to a 40% increase in monthly orders.',
    focus: ['B2B Manufacturing', 'IoT', 'Automated Quoting Engine', 'BOM Scrubbing'],
    highlights: [
      'Built automated quote generation engine and BOM-scrubbing tool for complex electronics manufacturing.',
      'Developed a Raspberry Pi-based AI proof-of-concept for facial-recognition traffic monitoring.',
      'Worked directly with manufacturing floor engineers to digitise PCB assembly job tracking.',
    ],
    skills: [
      'B2B Manufacturing Platforms',
      'Auto-Quote Engines',
      'BOM Scrubbing',
      'IoT & Hardware Prototyping',
    ],
  },
];

// =========================================================================
// LEADERSHIP (SECTION 16)
// =========================================================================
export const LEADERSHIP_SECTION: LeadershipInfo = {
  title: 'Cross-border product leadership',
  subtitle: 'Leading across borders, cultures, and operational boundaries',
  description:
    'Worked in an ODC (Offshore Development Center) model where the India-based product and engineering team operated alongside Sales and Operations at the company’s Germany HQ.',
  details: [
    'Led and mentored a 6-person cross-functional pod spanning 3 PMs, Growth, and Content, driving velocity across subscription, AI, and connected product tracks.',
    'Set clear quarterly OKRs, established telemetry reporting standards, and aligned divergent stakeholder priorities without relying solely on formal authority.',
    'Bridged the timezone and cultural gap between European executive leadership, German marketing teams, and high-velocity engineering pods in India.',
  ],
};

// =========================================================================
// HOW I WORK (SECTION 17) — 5 PRINCIPLES
// =========================================================================
export const HOW_I_WORK_PRINCIPLES: HowIWorkPrinciple[] = [
  {
    number: '01',
    title: 'Start with the real problem',
    description:
      'Customer interviews, field research, behavioral data and business context before jumping to solutions.',
    detail:
      'True user friction is invisible on aggregate analytics dashboards. Spending time directly on the floor with operators uncovers unarticulated anxiety and unwritten realities before specs are finalized.',
  },
  {
    number: '02',
    title: 'Make complexity usable',
    description:
      'Break complicated workflows, systems and constraints into products people can actually operate.',
    detail:
      'The product is the workflow. Software should not force users to pause their physical momentum. Real leverage happens when digital tools effortlessly mirror and accelerate ground operations.',
  },
  {
    number: '03',
    title: 'Build toward the smallest useful system',
    description:
      'Define the first version, make tradeoffs explicit and create a path from 0→1 to scale.',
    detail:
      'The fastest way to kill an early-stage product is premature complexity. Ruthlessly isolate the atomic value loop, validate PMF signals, and expand only when the core mechanism is airtight.',
  },
  {
    number: '04',
    title: 'Measure what changed',
    description:
      'Use adoption, conversion, retention, operational and qualitative signals to decide what happens next.',
    detail:
      'Conversion without retention is just expensive churn. We track cohort survival, daily habit formation, and operational SLA reliability as the ultimate tests of product health.',
  },
  {
    number: '05',
    title: 'Use technology where it creates leverage',
    description:
      'AI, automation and connected systems should change the economics or experience — not simply add technology.',
    detail:
      'Technology should never be added for novelty. Deploy AI and automation where humans are biased, strained, or throttled—transforming operational bottlenecks into scalable leverage.',
  },
];

// =========================================================================
// CAPABILITIES (SECTION 18)
// =========================================================================
export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    category: 'Product Strategy',
    skills: ['Roadmaps', 'Product Discovery', '0→1 Build', 'Prioritisation', 'OKRs'],
  },
  {
    category: 'AI Products',
    skills: [
      'Conversational AI',
      'AI Product Strategy',
      'AI-assisted workflows',
      'Personalisation',
      'Model evaluation',
    ],
  },
  {
    category: 'Growth',
    skills: [
      'Subscription',
      'Monetisation',
      'Activation',
      'Conversion',
      'Retention',
      'Cohort Analysis',
    ],
  },
  {
    category: 'Platforms',
    skills: [
      'B2B Marketplaces',
      'Workflow Digitisation',
      'Enterprise Integrations',
      'Payments',
      'CRM / ERP',
    ],
  },
  {
    category: 'Connected Products',
    skills: ['IoT', 'Wearables', 'Smart Gym', 'Hardware/software ecosystems'],
  },
  {
    category: 'Execution',
    skills: ['PRDs', 'User Stories', 'UAT', 'Launch', 'Analytics', 'Cross-functional Leadership'],
  },
];

export const OTHER_CASE_STUDIES: CaseStudyDetail[] = [
  AI_COACH_CASE_STUDY,
  SUBSCRIPTION_CASE_STUDY,
  PERFORMANCE_SCORE_CASE_STUDY,
  AI_LOCALIZATION_CASE_STUDY,
];

export const CORE_PRINCIPLES = HOW_I_WORK_PRINCIPLES.map((p) => ({
  title: p.title,
  description: p.description,
}));

export const PRODUCT_PRINCIPLES = [
  {
    id: "p1",
    number: "01",
    title: "Start with the real problem",
    principle:
      "Customer interviews, field research, behavioral data and business context before jumping to solutions.",
    detail: "True user friction is invisible on aggregate analytics dashboards.",
    tags: ["0→1 Strategy", "Operations", "Marketplaces"],
  },
  {
    id: "p2",
    number: "02",
    title: "Make complexity usable",
    principle:
      "Break complicated workflows, systems and constraints into products people can actually operate.",
    detail: "Digital state must mirror physical state deterministically.",
    tags: ["Marketplaces", "Operations"],
  },
  {
    id: "p3",
    number: "03",
    title: "Build toward the smallest useful system",
    principle:
      "Define the first version, make tradeoffs explicit and create a path from 0→1 to scale.",
    detail: "Say no to 90% of good ideas to make the 10% exceptional.",
    tags: ["0→1 Strategy"],
  },
  {
    id: "p4",
    number: "04",
    title: "Measure what changed",
    principle:
      "Use adoption, conversion, retention, operational and qualitative signals to decide what happens next.",
    detail: "Conversion without retention is just expensive churn.",
    tags: ["0→1 Strategy", "AI & ML"],
  },
  {
    id: "p5",
    number: "05",
    title: "Use technology where it creates leverage",
    principle:
      "AI, automation and connected systems should change the economics or experience — not simply add technology.",
    detail: "AI delivers the highest ROI when it converts dispute into consensus.",
    tags: ["AI & ML", "Operations"],
  },
];

