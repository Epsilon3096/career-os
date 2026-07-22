'use client'

import {
  ArrowRight,
  ArrowUp,
  Banknote,
  Building2,
  CircleAlert,
  CircleCheck,
  CircleDashed,
  Compass,
  FolderOpen,
  GraduationCap,
  Info,
  Landmark,
  Lightbulb,
  Radar,
  Sparkles,
  Timer,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { SdgBadge } from '@/components/career/sdg-badge'
import { ProgressBar } from '@/components/career/progress'
import { AskHavenButton, SuggestionChip } from '@/components/career/haven'
import { SectionHeader } from '@/components/sections/section-header'
import {
  atRiskStudents,
  curriculumSignals,
  faculties,
  topEmployers,
} from '@/components/ecosystem/university-data'
import type { SectionId } from '@/components/shell/nav-config'

const metrics = [
  {
    label: 'Employability within 6 months',
    value: '88.6%',
    caption: '2.4 pts year over year',
    trend: true,
    icon: GraduationCap,
  },
  {
    label: 'Median starting salary',
    value: 'RM 4,100',
    caption: '6% YoY',
    trend: true,
    icon: Banknote,
  },
  {
    label: 'Median time to first job',
    value: '3.1 mo',
    caption: '6.4 months faster than baseline',
    trend: false,
    icon: Timer,
  },
  {
    label: 'Students active this term',
    value: '1,240',
    caption: '18% engagement',
    trend: true,
    icon: Users,
  },
]

const outcomeCards = [
  {
    value: '912',
    label: 'On track',
    caption: 'Strong portfolio & applying',
    tone: 'success' as const,
    icon: CircleCheck,
  },
  {
    value: '214',
    label: 'Needs a nudge',
    caption: 'Low activity, 30 days',
    tone: 'warning' as const,
    icon: CircleDashed,
  },
  {
    value: '114',
    label: 'At risk',
    caption: 'No applications, graduating soon',
    tone: 'risk' as const,
    icon: CircleAlert,
  },
]

const havenChips = [
  'Why are students at risk?',
  'What curriculum gap matters most?',
  'Which employer is hiring our graduates?',
  'Which faculty needs support?',
]

const connectionCards = [
  {
    icon: Radar,
    title: 'Curriculum signal identifies market demand',
    body: 'Live role and skill signals show what employers actually screen for — before it shows up in outcome statistics.',
  },
  {
    icon: Compass,
    title: 'Compass turns demand into student routes',
    body: 'Market demand becomes navigable paths students can choose, compare, and act on — with reasons attached.',
  },
  {
    icon: FolderOpen,
    title: 'Portfolio converts coursework into employable evidence',
    body: 'Assignments become verified proof employers respond to — decision logs, deployments, and documented trade-offs.',
  },
]

const outcomeToneStyles = {
  success: {
    icon: 'bg-success-muted/60 text-success',
    value: 'text-success',
  },
  warning: {
    icon: 'bg-warning-muted/60 text-warning-foreground dark:text-warning',
    value: 'text-warning-foreground dark:text-warning',
  },
  risk: {
    icon: 'bg-risk-muted/50 text-risk',
    value: 'text-risk',
  },
}

export function UniversitySection({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <SignalBadge tone="neutral" className="w-fit">
          Ecosystem preview
        </SignalBadge>
        <SectionHeader
          title="University Dashboard"
          subtitle="Track graduate outcomes, detect readiness gaps, and align curriculum with live career signals."
        />
        <div className="flex gap-2.5 rounded-xl border border-border bg-surface p-4">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            This dashboard shows how Career OS helps institutions understand
            employability beyond graduation day.
          </p>
        </div>
      </div>

      {/* University header card */}
      <Card className="gap-5 p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Landmark className="size-6" />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Universiti Malaya
            </h2>
            <p className="text-sm text-muted-foreground">
              2025 graduate cohort
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                1,240 active students
              </span>
              <span aria-hidden>·</span>
              <span>Early-career employability</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <SignalBadge tone="primary">
            <TrendingUp />
            Outcome tracking
          </SignalBadge>
          <SignalBadge tone="warning">
            <CircleAlert />
            At-risk detection
          </SignalBadge>
          <SignalBadge tone="primary">
            <Lightbulb />
            Curriculum signals
          </SignalBadge>
          <SignalBadge tone="success">
            <Building2 />
            Employer demand mapping
          </SignalBadge>
        </div>
      </Card>

      {/* Outcome metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card
            key={m.label}
            className="gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{m.label}</span>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <m.icon className="size-4" />
              </span>
            </div>
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              {m.value}
            </span>
            <span
              className={
                m.trend
                  ? 'flex items-center gap-1 text-xs text-success'
                  : 'text-xs text-muted-foreground'
              }
            >
              {m.trend ? <ArrowUp className="size-3" /> : null}
              {m.caption}
            </span>
          </Card>
        ))}
      </div>

      <section
        aria-labelledby="education-impact-heading"
        className="flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="max-w-2xl">
          <h2 id="education-impact-heading" className="text-sm font-semibold">
            Education-to-work impact lens
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Cohort signals help institutions target learning support, improve the transition
            into decent work, and identify unequal outcomes before graduation.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SdgBadge goal={4} />
          <SdgBadge goal={8} />
          <SdgBadge goal={10} />
        </div>
      </section>

      {/* Employability by faculty */}
      <Card className="gap-5 p-6">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            Employability by faculty
          </span>
          <span className="text-xs text-muted-foreground">
            Share of graduates employed within 6 months — observed pattern for
            the 2025 cohort
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {faculties.map((f) => (
            <div key={f.name} className="flex items-center gap-4">
              <span className="w-40 shrink-0 truncate text-xs text-muted-foreground sm:w-44">
                {f.name}
              </span>
              <ProgressBar value={f.score} tone="primary" className="flex-1" />
              <span className="w-8 shrink-0 text-right font-mono text-xs font-medium tabular-nums">
                {f.score}
              </span>
              <span className="hidden w-20 shrink-0 text-right text-[0.7rem] text-muted-foreground tabular-nums sm:block">
                {f.grads}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Student outcomes */}
      <div className="grid gap-4 sm:grid-cols-3">
        {outcomeCards.map((c) => {
          const styles = outcomeToneStyles[c.tone]
          return (
            <Card key={c.label} className="gap-3 p-5">
              <span
                className={`flex size-9 items-center justify-center rounded-lg ${styles.icon}`}
              >
                <c.icon className="size-4.5" />
              </span>
              <span
                className={`text-3xl font-semibold tracking-tight tabular-nums ${styles.value}`}
              >
                {c.value}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">{c.label}</span>
                <span className="text-xs text-muted-foreground">
                  {c.caption}
                </span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* At-risk student table */}
      <Card className="gap-5 overflow-hidden p-0">
        <div className="flex flex-col gap-1 px-6 pt-6">
          <span className="text-sm font-semibold">
            Students flagged for support
          </span>
          <span className="text-xs text-muted-foreground">
            Risk signals are observed patterns — each carries a suggested
            intervention, not a verdict.
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th scope="col" className="px-6 py-3 font-medium">
                  Student
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Faculty
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Risk signal
                </th>
                <th scope="col" className="px-3 py-3 font-medium">
                  Missing evidence
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Suggested intervention
                </th>
              </tr>
            </thead>
            <tbody>
              {atRiskStudents.map((s) => (
                <tr
                  key={s.name}
                  className="border-b border-border/60 transition-colors last:border-0 hover:bg-surface"
                >
                  <td className="px-6 py-3.5 font-medium">{s.name}</td>
                  <td className="px-3 py-3.5 text-muted-foreground">
                    {s.faculty}
                  </td>
                  <td className="px-3 py-3.5">
                    <SignalBadge tone="warning" className="whitespace-normal">
                      {s.risk}
                    </SignalBadge>
                  </td>
                  <td className="px-3 py-3.5 text-muted-foreground">
                    {s.missing}
                  </td>
                  <td className="px-6 py-3.5 text-muted-foreground">
                    {s.intervention}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Top employers */}
      <section aria-labelledby="employers-heading" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 id="employers-heading" className="text-lg font-semibold">
            Top employers hiring graduates
          </h2>
          <p className="text-sm text-muted-foreground">
            Where the 2025 cohort landed — with the Compass path and skill
            signal behind each pattern.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topEmployers.map((e) => (
            <Card
              key={e.name}
              className="gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
                    {e.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">
                      {e.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {e.sector}
                    </span>
                  </div>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary tabular-nums">
                  {e.grads} grads
                </span>
              </div>
              <div className="flex flex-col gap-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="size-3.5 shrink-0 text-success" />
                  {e.trend}
                </span>
                <span className="flex items-center gap-1.5">
                  <Compass className="size-3.5 shrink-0 text-primary" />
                  Common path: {e.path}
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleCheck className="size-3.5 shrink-0 text-success" />
                  Top skill signal: {e.skill}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Curriculum signals */}
      <section aria-labelledby="curriculum-heading" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 id="curriculum-heading" className="text-lg font-semibold">
            Curriculum signals from live career data
          </h2>
          <p className="text-sm text-muted-foreground">
            Market demand observed across Compass paths and employer role
            signals — translated into curriculum suggestions.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {curriculumSignals.map((s) => (
            <Card key={s.title} className="gap-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-semibold leading-snug">
                  {s.title}
                </span>
                <SignalBadge tone={s.strengthTone} className="shrink-0">
                  {s.strength}
                </SignalBadge>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Market evidence:{' '}
                </span>
                {s.evidence}
              </p>
              <div className="flex gap-2.5 rounded-lg border border-primary/25 bg-primary/5 p-3">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed">
                  <span className="font-medium">Curriculum suggestion: </span>
                  {s.suggestion}
                </p>
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
          <h2 className="text-base font-semibold">Haven explains the cohort</h2>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Computer Science outcomes are strong, but backend-readiness gaps
          cluster around deployment proof and system design evidence. A small
          curriculum intervention could improve readiness across Backend
          Engineer, Data Engineer, and Systems Analyst routes.
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

      {/* Link back to candidate experience */}
      <section
        aria-labelledby="signal-action-heading"
        className="flex flex-col gap-5 border-t border-border pt-8"
      >
        <div className="flex flex-col gap-1">
          <h2 id="signal-action-heading" className="text-lg font-semibold">
            From university signal to student action
          </h2>
          <p className="text-sm text-muted-foreground">
            Institutional insight only matters if it reaches the student as a
            navigable next step.
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
        <Button className="w-fit" onClick={() => onNavigate?.('portfolio')}>
          Preview Student Portfolio
          <ArrowRight data-icon="inline-end" />
        </Button>
      </section>
    </div>
  )
}
