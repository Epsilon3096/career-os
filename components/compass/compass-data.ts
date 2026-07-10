/* ------------------------------------------------------------------ */
/* Mock data for the Path Detail Panel and Decision Simulator.        */
/* Local data only — no backend, no real AI.                          */
/* ------------------------------------------------------------------ */

export interface PlanStep {
  period: string
  title: string
  description: string
}

export interface BridgeJob {
  role: string
  company: string
  location: string
  salary: string
  whyMatch: string
  matched: string[]
  missing: string[]
}

export interface PathDetail {
  strengths: string[]
  gaps: string[]
  whyPoints: string[]
  ninetyDayPlan: PlanStep[]
  twelveMonthRoute: PlanStep[]
  fiveYearUnlock: string[]
  jobs: BridgeJob[]
}

export interface SimState {
  roles: number
  readiness: number
  salary: string
  gaps: number
}

export interface SimAction {
  id: string
  label: string
  impact: 'High impact' | 'Medium impact' | 'Supporting'
  timeCost: string
  confidence: 'High' | 'Medium' | 'Low'
  basedOn: string
  before: SimState
  after: SimState
}

/* ------------------------------------------------------------------ */
/* Path details                                                        */
/* ------------------------------------------------------------------ */

export const pathDetails: Record<string, PathDetail> = {
  'backend-engineer': {
    strengths: [
      'C# fundamentals from coursework and projects',
      'SQL exposure across two database modules',
      'Consistent project delivery habit',
      'Debugging discipline shown in code reviews',
      'Structured problem solving under deadlines',
    ],
    gaps: [
      'Docker proof',
      'Deployed API project',
      'System design fundamentals',
      'API testing evidence',
      'Basic cloud deployment',
    ],
    whyPoints: [
      'Your current skills — C#, SQL, and version control — map onto the core backend toolchain.',
      'Portfolio evidence shows completed projects but no deployed, containerized service yet.',
      '1,240 similar transitions from CS graduate profiles were observed into this role family.',
      'Backend openings in KL and hybrid roles show sustained demand signals over 12 months.',
    ],
    ninetyDayPlan: [
      {
        period: 'Week 1–3',
        title: 'Build and document one API project',
        description:
          'Design a small REST API in C#, keep a written build log, and commit incrementally.',
      },
      {
        period: 'Week 4–7',
        title: 'Containerize with Docker and add tests',
        description:
          'Wrap the API in Docker, add integration tests, and document the setup steps.',
      },
      {
        period: 'Week 8–12',
        title: 'Deploy, write case study, rehearse interviews',
        description:
          'Deploy to a free cloud tier, publish a case study, and rehearse backend interview questions.',
      },
    ],
    twelveMonthRoute: [
      {
        period: 'Month 1–3',
        title: 'Evidence',
        description: 'Ship the deployed API project and close the Docker gap.',
      },
      {
        period: 'Month 4–6',
        title: 'Interview readiness',
        description:
          'System design basics, mock interviews, and a polished case study.',
      },
      {
        period: 'Month 7–9',
        title: 'Targeted applications',
        description:
          'Apply to backend roles where your matched skills exceed 70%.',
      },
      {
        period: 'Month 10–12',
        title: 'Transition attempt',
        description:
          'Interview loop, negotiate from evidence, and land the first backend role.',
      },
    ],
    fiveYearUnlock: [
      'Backend Engineer',
      'Senior Backend Engineer',
      'Tech Lead',
      'Platform Architect',
    ],
    jobs: [
      {
        role: 'Backend Engineer',
        company: 'CIMB',
        location: 'Kuala Lumpur',
        salary: 'RM 8k–10k',
        whyMatch:
          'Bank platform team hiring juniors with C# and SQL foundations — matches your strongest evidence.',
        matched: ['C#', 'SQL', 'Git'],
        missing: ['Docker', 'API testing'],
      },
      {
        role: 'Software Engineer, API Platform',
        company: 'Maybank',
        location: 'Hybrid · KL',
        salary: 'RM 7k–9k',
        whyMatch:
          'API platform role that weighs project delivery habit over years of experience.',
        matched: ['C#', 'REST basics', 'SQL'],
        missing: ['System design', 'Cloud deployment'],
      },
      {
        role: 'Graduate Backend Developer',
        company: 'Grab',
        location: 'Remote',
        salary: 'RM 6.5k–8.5k',
        whyMatch:
          'Graduate program aligned with your stage — structured onboarding closes gaps on the job.',
        matched: ['Programming fundamentals', 'SQL'],
        missing: ['Docker'],
      },
    ],
  },
  'data-engineer': {
    strengths: [
      'Python scripting from analytics coursework',
      'SQL query writing across projects',
      'Analytical thinking evidenced in capstone work',
      'Comfort with structured datasets',
    ],
    gaps: [
      'ETL pipeline proof',
      'Cloud storage experience',
      'Orchestration tooling (Airflow or similar)',
      'Data modeling fundamentals',
    ],
    whyPoints: [
      'Your scripting and SQL evidence transfers directly into pipeline engineering.',
      '860 similar transitions were observed from analytics-leaning CS profiles.',
      'Data platform hiring in Malaysia shows growing demand signals, especially in finance.',
      'Missing evidence is concentrated in tooling, not fundamentals — a closable gap.',
    ],
    ninetyDayPlan: [
      {
        period: 'Week 1–3',
        title: 'Build a small ETL pipeline',
        description:
          'Extract a public dataset, transform it with Python, and load it into a warehouse table.',
      },
      {
        period: 'Week 4–7',
        title: 'Add orchestration and cloud storage',
        description:
          'Schedule the pipeline with an orchestrator and store outputs in cloud object storage.',
      },
      {
        period: 'Week 8–12',
        title: 'Document and rehearse',
        description:
          'Publish a pipeline case study and rehearse data engineering interview questions.',
      },
    ],
    twelveMonthRoute: [
      {
        period: 'Month 1–3',
        title: 'Evidence',
        description: 'Ship the ETL project with orchestration proof.',
      },
      {
        period: 'Month 4–6',
        title: 'Interview readiness',
        description: 'Data modeling drills and warehouse fundamentals.',
      },
      {
        period: 'Month 7–9',
        title: 'Targeted applications',
        description: 'Apply to junior data platform roles in finance and tech.',
      },
      {
        period: 'Month 10–12',
        title: 'Transition attempt',
        description: 'Interview loop and first data engineering role.',
      },
    ],
    fiveYearUnlock: [
      'Data Engineer',
      'Senior Data Engineer',
      'Data Platform Lead',
      'Head of Data Infrastructure',
    ],
    jobs: [
      {
        role: 'Junior Data Engineer',
        company: 'Petronas Digital',
        location: 'Kuala Lumpur',
        salary: 'RM 7k–9.5k',
        whyMatch:
          'Energy data team hiring juniors with Python and SQL — tooling is trained on the job.',
        matched: ['Python', 'SQL'],
        missing: ['Airflow', 'Cloud storage'],
      },
      {
        role: 'Data Engineer, Payments',
        company: 'Touch ’n Go',
        location: 'Hybrid · KL',
        salary: 'RM 8k–10k',
        whyMatch:
          'Payments pipeline role that values analytical rigor over years of tooling.',
        matched: ['SQL', 'Python', 'Analytics'],
        missing: ['ETL proof', 'Orchestration'],
      },
      {
        role: 'Graduate Data Platform Engineer',
        company: 'Shopee',
        location: 'Remote',
        salary: 'RM 6.5k–8.5k',
        whyMatch:
          'Graduate track matched to your stage with structured pipeline training.',
        matched: ['Python', 'SQL'],
        missing: ['Cloud storage'],
      },
    ],
  },
  'product-engineer': {
    strengths: [
      'End-to-end project delivery habit',
      'Full-stack coursework exposure',
      'Communication evidence from team projects',
      'User-facing feature work in capstone',
    ],
    gaps: [
      'User analytics proof',
      'Product metrics literacy',
      'UX trade-off case study',
      'Experiment or A/B test exposure',
    ],
    whyPoints: [
      'Your end-to-end habits fit teams where product thinking and engineering overlap.',
      '540 similar transitions were observed from generalist CS profiles.',
      'Product engineering roles reward shipped-feature evidence, which you already have.',
      'Gaps are in measurement, not building — closable through one instrumented project.',
    ],
    ninetyDayPlan: [
      {
        period: 'Week 1–3',
        title: 'Instrument an existing project',
        description:
          'Add basic analytics events to one of your shipped projects and define 2–3 metrics.',
      },
      {
        period: 'Week 4–7',
        title: 'Run one improvement loop',
        description:
          'Use the metrics to pick one improvement, ship it, and measure the change.',
      },
      {
        period: 'Week 8–12',
        title: 'Write the product case study',
        description:
          'Document the metric story and rehearse product-sense interview questions.',
      },
    ],
    twelveMonthRoute: [
      {
        period: 'Month 1–3',
        title: 'Evidence',
        description: 'Ship the instrumented project with a metric narrative.',
      },
      {
        period: 'Month 4–6',
        title: 'Interview readiness',
        description: 'Product-sense drills and UX trade-off practice.',
      },
      {
        period: 'Month 7–9',
        title: 'Targeted applications',
        description: 'Apply to product engineering and full-stack product teams.',
      },
      {
        period: 'Month 10–12',
        title: 'Transition attempt',
        description: 'Interview loop and first product engineering role.',
      },
    ],
    fiveYearUnlock: [
      'Product Engineer',
      'Senior Product Engineer',
      'Product Lead',
      'Head of Product Engineering',
    ],
    jobs: [
      {
        role: 'Product Engineer',
        company: 'Carsome',
        location: 'Kuala Lumpur',
        salary: 'RM 7k–9k',
        whyMatch:
          'Marketplace team hiring builders who can own features end-to-end.',
        matched: ['Full-stack basics', 'Project delivery'],
        missing: ['User analytics', 'Product metrics'],
      },
      {
        role: 'Software Engineer, Growth',
        company: 'AirAsia MOVE',
        location: 'Hybrid · KL',
        salary: 'RM 7k–9.5k',
        whyMatch:
          'Growth role that values shipped-feature evidence and iteration speed.',
        matched: ['JavaScript', 'Shipped projects'],
        missing: ['A/B testing'],
      },
      {
        role: 'Graduate Product Developer',
        company: 'Setel',
        location: 'Kuala Lumpur',
        salary: 'RM 6k–8k',
        whyMatch:
          'Graduate role matched to your stage with product mentorship built in.',
        matched: ['Programming fundamentals', 'Teamwork evidence'],
        missing: ['Product metrics'],
      },
    ],
  },
  'technical-consultant': {
    strengths: [
      'Clear technical explanation signals',
      'Software fundamentals across the stack',
      'Team communication evidence',
      'Structured documentation habit',
    ],
    gaps: [
      'Stakeholder discovery practice',
      'Formal documentation samples',
      'Presentation work sample',
      'Client-facing project proof',
    ],
    whyPoints: [
      'Your communication and technical explanation signals support client-facing roles.',
      '420 similar transitions were observed from communicative CS profiles.',
      'Consulting teams in KL hire juniors who can bridge business and engineering language.',
      'Gaps are in artifacts, not aptitude — presentations and discovery notes close them.',
    ],
    ninetyDayPlan: [
      {
        period: 'Week 1–3',
        title: 'Produce two solution write-ups',
        description:
          'Document two of your projects as client-style solution briefs.',
      },
      {
        period: 'Week 4–7',
        title: 'Record a presentation',
        description:
          'Present one solution brief on video and gather structured feedback.',
      },
      {
        period: 'Week 8–12',
        title: 'Practice discovery conversations',
        description:
          'Run mock stakeholder interviews and refine your questioning framework.',
      },
    ],
    twelveMonthRoute: [
      {
        period: 'Month 1–3',
        title: 'Evidence',
        description: 'Build the consulting artifact set — briefs and decks.',
      },
      {
        period: 'Month 4–6',
        title: 'Interview readiness',
        description: 'Case interview practice and client scenario drills.',
      },
      {
        period: 'Month 7–9',
        title: 'Targeted applications',
        description: 'Apply to technology consulting and solutions teams.',
      },
      {
        period: 'Month 10–12',
        title: 'Transition attempt',
        description: 'Interview loop and first consulting role.',
      },
    ],
    fiveYearUnlock: [
      'Technical Consultant',
      'Senior Consultant',
      'Engagement Manager',
      'Principal Consultant',
    ],
    jobs: [
      {
        role: 'Associate Technology Consultant',
        company: 'Accenture',
        location: 'Kuala Lumpur',
        salary: 'RM 6k–8k',
        whyMatch:
          'Associate intake that trains discovery and delivery on structured projects.',
        matched: ['Technical fundamentals', 'Communication'],
        missing: ['Client project proof'],
      },
      {
        role: 'Solutions Analyst',
        company: 'Deloitte',
        location: 'Hybrid · KL',
        salary: 'RM 6.5k–8.5k',
        whyMatch:
          'Analyst role that values structured documentation and stakeholder skills.',
        matched: ['Documentation', 'SQL'],
        missing: ['Presentation work sample'],
      },
      {
        role: 'Graduate Consultant, Tech',
        company: 'PwC Malaysia',
        location: 'Kuala Lumpur',
        salary: 'RM 5.5k–7.5k',
        whyMatch:
          'Graduate track matched to your stage with client exposure from month one.',
        matched: ['Fundamentals', 'Teamwork'],
        missing: ['Stakeholder discovery'],
      },
    ],
  },
  'systems-analyst': {
    strengths: [
      'Structured analytical thinking',
      'Software fundamentals and SQL',
      'Requirements-style thinking from coursework',
      'Reliable delivery signals',
    ],
    gaps: [
      'Business process mapping samples',
      'Formal requirements writing',
      'UAT participation evidence',
      'Enterprise systems exposure',
    ],
    whyPoints: [
      'Your structured thinking fits enterprise process and system analysis work.',
      '690 similar transitions were observed from methodical CS profiles.',
      'Enterprise teams in banking and telco hire junior analysts consistently.',
      'Gaps are experiential — one process-mapping project closes most of them.',
    ],
    ninetyDayPlan: [
      {
        period: 'Week 1–3',
        title: 'Map one real process',
        description:
          'Choose a familiar workflow and produce a professional process map.',
      },
      {
        period: 'Week 4–7',
        title: 'Write a requirements document',
        description:
          'Turn the process map into a structured requirements specification.',
      },
      {
        period: 'Week 8–12',
        title: 'Simulate a UAT cycle',
        description:
          'Design test cases against your spec and document the UAT run.',
      },
    ],
    twelveMonthRoute: [
      {
        period: 'Month 1–3',
        title: 'Evidence',
        description: 'Complete the analyst artifact portfolio.',
      },
      {
        period: 'Month 4–6',
        title: 'Interview readiness',
        description: 'Scenario-based analyst interview practice.',
      },
      {
        period: 'Month 7–9',
        title: 'Targeted applications',
        description: 'Apply to enterprise systems teams in banking and telco.',
      },
      {
        period: 'Month 10–12',
        title: 'Transition attempt',
        description: 'Interview loop and first systems analyst role.',
      },
    ],
    fiveYearUnlock: [
      'Systems Analyst',
      'Senior Business Systems Analyst',
      'Solution Designer',
      'Enterprise Architect',
    ],
    jobs: [
      {
        role: 'Systems Analyst',
        company: 'Maybank',
        location: 'Kuala Lumpur',
        salary: 'RM 6k–8k',
        whyMatch:
          'Core banking team hiring analysts with SQL and structured thinking.',
        matched: ['SQL', 'Analysis'],
        missing: ['UAT evidence'],
      },
      {
        role: 'Business Systems Analyst',
        company: 'Telekom Malaysia',
        location: 'Hybrid · KL',
        salary: 'RM 5.5k–7.5k',
        whyMatch:
          'Telco systems role valuing requirements writing and process mapping.',
        matched: ['Documentation', 'Fundamentals'],
        missing: ['Process mapping samples'],
      },
      {
        role: 'Graduate IT Analyst',
        company: 'CIMB',
        location: 'Kuala Lumpur',
        salary: 'RM 5.5k–7k',
        whyMatch:
          'Graduate program matched to your stage with rotation across systems teams.',
        matched: ['SQL', 'Delivery signals'],
        missing: ['Enterprise exposure'],
      },
    ],
  },
  'steady-growth': {
    strengths: [
      'Consistent completion habit',
      'Broad technical fundamentals',
      'Low-risk learning discipline',
      'Growing portfolio baseline',
    ],
    gaps: [
      'Deployed project proof',
      'Interview readiness practice',
      'Sharper role targeting',
      'Public evidence of work',
    ],
    whyPoints: [
      'This route prioritizes stability and steady evidence-building over speed.',
      '780 similar profiles chose gradual strengthening before a targeted move.',
      'Lower transition risk fits profiles that value certainty at this stage.',
      'Every proof added here also widens the faster routes later.',
    ],
    ninetyDayPlan: [
      {
        period: 'Week 1–3',
        title: 'Deploy one existing project',
        description:
          'Take your strongest project and get it live with a public URL.',
      },
      {
        period: 'Week 4–7',
        title: 'Polish the portfolio narrative',
        description:
          'Write clear case notes for your top three pieces of work.',
      },
      {
        period: 'Week 8–12',
        title: 'Baseline interview practice',
        description:
          'Complete a weekly mock interview and log improvement notes.',
      },
    ],
    twelveMonthRoute: [
      {
        period: 'Month 1–3',
        title: 'Evidence',
        description: 'Deployed proof and a polished portfolio.',
      },
      {
        period: 'Month 4–6',
        title: 'Interview readiness',
        description: 'Steady practice cadence without pressure.',
      },
      {
        period: 'Month 7–9',
        title: 'Targeted applications',
        description: 'Apply selectively where fit signals are strongest.',
      },
      {
        period: 'Month 10–12',
        title: 'Transition attempt',
        description: 'Move when readiness and confidence align.',
      },
    ],
    fiveYearUnlock: [
      'Junior Developer',
      'Software Engineer',
      'Senior Engineer',
      'Specialist or Lead (route stays open)',
    ],
    jobs: [
      {
        role: 'Junior Software Developer',
        company: 'Silverlake Axis',
        location: 'Kuala Lumpur',
        salary: 'RM 5k–6.5k',
        whyMatch:
          'Stable enterprise environment with structured mentorship — matches a stability-first route.',
        matched: ['Fundamentals', 'SQL'],
        missing: ['Deployed proof'],
      },
      {
        role: 'Associate Software Engineer',
        company: 'HeiTech Padu',
        location: 'Hybrid · KL',
        salary: 'RM 5k–7k',
        whyMatch:
          'Government-linked projects with predictable growth and low volatility.',
        matched: ['C#', 'Delivery habit'],
        missing: ['Interview practice'],
      },
      {
        role: 'Graduate Software Engineer',
        company: 'MDEC partner network',
        location: 'Kuala Lumpur',
        salary: 'RM 4.5k–6k',
        whyMatch:
          'Entry route matched to your stage with room to build evidence gradually.',
        matched: ['Fundamentals'],
        missing: ['Role targeting'],
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Simulator actions per path                                          */
/* ------------------------------------------------------------------ */

export const simActions: Record<string, SimAction[]> = {
  'backend-engineer': [
    {
      id: 'learn-docker',
      label: 'Learn Docker',
      impact: 'High impact',
      timeCost: '3 weeks',
      confidence: 'Medium',
      basedOn: 'Similar backend transition profiles',
      before: { roles: 12, readiness: 72, salary: 'RM 6k–8k', gaps: 2 },
      after: { roles: 27, readiness: 81, salary: 'RM 7k–10k', gaps: 1 },
    },
    {
      id: 'deploy-api',
      label: 'Build deployed API project',
      impact: 'High impact',
      timeCost: '5 weeks',
      confidence: 'Medium',
      basedOn: 'Profiles that added deployed backend proof',
      before: { roles: 12, readiness: 72, salary: 'RM 6k–8k', gaps: 2 },
      after: { roles: 31, readiness: 84, salary: 'RM 7k–10k', gaps: 1 },
    },
    {
      id: 'system-design',
      label: 'Add system design case study',
      impact: 'High impact',
      timeCost: '4 weeks',
      confidence: 'Medium',
      basedOn: 'Interview outcome patterns for junior backend roles',
      before: { roles: 12, readiness: 72, salary: 'RM 6k–8k', gaps: 2 },
      after: { roles: 19, readiness: 79, salary: 'RM 6.5k–9k', gaps: 2 },
    },
    {
      id: 'internship-evidence',
      label: 'Document internship outcomes',
      impact: 'Medium impact',
      timeCost: '2 weeks',
      confidence: 'High',
      basedOn: 'Profiles that documented internship outcomes',
      before: { roles: 12, readiness: 72, salary: 'RM 6k–8k', gaps: 2 },
      after: { roles: 17, readiness: 76, salary: 'RM 6k–8.5k', gaps: 2 },
    },
    {
      id: 'portfolio-proof',
      label: 'Improve portfolio proof',
      impact: 'Medium impact',
      timeCost: '2 weeks',
      confidence: 'High',
      basedOn: 'Recruiter screening patterns in similar markets',
      before: { roles: 12, readiness: 72, salary: 'RM 6k–8k', gaps: 2 },
      after: { roles: 16, readiness: 77, salary: 'RM 6k–8.5k', gaps: 2 },
    },
    {
      id: 'sql-interview',
      label: 'Practice SQL interview set',
      impact: 'Supporting',
      timeCost: '1 week',
      confidence: 'High',
      basedOn: 'Interview pass patterns for junior data-touching roles',
      before: { roles: 12, readiness: 72, salary: 'RM 6k–8k', gaps: 2 },
      after: { roles: 14, readiness: 74, salary: 'RM 6k–8k', gaps: 2 },
    },
  ],
  'data-engineer': [
    {
      id: 'build-etl',
      label: 'Build ETL pipeline project',
      impact: 'High impact',
      timeCost: '4 weeks',
      confidence: 'Medium',
      basedOn: 'Similar data platform transition profiles',
      before: { roles: 8, readiness: 58, salary: 'RM 5.5k–7k', gaps: 3 },
      after: { roles: 21, readiness: 72, salary: 'RM 7k–9.5k', gaps: 2 },
    },
    {
      id: 'learn-cloud-storage',
      label: 'Learn cloud storage basics',
      impact: 'High impact',
      timeCost: '3 weeks',
      confidence: 'Medium',
      basedOn: 'Profiles that added cloud evidence',
      before: { roles: 8, readiness: 58, salary: 'RM 5.5k–7k', gaps: 3 },
      after: { roles: 16, readiness: 67, salary: 'RM 6.5k–8.5k', gaps: 2 },
    },
    {
      id: 'orchestration',
      label: 'Add orchestration proof',
      impact: 'High impact',
      timeCost: '3 weeks',
      confidence: 'Medium',
      basedOn: 'Job requirement patterns in data platform postings',
      before: { roles: 8, readiness: 58, salary: 'RM 5.5k–7k', gaps: 3 },
      after: { roles: 15, readiness: 66, salary: 'RM 6.5k–8.5k', gaps: 2 },
    },
    {
      id: 'data-modeling',
      label: 'Practice data modeling set',
      impact: 'Medium impact',
      timeCost: '2 weeks',
      confidence: 'High',
      basedOn: 'Interview patterns for junior data roles',
      before: { roles: 8, readiness: 58, salary: 'RM 5.5k–7k', gaps: 3 },
      after: { roles: 11, readiness: 63, salary: 'RM 6k–7.5k', gaps: 3 },
    },
  ],
  'product-engineer': [
    {
      id: 'instrument-analytics',
      label: 'Add user analytics to a project',
      impact: 'High impact',
      timeCost: '3 weeks',
      confidence: 'Medium',
      basedOn: 'Similar product engineering transitions',
      before: { roles: 9, readiness: 61, salary: 'RM 5.5k–7.5k', gaps: 3 },
      after: { roles: 19, readiness: 72, salary: 'RM 7k–9k', gaps: 2 },
    },
    {
      id: 'metrics-case',
      label: 'Write product metrics case study',
      impact: 'High impact',
      timeCost: '2 weeks',
      confidence: 'Medium',
      basedOn: 'Hiring patterns for product-minded engineers',
      before: { roles: 9, readiness: 61, salary: 'RM 5.5k–7.5k', gaps: 3 },
      after: { roles: 16, readiness: 69, salary: 'RM 6.5k–8.5k', gaps: 2 },
    },
    {
      id: 'ab-test',
      label: 'Run one A/B experiment',
      impact: 'Medium impact',
      timeCost: '3 weeks',
      confidence: 'Medium',
      basedOn: 'Profiles with experiment evidence',
      before: { roles: 9, readiness: 61, salary: 'RM 5.5k–7.5k', gaps: 3 },
      after: { roles: 13, readiness: 66, salary: 'RM 6k–8k', gaps: 3 },
    },
    {
      id: 'ux-tradeoff',
      label: 'Document UX trade-off decisions',
      impact: 'Supporting',
      timeCost: '1 week',
      confidence: 'High',
      basedOn: 'Portfolio review patterns in product teams',
      before: { roles: 9, readiness: 61, salary: 'RM 5.5k–7.5k', gaps: 3 },
      after: { roles: 11, readiness: 64, salary: 'RM 6k–7.5k', gaps: 3 },
    },
  ],
  'technical-consultant': [
    {
      id: 'solution-briefs',
      label: 'Write two solution briefs',
      impact: 'High impact',
      timeCost: '2 weeks',
      confidence: 'Medium',
      basedOn: 'Consulting intake screening patterns',
      before: { roles: 10, readiness: 55, salary: 'RM 5k–6.5k', gaps: 3 },
      after: { roles: 18, readiness: 66, salary: 'RM 6k–8k', gaps: 2 },
    },
    {
      id: 'record-presentation',
      label: 'Record a solution presentation',
      impact: 'High impact',
      timeCost: '2 weeks',
      confidence: 'Medium',
      basedOn: 'Profiles with presentation evidence',
      before: { roles: 10, readiness: 55, salary: 'RM 5k–6.5k', gaps: 3 },
      after: { roles: 16, readiness: 64, salary: 'RM 5.5k–7.5k', gaps: 2 },
    },
    {
      id: 'discovery-practice',
      label: 'Practice stakeholder discovery',
      impact: 'Medium impact',
      timeCost: '2 weeks',
      confidence: 'Medium',
      basedOn: 'Case interview outcome patterns',
      before: { roles: 10, readiness: 55, salary: 'RM 5k–6.5k', gaps: 3 },
      after: { roles: 13, readiness: 60, salary: 'RM 5.5k–7k', gaps: 3 },
    },
    {
      id: 'case-practice',
      label: 'Complete case interview set',
      impact: 'Supporting',
      timeCost: '1 week',
      confidence: 'High',
      basedOn: 'Interview pass patterns at consulting firms',
      before: { roles: 10, readiness: 55, salary: 'RM 5k–6.5k', gaps: 3 },
      after: { roles: 12, readiness: 58, salary: 'RM 5k–7k', gaps: 3 },
    },
  ],
  'systems-analyst': [
    {
      id: 'process-map',
      label: 'Produce a process map sample',
      impact: 'High impact',
      timeCost: '2 weeks',
      confidence: 'Medium',
      basedOn: 'Analyst hiring patterns in banking and telco',
      before: { roles: 11, readiness: 64, salary: 'RM 5k–6.5k', gaps: 3 },
      after: { roles: 20, readiness: 74, salary: 'RM 6k–8k', gaps: 2 },
    },
    {
      id: 'requirements-doc',
      label: 'Write a requirements spec',
      impact: 'High impact',
      timeCost: '2 weeks',
      confidence: 'Medium',
      basedOn: 'Profiles with formal spec samples',
      before: { roles: 11, readiness: 64, salary: 'RM 5k–6.5k', gaps: 3 },
      after: { roles: 17, readiness: 71, salary: 'RM 5.5k–7.5k', gaps: 2 },
    },
    {
      id: 'uat-simulation',
      label: 'Simulate a UAT cycle',
      impact: 'Medium impact',
      timeCost: '2 weeks',
      confidence: 'Medium',
      basedOn: 'Enterprise team screening patterns',
      before: { roles: 11, readiness: 64, salary: 'RM 5k–6.5k', gaps: 3 },
      after: { roles: 14, readiness: 68, salary: 'RM 5.5k–7k', gaps: 3 },
    },
    {
      id: 'sql-analyst',
      label: 'Practice SQL analyst set',
      impact: 'Supporting',
      timeCost: '1 week',
      confidence: 'High',
      basedOn: 'Interview patterns for analyst roles',
      before: { roles: 11, readiness: 64, salary: 'RM 5k–6.5k', gaps: 3 },
      after: { roles: 13, readiness: 66, salary: 'RM 5k–7k', gaps: 3 },
    },
  ],
  'steady-growth': [
    {
      id: 'deploy-project',
      label: 'Deploy one existing project',
      impact: 'High impact',
      timeCost: '2 weeks',
      confidence: 'High',
      basedOn: 'Profiles that added deployed proof',
      before: { roles: 14, readiness: 68, salary: 'RM 4.5k–6k', gaps: 3 },
      after: { roles: 22, readiness: 76, salary: 'RM 5k–7k', gaps: 2 },
    },
    {
      id: 'portfolio-notes',
      label: 'Polish portfolio case notes',
      impact: 'Medium impact',
      timeCost: '1 week',
      confidence: 'High',
      basedOn: 'Recruiter screening patterns',
      before: { roles: 14, readiness: 68, salary: 'RM 4.5k–6k', gaps: 3 },
      after: { roles: 18, readiness: 72, salary: 'RM 5k–6.5k', gaps: 2 },
    },
    {
      id: 'mock-interviews',
      label: 'Weekly mock interview cadence',
      impact: 'Medium impact',
      timeCost: '4 weeks',
      confidence: 'High',
      basedOn: 'Interview improvement patterns over time',
      before: { roles: 14, readiness: 68, salary: 'RM 4.5k–6k', gaps: 3 },
      after: { roles: 16, readiness: 73, salary: 'RM 5k–6.5k', gaps: 3 },
    },
    {
      id: 'role-targeting',
      label: 'Sharpen role targeting',
      impact: 'Supporting',
      timeCost: '1 week',
      confidence: 'Medium',
      basedOn: 'Application outcome patterns in similar profiles',
      before: { roles: 14, readiness: 68, salary: 'RM 4.5k–6k', gaps: 3 },
      after: { roles: 15, readiness: 70, salary: 'RM 5k–6k', gaps: 3 },
    },
  ],
}
