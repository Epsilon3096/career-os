'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  CircleAlert,
  Clock,
  Compass,
  FileCheck,
  Info,
  Layers,
  Plus,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { CircularProgress, ProgressBar } from '@/components/career/progress'
import { AskHavenButton, SuggestionChip } from '@/components/career/haven'
import { SectionHeader } from '@/components/sections/section-header'
import {
  compassPathOptions,
  evidenceItems,
  evidenceTypes,
  proofGaps,
  readinessMatrix,
  roleTailors,
  type EvidenceItem,
} from '@/components/portfolio/portfolio-data'
import { cn } from '@/lib/utils'
import { usePersistentState } from '@/lib/use-persistent-state'
import type { SectionId } from '@/components/shell/nav-config'

/* ---------- Evidence timeline card ---------- */

function EvidenceCard({
  item,
}: {
  item: EvidenceItem
}) {
  const inProgress = item.status === 'in-progress'
  const selfReported = item.status === 'self-reported'
  return (
    <Card
      className={cn(
        'gap-3.5 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        inProgress
          ? 'border-dashed border-warning/50 hover:border-warning/70'
          : 'hover:border-primary/40',
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <SignalBadge tone={inProgress ? 'warning' : 'neutral'}>
          {item.type}
        </SignalBadge>
        {inProgress ? (
          <SignalBadge tone="warning">
            <Clock />
            In progress
          </SignalBadge>
        ) : selfReported ? (
          <SignalBadge tone="primary">
            <FileCheck />
            Self-reported
          </SignalBadge>
        ) : (
          <SignalBadge tone="success">
            <Check />
            Verified source
          </SignalBadge>
        )}
        <span className="ml-auto text-xs text-muted-foreground">
          {item.date}
        </span>
      </div>

      <h3 className="text-sm font-semibold leading-tight text-balance">
        {item.title}
      </h3>

      <div className="flex flex-col gap-1.5">
        <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
          Skills demonstrated
        </span>
        <div className="flex flex-wrap gap-1.5">
          {item.evidence.map((e) => (
            <span
              key={e}
              className={cn(
                'rounded-full border px-2 py-0.5 text-[0.7rem] font-medium',
                inProgress
                  ? 'border-warning/40 bg-warning-muted/50 text-warning-foreground dark:text-warning'
                  : selfReported
                    ? 'border-primary/30 bg-primary/5 text-primary'
                    : 'border-success/30 bg-success-muted/50 text-success',
              )}
            >
              {e}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
          Linked paths
        </span>
        <div className="flex flex-wrap gap-1.5">
          {item.linkedPaths.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[0.7rem] font-medium text-primary"
            >
              <Compass className="size-3" />
              {p}
            </span>
          ))}
        </div>
      </div>

      <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Why this matters: </span>
        {item.whyItMatters}
      </p>
    </Card>
  )
}

/* ---------- Proof gap card ---------- */

function ProofGapCard({
  gap,
  onAddToPlan,
  onAskHaven,
  added,
}: {
  gap: (typeof proofGaps)[number]
  onAddToPlan: () => void
  onAskHaven: () => void
  added: boolean
}) {
  return (
    <Card className="gap-3.5 border-warning/35 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-warning/60 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning-muted/60 text-warning-foreground dark:text-warning">
          <CircleAlert className="size-4.5" />
        </span>
        <SignalBadge tone={gap.impactTone}>{gap.impact}</SignalBadge>
      </div>

      <h3 className="text-sm font-semibold leading-tight text-balance">
        {gap.title}
      </h3>

      <div className="flex flex-wrap gap-1.5">
        {gap.affects.map((a) => (
          <span
            key={a}
            className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[0.7rem] font-medium text-primary"
          >
            <Compass className="size-3" />
            {a}
          </span>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        {gap.explanation}
      </p>

      <p className="rounded-lg border border-border bg-surface px-3 py-2.5 text-xs leading-relaxed">
        <span className="font-medium">Recommended action: </span>
        <span className="text-muted-foreground">{gap.action}</span>
      </p>

      <div className="mt-auto flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={added ? 'secondary' : 'default'}
          onClick={onAddToPlan}
        >
          {added ? (
            <>
              <Check data-icon="inline-start" />
              Added to Plan
            </>
          ) : (
            <>
              <Plus data-icon="inline-start" />
              Add to Plan
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={onAskHaven}>
          <Sparkles data-icon="inline-start" />
          Ask Haven
        </Button>
      </div>
    </Card>
  )
}

/* ---------- Readiness matrix row ---------- */

function MatrixRow({ row }: { row: (typeof readinessMatrix)[number] }) {
  const indicators = [
    { label: 'Skills', value: row.skills },
    { label: 'Proof', value: row.evidence },
    { label: 'Market fit', value: row.marketFit },
    { label: 'Interview readiness', value: row.interview },
  ]
  return (
    <Card className="gap-4 p-5 transition-all duration-200 hover:border-primary/40">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm font-semibold">{row.role}</span>
        <span className="font-mono text-sm font-medium text-primary tabular-nums">
          {row.readiness}% ready
        </span>
        <SignalBadge tone={row.gaps <= 1 ? 'success' : 'warning'}>
          {row.gaps} {row.gaps === 1 ? 'gap' : 'gaps'}
        </SignalBadge>
      </div>
      <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {indicators.map((ind) => (
          <div key={ind.label} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{ind.label}</span>
              <span className="font-mono text-foreground tabular-nums">
                {ind.value}%
              </span>
            </div>
            <ProgressBar
              value={ind.value}
              tone={ind.value >= 70 ? 'success' : ind.value >= 60 ? 'primary' : 'warning'}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ---------- Main section ---------- */

export function PortfolioSection({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  const [selectedRole, setSelectedRole] = useState('Backend Engineer')
  const [planIdList, setPlanIdList] = usePersistentState<string[]>(
    'career-os.portfolio-plan.v1',
    [],
  )
  const [localProofs, setLocalProofs] = usePersistentState<EvidenceItem[]>(
    'career-os.portfolio-proofs.v1',
    [],
  )
  const [toast, setToast] = useState<string | null>(null)

  // Add-evidence form state
  const [evTitle, setEvTitle] = useState('')
  const [evType, setEvType] = useState(evidenceTypes[0])
  const [evPath, setEvPath] = useState(compassPathOptions[0])
  const [evTags, setEvTags] = useState('')

  const planIds = useMemo(() => new Set(planIdList), [planIdList])
  const timelineItems = useMemo(
    () => [...localProofs, ...evidenceItems],
    [localProofs],
  )

  const tailor = useMemo(
    () => roleTailors.find((t) => t.role === selectedRole) ?? roleTailors[0],
    [selectedRole],
  )

  const showToast = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 3500)
  }

  const addToPlan = (id: string) => {
    setPlanIdList((current) => {
      if (!current.includes(id)) {
        showToast('Added to your plan. Haven will factor this into your next actions.')
        return [...current, id]
      }
      return current
    })
  }

  const handleAddEvidence = () => {
    if (!evTitle.trim()) {
      showToast('Give this career proof a title first.')
      return
    }
    const skills = evTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
    const newProof: EvidenceItem = {
      id: `local-${Date.now()}`,
      title: evTitle.trim(),
      type: evType,
      date: 'Added today',
      status: 'self-reported',
      evidence: skills.length ? skills : [evType],
      linkedPaths: [evPath],
      whyItMatters: `Adds a concrete work sample for your ${evPath} path. Add a link or reviewer later when real portfolio services are connected.`,
    }
    setLocalProofs((current) => [newProof, ...current])
    setEvTitle('')
    setEvTags('')
    showToast('Career proof added. Your demo portfolio has been updated.')
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <SectionHeader
          title="Portfolio"
          subtitle="Turn projects, experience, and learning into proof of skills that supports your Compass paths."
        />
        <div className="flex gap-2.5 rounded-xl border border-border bg-surface px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Career OS does not treat your portfolio as a static CV. It reads
            your work samples and outcomes against the roles you are trying to reach.
          </p>
        </div>
      </div>

      {/* Overview */}
      <section aria-label="Portfolio overview" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="items-center gap-3 p-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
          <span className="text-xs font-medium text-muted-foreground">
            Portfolio Score
          </span>
          <CircularProgress value={78} label="Strong" />
          <span className="text-xs leading-relaxed text-muted-foreground">
            Top 12% of CS candidate profiles
          </span>
        </Card>

        <Card className="gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Backend Readiness
            </span>
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Compass className="size-4" />
            </span>
          </div>
          <span className="text-3xl font-semibold tracking-tight tabular-nums">
            72%
          </span>
          <ProgressBar value={72} tone="primary" />
          <span className="text-xs leading-relaxed text-muted-foreground">
            2 proof gaps left
          </span>
        </Card>

        <Card className="gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Career proof items
            </span>
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Layers className="size-4" />
            </span>
          </div>
          <span className="text-3xl font-semibold tracking-tight tabular-nums">
            {14 + localProofs.length}
          </span>
          <span className="text-xs leading-relaxed text-muted-foreground">
            Projects, certifications, internships, and activities
          </span>
        </Card>

        <Card className="gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Career Momentum
            </span>
            <span className="flex size-8 items-center justify-center rounded-lg bg-success-muted/60 text-success">
              <TrendingUp className="size-4" />
            </span>
          </div>
          <span className="text-3xl font-semibold tracking-tight text-success tabular-nums">
            +14%
          </span>
          <span className="text-xs leading-relaxed text-muted-foreground">
            Rising over 60 days
          </span>
        </Card>
      </section>

      {/* Career proof timeline */}
      <section aria-label="Career proof timeline" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Career proof timeline
          </h2>
          <p className="text-sm text-muted-foreground">
            Projects, credentials, and outcomes become clear work samples linked
            to your Compass paths.
          </p>
        </div>
        <div className="relative flex flex-col gap-4 lg:pl-6">
          <div
            aria-hidden="true"
            className="absolute top-3 bottom-3 left-1.5 hidden w-px bg-border lg:block"
          />
          {timelineItems.map((item) => (
            <div key={item.id} className="relative">
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-6 -left-6 hidden size-3 -translate-x-[3.5px] rounded-full border-2 lg:block',
                  item.status === 'in-progress'
                    ? 'border-warning bg-warning-muted'
                    : 'border-primary bg-primary',
                )}
              />
              <EvidenceCard item={item} />
            </div>
          ))}
        </div>
      </section>

      {/* Proof gaps */}
      <section aria-label="Proof gaps" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight text-balance">
            Proof gaps limiting stronger matches
          </h2>
          <p className="text-sm text-muted-foreground">
            Closing these gaps changes which roles read your profile as ready.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {proofGaps.map((gap) => (
            <ProofGapCard
              key={gap.id}
              gap={gap}
              added={planIds.has(gap.id)}
              onAddToPlan={() => addToPlan(gap.id)}
              onAskHaven={() => onNavigate?.('haven')}
            />
          ))}
        </div>
      </section>

      {/* Role readiness matrix */}
      <section aria-label="Role readiness matrix" className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold tracking-tight">
              Role readiness matrix
            </h2>
            <p className="text-sm text-muted-foreground">
              How your work samples read across the Compass paths you are exploring.
            </p>
          </div>
          <SignalBadge tone="neutral" className="hidden sm:inline-flex">
            Based on similar profiles
          </SignalBadge>
        </div>
        <div className="flex flex-col gap-3">
          {readinessMatrix.map((row) => (
            <MatrixRow key={row.role} row={row} />
          ))}
        </div>
      </section>

      {/* Tailor portfolio to role */}
      <section aria-label="Tailor portfolio to role" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Tailor your portfolio to a role
          </h2>
          <p className="text-sm text-muted-foreground">
            Select a Compass path to see which proof to lead with.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Select role to tailor">
          {roleTailors.map((t) => (
            <button
              key={t.role}
              onClick={() => setSelectedRole(t.role)}
              aria-pressed={selectedRole === t.role}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                selectedRole === t.role
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {t.role}
            </button>
          ))}
        </div>

        <Card className="gap-5 p-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
              Recommended portfolio headline
            </span>
            <p className="text-base font-semibold leading-snug text-balance">
              &ldquo;{tailor.headline}&rdquo;
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-success">
                <FileCheck className="size-3.5" />
                Work samples to highlight
              </span>
              <ul className="flex flex-col gap-1.5">
                {tailor.highlight.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 rounded-lg border border-success/25 bg-success-muted/40 px-3 py-2 text-xs leading-relaxed"
                  >
                    <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-warning-foreground dark:text-warning">
                <CircleAlert className="size-3.5" />
                Proof to strengthen
              </span>
              <ul className="flex flex-col gap-1.5">
                {tailor.improve.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning-muted/40 px-3 py-2 text-xs leading-relaxed"
                  >
                    <Clock className="mt-0.5 size-3.5 shrink-0 text-warning-foreground dark:text-warning" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
              Suggested resume bullets
            </span>
            <ul className="flex flex-col gap-2">
              {tailor.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  &ldquo;{b}&rdquo;
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>

      {/* Add career proof */}
      <section aria-label="Add career proof" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Add career proof
          </h2>
          <p className="text-sm text-muted-foreground">
            New proof updates your readiness across every linked path.
          </p>
        </div>
        <Card className="gap-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ev-title"
                className="text-xs font-medium text-muted-foreground"
              >
                Title
              </label>
              <input
                id="ev-title"
                type="text"
                value={evTitle}
                onChange={(e) => setEvTitle(e.target.value)}
                placeholder="e.g. Dockerized inventory API"
                className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ev-type"
                className="text-xs font-medium text-muted-foreground"
              >
                Proof type
              </label>
              <select
                id="ev-type"
                value={evType}
                onChange={(e) => setEvType(e.target.value)}
                className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {evidenceTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ev-path"
                className="text-xs font-medium text-muted-foreground"
              >
                Linked Compass path
              </label>
              <select
                id="ev-path"
                value={evPath}
                onChange={(e) => setEvPath(e.target.value)}
                className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                {compassPathOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="ev-tags"
                className="text-xs font-medium text-muted-foreground"
              >
                Skill tags
              </label>
              <input
                id="ev-tags"
                type="text"
                value={evTags}
                onChange={(e) => setEvTags(e.target.value)}
                placeholder="e.g. Docker, REST API, CI"
                className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
            <p className="text-xs text-muted-foreground">
              Demo only — saved on this device until a real account database is connected.
            </p>
            <Button onClick={handleAddEvidence}>
              <Plus data-icon="inline-start" />
              Add career proof
            </Button>
          </div>
        </Card>
      </section>

      {/* Haven insight */}
      <Card className="gap-4 border-primary/25 bg-primary/5 p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </span>
          <h2 className="text-sm font-semibold tracking-tight">
            Haven&apos;s portfolio read
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Your strongest work samples support structured project delivery and
          analytical problem solving. The highest-impact next move is to add
          deployment proof because it improves Backend Engineer and API
          Platform readiness at the same time.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'What proof should I add next?',
            'Why is Docker high impact?',
            'How do I improve backend readiness?',
            'Which work samples should I show CIMB?',
          ].map((q) => (
            <SuggestionChip key={q} onClick={() => onNavigate?.('haven')}>
              {q}
            </SuggestionChip>
          ))}
        </div>
        <AskHavenButton className="w-fit" onClick={() => onNavigate?.('haven')} />
      </Card>

      {/* Navigation CTAs */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="gap-3 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Compass className="size-4.5" />
          </span>
          <h3 className="text-sm font-semibold">Use this proof in Compass</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            See how your proof gaps change your realistic paths.
          </p>
          <Button
            className="mt-auto w-fit"
            onClick={() => onNavigate?.('compass')}
          >
            Open Compass
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Card>
        <Card className="gap-3 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Search className="size-4.5" />
          </span>
          <h3 className="text-sm font-semibold">
            Find roles that match this proof
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Discover roles where your current portfolio already creates a
            strong signal.
          </p>
          <Button
            variant="outline"
            className="mt-auto w-fit"
            onClick={() => onNavigate?.('discover')}
          >
            Open Discover
            <ArrowRight data-icon="inline-end" />
          </Button>
        </Card>
      </div>

      {/* Toast */}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 transition-all duration-300',
          toast
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0',
        )}
      >
        <div className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-elevated px-4 py-3 shadow-lg">
          <Check className="mt-0.5 size-4 shrink-0 text-success" />
          <p className="text-xs leading-relaxed">{toast}</p>
        </div>
      </div>
    </div>
  )
}
