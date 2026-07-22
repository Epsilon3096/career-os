'use client'

import {
  ArrowRight,
  Briefcase,
  Building2,
  Compass,
  FolderCheck,
  GraduationCap,
  ListChecks,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { SignalBadge } from '@/components/career/signal-badge'
import { SdgBadge } from '@/components/career/sdg-badge'
import { CareerArc } from '@/components/landing/career-arc'
import type { SectionId } from '@/components/shell/nav-config'

const stats = [
  { value: '3', label: 'realistic paths compared' },
  { value: '27', label: 'roles within reach' },
  { value: '2', label: 'proof gaps identified' },
  { value: '30 days', label: 'in one focused action plan' },
]

const impactLoop = [
  {
    icon: SlidersHorizontal,
    step: '01',
    title: 'Priorities',
    description: 'Set what matters now: income, stability, balance, learning, and impact.',
  },
  {
    icon: Compass,
    step: '02',
    title: 'Paths',
    description: 'Compare realistic routes with salary, effort, risk, and time-to-role.',
  },
  {
    icon: FolderCheck,
    step: '03',
    title: 'Proof',
    description: 'See which work samples support each path and which gaps still matter.',
  },
  {
    icon: ListChecks,
    step: '04',
    title: 'Action',
    description: 'Turn the highest-value gap into a practical next step and track progress.',
  },
]

const ecosystem = [
  {
    icon: UserRound,
    title: 'Candidate',
    description:
      'A daily career command center built around one lifelong profile.',
    items: ['Dashboard', 'Compass', 'Job listings', 'Portfolio', 'Haven'],
  },
  {
    icon: Briefcase,
    title: 'Employer',
    description:
      'Hiring decisions grounded in evidence, not keyword matching.',
    items: [
      'Hiring dashboard',
      'Pipeline health',
      'Reason-attached matches',
    ],
  },
  {
    icon: GraduationCap,
    title: 'University',
    description:
      'Outcomes visibility from enrolment to employment and beyond.',
    items: [
      'Graduate outcomes',
      'At-risk students',
      'Curriculum signals',
    ],
  },
]

const demoEntries: {
  icon: typeof UserRound
  title: string
  description: string
  cta: string
  target: SectionId
}[] = [
  {
    icon: UserRound,
    title: 'Continue as Candidate',
    description:
      'Follow Aisyah, a data analyst in Kuala Lumpur mapping her move into backend engineering.',
    cta: 'Enter Candidate Demo',
    target: 'today',
  },
  {
    icon: Briefcase,
    title: 'Preview Employer Dashboard',
    description:
      'See how CIMB’s talent team reviews reason-attached matches and pipeline health.',
    cta: 'Preview Employer',
    target: 'employer',
  },
  {
    icon: Building2,
    title: 'Preview University Dashboard',
    description:
      'See how Universiti Malaya tracks graduate outcomes and curriculum signals.',
    cta: 'Preview University',
    target: 'university',
  },
]

export function HomeSection({
  onNavigate,
}: {
  onNavigate: (id: SectionId) => void
}) {
  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      {/* Hero */}
      <section className="flex flex-col items-start gap-6 pt-6 sm:pt-12">
        <SignalBadge tone="primary">
          Career OS · Career decisions made clearer
        </SignalBadge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          Turn career uncertainty into a clear next move.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          Career OS connects your priorities, skills, work samples, and market
          signals into realistic paths and a practical 30-day plan.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={() => onNavigate('today')}>
            Open career dashboard
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => onNavigate('discover')}
          >
            <Search data-icon="inline-start" />
            Browse matched jobs
          </Button>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Recommendations explain their reasoning and uncertainty.
        </span>
      </section>

      {/* Impact loop */}
      <Reveal>
        <section aria-labelledby="impact-loop-heading" className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 id="impact-loop-heading" className="text-lg font-semibold tracking-tight">
              From uncertainty to a defensible next move
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Career OS connects four decisions that are usually scattered across job boards,
              assessments, portfolios, and career advice.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {impactLoop.map((item) => (
              <div key={item.step} className="flex min-h-48 flex-col gap-4 bg-card p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="size-4.5" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{item.step}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Career arc */}
      <Reveal>
        <section aria-label="Career arc">
          <Card className="p-6 sm:p-8">
            <CareerArc />
          </Card>
        </section>
      </Reveal>

      {/* Demonstrated outcome */}
      <Reveal>
        <section aria-labelledby="demo-outcome-heading" className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 id="demo-outcome-heading" className="text-lg font-semibold tracking-tight">
                What the demo changes for Aisyah
              </h2>
              <p className="text-sm text-muted-foreground">
                From a broad career question to a measurable, simulated action plan.
              </p>
            </div>
            <SignalBadge tone="neutral">Dummy data · simulated outcomes</SignalBadge>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} className="items-start gap-1 p-5 sm:p-6">
                <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {s.value}
                </span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </Card>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Sustainable impact */}
      <Reveal>
        <section
          aria-labelledby="sustainable-impact-heading"
          className="flex flex-col gap-4 border-y border-border py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="max-w-2xl">
            <h2 id="sustainable-impact-heading" className="text-base font-semibold">
              Better career decisions are a sustainability outcome
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The product supports lifelong learning, access to decent work, and fairer
              opportunity by connecting skills to explainable actions instead of pedigree alone.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <SdgBadge goal={4} />
            <SdgBadge goal={8} />
            <SdgBadge goal={10} />
          </div>
        </section>
      </Reveal>

      {/* Ecosystem preview */}
      <Reveal>
      <section aria-label="Ecosystem" className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">
            One ecosystem, three views
          </h2>
          <p className="text-sm text-muted-foreground">
            The same profile powers candidates, employers, and universities.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ecosystem.map((e) => (
            <Card
              key={e.title}
              className="gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <e.icon className="size-4.5" />
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">{e.title}</span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {e.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {e.items.map((item) => (
                  <SignalBadge key={item} tone="outline">
                    {item}
                  </SignalBadge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
      </Reveal>

      {/* Demo entry */}
      <Reveal>
      <section aria-label="Enter the demo" className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Explore connected workspaces
          </h2>
          <p className="text-sm text-muted-foreground">
            Preview how one dummy dataset supports candidates, employers, and
            universities.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {demoEntries.map((d) => (
            <Card
              key={d.title}
              className="justify-between gap-5 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex flex-col gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <d.icon className="size-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-base font-semibold">{d.title}</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {d.description}
                  </p>
                </div>
              </div>
              <Button
                variant={d.target === 'today' ? 'default' : 'outline'}
                onClick={() => onNavigate(d.target)}
                className="w-full"
              >
                {d.cta}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Card>
          ))}
        </div>
      </section>
      </Reveal>
    </div>
  )
}
