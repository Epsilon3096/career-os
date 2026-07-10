export type FilterId =
  | 'all'
  | 'backend'
  | 'data'
  | 'product'
  | 'low-risk'
  | 'upside'
  | 'hybrid-kl'
  | 'remote'
  | 'saved'

export const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend path' },
  { id: 'data', label: 'Data path' },
  { id: 'product', label: 'Product path' },
  { id: 'low-risk', label: 'Low risk' },
  { id: 'upside', label: 'Higher upside' },
  { id: 'hybrid-kl', label: 'Hybrid / KL' },
  { id: 'remote', label: 'Remote' },
  { id: 'saved', label: 'Saved' },
]

export type FitTone = 'success' | 'primary' | 'warning' | 'neutral'

export interface DiscoverRole {
  id: string
  role: string
  company: string
  location: string
  salary: string
  fit: string
  fitTone: FitTone
  linkedPath: string
  matched: number
  totalSkills: number
  missing: string[]
  why: string
  tags: FilterId[]
  haveSkills: string[]
  nextAction: string
}

export const discoverRoles: DiscoverRole[] = [
  {
    id: 'cimb-backend',
    role: 'Backend Engineer',
    company: 'CIMB',
    location: 'Kuala Lumpur · Hybrid',
    salary: 'RM 8k–10k',
    fit: 'Strong fit',
    fitTone: 'success',
    linkedPath: 'Backend Engineer',
    matched: 11,
    totalSkills: 14,
    missing: ['Docker proof', 'API testing'],
    why: 'Matches your backend trajectory and current SQL / C# evidence.',
    tags: ['backend', 'hybrid-kl', 'low-risk'],
    haveSkills: ['SQL', 'C#', 'REST APIs', 'Git workflow', 'Agile delivery'],
    nextAction:
      'Add Docker deployment evidence to improve backend-role readiness.',
  },
  {
    id: 'maybank-api',
    role: 'Software Engineer, API Platform',
    company: 'Maybank',
    location: 'Hybrid',
    salary: 'RM 7k–9k',
    fit: 'Strong fit',
    fitTone: 'success',
    linkedPath: 'Backend Engineer',
    matched: 10,
    totalSkills: 14,
    missing: ['System design case study'],
    why: 'Strong overlap with your project delivery and backend learning plan.',
    tags: ['backend', 'hybrid-kl', 'upside'],
    haveSkills: ['SQL', 'C#', 'API integration', 'Project delivery'],
    nextAction:
      'Write up one system design case study from your capstone project.',
  },
  {
    id: 'grab-graduate',
    role: 'Graduate Backend Developer',
    company: 'Grab',
    location: 'Remote / KL',
    salary: 'RM 6.5k–8.5k',
    fit: 'Good fit',
    fitTone: 'primary',
    linkedPath: 'Backend Engineer',
    matched: 9,
    totalSkills: 14,
    missing: ['Cloud deployment proof'],
    why: 'Lower risk entry route into backend engineering.',
    tags: ['backend', 'remote', 'low-risk'],
    haveSkills: ['SQL', 'Scripting', 'Version control', 'Team collaboration'],
    nextAction:
      'Deploy one small service to a cloud provider and document the setup.',
  },
  {
    id: 'petronas-data',
    role: 'Data Engineer Associate',
    company: 'Petronas',
    location: 'Kuala Lumpur',
    salary: 'RM 8k–11k',
    fit: 'Stretch path',
    fitTone: 'warning',
    linkedPath: 'Data Engineer',
    matched: 8,
    totalSkills: 14,
    missing: ['ETL pipeline', 'Orchestration'],
    why: 'Appears because your scripting and analytics background can transfer into data infrastructure.',
    tags: ['data', 'hybrid-kl', 'upside'],
    haveSkills: ['SQL', 'Python scripting', 'Analytics', 'Data cleaning'],
    nextAction:
      'Build a small ETL pipeline moving data between two systems on a schedule.',
  },
  {
    id: 'intel-product',
    role: 'Product Engineer',
    company: 'Intel',
    location: 'Penang / Hybrid',
    salary: 'RM 7k–10k',
    fit: 'Moderate fit',
    fitTone: 'neutral',
    linkedPath: 'Product Engineer',
    matched: 8,
    totalSkills: 14,
    missing: ['Product analytics', 'UX trade-off evidence'],
    why: 'Good option if you want to combine engineering with product thinking.',
    tags: ['product', 'upside'],
    haveSkills: ['Engineering foundation', 'Stakeholder comms', 'Prototyping'],
    nextAction:
      'Add one product decision write-up showing a UX trade-off you made.',
  },
  {
    id: 'shell-systems',
    role: 'Systems Analyst',
    company: 'Shell',
    location: 'Kuala Lumpur',
    salary: 'RM 6k–8.5k',
    fit: 'Strong fit',
    fitTone: 'success',
    linkedPath: 'Systems Analyst',
    matched: 12,
    totalSkills: 14,
    missing: ['Requirements writing evidence'],
    why: 'Lower-risk enterprise route that uses your structured analysis strengths.',
    tags: ['low-risk', 'hybrid-kl'],
    haveSkills: [
      'Structured analysis',
      'SQL',
      'Documentation',
      'Process mapping',
      'Stakeholder comms',
    ],
    nextAction:
      'Publish a requirements document from a past project to your portfolio.',
  },
]

export interface BridgeCard {
  path: string
  rolesAvailable: number
  readiness: number
  topMissingProof: string
}

export const bridgeCards: BridgeCard[] = [
  {
    path: 'Backend Engineer',
    rolesAvailable: 12,
    readiness: 72,
    topMissingProof: 'Docker deployment proof',
  },
  {
    path: 'Data Engineer',
    rolesAvailable: 7,
    readiness: 58,
    topMissingProof: 'ETL pipeline project',
  },
  {
    path: 'Product Engineer',
    rolesAvailable: 5,
    readiness: 54,
    topMissingProof: 'Product analytics evidence',
  },
]
