export const faculties = [
  { name: 'Medicine', score: 96, grads: '300 grads' },
  { name: 'Computer Science', score: 94, grads: '420 grads' },
  { name: 'Engineering', score: 92, grads: '610 grads' },
  { name: 'Business & Accountancy', score: 90, grads: '540 grads' },
  { name: 'Law', score: 89, grads: '210 grads' },
  { name: 'Science', score: 85, grads: '480 grads' },
  { name: 'Arts & Social Sciences', score: 79, grads: '520 grads' },
]

export interface AtRiskStudent {
  name: string
  faculty: string
  risk: string
  missing: string
  intervention: string
}

export const atRiskStudents: AtRiskStudent[] = [
  {
    name: 'Farah Lim',
    faculty: 'Computer Science',
    risk: 'No applications in 45 days',
    missing: 'Portfolio proof',
    intervention: 'Send Haven-guided portfolio plan',
  },
  {
    name: 'Arif Hakim',
    faculty: 'Engineering',
    risk: 'Low interview conversion',
    missing: 'Interview evidence',
    intervention: 'Recommend mock interview',
  },
  {
    name: 'Priya Nair',
    faculty: 'Business',
    risk: 'No saved roles',
    missing: 'Career direction',
    intervention: 'Open Compass route planning',
  },
  {
    name: 'Jason Wong',
    faculty: 'Science',
    risk: 'Low employer visibility',
    missing: 'Project evidence',
    intervention: 'Add evidence to Portfolio',
  },
  {
    name: 'Nur Aisyah',
    faculty: 'Computer Science',
    risk: 'Backend path gap',
    missing: 'Docker deployment proof',
    intervention: 'Recommend 30-day API deployment task',
  },
]

export interface TopEmployer {
  name: string
  sector: string
  grads: number
  trend: string
  path: string
  skill: string
}

export const topEmployers: TopEmployer[] = [
  {
    name: 'Maybank',
    sector: 'Banking',
    grads: 48,
    trend: 'Hiring up 12% YoY',
    path: 'Backend Engineer',
    skill: 'SQL',
  },
  {
    name: 'Petronas',
    sector: 'Energy',
    grads: 41,
    trend: 'Steady intake',
    path: 'Systems Analyst',
    skill: 'Process documentation',
  },
  {
    name: 'Intel',
    sector: 'Semiconductor',
    grads: 37,
    trend: 'Hiring up 8% YoY',
    path: 'Data Engineer',
    skill: 'Python',
  },
  {
    name: 'CIMB',
    sector: 'Banking',
    grads: 35,
    trend: 'Early-careers expanding',
    path: 'Backend Engineer',
    skill: 'API fundamentals',
  },
  {
    name: 'Grab',
    sector: 'Technology',
    grads: 28,
    trend: 'Selective, proof-driven',
    path: 'Data Engineer',
    skill: 'Data pipelines',
  },
  {
    name: 'Shell',
    sector: 'Energy / Enterprise Technology',
    grads: 24,
    trend: 'Steady intake',
    path: 'Technical Consultant',
    skill: 'Stakeholder communication',
  },
]

export interface CurriculumSignal {
  title: string
  strength: string
  strengthTone: 'risk' | 'success' | 'primary' | 'warning'
  evidence: string
  suggestion: string
}

export const curriculumSignals: CurriculumSignal[] = [
  {
    title: 'Cloud deployment demand rising',
    strength: 'High',
    strengthTone: 'risk',
    evidence:
      'Backend and platform roles increasingly request Docker, cloud deployment, and API testing.',
    suggestion:
      'Add a deployment-focused mini project to final-year software courses.',
  },
  {
    title: 'SQL remains a core employability signal',
    strength: 'Strong',
    strengthTone: 'success',
    evidence:
      'SQL appears across banking, analytics, and systems analyst roles.',
    suggestion:
      'Add SQL case-based assessments tied to real business data scenarios.',
  },
  {
    title: 'Portfolio proof matters more than certificates',
    strength: 'Medium-high',
    strengthTone: 'primary',
    evidence:
      'Employers respond better to deployed projects and documented trade-offs.',
    suggestion:
      'Require students to submit project decision logs, not only final reports.',
  },
  {
    title: 'Communication gaps affect consulting routes',
    strength: 'Medium',
    strengthTone: 'warning',
    evidence:
      'Technical consultant and systems analyst paths need stakeholder explanation evidence.',
    suggestion:
      'Add presentation and requirements-writing evidence to capstone evaluation.',
  },
]
