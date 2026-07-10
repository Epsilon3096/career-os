import type { SectionId } from '@/components/shell/nav-config'

export interface HavenAction {
  label: string
  target: SectionId
}

export interface HavenResponse {
  id: string
  question: string
  summary: string
  alreadyHave: string[]
  worthAdding: string[]
  uncertainty: string
  confidence: 'High' | 'Medium' | 'Low'
  nextAction: string
  actions: HavenAction[]
}

/** Short conversational reply shown as a Haven chat bubble for each response. */
export const chatReplies: Record<string, string> = {
  'why-backend':
    'Backend Engineer appears because your C# fundamentals, SQL exposure, and project delivery overlap with common backend transition profiles. I broke down the full evidence below.',
  'learn-next':
    'Docker is your highest-impact next skill — it appears in 7 of your top 10 matched backend roles and closes a visible proof gap. Details below.',
  underpaid:
    'For junior backend-leaning profiles in KL, the comparable band is roughly RM 5.5k–8k — but it depends heavily on company type and proof strength. I mapped out what would strengthen your position below.',
  'lowest-risk':
    'The Steady Growth Track (QA → Backend) and Systems Analyst routes carry the lowest displacement risk for your profile — with a trade-off in salary upside. Full comparison below.',
  'portfolio-score':
    'Your portfolio score is 78 (Strong), but backend readiness is held back by two proof gaps: deployment evidence and containerization. Here is how to close them.',
  'which-save':
    'I would save one strong-fit role, one stretch role, and one lower-risk role — that keeps your pipeline honest. My specific picks are below.',
  'learn-docker':
    'In this simulated market scenario, Docker proof expands your backend-linked roles from 12 to 27 and lifts readiness from 72% toward 81%. Breakdown below.',
}

export const fallbackReply =
  'I can explain paths, proof gaps, role matches, and next actions using your Career OS context. Try asking about Backend Engineer, Docker, salary, risk, or portfolio.'

/**
 * Keyword matching for free-text questions. Returns a response id,
 * or null when no predefined answer applies (fallback).
 */
export function matchQuestion(text: string): string | null {
  const q = text.toLowerCase()
  if (q.includes('docker')) return 'learn-docker'
  if (q.includes('salary') || q.includes('pay') || q.includes('underpaid'))
    return 'underpaid'
  if (q.includes('backend')) return 'why-backend'
  if (q.includes('portfolio')) return 'portfolio-score'
  if (q.includes('risk')) return 'lowest-risk'
  if (q.includes('learn') || q.includes('next skill')) return 'learn-next'
  if (q.includes('save') || q.includes('which role')) return 'which-save'
  return null
}

export const havenResponses: HavenResponse[] = [
  {
    id: 'why-backend',
    question: 'Why did Backend Engineer appear?',
    summary:
      'Backend Engineer appears because your C# fundamentals, SQL exposure, and project delivery evidence overlap with common backend transition profiles.',
    alreadyHave: [
      'C# fundamentals',
      'SQL exposure',
      'Structured project delivery',
      'Debugging discipline',
    ],
    worthAdding: [
      'Docker proof',
      'Deployed API project',
      'System design case study',
    ],
    uncertainty:
      'Confidence is medium because your profile has strong fundamentals, but limited deployed backend evidence.',
    confidence: 'Medium',
    nextAction:
      'Build and deploy one API project, then add the deployment proof to Portfolio.',
    actions: [
      { label: 'Open Compass', target: 'compass' },
      { label: 'Update Portfolio', target: 'portfolio' },
      { label: 'View matching roles', target: 'discover' },
    ],
  },
  {
    id: 'learn-next',
    question: 'What should I learn next?',
    summary:
      'Based on your current evidence and top matched roles, Docker and system design unlock the most backend opportunities this month.',
    alreadyHave: [
      'C# and .NET foundations',
      'SQL queries in academic projects',
      'Git-based team workflow',
    ],
    worthAdding: [
      'Docker containerization',
      'System design basics',
      'One deployed API with monitoring',
    ],
    uncertainty:
      'Market signals shift monthly. Docker appears in 7 of your top 10 matched backend roles right now — that ratio may change as new roles post.',
    confidence: 'High',
    nextAction:
      'Start the Docker fundamentals module this week, then containerize your inventory system project.',
    actions: [
      { label: 'Open Compass', target: 'compass' },
      { label: 'Update Portfolio', target: 'portfolio' },
      { label: 'View matching roles', target: 'discover' },
    ],
  },
  {
    id: 'underpaid',
    question: 'Am I underpaid?',
    summary:
      'Based on similar junior backend-leaning profiles in KL, your current target range should be compared against RM 5.5k–8k entry-to-junior bands.',
    alreadyHave: [
      'A profile matching entry-to-junior backend bands',
      'Rising momentum (+14% over 60 days)',
      'Verified academic project evidence',
    ],
    worthAdding: [
      'Deployment evidence to justify the upper band',
      'Role context — salary depends heavily on company type',
      'Two or three comparable saved roles for negotiation data',
    ],
    uncertainty:
      'Salary signal needs role context. Bands vary widely between GLCs, startups, and MNCs in Malaysia — a single number would be misleading.',
    confidence: 'Medium',
    nextAction:
      'Haven would recommend negotiation only after you strengthen deployment evidence. Compare salary-linked roles in Discover first.',
    actions: [
      { label: 'View salary-linked roles', target: 'discover' },
      { label: 'Update Portfolio', target: 'portfolio' },
    ],
  },
  {
    id: 'lowest-risk',
    question: 'Which path has the lowest risk?',
    summary:
      'Based on transition patterns from similar profiles, the Steady Growth Track (QA → Backend) carries the lowest displacement risk among your mapped routes.',
    alreadyHave: [
      'Testing instincts from coursework debugging',
      'Attention to detail flagged in project reviews',
      'A direct QA-to-backend bridge many juniors in Malaysia use',
    ],
    worthAdding: [
      'Test automation basics (Playwright or Selenium)',
      'CI pipeline exposure',
      'API testing evidence',
    ],
    uncertainty:
      'Lower risk usually trades against slower salary growth. Risk labels reflect observed market patterns, not guarantees about any single company.',
    confidence: 'Medium',
    nextAction:
      'Compare the Steady Growth Track against Backend Engineer in Compass — look at the trade-off radar, not just the risk label.',
    actions: [
      { label: 'Open Compass', target: 'compass' },
      { label: 'View matching roles', target: 'discover' },
    ],
  },
  {
    id: 'portfolio-score',
    question: 'How do I improve my portfolio score?',
    summary:
      'Your score is 78 (Strong) but two proof gaps hold back your backend readiness: no deployment evidence and no containerization proof.',
    alreadyHave: [
      '14 evidence items, most verified',
      'Strong fundamentals coverage (C#, SQL, Git)',
      'Consistent delivery cadence over 60 days',
    ],
    worthAdding: [
      'One deployed API project (closes the biggest gap)',
      'Docker proof (in progress — finish it)',
      'A short system design write-up',
    ],
    uncertainty:
      'Scores compare your evidence against role requirements in current market data. As requirements shift, the same evidence can score differently.',
    confidence: 'High',
    nextAction:
      'Finish the Docker proof already in progress, then deploy your inventory API — those two items close both gaps.',
    actions: [
      { label: 'Update Portfolio', target: 'portfolio' },
      { label: 'Open Compass', target: 'compass' },
    ],
  },
  {
    id: 'which-save',
    question: 'Which role should I save?',
    summary:
      'The Junior Backend Developer role at the KL fintech scores highest against your current evidence — 4 of 5 required skills matched, one gap (Docker) already in progress.',
    alreadyHave: [
      'C# match with their .NET stack',
      'SQL exposure matching their data layer',
      'Project delivery evidence they explicitly ask for',
    ],
    worthAdding: [
      'Docker proof (their one unmatched requirement)',
      'A deployed demo to reference in the application',
    ],
    uncertainty:
      'Fit labels are based on skill overlap with similar hired profiles — team fit and interview performance are outside what Haven can see.',
    confidence: 'Medium',
    nextAction:
      'Save the fintech role now, then close the Docker gap before applying — your readiness rises meaningfully with that one proof.',
    actions: [
      { label: 'View matching roles', target: 'discover' },
      { label: 'Update Portfolio', target: 'portfolio' },
    ],
  },
  {
    id: 'learn-docker',
    question: 'What changes if I learn Docker?',
    summary:
      'Adding Docker proof would raise your backend readiness from 72% toward the low 80s and unlock roles currently marked as stretch.',
    alreadyHave: [
      'An in-progress Docker learning item',
      'An inventory API project ready to containerize',
      '7 of your top 10 matched roles listing Docker',
    ],
    worthAdding: [
      'A containerized, deployed version of your API',
      'A short README documenting the setup',
    ],
    uncertainty:
      'Estimates are based on similar transition profiles, not a guarantee. The exact readiness change depends on how you evidence the skill.',
    confidence: 'Medium',
    nextAction:
      'Run the Docker scenario in the Compass Decision Simulator to see the before/after across all six paths.',
    actions: [
      { label: 'Open Compass', target: 'compass' },
      { label: 'Update Portfolio', target: 'portfolio' },
    ],
  },
]

export interface MemoryCard {
  title: string
  stat: string
  detail: string
  target: SectionId
}

export const memoryCards: MemoryCard[] = [
  {
    title: 'Compass paths',
    stat: '6',
    detail: 'realistic routes mapped',
    target: 'compass',
  },
  {
    title: 'Portfolio evidence',
    stat: '14',
    detail: 'evidence items, 2 proof gaps',
    target: 'portfolio',
  },
  {
    title: 'Discover roles',
    stat: '27',
    detail: 'roles connected to current evidence',
    target: 'discover',
  },
  {
    title: 'Career momentum',
    stat: '+14%',
    detail: 'rising over 60 days',
    target: 'today',
  },
]

export interface PlanWeek {
  week: string
  task: string
}

export const planWeeks: PlanWeek[] = [
  {
    week: 'Week 1',
    task: 'Choose Backend Engineer as active Compass path',
  },
  {
    week: 'Week 2',
    task: 'Build Docker proof with one API project',
  },
  {
    week: 'Week 3',
    task: 'Add deployment evidence to Portfolio',
  },
  {
    week: 'Week 4',
    task: 'Save 3 backend roles and rehearse SQL/API interview questions',
  },
]

export interface PreviewMessage {
  role: 'haven' | 'user'
  text: string
}

export const previewScript: PreviewMessage[] = [
  { role: 'user', text: 'What should I learn next?' },
  {
    role: 'haven',
    text: 'Based on your current profile, Docker and system design unlock the most backend roles this month.',
  },
  { role: 'user', text: 'Why Docker?' },
  {
    role: 'haven',
    text: 'It appears in 7 of your top 10 matched backend roles and directly closes one proof gap.',
  },
]

export const principles = [
  {
    title: 'No crystal ball',
    text: 'Haven does not predict one future. It explains possible routes and uncertainty.',
  },
  {
    title: 'Evidence before advice',
    text: 'Every suggestion connects back to skills, proof, roles, or observed transition patterns.',
  },
  {
    title: 'Action over anxiety',
    text: 'The goal is not more information. The goal is a clear next step.',
  },
]
