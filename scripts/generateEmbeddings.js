import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set!");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Helper to compute cosine similarity (dot product of normalized vectors)
function dotProduct(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}

function magnitude(a) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * a[i];
  }
  return Math.sqrt(sum);
}

function cosineSimilarity(a, b) {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
}

// Complete knowledge base chunks
const CHUNKS = [
  // ==========================================
  // 1. DEEPAK PRASAD — SUMMARY & BACKGROUND
  // ==========================================
  {
    id: "deepak-bio-overview",
    source: "Resume — Executive Summary",
    category: "Background",
    title: "Deepak Prasad Profile & Background",
    chunk: "Deepak Prasad is a Senior Product Manager with 7+ years of product management experience building AI-native, data-driven products across B2B and B2C. He specializes in 0→1 products, marketplaces, subscription monetization, connected hardware systems, and operational workflow automation."
  },
  {
    id: "deepak-education",
    source: "Resume — Education & Background",
    category: "Background",
    title: "Education & Technical Foundation",
    chunk: "Deepak holds a Bachelor of Technology (B.Tech) in Production Engineering from the National Institute of Technology, Tiruchirappalli (NIT Trichy), one of India's premier technical institutions, graduating with First Class Honors."
  },
  {
    id: "deepak-core-competencies",
    source: "Resume — Core Competencies",
    category: "Background",
    title: "Product Competencies & Domain Expertise",
    chunk: "Deepak's product competencies span Conversational AI & LLM Systems, 0→1 Marketplace Discovery, Consumer Subscription & Paywall Optimization, Real-Time Hardware Telemetry, B2B Operational Workflows, and Algorithmic Scoring Engines."
  },

  // ==========================================
  // 2. RESHAMANDI CASE STUDY & WORKFLOWS
  // ==========================================
  {
    id: "cs1-overview-thesis",
    source: "ReshaMandi Case Study — Overview",
    category: "ReshaMandi",
    title: "ReshaMandi Product Thesis & Overview",
    chunk: "At ReshaMandi (India's premier B2B agri-tech silk marketplace), Deepak's product thesis was: 'The product wasn’t the app. The workflow was.' Great operational products do not replace human trust with software; they use software to make human trust scalable and frictionless across fragmented supply chains."
  },
  {
    id: "cs1-scale-impact-metrics",
    source: "ReshaMandi Case Study — Key Metrics",
    category: "ReshaMandi",
    title: "ReshaMandi Scale & Business Impact",
    chunk: "Deepak led marketplace workflows and payments at ReshaMandi, scaling the platform to 80,000+ farmers, ₹20–25 Cr ($2.5M–$3M) in monthly escrow disbursements, >35% bidding transaction-value uplift in auction discovery, and 99.9% payout reliability with zero unreconciled escrow losses."
  },
  {
    id: "cs1-silk-chain-context",
    source: "ReshaMandi Case Study — Fragile Silk Chain",
    category: "ReshaMandi",
    title: "The 48-Hour Perishable Silk Cocoon Challenge",
    chunk: "Sericulture farmers rear silkworms through tight 25-day rearing cycles, resulting in perishable silk cocoons that must be harvested, graded, and sold within a 48-hour window. At physical mandis, farmers suffered severe information asymmetry, arbitrary broker grading, commission slicing, and payment delays of days or weeks."
  },
  {
    id: "cs1-mandi-floor-discovery",
    source: "ReshaMandi Case Study — Ground Research",
    category: "ReshaMandi",
    title: "Ground-Level Research at 4:30 AM Mandis",
    chunk: "Product discovery began at 4:30 AM on the wet, chaotic floors of Ramanagara and Sidlaghatta trading mandis. Farmers and commission agents rejected generic software not from illiteracy, but because tools with >2 taps or >5 seconds of latency fail in high-stress, noisy physical trading environments."
  },
  {
    id: "cs1-escrow-payouts-engine",
    source: "ReshaMandi Case Study — Instant Payouts Engine",
    category: "ReshaMandi",
    title: "Automated Digital Escrow & Instant Liquidity",
    chunk: "Deepak architected an instant digital escrow payout pipeline that disbursed payments directly into farmers' bank accounts upon weighbridge certification, eliminating weeks of debt-trapping delays. Disbursing ₹20–25 Cr monthly with 99.9% reliability, instant liquidity turned skeptical mandi traders into vocal platform champions."
  },
  {
    id: "cs1-cv-ai-cocoon-grading",
    source: "ReshaMandi Case Study — AI Cocoon Grading",
    category: "ReshaMandi",
    title: "Computer Vision Cocoon Quality Grading",
    chunk: "To eliminate arbitrary visual grading by middlemen, Deepak introduced an objective Computer Vision grading tool that analyzed cocoon surface texture, uniformity, and shell ratio directly from smartphone photos, establishing standardized fair market valuations."
  },
  {
    id: "cs1-digital-weighbridge",
    source: "ReshaMandi Case Study — Connected Hardware",
    category: "ReshaMandi",
    title: "IoT Digital Weighbridge Integration",
    chunk: "Manual scales were replaced with IoT-connected digital weighbridges. Real-time weight data was piped directly into immutable auction manifests, preventing weight tampering and commission skimming at physical aggregation centers."
  },
  {
    id: "cs1-core-philosophy",
    source: "ReshaMandi Case Study — Philosophy",
    category: "ReshaMandi",
    title: "Digitise the Process, Don't Blindly Replace People",
    chunk: "ReshaMandi's core design principle was to digitise the workflow rather than blindly attempt to replace physical mandi actors. By preserving domain expertise while structuring accountability, automated triggers, and CV checks, the technology enhanced trust."
  },

  // ==========================================
  // 3. SPORTS TECH AI COACH (CONVERSATIONAL AI)
  // ==========================================
  {
    id: "cs2-overview-thesis",
    source: "Sportstech AI Coach Case Study — Overview",
    category: "AI Coach",
    title: "AI Coach Product Thesis & Scope",
    chunk: "In the Sportstech Conversational AI Coach case study, Deepak's core thesis was: 'The model can generate answers. The product needs to determine where AI adds value, where it should be constrained, and where deterministic systems should take over.' Safety comes before engagement."
  },
  {
    id: "cs2-scale-growth-metrics",
    source: "Sportstech AI Coach Case Study — Metrics",
    category: "AI Coach",
    title: "AI Coach Scale & User Growth",
    chunk: "Deepak took the AI Coach from an ambiguous 'add AI' executive mandate to production, scaling daily active users from ~300 to ~2,000 DAU within ~3 months of launch, while lifting 30-day user workout completion rates and app engagement across 174,000+ total registered users."
  },
  {
    id: "cs2-dual-model-architecture",
    source: "Sportstech AI Coach Case Study — Multi-Model Strategy",
    category: "AI Coach",
    title: "Gemini Primary with ChatGPT Fallback Architecture",
    chunk: "The AI Coach employed a multi-model failover strategy: Gemini served as the cost-efficient, high-speed primary reasoning model for conversational workout guidance, backed by an automated fallback pipeline (ChatGPT/OpenAI) to maintain 99.9% uptime during latency spikes or upstream outages."
  },
  {
    id: "cs2-safety-first-guardrails",
    source: "Sportstech AI Coach Case Study — Safety Guardrails",
    category: "AI Coach",
    title: "Six Foundational Safety Guardrails",
    chunk: "Because fitness advice can cause physical injury, Deepak enforced six strict safety guardrails: 1. Safety Before Engagement; 2. AI ≠ Doctor (no medical diagnosis or rehab prescription); 3. Scope Boundaries (refuse out-of-domain queries); 4. Confidence Gating (deterministic fallback when unsure); 5. Explainability; 6. Human Escalation to certified trainers."
  },
  {
    id: "cs2-v1-scoped-domains",
    source: "Sportstech AI Coach Case Study — V1 Scoping",
    category: "AI Coach",
    title: "Disciplined V1 Capability Scoping",
    chunk: "To prevent conversational hallucination, V1 was strictly bounded into five capabilities: 1. Personalized workout recommendations matching equipment; 2. Multi-week training programs; 3. Nutrition & hydration advice; 4. Exercise physiology & form guidance; 5. Deep-linked workout launches directly into platform routines."
  },
  {
    id: "cs2-actionable-ui-integration",
    source: "Sportstech AI Coach Case Study — UX Pattern",
    category: "AI Coach",
    title: "Actionable Deep Links Over Open-Ended Chat",
    chunk: "Rather than keeping users in endless chat sessions, every AI Coach recommendation was coupled with interactive workout cards and deep-links that launched workouts with a single tap, reducing time-to-workout from minutes to seconds."
  },

  // ==========================================
  // 4. SUBSCRIPTION MONETIZATION & GROWTH
  // ==========================================
  {
    id: "cs3-overview-thesis",
    source: "Subscription Monetization Case Study — Overview",
    category: "Subscriptions",
    title: "Subscription Monetization Product Thesis",
    chunk: "In consumer subscription platforms, Deepak established that conversion is not an arbitrary pricing problem, but a value-clarity problem. Optimizing paywall surfaces and introducing behavioral friction reduction resulted in +42% MRR growth and a -18% reduction in first-month subscriber churn."
  },
  {
    id: "cs3-paywall-experimentation",
    source: "Subscription Monetization Case Study — Experiments",
    category: "Subscriptions",
    title: "Dynamic Paywalls & A/B Experimentation",
    chunk: "Deepak built an experimentation framework testing multi-tier pricing, annualized discount anchors, and contextual paywalls triggered at high-intent workout completion moments rather than during initial onboarding, boosting free-to-paid trial conversion by 28%."
  },
  {
    id: "cs3-churn-prevention",
    source: "Subscription Monetization Case Study — Retention",
    category: "Subscriptions",
    title: "In-App Retention & Pause-Flow Mechanics",
    chunk: "To combat involuntary and voluntary subscriber churn, Deepak implemented automated card failure dunning sequences and a smart pause-subscription flow that rescued 22% of churn-intent users by offering temporary workout suspensions."
  },

  // ==========================================
  // 5. PERFORMANCE SCORE ALGORITHM
  // ==========================================
  {
    id: "cs4-overview-telemetry",
    source: "Performance Score Case Study — Overview",
    category: "Algorithmic Products",
    title: "Algorithmic Readiness & Multi-Sensor Telemetry",
    chunk: "Deepak designed a 0–100 daily Performance & Recovery Score algorithm consolidating multi-sensor physiological telemetry—including Heart Rate Variability (HRV), sleep architecture, resting heart rate, and training load—into a single actionable readiness recommendation."
  },
  {
    id: "cs4-actionable-scoring-psychology",
    source: "Performance Score Case Study — Behavioral Science",
    category: "Algorithmic Products",
    title: "Translating Biomarkers to Human Action",
    chunk: "The scoring engine rejected black-box data dumping. Instead, it paired scores with daily intensity prescriptions: Green (optimal load), Amber (moderate training with active recovery), and Red (mandatory rest), reducing overtraining injuries by 31% in beta cohorts."
  },

  // ==========================================
  // 6. AI LOCALIZATION & WORKFLOW ENGINE
  // ==========================================
  {
    id: "cs5-localization-overview",
    source: "AI Localization Case Study — Overview",
    category: "AI Workflows",
    title: "Automated Multilingual AI Localization Engine",
    chunk: "Deepak spearheaded an AI-powered translation and localization engine for global expansion, translating workout audio scripts, UI strings, and nutritional content across 14 languages with 85% turnaround time reduction compared to traditional agency cycles."
  },
  {
    id: "cs5-human-in-the-loop",
    source: "AI Localization Case Study — Quality Assurance",
    category: "AI Workflows",
    title: "Human-in-the-Loop Linguistic Quality Assurance",
    chunk: "To guarantee fitness domain accuracy, the localization pipeline combined LLM translation with an automated glossary-enforcement layer and native-speaking fitness coach spot-checks, ensuring cultural nuance and correct anatomical terminology across international markets."
  },

  // ==========================================
  // 7. OPERATING PRINCIPLES (HOW DEEPAK WORKS)
  // ==========================================
  {
    id: "principle-1-ground-level-truth",
    source: "Operating Principles — Principle 01",
    category: "Principles",
    title: "Ground-Level Truth Over Boardroom Theories",
    chunk: "Deepak's 1st operating principle: 'Ground-Level Truth Over Boardroom Theories.' Great product managers don't discover reality from Figma files or spreadsheets. You must immerse yourself where the physical friction happens—whether at a 4:30 AM trading mandi floor or beside a sweating athlete testing workout hardware."
  },
  {
    id: "principle-2-systems-thinking",
    source: "Operating Principles — Principle 02",
    category: "Principles",
    title: "Systems Thinking Over Feature Accumulation",
    chunk: "Deepak's 2nd operating principle: 'Systems Thinking Over Feature Accumulation.' Products are interconnected loops, not linear feature checklists. Adding a feature without mapping its downstream operational, financial, and behavioral side-effects generates technical debt and user confusion."
  },
  {
    id: "principle-3-protect-human-in-loop",
    source: "Operating Principles — Principle 03",
    category: "Principles",
    title: "Protect the Human in the Loop",
    chunk: "Deepak's 3rd operating principle: 'Protect the Human in the Loop.' AI and automation should augment human expertise, accountability, and empathy, not recklessly attempt to eliminate them. When automated systems fail, humans must have clear escape hatches and overrides."
  },
  {
    id: "principle-4-instrument-before-iterate",
    source: "Operating Principles — Principle 04",
    category: "Principles",
    title: "Instrument Before You Iterate",
    chunk: "Deepak's 4th operating principle: 'Instrument Before You Iterate.' If you cannot measure a metric with high statistical fidelity, you cannot improve it. Establishing telemetry, funnel analytics, and latency baselines must precede redesigns or product launches."
  },
  {
    id: "principle-5-velocity-scope-discipline",
    source: "Operating Principles — Principle 05",
    category: "Principles",
    title: "Velocity Through Ruthless Scope Discipline",
    chunk: "Deepak's 5th operating principle: 'Velocity Through Ruthless Scope Discipline.' Speed is not rushing messy code; speed is having the clarity and conviction to cut 80% of secondary features so the critical 20% can be shipped with uncompromising craft."
  },

  // ==========================================
  // 8. PRODUCT METHODOLOGY
  // ==========================================
  {
    id: "methodology-discovery-prd",
    source: "Product Methodology — Discovery & PRD Rigor",
    category: "Methodology",
    title: "High-Stakes Discovery & PRD Craftsmanship",
    chunk: "Deepak's product methodology balances rigorous quantitative metrics with direct qualitative user observation. PRDs define unambiguous problem statements, explicit non-goals, measurable success criteria, data schemas, edge-case failure modes, and operational rollback playbooks."
  },
  {
    id: "methodology-cross-functional",
    source: "Product Methodology — Team Orchestration",
    category: "Methodology",
    title: "Cross-Functional Engineering & Operations Alignment",
    chunk: "Deepak collaborates deeply with engineering, data science, design, and frontline operations teams. He speaks fluent technical language (system architecture, API design, data pipelines) while maintaining unyielding empathy for end users and business economics."
  },

  // ==========================================
  // 9. AI COPILOT ARCHITECTURE (SELF-AWARE RAG)
  // ==========================================
  {
    id: "copilot-arch-overview",
    source: "AI Copilot Architecture — System Overview",
    category: "Copilot Architecture",
    title: "How the Portfolio AI Copilot Was Built",
    chunk: "Deepak's AI Copilot is a transparent, custom Retrieval-Augmented Generation (RAG) system built without third-party black-box search tools or external vector databases. It embeds portfolio chunks at build time with Gemini gemini-embedding-2-preview, stores them in an in-memory JSON structure, and performs real-time cosine similarity search before generating grounded answers with gemini-3.1-flash-lite."
  },
  {
    id: "copilot-arch-why-no-vectordb",
    source: "AI Copilot Architecture — In-Memory vs Vector DB",
    category: "Copilot Architecture",
    title: "Why No Vector Database at This Scale",
    chunk: "For portfolios, product documentation, or corpora under 10,000 documents, provisioning external vector databases (like Pinecone, Milvus, or Qdrant) is premature optimization. An in-memory JavaScript array computes cosine similarity across ~100-200 512-dimensional vectors in under 2 milliseconds, with zero network roundtrips, zero database maintenance costs, zero cold-starts, and 100% deterministic ranking."
  },
  {
    id: "copilot-arch-why-rag-over-finetuning",
    source: "AI Copilot Architecture — RAG vs Fine-Tuning",
    category: "Copilot Architecture",
    title: "Why RAG Over Fine-Tuning for Portfolios",
    chunk: "Fine-tuning bakes static facts into model weights, making facts prone to catastrophic forgetting, expensive to update when projects change, and impossible to cite with exact verification tags. RAG separates knowledge retrieval from language generation, enabling instantaneous updates, zero hallucinations through grounded context prompts, and verifiable source chunk attribution."
  },
  {
    id: "copilot-arch-chunking-strategy",
    source: "AI Copilot Architecture — Chunking Strategy",
    category: "Copilot Architecture",
    title: "Semantic Chunking Along Coherent Boundaries",
    chunk: "Rather than splitting text by arbitrary character or token counts (which cuts sentences mid-thought and destroys context), the portfolio is chunked along semantic boundaries: discrete case study subsections, single accomplishments, specific metrics, and individual principles. Each chunk includes an immutable source attribution tag."
  },
  {
    id: "copilot-arch-retrieval-and-models",
    source: "AI Copilot Architecture — Embeddings & Generation",
    category: "Copilot Architecture",
    title: "Gemini Embedding & Flash Lite Generation Models",
    chunk: "Chunks are embedded at compile time using Google's gemini-embedding-2-preview model with output dimensionality compressed to 512 dimensions for rapid computation. At query time, the user's question is embedded into the same 512-dimensional vector space, cosine similarity is calculated against all stored chunks, and the top 3-5 chunks are retrieved."
  },
  {
    id: "copilot-arch-fallback-book-chat",
    source: "AI Copilot Architecture — Confidence Gating & Fallback",
    category: "Copilot Architecture",
    title: "Confidence Threshold & Book Chat Fallback",
    chunk: "If the maximum cosine similarity score of the retrieved chunks is below the set confidence threshold (0.48), the copilot strictly abstains from generating a speculative answer. Instead, it returns a polite fallback message with a direct button to 'Book Chat' or message Deepak, mirroring the safety-first failover pattern established in the Sportstech AI Coach case study."
  },
  {
    id: "copilot-arch-grounding-transparency",
    source: "AI Copilot Architecture — Transparency in UI",
    category: "Copilot Architecture",
    title: "Transparent Source Tagging & Pipeline Diagram",
    chunk: "Every answer produced by the copilot displays explicit 'Grounded in:' source badges showing the exact case studies or resume sections used as ground truth. An interactive 'How this works' panel visualizes the end-to-end pipeline: Documents → Chunk → Embed → Retrieve → Ground → Generate."
  },
  {
    id: "copilot-arch-unknown-handling",
    source: "AI Copilot Architecture — Handling Unknowns",
    category: "Copilot Architecture",
    title: "What Happens When the Copilot Doesn't Know Something?",
    chunk: "When asked about topics outside Deepak's portfolio (e.g., unrelated general trivia, competitor secrets, or personal queries not documented in the verified context), the copilot's confidence gate flags low similarity (<0.48) and gracefully refuses to hallucinate, directing the visitor to contact Deepak directly for questions not covered in the public portfolio."
  },
  {
    id: "copilot-arch-eval-benchmark",
    source: "Behind the AI Copilot Case Study — Evaluation Benchmark",
    category: "Copilot Architecture",
    title: "Golden Evaluation Dataset & Test Benchmark",
    chunk: "The AI Copilot architecture was validated against a golden set of 20 realistic questions spanning career metrics, architectural choices, case studies, principles, and out-of-scope adversarial questions. It achieved 19/20 passes (95% accuracy), a 0% hallucination rate, and an average retrieval latency of 1.4 milliseconds."
  },
  {
    id: "resume-role-sportstech",
    source: "Resume — Experience at Sportstech & Connected Fitness",
    category: "Experience",
    title: "Lead Product Manager — AI Coach & Connected Platform",
    chunk: "At Sportstech, Deepak served as Lead Product Manager for the AI Coach and Connected Platform (Oct 2024 – May 2026), spearheading conversational AI guidance, dynamic telemetry integrations, multi-model failover (Gemini + ChatGPT fallback), and scaling DAU from 300 to 2,000+ within 3 months."
  },
  {
    id: "resume-role-b2b-saas",
    source: "Resume — Experience in B2B SaaS & Workflows",
    category: "Experience",
    title: "Product Manager — Workflow Automation & Integrations",
    chunk: "Deepak previously owned B2B workflow products, building webhook pipelines, integration hubs, and automated dunning and reconciliation engines that reduced manual operational turnaround times by over 60%."
  },
  {
    id: "contact-booking-info",
    source: "Portfolio — Contact & Booking Information",
    category: "Contact",
    title: "How to Contact Deepak Prasad or Book a Chat",
    chunk: "Visitors can contact Deepak directly by clicking the 'Book Chat' button in the top navigation or bottom footer to schedule a conversation, or reach out via LinkedIn, GitHub, or email at Anamadheyam@gmail.com for PM opportunities, advisory, or collaboration."
  },
  {
    id: "cs2-latency-optimization",
    source: "Sportstech AI Coach Case Study — Voice Latency",
    category: "AI Coach",
    title: "Real-Time Voice Coaching Latency Constraints",
    chunk: "During live workouts, audio guidance must respond within 800ms. Deepak optimized the voice pipeline using on-device Voice Activity Detection (VAD) paired with speculative prompt caching and low-latency text-to-speech, keeping user immersion unbroken."
  },
  {
    id: "cs1-auction-discovery-uplift",
    source: "ReshaMandi Case Study — Bidding Discovery",
    category: "ReshaMandi",
    title: "35% Transaction Uplift Through Transparent Bidding",
    chunk: "By introducing transparent digital bidding where multiple reelers and traders could bid on verified cocoon lots, farmer price realization increased by over 35% compared to bilateral broker negotiations at traditional physical yards."
  }
];

async function generateAllEmbeddings() {
  console.log(`Generating embeddings for ${CHUNKS.length} chunks using gemini-embedding-2-preview...`);
  
  const embeddedChunks = [];
  const batchSize = 5;
  
  for (let i = 0; i < CHUNKS.length; i += batchSize) {
    const batch = CHUNKS.slice(i, i + batchSize);
    console.log(`Processing batch ${i + 1} to ${Math.min(i + batchSize, CHUNKS.length)} of ${CHUNKS.length}...`);
    
    for (const item of batch) {
      try {
        const textToEmbed = `${item.title}. ${item.chunk}`;
        const res = await ai.models.embedContent({
          model: "gemini-embedding-2-preview",
          contents: textToEmbed,
          config: { outputDimensionality: 512 }
        });
        
        const embedding = res.embeddings && res.embeddings[0] ? res.embeddings[0].values : [];
        if (!embedding || embedding.length !== 512) {
          throw new Error(`Invalid embedding length: ${embedding ? embedding.length : 'null'}`);
        }
        
        embeddedChunks.push({
          ...item,
          embedding
        });
      } catch (err) {
        console.error(`Failed to embed chunk ${item.id}:`, err.message);
        throw err;
      }
    }
  }

  const outputPath = path.resolve('src/data/ragKnowledgeBase.json');
  fs.writeFileSync(outputPath, JSON.stringify(embeddedChunks, null, 2), 'utf-8');
  console.log(`Successfully generated and saved ${embeddedChunks.length} embedded chunks to ${outputPath}!`);

  // Quick verification test
  console.log("Running self-test query: 'What was Deepak's impact at ReshaMandi?'...");
  const testQuery = "What was Deepak's impact at ReshaMandi?";
  const qRes = await ai.models.embedContent({
    model: "gemini-embedding-2-preview",
    contents: testQuery,
    config: { outputDimensionality: 512 }
  });
  const qVec = qRes.embeddings[0].values;
  
  const scored = embeddedChunks.map(c => ({
    title: c.title,
    source: c.source,
    score: cosineSimilarity(qVec, c.embedding)
  })).sort((a, b) => b.score - a.score);

  console.log("Top 3 retrieved results for test query:");
  scored.slice(0, 3).forEach((s, idx) => {
    console.log(`  ${idx + 1}. [${s.score.toFixed(4)}] ${s.source} — ${s.title}`);
  });
}

generateAllEmbeddings().catch(err => {
  console.error("FATAL ERROR in generateAllEmbeddings:", err);
  process.exit(1);
});
