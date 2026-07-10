export type EvidenceStatus = 'verified' | 'in-progress' | 'self-reported'

export interface EvidenceItem {
  id: string
  title: string
  type: string
  date: string
  status: EvidenceStatus
  evidence: string[]
  linkedPaths: string[]
  whyItMatters: string
}

export const evidenceItems: EvidenceItem[] = [
  {
    id: 'careeros-hackathon',
    title: 'Career OS Hackathon Prototype',
    type: 'Project',
    date: 'July 2026',
    status: 'verified',
    evidence: [
      'AI-assisted product design',
      'Frontend prototyping',
      'Career navigation logic',
      'Product storytelling',
    ],
    linkedPaths: ['Product Engineer', 'Technical Consultant', 'Backend Engineer'],
    whyItMatters:
      'Shows you can turn an ambiguous problem into a working product story — the kind of evidence product and consulting roles look for first.',
  },
  {
    id: 'final-year-project',
    title: 'University Final-Year System Project',
    type: 'Academic Project',
    date: 'May 2026',
    status: 'verified',
    evidence: [
      'System design',
      'Database modelling',
      'Documentation',
      'Team collaboration',
    ],
    linkedPaths: ['Backend Engineer', 'Systems Analyst'],
    whyItMatters:
      'Structured delivery with documentation is the strongest academic proof you have for backend and analyst paths.',
  },
  {
    id: 'sql-practice',
    title: 'SQL Interview Practice Set',
    type: 'Skill Evidence',
    date: 'June 2026',
    status: 'verified',
    evidence: ['SQL fundamentals', 'Query reasoning', 'Data interpretation'],
    linkedPaths: ['Data Engineer', 'Backend Engineer'],
    whyItMatters:
      'SQL shows up in almost every role your Compass paths point to. This evidence keeps those doors open.',
  },
  {
    id: 'docker-api',
    title: 'Docker API Deployment',
    type: 'Missing / In Progress',
    date: 'Planned',
    status: 'in-progress',
    evidence: ['Docker proof', 'API deployment', 'Testing'],
    linkedPaths: ['Backend Engineer'],
    whyItMatters:
      'This is your highest-impact missing proof. Completing it directly closes the top Backend Engineer gap.',
  },
]

export interface ProofGap {
  id: string
  title: string
  impact: string
  impactTone: 'risk' | 'warning' | 'neutral'
  affects: string[]
  explanation: string
  action: string
}

export const proofGaps: ProofGap[] = [
  {
    id: 'docker-proof',
    title: 'Docker deployment proof',
    impact: 'High impact',
    impactTone: 'risk',
    affects: ['Backend Engineer', 'API Platform roles'],
    explanation:
      'You have backend interest, but employers cannot yet see deployed API evidence.',
    action: 'Containerize one API project and document deployment trade-offs.',
  },
  {
    id: 'system-design-case',
    title: 'System design case study',
    impact: 'Medium-high impact',
    impactTone: 'warning',
    affects: ['Backend Engineer', 'Product Engineer'],
    explanation:
      'Your projects show execution, but not enough architectural reasoning.',
    action:
      'Add a short case study explaining trade-offs, scaling choices, and failure handling.',
  },
  {
    id: 'stakeholder-comms',
    title: 'Stakeholder communication evidence',
    impact: 'Medium impact',
    impactTone: 'neutral',
    affects: ['Technical Consultant', 'Systems Analyst'],
    explanation:
      'Client-facing roles need clearer proof of requirements gathering and presentation.',
    action:
      'Add one project write-up with problem framing, user needs, and decision rationale.',
  },
]

export interface ReadinessRow {
  role: string
  readiness: number
  gaps: number
  skills: number
  evidence: number
  marketFit: number
  interview: number
}

export const readinessMatrix: ReadinessRow[] = [
  {
    role: 'Backend Engineer',
    readiness: 72,
    gaps: 2,
    skills: 74,
    evidence: 68,
    marketFit: 76,
    interview: 64,
  },
  {
    role: 'Data Engineer',
    readiness: 61,
    gaps: 3,
    skills: 63,
    evidence: 58,
    marketFit: 66,
    interview: 55,
  },
  {
    role: 'Product Engineer',
    readiness: 66,
    gaps: 3,
    skills: 68,
    evidence: 70,
    marketFit: 62,
    interview: 60,
  },
  {
    role: 'Technical Consultant',
    readiness: 70,
    gaps: 2,
    skills: 66,
    evidence: 72,
    marketFit: 74,
    interview: 68,
  },
  {
    role: 'Systems Analyst',
    readiness: 78,
    gaps: 1,
    skills: 78,
    evidence: 76,
    marketFit: 80,
    interview: 74,
  },
]

export interface RoleTailor {
  role: string
  headline: string
  highlight: string[]
  improve: string[]
  bullets: string[]
}

export const roleTailors: RoleTailor[] = [
  {
    role: 'Backend Engineer',
    headline:
      'Backend-leaning junior developer with C#, SQL, and project delivery evidence.',
    highlight: [
      'SQL Interview Practice Set',
      'University System Project',
      'Career OS Prototype',
    ],
    improve: ['Docker API Deployment', 'System design case study'],
    bullets: [
      'Built structured software prototypes with documented user flows and decision logic.',
      'Applied SQL and backend fundamentals in academic and self-directed projects.',
      'Designed an AI-assisted career navigation workflow using simulated market signals.',
    ],
  },
  {
    role: 'Data Engineer',
    headline:
      'Analytical junior developer with SQL reasoning and structured data project evidence.',
    highlight: [
      'SQL Interview Practice Set',
      'University System Project',
    ],
    improve: [
      'ETL pipeline mini-project',
      'Cloud data fundamentals certificate',
      'Docker API Deployment',
    ],
    bullets: [
      'Practised query reasoning and data interpretation across structured interview sets.',
      'Modelled relational databases with documentation for a final-year system project.',
      'Building toward pipeline evidence with containerized deployment as the next proof.',
    ],
  },
  {
    role: 'Product Engineer',
    headline:
      'Product-minded engineer with prototyping, storytelling, and delivery evidence.',
    highlight: [
      'Career OS Prototype',
      'University System Project',
    ],
    improve: ['System design case study', 'User metrics write-up'],
    bullets: [
      'Prototyped an AI-assisted career product end-to-end in a hackathon setting.',
      'Communicated product decisions through documented user flows and storytelling.',
      'Delivered a team-based system project with database modelling and documentation.',
    ],
  },
  {
    role: 'Technical Consultant',
    headline:
      'Client-ready junior technologist with communication and structured delivery evidence.',
    highlight: [
      'Career OS Prototype',
      'University System Project',
    ],
    improve: [
      'Stakeholder communication write-up',
      'Presentation or client-facing artifact',
    ],
    bullets: [
      'Presented a technical prototype with clear problem framing and product storytelling.',
      'Collaborated in a delivery team with documented requirements and decisions.',
      'Applied SQL and systems thinking to translate needs into working software.',
    ],
  },
  {
    role: 'Systems Analyst',
    headline:
      'Detail-oriented analyst profile with documentation, modelling, and SQL evidence.',
    highlight: [
      'University System Project',
      'SQL Interview Practice Set',
    ],
    improve: ['Requirements gathering case study'],
    bullets: [
      'Documented system design and database models for a team-delivered academic project.',
      'Interpreted data and reasoned through queries in structured SQL practice.',
      'Mapped user needs into product logic for an AI-assisted career navigation tool.',
    ],
  },
]

export const evidenceTypes = [
  'Project',
  'Academic Project',
  'Skill Evidence',
  'Certification',
  'Internship',
  'Activity',
]

export const compassPathOptions = [
  'Backend Engineer',
  'Data Engineer',
  'Product Engineer',
  'Technical Consultant',
  'Systems Analyst',
]
