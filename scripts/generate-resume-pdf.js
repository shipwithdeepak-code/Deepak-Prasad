import fs from 'fs';
import { jsPDF } from 'jspdf';

function generateExactResumePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 595.28 pt
  const pageHeight = doc.internal.pageSize.getHeight(); // 841.89 pt
  const margin = 34; // margins
  const contentWidth = pageWidth - margin * 2; // ~527.28 pt

  const drawSectionHeader = (title, yPos) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(title.toUpperCase(), margin, yPos);
    
    const lineY = yPos + 3;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.65);
    doc.line(margin, lineY, margin + contentWidth, lineY);
    
    return lineY + 11;
  };

  // ==========================================
  // PAGE 1
  // ==========================================
  let y = 36;

  // Header: Name
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0);
  doc.text('DEEPAK P', pageWidth / 2, y, { align: 'center' });
  y += 14;

  // Header: Subtitle
  doc.setFont('times', 'bold');
  doc.setFontSize(9.2);
  doc.setTextColor(0, 0, 0);
  doc.text(
    'Senior Product Manager | B2B & B2C | AI | Product Strategy & Roadmapping',
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 12;

  // Header: Contact Bar
  doc.setFont('times', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(30, 41, 59);
  doc.text(
    'Bengaluru, India \u2022 +91 8792964656 \u2022 shipwithdeepak@gmail.com \u2022 linkedin.com/in/prasad-deepak',
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 16;

  // --- PROFILE SECTION ---
  y = drawSectionHeader('PROFILE', y);

  doc.setFont('times', 'normal');
  doc.setFontSize(8.4);
  doc.setTextColor(20, 20, 20);
  const profileText =
    'Senior Product Manager with 7+ years building and scaling B2B and B2C products across SaaS, AI, marketplaces, workflow automation and connected products, including a production conversational AI feature and an ML-powered pricing model, alongside enterprise workflow automation across CRM, ERP and payments systems. Skilled at reading market trends and customer pain points and turning them into scalable product solutions, owning quarterly planning and roadmap creation through customer interviews, UAT, launch and adoption tracking. Known for taking 0->1 products from ambiguous charters, managing and mentoring product teams, and bringing automation to complex, non-desk operational workflows.';
  
  const profileLines = doc.splitTextToSize(profileText, contentWidth);
  doc.text(profileLines, margin, y, { lineHeightFactor: 1.2 });
  y += profileLines.length * 10 + 7;

  // --- WORK EXPERIENCE SECTION (PAGE 1) ---
  y = drawSectionHeader('WORK EXPERIENCE', y);

  const renderJob = (title, period, subtitle, bullets) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(8.9);
    doc.setTextColor(0, 0, 0);
    doc.text(title, margin, y);
    doc.text(period, margin + contentWidth, y, { align: 'right' });
    y += 10.5;

    doc.setFont('times', 'italic');
    doc.setFontSize(8.2);
    doc.setTextColor(50, 50, 50);
    doc.text(subtitle, margin, y);
    y += 10;

    doc.setFont('times', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(20, 20, 20);

    const bulletIndent = 10;
    const textWidth = contentWidth - bulletIndent;

    bullets.forEach((bullet) => {
      const lines = doc.splitTextToSize(bullet, textWidth);
      doc.text('\u2022', margin + 2, y);
      doc.text(lines, margin + bulletIndent, y, { lineHeightFactor: 1.18 });
      y += lines.length * 9.7 + 2.2;
    });

    y += 3.5;
  };

  // 1. Product Consultant
  renderJob(
    'Product Consultant | Independent (via Tejmonvi Softwares)',
    'May 2026 \u2013 Present',
    'Bengaluru, India | Advising early-stage ventures across healthtech, fintech, and consumer platforms',
    [
      'Lead product strategy for TNSQAI, a pre-commercial AI-powered radiology diagnostics company. Benchmarked 7 global radiology AI players and defined a Now/Next/Later product roadmap, translating AI model evaluation outputs from the ML team into go-to-market decisions.',
      'Advise early-stage founders in parallel across an M&A marketplace platform and a global music-rights platform, translating ambiguous priorities into structured requirements and execution roadmaps.',
    ]
  );

  // 2. Senior Product Manager | Sportstech
  renderJob(
    'Senior Product Manager | Sportstech',
    'Oct 2024 \u2013 May 2026',
    'Bengaluru, India | Digital sports subscription platform (iOS & Android), via Tejmonvi Softwares (ODC) | 174,000+ users',
    [
      'Owned end-to-end subscription strategy for a B2C SaaS platform serving 174,180 freemium users and 12,401 paying subscribers, generating \u20AC659K in FY2025 subscription revenue. Subscribers grew 81.9% YoY, with yearly-plan retention reaching 96.8% (monthly plans saw comparatively higher churn).',
      'Led the 0->1 development of an in-app AI Coach, defining conversational AI use cases, user flows, context and data requirements, and quality guardrails. Launched on Gemini as the primary model with ChatGPT as fallback, and scaled adoption from ~300 to ~2,000 DAU within roughly 3 months through iterative improvements.',
      'Owned quarterly planning and roadmap creation for the subscription domain, defining pricing, free/paid packaging, trial design, paywalls and renewal experiences, and establishing product metrics across conversion, churn, retention and LTV.',
      'Owned product-performance tracking across engagement, subscription and acquisition funnels using DAU/MAU, conversion, retention and churn metrics to inform roadmap prioritisation and post-launch iteration. Product reached 3,033 DAU and 27,001 MAU (an 11% DAU/MAU ratio).',
      'Designed an AI-assisted content-localisation workflow that shipped 200+ videos in roughly 3 weeks (about 10\u00D7 faster than the prior process), supporting launches in Italian, French and Spanish.',
      'Operated in an ODC model, leading the India-based product and engineering team while sales and operations sat at company HQ in Germany. Directly managed and mentored a 6-person cross-functional pod (3 PMs, Growth, Content), growing their scope and ownership while setting OKRs and reporting KPIs to leadership.',
    ]
  );

  // 3. Product Manager | Sportstech
  renderJob(
    'Product Manager | Sportstech',
    'Aug 2023 \u2013 Sep 2024',
    'Bengaluru, India | 0->1 Platform Build',
    [
      'Joined as the first Product Manager on the team and built the platform 0->1 from scratch, designing signup, onboarding and subscription flows (pricing, packaging, trial, paywall, checkout) with no prior playbook and defining retention and conversion metrics from first principles.',
      'Conducted customer interviews and synthesised feedback, app reviews and behavioural data to prioritise fixes. Translated requirements into PRDs, user stories and acceptance criteria, partnering with engineering and design through discovery, UAT, launch and post-launch iteration.',
    ]
  );

  // 4. Product Manager | ReshaMandi
  renderJob(
    'Product Manager | ReshaMandi',
    'Jun 2021 \u2013 Sep 2023',
    'Bengaluru, India | Enterprise B2B agri-tech & silk marketplace | Rs 2,000 Cr platform | ~1.1 Lakh stakeholders',
    [
      'Owned product delivery across a complex B2B marketplace ecosystem spanning farmers, buyers, field operations, sales, finance and customer support, translating fragmented offline workflows into scalable digital products.',
      'Digitised end-to-end workflows across onboarding, KYC, lead generation, purchase and sales orders, logistics and payments, integrating LeadSquared CRM, Razorpay, SAP and Camunda across business, IT and vendor teams. Identified payment delays as a trust and operational bottleneck and owned an instant-payout workflow that automated approval-to-bank settlement, as disbursement volume grew from roughly Rs 10\u201315Cr to Rs 20\u201325Cr per month.',
      'Conducted direct field research with farmers, agents and operations teams, regularly travelling to collection centres and grounding roadmap and design decisions in direct observation and user feedback rather than assumptions.',
      'Built a real-time cocoon bidding workflow 0->1, replacing manual buyer discovery and negotiation with a structured Scan -> Bid -> Watch -> Win -> Pay experience and configurable auction rules. The pilot ran roughly 3 sessions a day and lifted transaction value more than 35% versus the prior baseline.',
      'Partnered with the ML team to define an image-based cocoon pricing solution, translating field-level pricing and quality-assessment challenges into an AI-assisted product workflow (>90% model accuracy).',
    ]
  );

  // 5. Associate Product Manager | LionCircuits
  renderJob(
    'Associate Product Manager | LionCircuits',
    'Jul 2018 \u2013 May 2020',
    'Bengaluru, India | IoT, AI & PCB manufacturing platform',
    [
      'Led concept-to-launch of a B2B Assembly Ordering Platform, contributing to a 40% increase in monthly orders. Built an auto-quote generation and BOM-scrubbing tool, plus a Raspberry Pi-based AI proof-of-concept for facial-recognition traffic monitoring.',
    ]
  );

  console.log('Page 1 end y position:', y, 'Page height:', pageHeight);

  // Header for Core Competencies at bottom of Page 1 (matching user screenshot)
  y += 2;
  drawSectionHeader('CORE COMPETENCIES', y);

  // ==========================================
  // PAGE 2
  // ==========================================
  doc.addPage();
  y = 36;

  const competencies = [
    {
      category: 'Product Strategy',
      text: 'Product Strategy, Market & Customer Research, Customer Interviews, Quarterly Planning, Roadmapping, Prioritisation, 0->1 Product Development, PRDs, User Stories, UAT, Adoption Tracking',
    },
    {
      category: 'B2B SaaS / B2C',
      text: 'B2B SaaS Platforms, B2C Subscription Products, Enterprise Workflow Automation, Marketplace Products, Payments, Monetisation',
    },
    {
      category: 'AI / Data',
      text: 'AI Product Strategy, Conversational AI, AI-Enabled Workflows, ML Product Development, Product Analytics, Funnel Analysis, Retention, Churn, LTV',
    },
    {
      category: 'Leadership',
      text: 'Cross-functional Leadership (Eng, Design, Sales, CS), People Management & Mentoring, Stakeholder Management, OKRs, Influence Without Authority, Agile/Scrum',
    },
  ];

  competencies.forEach((comp) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(8.6);
    doc.setTextColor(0, 0, 0);
    const prefix = comp.category + ': ';
    const prefixWidth = doc.getTextWidth(prefix);
    doc.text(prefix, margin, y);

    doc.setFont('times', 'normal');
    doc.setTextColor(20, 20, 20);
    const lines = doc.splitTextToSize(comp.text, contentWidth - prefixWidth);
    doc.text(lines, margin + prefixWidth, y, { lineHeightFactor: 1.2 });
    y += lines.length * 10.2 + 2.5;
  });

  y += 6;

  // --- SKILLS & TOOLS ---
  y = drawSectionHeader('SKILLS & TOOLS', y);

  const skillsTools = [
    {
      category: 'Tools & Platforms',
      text: 'Jira, SAP (basic), Camunda, LeadSquared CRM, Razorpay, Figma, Firebase, Google Analytics, Google Play Console',
    },
    {
      category: 'Domains',
      text: 'Consumer Subscription, Enterprise B2B, Fintech (Lending/BNPL), Healthtech/AI, Agri-Tech/Field Ops, IoT/Hardware',
    },
  ];

  skillsTools.forEach((st) => {
    doc.setFont('times', 'bold');
    doc.setFontSize(8.6);
    doc.setTextColor(0, 0, 0);
    const prefix = st.category + ': ';
    const prefixWidth = doc.getTextWidth(prefix);
    doc.text(prefix, margin, y);

    doc.setFont('times', 'normal');
    doc.setTextColor(20, 20, 20);
    const lines = doc.splitTextToSize(st.text, contentWidth - prefixWidth);
    doc.text(lines, margin + prefixWidth, y, { lineHeightFactor: 1.2 });
    y += lines.length * 10.2 + 2.5;
  });

  y += 6;

  // --- EDUCATION ---
  y = drawSectionHeader('EDUCATION', y);

  doc.setFont('times', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(0, 0, 0);
  doc.text('Bachelor of Engineering (B.E.)', margin, y);

  doc.setFont('times', 'normal');
  doc.text('     Visvesvaraya Technological University (VTU) | 2018', margin + doc.getTextWidth('Bachelor of Engineering (B.E.)'), y);

  console.log('Page 2 end y position:', y);

  const pdfOutput = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync('public/Deepak_Prasad_Senior_Product_Manager_Resume.pdf', pdfOutput);
  fs.writeFileSync('public/resume.pdf', pdfOutput);

  if (fs.existsSync('dist')) {
    fs.writeFileSync('dist/Deepak_Prasad_Senior_Product_Manager_Resume.pdf', pdfOutput);
    fs.writeFileSync('dist/resume.pdf', pdfOutput);
  }

  console.log('Resume PDF generated perfectly matching the attached document! Size:', pdfOutput.length);
}

generateExactResumePDF();
