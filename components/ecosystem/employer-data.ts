export interface EmployerCandidate {
  id: string
  name: string
  university: string
  portfolioScore: number
  path: string
  fit: 'Strong fit' | 'Good fit' | 'Moderate fit'
  fitTone: 'success' | 'primary' | 'warning'
  reason: string
  gap: string
  /** Drawer detail */
  evidenceSummary: string
  strengths: string[]
  gaps: string[]
  whyAppears: string
  recruiterAction: string
}

export const employerCandidates: EmployerCandidate[] = [
  {
    id: 'aisyah',
    name: 'Aisyah Rahman',
    university: 'UM alumna · Data Analyst',
    portfolioScore: 78,
    path: 'Backend Engineer',
    fit: 'Strong fit',
    fitTone: 'success',
    reason:
      'SQL, C#, and structured project delivery overlap with backend platform roles.',
    gap: 'Docker deployment proof',
    evidenceSummary:
      'Portfolio score 78 (Strong). Work samples include a C# inventory system with documented trade-offs, SQL reporting queries against realistic datasets, and consistent delivery signals across recent projects.',
    strengths: [
      'SQL fundamentals with verified coursework evidence',
      'C# object-oriented project with documented design decisions',
      'Structured delivery — milestones and decision logs attached',
    ],
    gaps: [
      'Docker deployment proof — no containerized project yet',
      'Public API evidence — endpoints exist but are not deployed',
    ],
    whyAppears:
      'Observed pattern: her evidence profile overlaps with successful backend early-career transitions at banking platform teams. Fit signal is reason-attached, not keyword-based.',
    recruiterAction:
      'Invite for technical screen focused on API reasoning and SQL fundamentals.',
  },
  {
    id: 'mei',
    name: 'Mei Chen',
    university: 'MMU · Data Science',
    portfolioScore: 84,
    path: 'Data Engineer',
    fit: 'Strong fit',
    fitTone: 'success',
    reason: 'Strong data pipeline coursework and analytics evidence.',
    gap: 'Cloud orchestration',
    evidenceSummary:
      'Portfolio score 84 (Strong). Evidence spans an end-to-end ETL project on public transport data, pandas-based analytics notebooks, and a documented data quality checklist used across two coursework projects.',
    strengths: [
      'ETL pipeline project with documented data validation',
      'Analytics storytelling — clear notebooks with business framing',
      'Python and SQL evidence verified through coursework',
    ],
    gaps: [
      'Cloud orchestration — no Airflow or managed scheduler evidence',
      'Production data warehouse exposure not yet demonstrated',
    ],
    whyAppears:
      'Observed pattern: pipeline-plus-quality-checks evidence closely matches what data platform teams screen for at the early-career level.',
    recruiterAction:
      'Invite for a data screen with a small pipeline design exercise; probe orchestration awareness rather than requiring tool proof.',
  },
  {
    id: 'daniel',
    name: 'Daniel Tan',
    university: 'USM · Software Engineering',
    portfolioScore: 81,
    path: 'Systems Analyst',
    fit: 'Good fit',
    fitTone: 'primary',
    reason: 'Strong documentation and requirements evidence.',
    gap: 'Stakeholder presentation proof',
    evidenceSummary:
      'Portfolio score 81 (Strong). Evidence includes a full requirements specification for a campus system, UML and process documentation, and a testing traceability matrix from a group project.',
    strengths: [
      'Requirements writing — complete, structured specification evidence',
      'Process documentation with UML and flow diagrams',
      'Testing traceability — links requirements to verification',
    ],
    gaps: [
      'Stakeholder presentation proof — no recorded walkthrough evidence',
      'Cross-team communication signals are thin',
    ],
    whyAppears:
      'Observed pattern: documentation depth is a strong systems analyst readiness signal; his profile ranks high on evidence completeness.',
    recruiterAction:
      'Invite for a case discussion where he walks through requirements for a mock stakeholder; this doubles as his missing evidence.',
  },
  {
    id: 'nur',
    name: 'Nur Iman',
    university: 'UTM · Computer Engineering',
    portfolioScore: 76,
    path: 'Technical Consultant',
    fit: 'Moderate fit',
    fitTone: 'warning',
    reason: 'Good technical explanation signals and project communication.',
    gap: 'Client-facing evidence',
    evidenceSummary:
      'Portfolio score 76 (Strong). Evidence includes clearly written technical explainers, a well-documented embedded systems project, and peer-review notes showing communication strength.',
    strengths: [
      'Technical explanation — writes clearly for non-expert readers',
      'Project communication — status updates and demo notes attached',
      'Solid engineering fundamentals from embedded coursework',
    ],
    gaps: [
      'Client-facing evidence — no external stakeholder interaction proof',
      'Business framing of technical decisions not yet demonstrated',
    ],
    whyAppears:
      'Observed pattern: explanation quality is the strongest early signal for consultant routes; fit is moderate until client-facing proof exists.',
    recruiterAction:
      'Consider for a shadowing-based internship pathway; ask for a short client-style briefing as a low-stakes evidence builder.',
  },
]

export const funnelStages = [
  { stage: 'Applied', count: 126, pct: 100, note: null },
  { stage: 'Screened', count: 68, pct: 54, note: '54% pass-through' },
  { stage: 'Interview', count: 24, pct: 19, note: '35% pass-through' },
  { stage: 'Offer', count: 7, pct: 6, note: '29% pass-through' },
  { stage: 'Hired', count: 3, pct: 2.5, note: '43% accept' },
]
