'use client'

import { useEffect } from 'react'
import {
  ArrowRight,
  BookmarkPlus,
  Check,
  CircleCheck,
  CircleDashed,
  Compass,
  Lightbulb,
  MapPin,
  Sparkles,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignalBadge } from '@/components/career/signal-badge'
import { cn } from '@/lib/utils'
import { useAnimatedPresence } from '@/lib/use-animated-presence'
import type { DiscoverRole } from '@/components/discover/discover-data'

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

export function RoleDetailDrawer({
  open,
  role,
  saved,
  onClose,
  onToggleSave,
  onAskHaven,
}: {
  open: boolean
  role: DiscoverRole | null
  saved: boolean
  onClose: () => void
  onToggleSave: () => void
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
        aria-label={role ? `Role details for ${role.role}` : 'Role details'}
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
        {role ? (
          <>
            {/* Header */}
            <header className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 sm:px-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">
                  Role detail
                </span>
                <h2 className="text-lg font-semibold leading-tight tracking-tight">
                  {role.role}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {role.company}
                  </span>
                  <span aria-hidden>·</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="size-3" />
                    {role.location}
                  </span>
                  <span aria-hidden>·</span>
                  <span className="font-mono tabular-nums">{role.salary}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <SignalBadge tone={role.fitTone}>{role.fit}</SignalBadge>
                  <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[0.7rem] font-medium text-primary">
                    <Compass className="size-3" />
                    {role.linkedPath} path
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close role details"
                className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <X className="size-4" />
              </button>
            </header>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain pb-6">
              <DrawerSection title="Why this role appears">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {role.why}
                </p>
                <p className="text-xs text-muted-foreground">
                  Linked to your {role.linkedPath} Compass path · based on
                  current evidence and similar profiles.
                </p>
              </DrawerSection>

              <DrawerSection title="Skills you already have">
                <ul className="flex flex-col gap-2">
                  {role.haveSkills.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <CircleCheck className="size-4 shrink-0 text-success" />
                      <span className="leading-snug">{s}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground">
                  {role.matched} of {role.totalSkills} required skills matched
                  by portfolio evidence.
                </p>
              </DrawerSection>

              <DrawerSection title="Missing proof gaps">
                <ul className="flex flex-col gap-2">
                  {role.missing.map((g) => (
                    <li key={g} className="flex items-center gap-2 text-sm">
                      <CircleDashed className="size-4 shrink-0 text-warning" />
                      <span className="leading-snug">{g}</span>
                    </li>
                  ))}
                </ul>
              </DrawerSection>

              <DrawerSection title="Suggested next action">
                <div className="flex gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Lightbulb className="size-4" />
                  </span>
                  <p className="text-sm leading-relaxed">{role.nextAction}</p>
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
                      Saved to Pipeline
                    </>
                  ) : (
                    <>
                      <BookmarkPlus data-icon="inline-start" />
                      Save to Pipeline
                    </>
                  )}
                </Button>
                <button
                  onClick={onAskHaven}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/5 px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <Sparkles className="size-4" />
                  Ask Haven why this role matches
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
