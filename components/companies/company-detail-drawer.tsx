'use client'

import { useEffect } from 'react'
import {
  ArrowRight,
  BookmarkPlus,
  Briefcase,
  Check,
  CircleCheck,
  CircleDashed,
  Compass,
  MapPin,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAnimatedPresence } from '@/lib/use-animated-presence'
import type { Company } from '@/components/companies/companies-data'

function DrawerSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-border px-5 py-5 sm:px-6">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      {children}
    </section>
  )
}

export function CompanyDetailDrawer({
  open,
  company,
  saved,
  onClose,
  onToggleSave,
  onViewRoles,
  onCompare,
  onAskHaven,
}: {
  open: boolean
  company: Company | null
  saved: boolean
  onClose: () => void
  onToggleSave: () => void
  onViewRoles?: () => void
  onCompare?: () => void
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

      {/* Drawer: right slide-over on desktop, bottom sheet on mobile */}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!visible}
        inert={!visible}
        aria-label={
          company ? `Company details for ${company.name}` : 'Company details'
        }
        className={cn(
          'fixed z-50 flex flex-col bg-background shadow-2xl transition-transform duration-300 ease-out',
          'inset-x-0 bottom-0 max-h-[88dvh] rounded-t-2xl border-t border-border',
          visible ? 'translate-y-0' : 'translate-y-full',
          'sm:inset-y-0 sm:right-0 sm:left-auto sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none sm:border-t-0 sm:border-l',
          visible
            ? 'sm:translate-x-0 sm:translate-y-0'
            : 'sm:translate-x-full sm:translate-y-0',
        )}
      >
        {company ? (
          <>
            {/* Header */}
            <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 sm:px-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
                  Company detail
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
                    {company.name.slice(0, 2).toUpperCase()}
                  </span>
                  <h2 className="text-lg font-semibold leading-tight tracking-tight">
                    {company.name}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {company.sector}
                  </span>
                  <span aria-hidden>·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="size-3" />
                    {company.location}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 font-medium text-primary tabular-nums">
                    {company.openRoles} open roles
                  </span>
                  <span className="font-mono font-medium text-foreground tabular-nums">
                    {company.salaryBand}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close company details"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <X className="size-4" />
              </button>
            </header>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
              <DrawerSection title="Why this company appears">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {company.why}
                </p>
              </DrawerSection>

              <DrawerSection title="Common Compass paths into this company">
                <div className="flex flex-wrap gap-2">
                  {company.commonPaths.map((p) => (
                    <span
                      key={p}
                      className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary"
                    >
                      <Compass className="size-3" />
                      {p}
                    </span>
                  ))}
                </div>
              </DrawerSection>

              <DrawerSection title="Skills this company tends to reward">
                <ul className="flex flex-col gap-2">
                  {company.skillsRewarded.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <CircleCheck className="size-4 shrink-0 text-success" />
                      <span className="leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
              </DrawerSection>

              <DrawerSection title="Proof gaps limiting stronger fit">
                <ul className="flex flex-col gap-2">
                  {company.proofGaps.map((g) => (
                    <li key={g} className="flex items-center gap-2 text-sm">
                      <CircleDashed className="size-4 shrink-0 text-warning" />
                      <span className="leading-snug">{g}</span>
                    </li>
                  ))}
                </ul>
              </DrawerSection>

              <DrawerSection title="Example open roles">
                <ul className="flex flex-col gap-2">
                  {company.exampleRoles.map((r) => (
                    <li
                      key={r.title}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2.5"
                    >
                      <span className="flex items-center gap-2 text-sm">
                        <Briefcase className="size-3.5 shrink-0 text-muted-foreground" />
                        {r.title}
                      </span>
                      <span className="font-mono text-xs font-medium tabular-nums">
                        {r.salary}
                      </span>
                    </li>
                  ))}
                </ul>
              </DrawerSection>

              <DrawerSection title="Peer signal">
                <div className="flex gap-2.5 rounded-xl border border-border bg-surface p-4">
                  <Users className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {company.peerSignal}
                  </p>
                </div>
              </DrawerSection>

              {/* Actions */}
              <div className="flex flex-col gap-2.5 px-5 pt-5 sm:px-6">
                <Button
                  variant={saved ? 'secondary' : 'default'}
                  onClick={onToggleSave}
                  className="w-full"
                >
                  {saved ? (
                    <>
                      <Check data-icon="inline-start" />
                      Saved
                    </>
                  ) : (
                    <>
                      <BookmarkPlus data-icon="inline-start" />
                      Save Company
                    </>
                  )}
                </Button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button variant="outline" onClick={onViewRoles}>
                    View matching roles
                  </Button>
                  <Button variant="outline" onClick={onCompare}>
                    Compare in Compass
                  </Button>
                </div>
                <button
                  onClick={onAskHaven}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <Sparkles className="size-4" />
                  Ask Haven about this company
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}
