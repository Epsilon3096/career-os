'use client'

import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarClock,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  Compass,
  FileSearch,
  FolderOpen,
  GraduationCap,
  Handshake,
  Info,
  MapPin,
  Sparkles,
  Timer,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { SdgBadge } from '@/components/career/sdg-badge'
import { ProgressBar } from '@/components/career/progress'
import { AskHavenButton, SuggestionChip } from '@/components/career/haven'
import { SectionHeader } from '@/components/sections/section-header'
import { CandidateDetailDrawer } from '@/components/ecosystem/candidate-detail-drawer'
import {
  employerCandidates,
  funnelStages,
  type EmployerCandidate,
} from '@/components/ecosystem/employer-data'
import { cn } from '@/lib/utils'
import type { SectionId } from '@/components/shell/nav-config'

const metrics = [
  {
    label: 'Proof-based shortlist',
    value: '82%',
    caption: 'work samples reviewed',
    trend: null,
    icon: BadgeCheck,
  },
  {
    label: 'Interviews this week',
    value: '9',
    caption: '3 today',
    trend: null,
    icon: CalendarClock,
  },
  {
    label: 'Average time-to-hire',
    value: '21d',
    caption: '4d faster',
    trend: 'down' as const,
    icon: Timer,
  },
  {
    label: 'Offer acceptance',
    value: '86%',
    caption: '3 pts',
    trend: 'up' as const,
    icon: Handshake,
  },
]

const havenChips = [
  'Why Aisyah?',
  'Which candidates need review?',
  'What gap is common?',
  'How can we improve offer acceptance?',
]

const connectionCards = [
  {
    icon: Compass,
    title: 'Candidate Compass paths feed role matching',
    body: 'Every match starts from a candidate-chosen route — not a keyword scrape. Fit signals stay reason-attached.',
  },
  {
    icon: FolderOpen,
    title: 'Portfolio evidence explains fit',
    body: 'Recruiters see verified evidence and proof gaps, so screening conversations start from what actually exists.',
  },
  {
    icon: FileSearch,
    title: 'Discover pipeline tracks saved roles',
    body: 'Candidate interest flows back into the pipeline — saved roles signal genuine intent, not spray-and-pray applications.',
  },
]

function FitBadge({ candidate }: { candidate: EmployerCandidate }) {
  return <SignalBadge tone={candidate.fitTone}>{candidate.fit}</SignalBadge>
}

export function EmployerSection({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeCandidate, setActiveCandidate] =
    useState<EmployerCandidate | null>(null)

  const openDrawer = (c: EmployerCandidate) => {
    setActiveCandidate(c)
    setDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <SignalBadge tone="neutral" className="w-fit">
          Ecosystem preview
        </SignalBadge>
        <SectionHeader
          title="Employer Dashboard"
          subtitle="Hire on trajectory, work samples, and role fit — not keywords alone."
        />
        <div className="flex gap-2.5 rounded-xl border border-border bg-surface p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            This dashboard shows how Talentbank partners could use Career OS
            signals to understand candidate readiness, pipeline health, and
            explainable matches.
          </p>
        </div>
      </div>

      {/* Employer command center */}
      <Card className="gap-5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 className="size-6" />
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold tracking-tight">
                CIMB Bank
              </h2>
              <p className="text-sm text-muted-foreground">
                Talent &amp; Early Careers
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  4 active roles
                </span>
                <span aria-hidden>·</span>
                <span>Backend, Data, Systems Analyst</span>
                <span aria-hidden>·</span>
                <span className="flex items-center gap-0.5">
                  <MapPin className="size-3" />
                  Kuala Lumpur / Hybrid
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <SignalBadge tone="success">
            <BadgeCheck />
            Work-sample screening
          </SignalBadge>
          <SignalBadge tone="primary">
            <Compass />
            Compass-linked matching
          </SignalBadge>
          <SignalBadge tone="primary">
            <Sparkles />
            Explainable recommendations
          </SignalBadge>
        </div>
      </Card>

      {/* Hiring metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card
            key={m.label}
            className="gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{m.label}</span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <m.icon className="size-4" />
              </span>
            </div>
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              {m.value}
            </span>
            <span
              className={cn(
                'flex items-center gap-1 text-xs',
                m.trend === 'up' && 'text-success',
                m.trend === 'down' && 'text-success',
                m.trend === null && 'text-muted-foreground',
              )}
            >
              {m.trend === 'up' ? <ArrowUp className="size-3" /> : null}
              {m.trend === 'down' ? <ArrowDown className="size-3" /> : null}
              {m.caption}
            </span>
          </Card>
        ))}
      </div>

      <section
        aria-labelledby="fair-hiring-impact-heading"
        className="flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="max-w-2xl">
          <h2 id="fair-hiring-impact-heading" className="text-sm font-semibold">
            Fair opportunity lens
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Work-sample signals help recruiters assess demonstrated capability and make
            screening reasons visible. They support decisions; they do not automate rejection.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SdgBadge goal={8} />
          <SdgBadge goal={10} />
        </div>
      </section>

      {/* Funnel + pipeline health */}
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Hiring funnel */}
        <Card className="gap-5 p-6">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="size-3.5" />
            </span>
            <span className="text-sm font-semibold">Hiring funnel</span>
          </div>
          <div className="flex flex-col gap-4">
            {funnelStages.map((f) => (
              <div key={f.stage} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium">{f.stage}</span>
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {f.note ? (
                      <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[0.65rem]">
                        {f.note}
                      </span>
                    ) : null}
                    <span className="font-mono font-medium text-foreground tabular-nums">
                      {f.count}
                    </span>
                  </span>
                </div>
                <ProgressBar value={f.pct} tone="primary" />
              </div>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Pass-through rates are observed patterns from this quarter&apos;s
            early-career intake — not fixed benchmarks.
          </p>
        </Card>

        {/* Pipeline health */}
        <Card className="gap-5 p-6">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Pipeline health</span>
            <span className="text-xs text-muted-foreground">
              3 decisions to clear
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-semibold tracking-tight tabular-nums">
              78%
            </span>
            <SignalBadge tone="success">Strong</SignalBadge>
          </div>
          <ProgressBar value={78} tone="success" />
          <div className="flex flex-col gap-2.5 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CircleCheck className="size-4 text-success" />
                Strong matches
              </span>
              <span className="font-mono font-medium tabular-nums">34</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CircleDashed className="size-4 text-warning" />
                Needs review
              </span>
              <span className="font-mono font-medium tabular-nums">18</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <CircleAlert className="size-4 text-risk" />
                At risk of dropping
              </span>
              <span className="font-mono font-medium tabular-nums">7</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Strong matches today */}
      <section aria-labelledby="matches-heading" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 id="matches-heading" className="text-lg font-semibold">
            Strong matches today
          </h2>
          <p className="text-sm text-muted-foreground">
            Every match carries a reason and a visible proof gap — no black-box
            ranking.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {employerCandidates.map((c) => (
            <Card
              key={c.id}
              className="gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                    {c.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">
                      {c.name}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <GraduationCap className="size-3" />
                      {c.university}
                    </span>
                  </div>
                </div>
                <FitBadge candidate={c} />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 font-medium text-primary">
                  <Compass className="size-3" />
                  {c.path}
                </span>
                <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-muted-foreground">
                  Portfolio{' '}
                  <span className="font-mono font-medium text-foreground tabular-nums">
                    {c.portfolioScore}
                  </span>
                </span>
              </div>

              <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Reason attached:{' '}
                  </span>
                  {c.reason}
                </p>
                <p className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                  <CircleDashed className="mt-0.5 size-3.5 shrink-0 text-warning" />
                  <span>
                    <span className="font-medium text-foreground">Gap: </span>
                    {c.gap}
                  </span>
                </p>
              </div>

              <div className="mt-auto flex flex-wrap gap-2">
                <Button size="sm" onClick={() => openDrawer(c)}>
                  Review candidate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onNavigate?.('haven')}
                >
                  <Sparkles data-icon="inline-start" />
                  Ask Haven why
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Haven insight */}
      <Card className="gap-5 border-primary/25 bg-primary/[0.03] p-6">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </span>
          <h2 className="text-base font-semibold">
            Haven explains the pipeline
          </h2>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          CIMB&apos;s strongest early-career matches are clustered around
          backend and systems analyst routes. Candidates with SQL evidence are
          abundant, but Docker/API deployment proof is the main differentiator.
        </p>
        <div className="flex flex-wrap gap-2">
          {havenChips.map((chip) => (
            <SuggestionChip key={chip} onClick={() => onNavigate?.('haven')}>
              {chip}
            </SuggestionChip>
          ))}
        </div>
        <AskHavenButton
          className="w-fit"
          onClick={() => onNavigate?.('haven')}
        />
      </Card>

      {/* Link back to candidate system */}
      <section
        aria-labelledby="connected-heading"
        className="flex flex-col gap-5 border-t border-border pt-8"
      >
        <div className="flex flex-col gap-1">
          <h2 id="connected-heading" className="text-lg font-semibold">
            Connected back to Candidate Career OS
          </h2>
          <p className="text-sm text-muted-foreground">
            Employer signals are only as good as the candidate system beneath
            them.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {connectionCards.map((c) => (
            <Card key={c.title} className="gap-3 p-5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.icon className="size-4.5" />
              </span>
              <span className="text-sm font-semibold leading-snug">
                {c.title}
              </span>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </Card>
          ))}
        </div>
        <Button className="w-fit" onClick={() => onNavigate?.('compass')}>
          Preview Candidate Compass
          <ArrowRight data-icon="inline-end" />
        </Button>
      </section>

      {/* Candidate detail drawer */}
      <CandidateDetailDrawer
        open={drawerOpen}
        candidate={activeCandidate}
        onClose={() => setDrawerOpen(false)}
        onAskHaven={() => {
          setDrawerOpen(false)
          onNavigate?.('haven')
        }}
      />
    </div>
  )
}
