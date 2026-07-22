'use client'

import { useMemo, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  BookmarkPlus,
  Building2,
  Check,
  Compass,
  Info,
  Layers,
  MapPin,
  Search,
  Sparkles,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { ProgressBar } from '@/components/career/progress'
import { SuggestionChip } from '@/components/career/haven'
import { SectionHeader } from '@/components/sections/section-header'
import { CompanyDetailDrawer } from '@/components/companies/company-detail-drawer'
import {
  companies,
  companyFilters,
  comparisonRows,
  pathCompanyMap,
  type Company,
  type CompanyFilterId,
} from '@/components/companies/companies-data'
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

/* ---------- Company card ---------- */

function CompanyCard({
  company,
  saved,
  onView,
  onToggleSave,
}: {
  company: Company
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
            {company.name.slice(0, 2).toUpperCase()}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">
              {company.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {company.sector}
            </span>
          </div>
        </div>
        <SignalBadge tone="primary">
          {company.openRoles} roles
        </SignalBadge>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" />
          {company.location}
        </span>
        <span className="font-mono font-medium text-foreground tabular-nums">
          {company.salaryBand}
        </span>
      </div>

      {/* Common paths */}
      <div className="flex flex-wrap gap-1.5">
        {company.commonPaths.map((p) => (
          <span
            key={p}
            className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[0.7rem] font-medium text-primary"
          >
            <Compass className="size-3" />
            {p}
          </span>
        ))}
      </div>

      {/* Candidate signal */}
      <p className="border-t border-border pt-3 text-xs leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Candidate signal: </span>
        {company.signal}
      </p>

      {/* Actions */}
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={onView}>
          View Company
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
              Save Company
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}

/* ---------- Risk / upside badges ---------- */

function riskTone(risk: string): 'success' | 'warning' | 'risk' {
  if (risk === 'Low') return 'success'
  if (risk === 'Moderate') return 'warning'
  return 'risk'
}

function upsideTone(upside: string): 'neutral' | 'primary' | 'success' {
  if (upside === 'Moderate') return 'neutral'
  if (upside === 'High') return 'primary'
  return 'success'
}

/* ---------- Main section ---------- */

export function CompaniesSection({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<CompanyFilterId>('all')
  const [savedCompanyIds, setSavedCompanyIds] = usePersistentState<string[]>(
    'career-os.saved-companies.v1',
    [],
  )
  const [viewingId, setViewingId] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState(false)
  const savedIds = useMemo(
    () => new Set(savedCompanyIds),
    [savedCompanyIds],
  )

  const viewing = useMemo(
    () => companies.find((c) => c.id === viewingId) ?? null,
    [viewingId],
  )

  const visibleCompanies = useMemo(() => {
    const q = query.trim().toLowerCase()
    return companies.filter((c) => {
      if (activeFilter !== 'all' && !c.tags.includes(activeFilter)) return false
      if (q) {
        const haystack =
          `${c.name} ${c.sector} ${c.location} ${c.commonPaths.join(' ')}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [query, activeFilter])

  const toggleSave = (id: string) => {
    setSavedCompanyIds((current) => {
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
          title="Company Directory"
          subtitle="Explore employers through career paths, role signals, salary bands, and what they tend to hire for."
        />
        <div className="flex gap-2.5 rounded-xl border border-border bg-surface px-4 py-3">
          <Info className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Companies in Career OS are not just employer profiles. They are
            connected to Compass paths, portfolio evidence, and real
            opportunity signals.
          </p>
        </div>
      </div>

      {/* Top summary */}
      <section aria-label="Directory summary" className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight">
            Your employer landscape
          </h2>
          <SignalBadge tone="neutral">
            <Users />
            Based on current Compass profile
          </SignalBadge>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard icon={Building2} value="12" label="featured employers" />
          <SummaryCard icon={Layers} value="34" label="sectors mapped" />
          <SummaryCard
            icon={Compass}
            value="27"
            label="roles linked to your paths"
          />
          <SummaryCard
            icon={Users}
            value="6"
            label="companies hiring similar profiles"
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
            placeholder="Search companies, sectors, or roles…"
            aria-label="Search companies, sectors, or roles"
            className="h-11 w-full rounded-xl border border-border bg-surface pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          />
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter companies"
        >
          {companyFilters.map((f) => (
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

      {/* Featured company grid */}
      <section aria-label="Featured companies" className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">
            Featured employers
          </h2>
          <span className="text-xs text-muted-foreground tabular-nums">
            {visibleCompanies.length} of {companies.length} companies shown
          </span>
        </div>
        {visibleCompanies.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleCompanies.map((c) => (
              <CompanyCard
                key={c.id}
                company={c}
                saved={savedIds.has(c.id)}
                onView={() => {
                  setViewingId(c.id)
                  setDrawerOpen(true)
                }}
                onToggleSave={() => toggleSave(c.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="items-center gap-2 p-10 text-center">
            <Building2 className="size-6 text-muted-foreground" />
            <p className="text-sm font-medium">
              No companies match this view yet
            </p>
            <p className="text-xs text-muted-foreground">
              Try a different filter or search term.
            </p>
          </Card>
        )}
      </section>

      {/* Path-to-company map */}
      <section
        aria-label="Path to company map"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight text-balance">
            Which companies fit each Compass path?
          </h2>
          <p className="text-sm text-muted-foreground">
            Each trajectory links to employers where similar profiles landed.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pathCompanyMap.map((p) => (
            <Card
              key={p.path}
              className="gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">{p.path}</span>
                <span className="rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[0.7rem] font-medium text-primary tabular-nums">
                  {p.companies.length} companies
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.companies.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border bg-surface px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Readiness</span>
                  <span className="font-mono text-foreground tabular-nums">
                    {p.readiness}%
                  </span>
                </div>
                <ProgressBar value={p.readiness} tone="primary" />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Top missing proof:{' '}
                </span>
                {p.topMissingProof}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Suggested next action:{' '}
                </span>
                {p.nextAction}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-auto w-fit"
                onClick={() => onNavigate?.('compass')}
              >
                Inspect path
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section
        aria-label="Company comparison"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">
            Compare employers at a glance
          </h2>
          <p className="text-sm text-muted-foreground">
            Signals are directional, based on similar profiles — not
            guarantees.
          </p>
        </div>
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-border bg-surface text-left">
                {[
                  'Company',
                  'Sector',
                  'Best linked path',
                  'Salary band',
                  'Risk',
                  'Upside',
                  'Proof gap',
                ].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="px-4 py-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.company}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-4 py-3 font-medium">{row.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.sector}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.bestPath}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs tabular-nums">
                    {row.salaryBand}
                  </td>
                  <td className="px-4 py-3">
                    <SignalBadge tone={riskTone(row.risk)}>
                      {row.risk}
                    </SignalBadge>
                  </td>
                  <td className="px-4 py-3">
                    <SignalBadge tone={upsideTone(row.upside)}>
                      {row.upside}
                    </SignalBadge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {row.proofGap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      {/* Haven insight */}
      <Card className="gap-4 border-primary/25 bg-primary/5 p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </span>
          <h2 className="text-sm font-semibold tracking-tight">
            Haven noticed a company pattern
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Banking and enterprise technology companies appear most often because
          your current evidence supports SQL, structured delivery, and systems
          thinking. Platform technology companies show higher upside but
          require stronger deployment proof.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            'Why CIMB?',
            'Which company is lowest risk?',
            'Which company gives highest upside?',
            'What proof do I need for Grab?',
            'Which company should I save?',
          ].map((q) => (
            <SuggestionChip key={q} onClick={() => onNavigate?.('haven')}>
              {q}
            </SuggestionChip>
          ))}
        </div>
        <Button className="w-fit" onClick={() => onNavigate?.('haven')}>
          Ask Haven
          <ArrowRight data-icon="inline-end" />
        </Button>
      </Card>

      {/* Company detail drawer */}
      <CompanyDetailDrawer
        open={drawerOpen}
        company={viewing}
        saved={viewing ? savedIds.has(viewing.id) : false}
        onClose={() => setDrawerOpen(false)}
        onToggleSave={() => {
          if (viewing) toggleSave(viewing.id)
        }}
        onViewRoles={() => {
          setDrawerOpen(false)
          onNavigate?.('discover')
        }}
        onCompare={() => {
          setDrawerOpen(false)
          onNavigate?.('compass')
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
            Company saved. Career OS will use this signal in Discover and
            Haven.
          </p>
        </div>
      </div>
    </div>
  )
}
