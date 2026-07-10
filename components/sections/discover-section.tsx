'use client'

import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BookmarkPlus,
  Briefcase,
  Building2,
  Check,
  CircleAlert,
  Compass,
  Info,
  MapPin,
  Search,
  Sparkles,
  Unlock,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { ProgressBar } from '@/components/career/progress'
import { SuggestionChip } from '@/components/career/haven'
import { SectionHeader } from '@/components/sections/section-header'
import { RoleDetailDrawer } from '@/components/discover/role-detail-drawer'
import {
  bridgeCards,
  discoverRoles,
  filters,
  type DiscoverRole,
  type FilterId,
} from '@/components/discover/discover-data'
import { cn } from '@/lib/utils'
import { usePersistentState } from '@/lib/use-persistent-state'
import type { SectionId } from '@/components/shell/nav-config'

/* ---------- Summary metric card ---------- */

function SummaryCard({
  icon: Icon,
  value,
  label,
}: {
  icon: LucideIcon
  value: string
  label: string
}) {
  return (
    <Card className="gap-2 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold tracking-tight tabular-nums">
          {value}
        </span>
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <span className="text-xs leading-relaxed text-muted-foreground">
        {label}
      </span>
    </Card>
  )
}

/* ---------- Role card ---------- */

function RoleCard({
  role,
  saved,
  onView,
  onToggleSave,
}: {
  role: DiscoverRole
  saved: boolean
  onView: () => void
  onToggleSave: () => void
}) {
  return (
    <Card className="gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
            {role.company.slice(0, 2).toUpperCase()}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight text-balance">
              {role.role}
            </span>
            <span className="text-xs text-muted-foreground">
              {role.company}
            </span>
          </div>
        </div>
        <SignalBadge tone={role.fitTone}>{role.fit}</SignalBadge>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" />
          {role.location}
        </span>
        <span className="font-mono font-medium text-foreground tabular-nums">
          {role.salary}
        </span>
      </div>

      {/* Path + skills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[0.7rem] font-medium text-primary">
          <Compass className="size-3" />
          {role.linkedPath} path
        </span>
        <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground tabular-nums">
          {role.matched} of {role.totalSkills} skills matched
        </span>
      </div>

      {/* Missing */}
      <div className="flex flex-wrap gap-1.5">
        {role.missing.map((m) => (
          <span
            key={m}
            className="rounded-full border border-warning/40 bg-warning-muted/50 px-2 py-0.5 text-[0.7rem] font-medium text-warning-foreground dark:text-warning"
          >
            Missing: {m}
          </span>
        ))}
      </div>

      {/* Why this appears */}
      <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Why this appears: </span>
        {role.why}
      </p>

      {/* Actions */}
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={onView}>
          View Role
          <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          variant={saved ? 'secondary' : 'outline'}
          size="sm"
          onClick={onToggleSave}
        >
          {saved ? (
            <>
              <Check data-icon="inline-start" />
              Saved
            </>
          ) : (
            <>
              <BookmarkPlus data-icon="inline-start" />
              Save to Pipeline
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}

/* ---------- Main section ---------- */

export function DiscoverSection({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterId>('all')
  const [savedRoleIds, setSavedRoleIds] = usePersistentState<string[]>(
    'career-os.saved-roles.v1',
    [],
  )
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const savedIds = useMemo(() => new Set(savedRoleIds), [savedRoleIds])

  const viewing = useMemo(
    () => discoverRoles.find((r) => r.id === viewingId) ?? null,
    [viewingId],
  )

  const visibleRoles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return discoverRoles.filter((r) => {
      if (activeFilter === 'saved' && !savedIds.has(r.id)) return false
      if (
        activeFilter !== 'all' &&
        activeFilter !== 'saved' &&
        !r.tags.includes(activeFilter)
      )
        return false
      if (q) {
        const haystack =
          `${r.role} ${r.company} ${r.linkedPath} ${r.haveSkills.join(' ')} ${r.missing.join(' ')}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [query, activeFilter, savedIds])

  const toggleSave = (id: string) => {
    setSavedRoleIds((current) => {
      if (current.includes(id)) {
        return current.filter((savedId) => savedId !== id)
      } else {
        setToast(true)
        window.setTimeout(() => setToast(false), 3500)
        return [...current, id]
      }
    })
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <SectionHeader
          title="Discover"
          subtitle="Roles matched to your Compass paths, portfolio proof, and current market signals."
        />
        <div className="flex gap-2.5 rounded-xl border border-border bg-surface px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Discover is not a generic job board. Each role is connected to a
            trajectory, missing proof gap, or saved career goal.
          </p>
        </div>
      </div>

      {/* Top summary */}
      <section aria-label="Marketplace summary" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight">
            Your marketplace snapshot
          </h2>
          <SignalBadge tone="neutral">
            <Users />
            Based on similar profiles
          </SignalBadge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={Unlock}
            value="27"
            label="roles unlocked by your current skills and work samples"
          />
          <SummaryCard
            icon={Compass}
            value="12"
            label="roles linked to Backend Engineer path"
          />
          <SummaryCard
            icon={Building2}
            value="6"
            label="companies hiring similar profiles"
          />
          <SummaryCard
            icon={CircleAlert}
            value="2"
            label="proof gaps limiting stronger matches"
          />
        </div>
      </section>

      {/* Search + filters */}
      <section aria-label="Search and filters" className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles, companies, or skills…"
            aria-label="Search roles, companies, or skills"
            className="h-11 w-full rounded-xl border border-border bg-surface pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter roles">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              aria-pressed={activeFilter === f.id}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                activeFilter === f.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Recommended roles */}
      <section aria-label="Recommended roles" className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Recommended roles
          </h2>
          <span className="text-xs text-muted-foreground tabular-nums">
            {visibleRoles.length} of {discoverRoles.length} roles shown
          </span>
        </div>
        {visibleRoles.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleRoles.map((r) => (
              <RoleCard
                key={r.id}
                role={r}
                saved={savedIds.has(r.id)}
                onView={() => {
                  setViewingId(r.id)
                  setDrawerOpen(true)
                }}
                onToggleSave={() => toggleSave(r.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="items-center gap-2 p-10 text-center">
            <Briefcase className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">No roles match this view yet</p>
            <p className="text-xs text-muted-foreground">
              {activeFilter === 'saved'
                ? 'Save a role to your pipeline and it will appear here.'
                : 'Try a different filter or search term.'}
            </p>
          </Card>
        )}
      </section>

      {/* Path-to-role bridge */}
      <section aria-label="Path to role bridge" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight text-balance">
            From Compass path to real opportunities
          </h2>
          <p className="text-sm text-muted-foreground">
            Each trajectory you explored in Compass links to live-style roles
            here.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {bridgeCards.map((b) => (
            <Card
              key={b.path}
              className="gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{b.path} path</span>
                <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[0.7rem] font-medium text-primary tabular-nums">
                  {b.rolesAvailable} roles available
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Readiness</span>
                  <span className="font-mono text-foreground tabular-nums">
                    {b.readiness}%
                  </span>
                </div>
                <ProgressBar value={b.readiness} tone="primary" />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Top missing proof:{' '}
                </span>
                {b.topMissingProof}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-auto w-fit"
                onClick={() => onNavigate?.('compass')}
              >
                Compare in Compass
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Haven insight */}
      <Card className="gap-4 border-primary/25 bg-primary/5 p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </span>
          <h2 className="text-sm font-semibold tracking-tight">
            Haven noticed a pattern
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Backend roles appear most often because your current skills and work samples already
          supports SQL, scripting, and structured project delivery. Docker
          proof is the highest-impact gap this week.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'Why Backend roles?',
            'What role is lowest risk?',
            'Which job should I save?',
            'What proof should I add?',
          ].map((q) => (
            <SuggestionChip key={q} onClick={() => onNavigate?.('haven')}>
              {q}
            </SuggestionChip>
          ))}
        </div>
      </Card>

      {/* Role detail drawer */}
      <RoleDetailDrawer
        open={drawerOpen}
        role={viewing}
        saved={viewing ? savedIds.has(viewing.id) : false}
        onClose={() => setDrawerOpen(false)}
        onToggleSave={() => {
          if (viewing) toggleSave(viewing.id)
        }}
        onAskHaven={() => {
          setDrawerOpen(false)
          onNavigate?.('haven')
        }}
      />

      {/* Save toast */}
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
          <p className="text-xs leading-relaxed">
            Saved to pipeline. Haven will use this role to personalize your
            next actions.
          </p>
        </div>
      </div>
    </div>
  )
}
