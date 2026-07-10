export type CompanyFilterId =
  | 'all'
  | 'banking'
  | 'technology'
  | 'energy'
  | 'consulting'
  | 'semiconductor'
  | 'fmcg'
  | 'hybrid-kl'
  | 'graduate'
  | 'backend-path'
  | 'data-path'

export const companyFilters: { id: CompanyFilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'banking', label: 'Banking' },
  { id: 'technology', label: 'Technology' },
  { id: 'energy', label: 'Energy' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'semiconductor', label: 'Semiconductor' },
  { id: 'fmcg', label: 'FMCG' },
  { id: 'hybrid-kl', label: 'Hybrid / KL' },
  { id: 'graduate', label: 'Graduate-friendly' },
  { id: 'backend-path', label: 'Backend path' },
  { id: 'data-path', label: 'Data path' },
]

export interface ExampleRole {
  title: string
  salary: string
}

export interface Company {
  id: string
  name: string
  sector: string
  location: string
  openRoles: number
  salaryBand: string
  commonPaths: string[]
  signal: string
  tags: CompanyFilterId[]
  /* Drawer detail */
  why: string
  skillsRewarded: string[]
  proofGaps: string[]
  exampleRoles: ExampleRole[]
  peerSignal: string
}

export const companies: Company[] = [
  {
    id: 'cimb',
    name: 'CIMB',
    sector: 'Banking / Financial Services',
    location: 'Kuala Lumpur · Hybrid',
    openRoles: 18,
    salaryBand: 'RM 6k–10k',
    commonPaths: ['Backend Engineer', 'Data Analyst', 'Systems Analyst'],
    signal: 'Strong match for backend and SQL evidence',
    tags: ['banking', 'hybrid-kl', 'graduate', 'backend-path', 'data-path'],
    why: 'CIMB appears because your backend and SQL evidence overlaps with digital banking roles, especially API, data, and systems analyst tracks.',
    skillsRewarded: [
      'SQL',
      'API development',
      'Documentation',
      'Stakeholder communication',
      'Testing discipline',
    ],
    proofGaps: ['Docker deployment proof', 'API testing evidence'],
    exampleRoles: [
      { title: 'Backend Engineer', salary: 'RM 8k–10k' },
      { title: 'Data Analyst', salary: 'RM 6k–8k' },
      { title: 'Systems Analyst', salary: 'RM 6k–8.5k' },
    ],
    peerSignal:
      '18 similar UM / CS profiles moved into CIMB-linked roles in the last 12 months.',
  },
  {
    id: 'maybank',
    name: 'Maybank',
    sector: 'Banking / Digital Finance',
    location: 'Kuala Lumpur · Hybrid',
    openRoles: 21,
    salaryBand: 'RM 6k–11k',
    commonPaths: ['Data Engineer', 'Backend Engineer', 'Technical Consultant'],
    signal: 'Strong for candidates with analytics and API evidence',
    tags: ['banking', 'hybrid-kl', 'graduate', 'backend-path', 'data-path'],
    why: 'Maybank appears because its digital finance teams hire heavily from profiles with analytics plus API delivery evidence — both present in your portfolio.',
    skillsRewarded: [
      'SQL and analytics',
      'API integration',
      'Cloud fundamentals',
      'Structured delivery',
      'Cross-team communication',
    ],
    proofGaps: ['Deployed API project', 'Cloud service exposure'],
    exampleRoles: [
      { title: 'Data Engineer (Associate)', salary: 'RM 7k–10k' },
      { title: 'Backend Engineer', salary: 'RM 7k–11k' },
      { title: 'Technical Consultant', salary: 'RM 6k–9k' },
    ],
    peerSignal:
      '21 similar graduate profiles entered Maybank digital roles in the last 12 months.',
  },
  {
    id: 'petronas',
    name: 'Petronas',
    sector: 'Energy / Digital Transformation',
    location: 'Kuala Lumpur',
    openRoles: 14,
    salaryBand: 'RM 7k–12k',
    commonPaths: ['Data Engineer', 'Systems Analyst', 'Technical Consultant'],
    signal: 'Good for data and enterprise systems profiles',
    tags: ['energy', 'graduate', 'data-path'],
    why: 'Petronas appears because its digital transformation program hires data and enterprise systems profiles, and your SQL plus documentation evidence maps to those tracks.',
    skillsRewarded: [
      'Data pipelines',
      'SQL at scale',
      'Enterprise systems literacy',
      'Process documentation',
      'Stakeholder reporting',
    ],
    proofGaps: ['ETL / pipeline project', 'Cloud data platform exposure'],
    exampleRoles: [
      { title: 'Data Engineer', salary: 'RM 8k–12k' },
      { title: 'Systems Analyst', salary: 'RM 7k–9.5k' },
      { title: 'Digital Consultant', salary: 'RM 7k–10k' },
    ],
    peerSignal:
      '11 similar technical graduate profiles moved into Petronas digital roles in the last 12 months.',
  },
  {
    id: 'grab',
    name: 'Grab',
    sector: 'Technology / Platform',
    location: 'Remote / KL',
    openRoles: 16,
    salaryBand: 'RM 7k–13k',
    commonPaths: ['Backend Engineer', 'Product Engineer', 'Data Engineer'],
    signal: 'Higher upside but stronger proof required',
    tags: ['technology', 'graduate', 'backend-path', 'data-path'],
    why: 'Grab appears because platform engineering teams match your backend trajectory — but similar profiles that transitioned in carried stronger deployment and scale proof.',
    skillsRewarded: [
      'API design at scale',
      'Docker and deployment',
      'Distributed systems basics',
      'Monitoring and reliability',
      'Product thinking',
    ],
    proofGaps: [
      'Docker deployment proof',
      'Scale / load handling evidence',
      'Production monitoring exposure',
    ],
    exampleRoles: [
      { title: 'Backend Engineer', salary: 'RM 9k–13k' },
      { title: 'Product Engineer', salary: 'RM 8k–12k' },
      { title: 'Data Engineer', salary: 'RM 8k–12k' },
    ],
    peerSignal:
      '9 similar profiles entered Grab engineering roles — most added deployment proof first.',
  },
  {
    id: 'intel',
    name: 'Intel',
    sector: 'Semiconductor / Technology',
    location: 'Penang · Hybrid',
    openRoles: 11,
    salaryBand: 'RM 6k–10k',
    commonPaths: ['Product Engineer', 'Systems Analyst', 'Data Engineer'],
    signal: 'Good fit for structured technical profiles',
    tags: ['semiconductor', 'technology', 'graduate', 'data-path'],
    why: 'Intel appears because its Penang engineering hub hires structured technical profiles with testing discipline and systems thinking — visible in your QA evidence.',
    skillsRewarded: [
      'Structured testing',
      'Systems analysis',
      'Data interpretation',
      'Process rigor',
      'Technical documentation',
    ],
    proofGaps: ['Hardware-adjacent project exposure', 'Automation scripting depth'],
    exampleRoles: [
      { title: 'Product Engineer', salary: 'RM 6.5k–9k' },
      { title: 'Systems Analyst', salary: 'RM 6k–8.5k' },
      { title: 'Data Engineer', salary: 'RM 7k–10k' },
    ],
    peerSignal:
      '12 similar structured technical profiles entered Intel Penang roles in the last 12 months.',
  },
  {
    id: 'shell',
    name: 'Shell',
    sector: 'Energy / Enterprise Technology',
    location: 'Kuala Lumpur',
    openRoles: 9,
    salaryBand: 'RM 6k–10k',
    commonPaths: ['Systems Analyst', 'Technical Consultant', 'Data Analyst'],
    signal: 'Lower-risk enterprise route',
    tags: ['energy', 'consulting', 'graduate'],
    why: 'Shell appears because its enterprise technology center hires systems and consulting profiles with strong documentation and process evidence — a lower-risk route for your current portfolio.',
    skillsRewarded: [
      'Enterprise systems literacy',
      'Business process mapping',
      'SQL and reporting',
      'Stakeholder communication',
      'Change discipline',
    ],
    proofGaps: ['Enterprise tooling exposure (SAP-style systems)'],
    exampleRoles: [
      { title: 'Systems Analyst', salary: 'RM 6k–8.5k' },
      { title: 'Technical Consultant', salary: 'RM 7k–10k' },
      { title: 'Data Analyst', salary: 'RM 6k–8k' },
    ],
    peerSignal:
      '8 similar profiles moved into Shell enterprise technology roles in the last 12 months.',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    sector: 'Cloud / Enterprise Technology',
    location: 'Malaysia / Remote',
    openRoles: 8,
    salaryBand: 'RM 8k–14k',
    commonPaths: ['Cloud Engineer', 'Technical Consultant', 'Backend Engineer'],
    signal: 'Requires stronger cloud proof',
    tags: ['technology', 'consulting', 'backend-path'],
    why: 'Microsoft appears because its Malaysia cloud and consulting teams match your backend direction — but comparable entrants carried certified cloud proof your portfolio does not show yet.',
    skillsRewarded: [
      'Azure fundamentals',
      'Cloud architecture basics',
      'API development',
      'Customer-facing communication',
      'Certification signals',
    ],
    proofGaps: [
      'Cloud certification or deployed cloud project',
      'Docker deployment proof',
    ],
    exampleRoles: [
      { title: 'Cloud Solution Engineer (Assoc.)', salary: 'RM 9k–14k' },
      { title: 'Technical Consultant', salary: 'RM 8k–12k' },
      { title: 'Backend Engineer (Partner team)', salary: 'RM 8k–12k' },
    ],
    peerSignal:
      '6 similar profiles entered Microsoft-linked roles — all added cloud proof first.',
  },
  {
    id: 'dell',
    name: 'Dell',
    sector: 'Technology / Infrastructure',
    location: 'Penang · Hybrid',
    openRoles: 10,
    salaryBand: 'RM 6k–10k',
    commonPaths: [
      'Systems Analyst',
      'Product Engineer',
      'Technical Support Engineer',
    ],
    signal: 'Good fit for structured troubleshooting evidence',
    tags: ['technology', 'graduate'],
    why: 'Dell appears because its infrastructure teams reward structured troubleshooting and systems documentation — patterns visible in your QA and support evidence.',
    skillsRewarded: [
      'Structured troubleshooting',
      'Systems documentation',
      'Hardware-software literacy',
      'Customer escalation handling',
      'Process consistency',
    ],
    proofGaps: ['Infrastructure / networking exposure'],
    exampleRoles: [
      { title: 'Systems Analyst', salary: 'RM 6k–8.5k' },
      { title: 'Product Engineer', salary: 'RM 6.5k–9k' },
      { title: 'Technical Support Engineer', salary: 'RM 6k–8k' },
    ],
    peerSignal:
      '10 similar profiles moved into Dell Penang roles in the last 12 months.',
  },
  {
    id: 'samsung',
    name: 'Samsung',
    sector: 'Electronics / Technology',
    location: 'Malaysia',
    openRoles: 7,
    salaryBand: 'RM 5.5k–9k',
    commonPaths: ['Product Engineer', 'Systems Analyst'],
    signal: 'Good for product and systems profiles',
    tags: ['technology', 'graduate'],
    why: 'Samsung appears because its Malaysia operations hire product and systems profiles with testing and process evidence similar to your current portfolio.',
    skillsRewarded: [
      'Product testing',
      'Systems analysis',
      'Quality documentation',
      'Cross-functional coordination',
    ],
    proofGaps: ['Product lifecycle project evidence'],
    exampleRoles: [
      { title: 'Product Engineer', salary: 'RM 6k–9k' },
      { title: 'Systems Analyst', salary: 'RM 5.5k–8k' },
    ],
    peerSignal:
      '7 similar profiles entered Samsung-linked roles in the last 12 months.',
  },
  {
    id: 'nestle',
    name: 'Nestlé',
    sector: 'FMCG / Digital Operations',
    location: 'Selangor / KL',
    openRoles: 6,
    salaryBand: 'RM 5.5k–8.5k',
    commonPaths: ['Data Analyst', 'Systems Analyst', 'Business Analyst'],
    signal: 'Good for analytics plus business process evidence',
    tags: ['fmcg', 'graduate', 'data-path'],
    why: 'Nestlé appears because its digital operations teams value analytics paired with business process evidence — your SQL and documentation work maps to that combination.',
    skillsRewarded: [
      'SQL and reporting',
      'Business process analysis',
      'Dashboarding',
      'Stakeholder communication',
    ],
    proofGaps: ['Dashboard / BI tool evidence'],
    exampleRoles: [
      { title: 'Data Analyst', salary: 'RM 5.5k–7.5k' },
      { title: 'Systems Analyst', salary: 'RM 6k–8k' },
      { title: 'Business Analyst', salary: 'RM 6k–8.5k' },
    ],
    peerSignal:
      '6 similar analytics profiles moved into Nestlé digital operations in the last 12 months.',
  },
  {
    id: 'hsbc',
    name: 'HSBC',
    sector: 'Banking / Risk Technology',
    location: 'Kuala Lumpur · Hybrid',
    openRoles: 12,
    salaryBand: 'RM 6k–10k',
    commonPaths: ['Data Analyst', 'Backend Engineer', 'Risk Technology Analyst'],
    signal: 'Strong for SQL and data interpretation evidence',
    tags: ['banking', 'hybrid-kl', 'graduate', 'backend-path', 'data-path'],
    why: 'HSBC appears because its risk technology center hires SQL-strong profiles with careful data interpretation — a direct overlap with your verified evidence.',
    skillsRewarded: [
      'SQL depth',
      'Data interpretation',
      'Risk-aware documentation',
      'Regulated-environment discipline',
      'API literacy',
    ],
    proofGaps: ['Data validation / quality project', 'API testing evidence'],
    exampleRoles: [
      { title: 'Data Analyst', salary: 'RM 6k–8.5k' },
      { title: 'Backend Engineer', salary: 'RM 7k–10k' },
      { title: 'Risk Technology Analyst', salary: 'RM 6.5k–9k' },
    ],
    peerSignal:
      '13 similar SQL-strong profiles entered HSBC-linked roles in the last 12 months.',
  },
  {
    id: 'unilever',
    name: 'Unilever',
    sector: 'FMCG / Business Technology',
    location: 'Malaysia · Hybrid',
    openRoles: 5,
    salaryBand: 'RM 5.5k–8.5k',
    commonPaths: ['Business Analyst', 'Data Analyst', 'Product Analyst'],
    signal: 'Good for product and stakeholder evidence',
    tags: ['fmcg', 'hybrid-kl', 'graduate', 'data-path'],
    why: 'Unilever appears because its business technology teams reward stakeholder-facing analysis — your documentation and communication evidence supports that track.',
    skillsRewarded: [
      'Business analysis',
      'Stakeholder communication',
      'Data storytelling',
      'Process improvement',
    ],
    proofGaps: ['Product metrics / experimentation evidence'],
    exampleRoles: [
      { title: 'Business Analyst', salary: 'RM 6k–8.5k' },
      { title: 'Data Analyst', salary: 'RM 5.5k–7.5k' },
      { title: 'Product Analyst', salary: 'RM 6k–8k' },
    ],
    peerSignal:
      '5 similar profiles moved into Unilever business technology roles in the last 12 months.',
  },
]

/* ---------- Path-to-company map ---------- */

export interface PathCompanyCard {
  path: string
  companies: string[]
  readiness: number
  topMissingProof: string
  nextAction: string
}

export const pathCompanyMap: PathCompanyCard[] = [
  {
    path: 'Backend Engineer',
    companies: ['CIMB', 'Grab', 'Maybank', 'Microsoft'],
    readiness: 72,
    topMissingProof: 'Docker deployment proof',
    nextAction: 'Containerize and deploy one existing API project.',
  },
  {
    path: 'Data Engineer',
    companies: ['Petronas', 'Maybank', 'HSBC', 'Grab'],
    readiness: 58,
    topMissingProof: 'ETL / pipeline project',
    nextAction: 'Build one small ETL pipeline from a public dataset.',
  },
  {
    path: 'Product Engineer',
    companies: ['Grab', 'Intel', 'Samsung'],
    readiness: 55,
    topMissingProof: 'Product metrics evidence',
    nextAction: 'Add usage metrics to one shipped project.',
  },
  {
    path: 'Systems Analyst',
    companies: ['Shell', 'CIMB', 'Dell', 'Nestlé'],
    readiness: 76,
    topMissingProof: 'Enterprise tooling exposure',
    nextAction: 'Document one end-to-end system workflow you improved.',
  },
  {
    path: 'Technical Consultant',
    companies: ['Microsoft', 'Shell', 'Maybank'],
    readiness: 64,
    topMissingProof: 'Client-facing delivery evidence',
    nextAction: 'Write up one stakeholder-facing project as a case study.',
  },
]

/* ---------- Comparison table ---------- */

export interface ComparisonRow {
  company: string
  sector: string
  bestPath: string
  salaryBand: string
  risk: 'Low' | 'Moderate' | 'Higher'
  upside: 'Moderate' | 'High' | 'Very high'
  proofGap: string
}

export const comparisonRows: ComparisonRow[] = [
  {
    company: 'CIMB',
    sector: 'Banking',
    bestPath: 'Backend Engineer',
    salaryBand: 'RM 6k–10k',
    risk: 'Low',
    upside: 'High',
    proofGap: 'Docker deployment',
  },
  {
    company: 'Maybank',
    sector: 'Banking',
    bestPath: 'Data Engineer',
    salaryBand: 'RM 6k–11k',
    risk: 'Low',
    upside: 'High',
    proofGap: 'Deployed API project',
  },
  {
    company: 'Petronas',
    sector: 'Energy',
    bestPath: 'Data Engineer',
    salaryBand: 'RM 7k–12k',
    risk: 'Moderate',
    upside: 'High',
    proofGap: 'ETL pipeline project',
  },
  {
    company: 'Grab',
    sector: 'Technology',
    bestPath: 'Backend Engineer',
    salaryBand: 'RM 7k–13k',
    risk: 'Higher',
    upside: 'Very high',
    proofGap: 'Deployment + scale proof',
  },
  {
    company: 'Intel',
    sector: 'Semiconductor',
    bestPath: 'Product Engineer',
    salaryBand: 'RM 6k–10k',
    risk: 'Moderate',
    upside: 'Moderate',
    proofGap: 'Automation scripting',
  },
  {
    company: 'Shell',
    sector: 'Energy',
    bestPath: 'Systems Analyst',
    salaryBand: 'RM 6k–10k',
    risk: 'Low',
    upside: 'Moderate',
    proofGap: 'Enterprise tooling',
  },
]
