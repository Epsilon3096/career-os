'use client'

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Compass,
  MapPin,
  SlidersHorizontal,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import {
  CircularProgress,
  JourneyBar,
  ProgressBar,
} from '@/components/career/progress'
import {
  AskHavenButton,
  ChatBubble,
  SuggestionChip,
} from '@/components/career/haven'
import { cn } from '@/lib/utils'
import { usePersistentState } from '@/lib/use-persistent-state'
import type { SectionId } from '@/components/shell/nav-config'

const cardHover =
  'transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md'

const journeyStages = [
  { label: 'School', stage: 'complete' as const },
  { label: 'University', stage: 'complete' as const },
  { label: 'First Job', stage: 'current' as const },
  { label: 'Early Career', stage: 'upcoming' as const },
  { label: 'Mid-Career', stage: 'upcoming' as const },
]

const priorityActions: {
  id: string
  title: string
  description: string
  impact: string
  cta: string
  target: SectionId
}[] = [
  {
    id: 'docker-deployment',
    title: 'Deploy your inventory API with Docker',
    description: 'Closes the top skill-proof gap across 7 of your 10 best-matched backend roles.',
    impact: '+8 readiness · about 6 hours',
    cta: 'Add to plan',
    target: 'compass',
  },
  {
    id: 'cimb-rehearsal',
    title: 'Prepare for CIMB interview',
    description:
      'Haven lined up 8 likely SQL questions from your saved role.',
    impact: 'Interview this week · 20 minutes',
    cta: 'Open rehearsal',
    target: 'haven',
  },
  {
    id: 'maybank-role',
    title: 'Review Maybank Data Engineer role',
    description: 'Matches 11 of your 14 current skills.',
    impact: 'Strong adjacent path · closes Friday',
    cta: 'View role',
    target: 'discover',
  },
  {
    id: 'portfolio-case-study',
    title: 'Explain one architecture decision',
    description: 'A short case study will make your API project easier for employers to assess.',
    impact: '+1 reusable work sample',
    cta: 'Add career proof',
    target: 'portfolio',
  },
]

const roles = [
  {
    role: 'Backend Engineer',
    company: 'CIMB',
    location: 'Kuala Lumpur',
    salary: 'RM 8k–10k',
    fit: 'Strong fit',
    tone: 'success' as const,
    matched: '12 of 14 skills matched',
    why: 'Based on similar profiles who moved from data roles into backend engineering.',
  },
  {
    role: 'Data Analyst',
    company: 'Maybank',
    location: 'Hybrid · KL',
    salary: 'RM 6k–8k',
    fit: 'Good fit',
    tone: 'primary' as const,
    matched: '11 of 14 skills matched',
    why: 'Closely mirrors your current role with a stronger data engineering track.',
  },
  {
    role: 'Product Engineer',
    company: 'Grab',
    location: 'Remote',
    salary: 'RM 7k–9k',
    fit: 'Moderate fit',
    tone: 'warning' as const,
    matched: '9 of 14 skills matched',
    why: 'Your API project signals product thinking; your frontend proof is thinner.',
  },
  {
    role: 'ML Engineer',
    company: 'Petronas',
    location: 'Kuala Lumpur',
    salary: 'RM 9k–11k',
    fit: 'Stretch path',
    tone: 'neutral' as const,
    matched: '7 of 14 skills matched',
    why: 'Reachable within 12–18 months if you build ML and pipeline projects.',
  },
]

// 60-day momentum sparkline (normalized 0–100, upward trend)
const momentumPoints = [22, 26, 24, 30, 34, 32, 38, 41, 40, 46, 52, 50, 57, 63]

function MomentumSparkline() {
  const w = 220
  const h = 56
  const min = Math.min(...momentumPoints) - 4
  const max = Math.max(...momentumPoints) + 4
  const step = w / (momentumPoints.length - 1)
  const points = momentumPoints
    .map(
      (p, i) =>
        `${(i * step).toFixed(1)},${(h - ((p - min) / (max - min)) * h).toFixed(1)}`,
    )
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-14 w-full"
      role="img"
      aria-label="Career momentum trend rising over 60 days"
      preserveAspectRatio="none"
    >
      <polyline
        points={`0,${h} ${points} ${w},${h}`}
        className="fill-primary/10 stroke-none"
      />
      <polyline
        points={points}
        className="fill-none stroke-primary"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export function TodaySection({
  onNavigate,
}: {
  onNavigate: (id: SectionId) => void
}) {
  const [planIds, setPlanIds] = usePersistentState<string[]>(
    'career-os.action-plan.v1',
    [],
  )

  const handlePriorityAction = (id: string, target: SectionId) => {
    if (id === 'docker-deployment') {
      setPlanIds((current) =>
        current.includes(id) ? current : [...current, id],
      )
      return
    }
    onNavigate(target)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Greeting */}
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <SignalBadge tone="primary">
            Stage: First Job / Early Career
          </SignalBadge>
          <SignalBadge tone="neutral">
            <SlidersHorizontal />
            Top priorities: Learning + Stability
          </SignalBadge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Good afternoon, Aisyah.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Your career momentum is rising. You are 2 proof gaps away from
          stronger backend roles.
        </p>
      </header>

      {/* Journey + momentum */}
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="gap-6 p-6 lg:col-span-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Career journey</span>
              <span className="text-xs text-muted-foreground">
                Currently moving from First Job into Early Career.
              </span>
            </div>
            <SignalBadge tone="success">72% ready</SignalBadge>
          </div>
          <div className="pb-4">
            <JourneyBar stages={journeyStages} />
          </div>
          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Next milestone</span>
              <span className="font-semibold">Backend Engineer</span>
            </div>
            <ProgressBar value={72} tone="primary" />
          </div>
        </Card>

        <Card className={cn('gap-4 p-6 lg:col-span-2', cardHover)}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Career Momentum
            </span>
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <TrendingUp className="size-4" />
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              +14%
            </span>
            <SignalBadge tone="success" className="mb-1">
              <ArrowUpRight />
              Rising over 60 days
            </SignalBadge>
          </div>
          <MomentumSparkline />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Based on portfolio updates, saved roles, completed projects, and
            interview activity.
          </p>
        </Card>
      </div>

      {/* Priority actions */}
      <section aria-label="Priority actions" className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold tracking-tight">
            Your highest-impact actions
          </h2>
          <p className="text-sm text-muted-foreground">
            Start with the first item. The rest can wait.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {priorityActions.map((a) => (
            <Card
              key={a.id}
              className={cn(
                'justify-between gap-4',
                cardHover,
                a.id === 'docker-deployment' && 'border-primary/35 bg-primary/5',
              )}
            >
              <div className="flex flex-col gap-1.5">
                <SignalBadge
                  tone={a.id === 'docker-deployment' ? 'success' : 'neutral'}
                  className="mb-1 w-fit"
                >
                  {a.impact}
                </SignalBadge>
                <span className="text-sm font-semibold leading-snug">
                  {a.title}
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
              </div>
              <Button
                variant={
                  a.id === 'docker-deployment' && !planIds.includes(a.id)
                    ? 'default'
                    : 'outline'
                }
                size="sm"
                className="w-fit"
                onClick={() => handlePriorityAction(a.id, a.target)}
              >
                {planIds.includes(a.id) ? (
                  <>
                    <Check className="size-3.5" />
                    Added to plan
                  </>
                ) : (
                  a.cta
                )}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommended roles */}
      <section aria-label="Recommended roles" className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold tracking-tight">
            Recommended roles
          </h2>
          <p className="text-sm text-muted-foreground">
            Ranked by observed fit, based on similar profiles — not
            guarantees.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((r) => (
            <Card key={`${r.role}-${r.company}`} className={cn('gap-3', cardHover)}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
                    {r.company.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">
                      {r.role}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {r.company}
                    </span>
                  </div>
                </div>
                <SignalBadge tone={r.tone}>{r.fit}</SignalBadge>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {r.location}
                </span>
                <span className="font-mono text-foreground tabular-nums">
                  {r.salary}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 border-t border-border pt-3">
                <span className="text-xs font-medium">{r.matched}</span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Why this appears:{' '}
                  </span>
                  {r.why}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Portfolio + Haven */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className={cn('gap-5 p-6', cardHover)}>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold">Portfolio strength</span>
            <span className="text-xs text-muted-foreground">
              How strong your proof looks to employers.
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <CircularProgress value={78} tone="primary" label="Strong" />
            <div className="flex min-w-40 flex-1 flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Proof score</span>
                <span className="font-semibold tabular-nums">78 / Strong</span>
              </div>
              <SignalBadge tone="success" className="w-fit">
                Top 12% of CS candidate profiles
              </SignalBadge>
              <SignalBadge tone="warning" className="w-fit">
                2 gaps left to close
              </SignalBadge>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-fit"
            onClick={() => onNavigate('portfolio')}
          >
            View Portfolio
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Card>

        <Card className="gap-5 p-6">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold">Haven insight</span>
            <span className="text-xs text-muted-foreground">
              Your career companion, watching the market for you.
            </span>
          </div>
          <ChatBubble role="haven">
            Based on your current profile, Docker and system design unlock the
            most additional roles this month.
          </ChatBubble>
          <div className="flex flex-wrap gap-2">
            <SuggestionChip onClick={() => onNavigate('haven')}>
              Why Backend Engineer?
            </SuggestionChip>
            <SuggestionChip onClick={() => onNavigate('haven')}>
              What should I learn next?
            </SuggestionChip>
            <SuggestionChip onClick={() => onNavigate('haven')}>
              Am I underpaid?
            </SuggestionChip>
          </div>
          <AskHavenButton
            className="w-fit"
            onClick={() => onNavigate('haven')}
          />
        </Card>
      </div>

      {/* Compass CTA */}
      <Card className="flex-row flex-wrap items-center justify-between gap-6 border-primary/25 bg-primary/5 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Compass className="size-5.5" />
          </span>
          <div className="flex max-w-lg flex-col gap-1">
            <span className="text-base font-semibold">
              Ready to map your next move?
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Compare realistic paths, trade-offs, time-to-role, salary bands,
              and what each route unlocks.
            </p>
          </div>
        </div>
        <Button size="lg" onClick={() => onNavigate('compass')}>
          Open Compass
          <ArrowRight data-icon="inline-end" />
        </Button>
      </Card>
    </div>
  )
}
