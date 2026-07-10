'use client'

import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/ui/reveal'
import { SignalBadge } from '@/components/career/signal-badge'
import { CountUp } from '@/components/landing/count-up'
import { EmployerMarquee } from '@/components/landing/employer-marquee'
import { CareerArc } from '@/components/landing/career-arc'
import type { SectionId } from '@/components/shell/nav-config'

const stats = [
  { value: 595, suffix: '+', label: 'Companies modeled' },
  { value: 18443, suffix: '+', label: 'Role signals indexed' },
  { value: 34, suffix: '', label: 'Career sectors' },
  { value: 1, suffix: '', label: 'Connected career profile' },
]

const ecosystem = [
  {
    icon: UserRound,
    title: 'Candidate',
    description:
      'A daily career command center built around one lifelong profile.',
    items: ['Today', 'Compass', 'Discover', 'Portfolio', 'Haven'],
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
    title: 'Preview Employer View',
    description:
      'See how CIMB’s talent team reviews reason-attached matches and pipeline health.',
    cta: 'Preview Employer',
    target: 'employer',
  },
  {
    icon: Building2,
    title: 'Preview University View',
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
            onClick={() => onNavigate('employer')}
          >
            Preview employer tools
          </Button>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Recommendations explain their reasoning and uncertainty.
        </span>
      </section>

      {/* Career arc */}
      <Reveal>
        <section aria-label="Career arc">
          <Card className="p-6 sm:p-8">
            <CareerArc />
          </Card>
        </section>
      </Reveal>

      {/* Stats */}
      <Reveal>
        <section aria-label="Demo market model statistics">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} className="items-start gap-1 p-5 sm:p-6">
                <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </Card>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Employer marquee */}
      <Reveal>
        <section aria-label="Employers" className="flex flex-col gap-5">
          <p className="text-center text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Example employers represented in the demo dataset
          </p>
          <EmployerMarquee />
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
