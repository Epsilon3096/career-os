'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  BookmarkPlus,
  Check,
  ChevronRight,
  CircleCheck,
  CircleDashed,
  MapPin,
  Sparkles,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAnimatedPresence } from '@/lib/use-animated-presence'
import { SignalBadge } from '@/components/career/signal-badge'
import { cn } from '@/lib/utils'
import type { BridgeJob, PathDetail } from '@/components/compass/compass-data'

type FitTone = 'success' | 'primary' | 'warning' | 'neutral'

function PanelSection({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-border px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
        {subtitle ? (
          <p className="text-xs leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function TimelineSteps({
  steps,
}: {
  steps: { period: string; title: string; description: string }[]
}) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, i) => (
        <li key={step.period} className="relative flex gap-3 pb-4 last:pb-0">
          {/* Rail */}
          {i < steps.length - 1 ? (
            <span
              aria-hidden
              className="absolute top-5 left-[9px] h-full w-px bg-border"
            />
          ) : null}
          <span className="relative z-10 mt-0.5 flex size-[19px] shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-[0.6rem] font-semibold text-primary tabular-nums">
            {i + 1}
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.7rem] font-medium tracking-wide text-primary uppercase">
              {step.period}
            </span>
            <span className="text-sm font-medium leading-snug">
              {step.title}
            </span>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function BridgeJobCard({ job }: { job: BridgeJob }) {
  const [saved, setSaved] = useState(false)
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-secondary-foreground">
            {job.company.slice(0, 2).toUpperCase()}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">
              {job.role}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              {job.company}
              <span aria-hidden>·</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="size-3" />
                {job.location}
              </span>
            </span>
          </div>
        </div>
        <span className="font-mono text-xs font-medium whitespace-nowrap tabular-nums">
          {job.salary}
        </span>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Why it matches: </span>
        {job.whyMatch}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {job.matched.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded-full border border-success/40 bg-success-muted/50 px-2 py-0.5 text-[0.7rem] font-medium text-success"
          >
            <Check className="size-2.5" />
            {s}
          </span>
        ))}
        {job.missing.map((s) => (
          <span
            key={s}
            className="rounded-full border border-warning/40 bg-warning-muted/50 px-2 py-0.5 text-[0.7rem] font-medium text-warning-foreground dark:text-warning"
          >
            Missing: {s}
          </span>
        ))}
      </div>

      <Button
        variant={saved ? 'secondary' : 'outline'}
        size="sm"
        className="w-fit"
        onClick={() => setSaved((s) => !s)}
      >
        {saved ? (
          <>
            <Check data-icon="inline-start" />
            Saved to Pipeline
          </>
        ) : (
          <>
            <BookmarkPlus data-icon="inline-start" />
            Save to Pipeline
          </>
        )}
      </Button>
    </div>
  )
}

export function PathDetailPanel({
  open,
  onClose,
  role,
  category,
  fit,
  fitTone,
  detail,
  onAskHaven,
}: {
  open: boolean
  onClose: () => void
  role: string
  category: string
  fit: string
  fitTone: FitTone
  detail: PathDetail
  onAskHaven?: () => void
}) {
  const { mounted, visible } = useAnimatedPresence(open)

  // Escape to close + body scroll lock
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!mounted) return null

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-foreground/40 backdrop-blur-[2px] transition-opacity duration-300',
          visible ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Panel: right slide-over on desktop, bottom sheet on mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!visible}
        inert={!visible}
        aria-label={`Path details for ${role}`}
        className={cn(
          'fixed z-50 flex flex-col bg-background shadow-2xl transition-transform duration-300 ease-out',
          // Mobile: bottom sheet
          'inset-x-0 bottom-0 max-h-[88dvh] rounded-t-2xl border-t border-border',
          visible ? 'translate-y-0' : 'translate-y-full',
          // Desktop: right panel
          'sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none sm:border-t-0 sm:border-l',
          visible ? 'sm:translate-x-0 sm:translate-y-0' : 'sm:translate-x-full sm:translate-y-0',
        )}
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 sm:px-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
              Path detail
            </span>
            <h2 className="text-lg font-semibold leading-tight tracking-tight">
              {role}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">{category}</span>
              <SignalBadge tone={fitTone}>{fit}</SignalBadge>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close path details"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <X className="size-4" />
          </button>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
          <PanelSection title="Why this path appears">
            <ul className="flex flex-col gap-2">
              {detail.whyPoints.map((p) => (
                <li
                  key={p}
                  className="flex gap-2 text-xs leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </PanelSection>

          <PanelSection
            title="What you already have"
            subtitle="Transferable strengths observed in your profile."
          >
            <ul className="flex flex-col gap-2">
              {detail.strengths.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm">
                  <CircleCheck className="size-4 shrink-0 text-success" />
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </PanelSection>

          <PanelSection
            title="Missing pieces"
            subtitle="Proof gaps between you and this route."
          >
            <ul className="flex flex-col gap-2">
              {detail.gaps.map((g) => (
                <li key={g} className="flex items-center gap-2 text-sm">
                  <CircleDashed className="size-4 shrink-0 text-warning" />
                  <span className="leading-snug">{g}</span>
                </li>
              ))}
            </ul>
          </PanelSection>

          <PanelSection
            title="90-day action plan"
            subtitle="A first sprint to close the highest-leverage gaps."
          >
            <TimelineSteps steps={detail.ninetyDayPlan} />
          </PanelSection>

          <PanelSection
            title="12-month route"
            subtitle="Milestones observed in similar successful transitions."
          >
            <TimelineSteps steps={detail.twelveMonthRoute} />
          </PanelSection>

          <PanelSection
            title="What this unlocks in 5 years"
            subtitle="A commonly observed progression — one of several possible."
          >
            <div className="flex flex-wrap items-center gap-1.5">
              {detail.fiveYearUnlock.map((step, i) => (
                <span key={step} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'rounded-full border px-2.5 py-1 text-xs font-medium',
                      i === 0
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-border bg-surface text-muted-foreground',
                    )}
                  >
                    {step}
                  </span>
                  {i < detail.fiveYearUnlock.length - 1 ? (
                    <ChevronRight
                      aria-hidden
                      className="size-3.5 text-muted-foreground"
                    />
                  ) : null}
                </span>
              ))}
            </div>
          </PanelSection>

          {/* Marketplace bridge — visually distinct */}
          <section className="mx-5 mt-5 flex flex-col gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4 sm:mx-6">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-semibold tracking-tight">
                Marketplace bridge
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Live-style matches for this route. Fit is based on evidence,
                not just keywords.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {detail.jobs.map((job) => (
                <BridgeJobCard key={`${job.role}-${job.company}`} job={job} />
              ))}
            </div>
          </section>

          {/* Ask Haven */}
          <div className="px-5 pt-5 sm:px-6">
            <button
              onClick={onAskHaven}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <Sparkles className="size-4" />
              Ask Haven to explain this route
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
