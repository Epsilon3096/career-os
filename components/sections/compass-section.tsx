'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  ClipboardList,
  Clock,
  MapPin,
  Route,
  SlidersHorizontal,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { JourneyBar, ProgressBar } from '@/components/career/progress'
import { AskHavenButton, SuggestionChip } from '@/components/career/haven'
import { PathDetailPanel } from '@/components/compass/path-detail-panel'
import { DecisionSimulator } from '@/components/compass/decision-simulator'
import { CareerPriorities } from '@/components/compass/career-priorities'
import { pathDetails, simActions } from '@/components/compass/compass-data'
import { cn } from '@/lib/utils'
import type { SectionId } from '@/components/shell/nav-config'

const cardHover =
  'transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md'

/* ------------------------------------------------------------------ */
/* Demo data                                                           */
/* ------------------------------------------------------------------ */

const journeyStages = [
  { label: 'School', stage: 'complete' as const },
  { label: 'University', stage: 'complete' as const },
  { label: 'First Job', stage: 'current' as const },
  { label: 'Early Career', stage: 'upcoming' as const },
  { label: 'Mid Career', stage: 'upcoming' as const },
  { label: 'Senior Moves', stage: 'upcoming' as const },
]

const summaryMetrics = [
  {
    label: 'Realistic routes mapped',
    value: '6',
    caption: 'Filtered from 23 possible transitions',
    icon: Route,
  },
  {
    label: 'Similar transitions observed',
    value: '1,240',
    caption: 'Profiles with comparable starting points',
    icon: Users,
  },
  {
    label: 'High-impact proof gaps',
    value: '2',
    caption: 'Closing these widens most routes',
    icon: ClipboardList,
  },
  {
    label: 'Action window',
    value: '12 mo',
    caption: 'Strongest leverage period for this stage',
    icon: Clock,
  },
]

type FitTone = 'success' | 'primary' | 'warning' | 'neutral'

interface Lane {
  id: string
  role: string
  category: string
  fit: string
  fitTone: FitTone
  effort: string
  risk: string
  upside: string
  time: string
  salary: string
  transitions: string
  why: string
  missingSkills: string[]
  // Mini-visual data
  salaryProgression: number[] // RM (thousands) over 5 checkpoints
  skillGaps: { skill: string; coverage: number }[]
  tradeoffs: { effort: number; risk: number; upside: number; speed: number; salary: number } // 0–100
}

const lanes: Lane[] = [
  {
    id: 'backend-engineer',
    role: 'Backend Engineer',
    category: 'Core technical climb',
    fit: 'Strong fit',
    fitTone: 'success',
    effort: 'Medium',
    risk: 'Low',
    upside: 'High',
    time: '9–14 months',
    salary: 'RM 7k–10k',
    transitions: '1,240 profiles',
    why: 'Your C# fundamentals, SQL exposure, and project delivery map well into backend systems roles.',
    missingSkills: ['Docker', 'API testing', 'System design'],
    salaryProgression: [4.2, 5.5, 7, 8.5, 10],
    skillGaps: [
      { skill: 'Docker', coverage: 25 },
      { skill: 'API testing', coverage: 40 },
      { skill: 'System design', coverage: 30 },
    ],
    tradeoffs: { effort: 55, risk: 25, upside: 85, speed: 60, salary: 80 },
  },
  {
    id: 'data-engineer',
    role: 'Data Engineer',
    category: 'Data infrastructure route',
    fit: 'Good fit',
    fitTone: 'primary',
    effort: 'Medium-high',
    risk: 'Medium',
    upside: 'High',
    time: '12–18 months',
    salary: 'RM 8k–11k',
    transitions: '860 profiles',
    why: 'Your scripting ability and analytical coursework support a move toward data pipelines and platform work.',
    missingSkills: ['ETL pipelines', 'Cloud storage', 'Orchestration'],
    salaryProgression: [4.2, 5.2, 6.8, 9, 11],
    skillGaps: [
      { skill: 'ETL pipelines', coverage: 20 },
      { skill: 'Cloud storage', coverage: 35 },
      { skill: 'Orchestration', coverage: 15 },
    ],
    tradeoffs: { effort: 75, risk: 50, upside: 88, speed: 45, salary: 88 },
  },
  {
    id: 'product-engineer',
    role: 'Product Engineer',
    category: 'Hybrid product-build route',
    fit: 'Moderate fit',
    fitTone: 'warning',
    effort: 'Medium',
    risk: 'Medium',
    upside: 'High',
    time: '12–16 months',
    salary: 'RM 7k–10k',
    transitions: '540 profiles',
    why: 'Your end-to-end project habits can transfer into teams where product thinking and engineering overlap.',
    missingSkills: ['User analytics', 'Product metrics', 'UX trade-offs'],
    salaryProgression: [4.2, 5, 6.5, 8, 10],
    skillGaps: [
      { skill: 'User analytics', coverage: 30 },
      { skill: 'Product metrics', coverage: 25 },
      { skill: 'UX trade-offs', coverage: 35 },
    ],
    tradeoffs: { effort: 55, risk: 50, upside: 82, speed: 48, salary: 78 },
  },
  {
    id: 'technical-consultant',
    role: 'Technical Consultant',
    category: 'Client-facing technical path',
    fit: 'Moderate fit',
    fitTone: 'warning',
    effort: 'Medium',
    risk: 'Medium',
    upside: 'Medium-high',
    time: '8–12 months',
    salary: 'RM 6k–9k',
    transitions: '420 profiles',
    why: 'Your communication and technical explanation signals can support client-facing solution roles.',
    missingSkills: [
      'Stakeholder discovery',
      'Documentation',
      'Presentation work sample',
    ],
    salaryProgression: [4.2, 5, 6.2, 7.5, 9],
    skillGaps: [
      { skill: 'Stakeholder discovery', coverage: 30 },
      { skill: 'Documentation', coverage: 50 },
      { skill: 'Presentation work sample', coverage: 25 },
    ],
    tradeoffs: { effort: 55, risk: 48, upside: 68, speed: 68, salary: 65 },
  },
  {
    id: 'systems-analyst',
    role: 'Systems Analyst',
    category: 'Enterprise systems path',
    fit: 'Strong fit',
    fitTone: 'success',
    effort: 'Low-medium',
    risk: 'Low',
    upside: 'Medium',
    time: '6–10 months',
    salary: 'RM 6k–8.5k',
    transitions: '690 profiles',
    why: 'Your structured thinking and software fundamentals fit enterprise process and system analysis roles.',
    missingSkills: [
      'Business process mapping',
      'Requirements writing',
      'UAT',
    ],
    salaryProgression: [4.2, 5, 6, 7.2, 8.5],
    skillGaps: [
      { skill: 'Business process mapping', coverage: 35 },
      { skill: 'Requirements writing', coverage: 45 },
      { skill: 'UAT', coverage: 30 },
    ],
    tradeoffs: { effort: 38, risk: 22, upside: 55, speed: 78, salary: 60 },
  },
  {
    id: 'steady-growth',
    role: 'Steady Growth Track',
    category: 'Stability-first route',
    fit: 'Strong fit',
    fitTone: 'success',
    effort: 'Low',
    risk: 'Low',
    upside: 'Medium',
    time: '6–12 months',
    salary: 'RM 5.5k–8k',
    transitions: '780 profiles',
    why: 'This route prioritizes stable growth, stronger portfolio proof, and lower transition risk.',
    missingSkills: [
      'Deployed project proof',
      'Interview readiness',
      'Role targeting',
    ],
    salaryProgression: [4.2, 4.8, 5.6, 6.8, 8],
    skillGaps: [
      { skill: 'Deployed project proof', coverage: 40 },
      { skill: 'Interview readiness', coverage: 50 },
      { skill: 'Role targeting', coverage: 45 },
    ],
    tradeoffs: { effort: 25, risk: 18, upside: 52, speed: 70, salary: 52 },
  },
]

/* ------------------------------------------------------------------ */
/* Mini visuals                                                        */
/* ------------------------------------------------------------------ */

function SalaryChart({ lane }: { lane: Lane }) {
  const w = 240
  const h = 96
  const pad = 8
  const points = lane.salaryProgression
  const min = 3.5
  const max = 11.5
  const step = (w - pad * 2) / (points.length - 1)
  const y = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2)
  const coords = points.map(
    (p, i) => [pad + i * step, y(p)] as [number, number],
  )
  const line = coords.map((c) => `${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(' ')

  return (
    <div className="flex flex-col gap-2">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-24 w-full"
        role="img"
        aria-label={`Estimated salary progression for ${lane.role} from RM ${points[0]}k to RM ${points[points.length - 1]}k`}
        preserveAspectRatio="none"
      >
        {/* Gridlines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={pad}
            x2={w - pad}
            y1={h * f}
            y2={h * f}
            className="stroke-border"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
        ))}
        <polyline
          points={`${pad},${h - pad} ${line} ${w - pad},${h - pad}`}
          className="fill-primary/10 stroke-none"
        />
        <polyline
          points={line}
          className="fill-none stroke-primary"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {coords.map((c, i) => (
          <circle
            key={i}
            cx={c[0]}
            cy={c[1]}
            r={3}
            className="fill-background stroke-primary"
            strokeWidth={2}
          />
        ))}
      </svg>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Now · RM {points[0]}k</span>
        <span>
          Path-ready · RM {points[points.length - 1]}k
        </span>
      </div>
    </div>
  )
}

function SkillGapBars({ lane }: { lane: Lane }) {
  return (
    <div className="flex flex-col gap-3.5">
      {lane.skillGaps.map((g) => (
        <div key={g.skill} className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">{g.skill}</span>
            <span className="text-muted-foreground tabular-nums">
              {g.coverage}% covered
            </span>
          </div>
          <ProgressBar
            value={g.coverage}
            tone={g.coverage >= 40 ? 'primary' : 'warning'}
            className="h-1.5"
          />
        </div>
      ))}
      <p className="text-xs leading-relaxed text-muted-foreground">
        Coverage is estimated from work samples and coursework — medium
        confidence.
      </p>
    </div>
  )
}

const radarAxes = [
  { key: 'upside', label: 'Upside' },
  { key: 'salary', label: 'Salary' },
  { key: 'speed', label: 'Speed' },
  { key: 'risk', label: 'Low risk' },
  { key: 'effort', label: 'Low effort' },
] as const

function TradeoffRadar({ lane }: { lane: Lane }) {
  const size = 240
  const cx = size / 2
  const cy = size / 2
  const r = 78

  // Risk and effort are inverted: lower raw value = better = larger shape
  const values = radarAxes.map((a) => {
    const raw = lane.tradeoffs[a.key]
    return a.key === 'risk' || a.key === 'effort' ? 100 - raw : raw
  })

  const point = (i: number, radius: number): [number, number] => {
    const angle = (Math.PI * 2 * i) / radarAxes.length - Math.PI / 2
    return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
  }

  const shape = values
    .map((v, i) => {
      const [x, y] = point(i, (v / 100) * r)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-52 w-56"
        role="img"
        aria-label={`Trade-off profile for ${lane.role} across upside, salary, speed, risk, and effort`}
      >
        {/* Rings */}
        {[0.33, 0.66, 1].map((f) => (
          <polygon
            key={f}
            points={radarAxes
              .map((_, i) => {
                const [x, y] = point(i, r * f)
                return `${x.toFixed(1)},${y.toFixed(1)}`
              })
              .join(' ')}
            className="fill-none stroke-border"
            strokeWidth={1}
          />
        ))}
        {/* Spokes */}
        {radarAxes.map((_, i) => {
          const [x, y] = point(i, r)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              className="stroke-border"
              strokeWidth={1}
            />
          )
        })}
        {/* Value shape */}
        <polygon
          points={shape}
          className="fill-primary/15 stroke-primary transition-all duration-500"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {values.map((v, i) => {
          const [x, y] = point(i, (v / 100) * r)
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={3}
              className="fill-primary transition-all duration-500"
            />
          )
        })}
        {/* Labels */}
        {radarAxes.map((a, i) => {
          const [x, y] = point(i, r + 18)
          return (
            <text
              key={a.key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-[0.6rem] font-medium"
            >
              {a.label}
            </text>
          )
        })}
      </svg>
      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Larger area = more favorable trade-offs for your profile.
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Lane card                                                           */
/* ------------------------------------------------------------------ */

function LaneCard({
  lane,
  selected,
  onSelect,
  onInspect,
}: {
  lane: Lane
  selected: boolean
  onSelect: () => void
  onInspect: () => void
}) {
  return (
    <Card
      aria-label={`${lane.role} career path`}
      className={cn(
        'gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        selected
          ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/40'
          : 'hover:border-primary/40',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold leading-tight">
            {lane.role}
          </span>
          <span className="text-xs text-muted-foreground">{lane.category}</span>
        </div>
        <SignalBadge tone={lane.fitTone}>{lane.fit}</SignalBadge>
      </div>

      <dl className="grid grid-cols-3 gap-x-3 gap-y-2 text-xs">
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Effort</dt>
          <dd className="font-medium">{lane.effort}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Risk</dt>
          <dd className="font-medium">{lane.risk}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Upside</dt>
          <dd className="font-medium">{lane.upside}</dd>
        </div>
        <div className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Time</dt>
          <dd className="font-medium">{lane.time}</dd>
        </div>
        <div className="col-span-2 flex flex-col gap-0.5">
          <dt className="text-muted-foreground">Salary band</dt>
          <dd className="font-mono font-medium tabular-nums">{lane.salary}</dd>
        </div>
      </dl>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        <SignalBadge tone="neutral" className="w-fit">
          <Users />
          {lane.transitions} made a similar move
        </SignalBadge>
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            Why this appears:{' '}
          </span>
          {lane.why}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Missing skills
        </span>
        <div className="flex flex-wrap gap-1.5">
          {lane.missingSkills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-warning/40 bg-warning-muted/50 px-2 py-0.5 text-[0.7rem] font-medium text-warning-foreground dark:text-warning"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        <Button
          variant={selected ? 'secondary' : 'outline'}
          size="sm"
          aria-pressed={selected}
          onClick={onSelect}
        >
          {selected ? 'Selected path' : 'Compare path'}
        </Button>
        <Button
          variant={selected ? 'default' : 'outline'}
          size="sm"
          onClick={() => {
            onSelect()
            onInspect()
          }}
        >
          View path plan
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function CompassSection({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  const [selectedId, setSelectedId] = useState('backend-engineer')
  const [detailOpen, setDetailOpen] = useState(false)
  const selected = useMemo(
    () => lanes.find((l) => l.id === selectedId) ?? lanes[0],
    [selectedId],
  )
  const detail = pathDetails[selected.id] ?? pathDetails['backend-engineer']
  const actions = simActions[selected.id] ?? simActions['backend-engineer']

  const comparison = [
    { label: 'Fit', value: selected.fit },
    { label: 'Effort', value: selected.effort },
    { label: 'Risk', value: selected.risk },
    { label: 'Upside', value: selected.upside },
    { label: 'Time', value: selected.time },
    { label: 'Salary', value: selected.salary },
    {
      label: 'Missing skills',
      value: `${selected.missingSkills.length} to close`,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Compass
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          See realistic next moves, compare trade-offs, and understand what
          each path unlocks.
        </p>
        <p className="max-w-2xl rounded-lg border border-border bg-muted/50 px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground">
          Compass does not predict one future. It maps realistic routes based
          on similar profiles, market signals, your priorities, and your
          current proof of skills.
        </p>
      </header>

      {/* Current career state */}
      <Card className="gap-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-base font-semibold text-primary">
              AR
              </span>
              <div className="flex flex-col gap-1">
              <span className="text-base font-semibold">Aisyah Rahman</span>
              <span className="text-xs text-muted-foreground">
                Data Analyst · Exploring a backend engineering transition
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                Kuala Lumpur / Hybrid-ready
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <SignalBadge tone="primary">
              Stage: First Job / Early Career
            </SignalBadge>
            <SignalBadge tone="neutral">
              <SlidersHorizontal />
              Priorities: Learning + Stability
            </SignalBadge>
          </div>
        </div>

        <div className="grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Portfolio readiness
              </span>
              <span className="font-semibold tabular-nums">72%</span>
            </div>
            <ProgressBar value={72} tone="primary" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Career momentum</span>
              <SignalBadge tone="success">Rising +14% over 60 days</SignalBadge>
            </div>
            <ProgressBar value={64} tone="success" />
          </div>
        </div>

        <div className="border-t border-border pt-5 pb-4">
          <JourneyBar stages={journeyStages} />
        </div>
      </Card>

      <CareerPriorities
        onSelectRecommendation={(laneId) => {
          setSelectedId(laneId)
          window.requestAnimationFrame(() =>
            document
              .getElementById('trajectory-lanes')
              ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          )
        }}
      />

      {/* Summary metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryMetrics.map((m) => (
          <Card key={m.label} className={cn('gap-2.5', cardHover)}>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{m.label}</span>
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <m.icon className="size-4" />
              </span>
            </div>
            <span className="text-3xl font-semibold tracking-tight tabular-nums">
              {m.value}
            </span>
            <span className="text-xs text-muted-foreground">{m.caption}</span>
          </Card>
        ))}
      </div>

      {/* Trajectory lanes */}
      <section
        id="trajectory-lanes"
        aria-label="Trajectory lanes"
        className="scroll-mt-24 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold tracking-tight">
            Trajectory lanes
          </h2>
          <p className="text-sm text-muted-foreground">
            Six realistic routes from where you are today. Select a lane to
            compare its trade-offs below.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {lanes.map((lane) => (
            <LaneCard
              key={lane.id}
              lane={lane}
              selected={lane.id === selectedId}
              onSelect={() => setSelectedId(lane.id)}
              onInspect={() => setDetailOpen(true)}
            />
          ))}
        </div>
      </section>

      {/* Comparison strip */}
      <section aria-label="Path comparison" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-base font-semibold tracking-tight">
              Path snapshot
            </h2>
            <p className="text-sm text-muted-foreground">
              Key trade-offs for the selected route.
            </p>
          </div>
          <SignalBadge tone="primary">{selected.role}</SignalBadge>
        </div>
        <Card className="p-0">
          <dl className="grid grid-cols-2 divide-y divide-border sm:grid-cols-4 lg:grid-cols-7 lg:divide-y-0 lg:divide-x">
            {comparison.map((c) => (
              <div key={c.label} className="flex flex-col gap-1 px-4 py-3.5">
                <dt className="text-xs text-muted-foreground">{c.label}</dt>
                <dd className="text-sm font-semibold leading-snug">
                  {c.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </section>

      {/* Mini visuals */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card className="gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold">Salary progression</span>
            <span className="text-xs text-muted-foreground">
              Estimated band for {selected.role} — medium confidence.
            </span>
          </div>
          <SalaryChart lane={selected} />
        </Card>

        <Card className="gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold">Skill gaps to close</span>
            <span className="text-xs text-muted-foreground">
              Current proof coverage for {selected.role}.
            </span>
          </div>
          <SkillGapBars lane={selected} />
        </Card>

        <Card className="gap-4 md:col-span-2 xl:col-span-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold">Trade-off profile</span>
            <span className="text-xs text-muted-foreground">
              How {selected.role} balances risk, effort, and reward.
            </span>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <TradeoffRadar lane={selected} />
          </div>
        </Card>
      </div>

      {/* Decision simulator */}
      <DecisionSimulator laneRole={selected.role} actions={actions} />

      {/* Haven preview */}
      <Card className="gap-5 p-6">
        <div className="flex flex-col gap-1">
          <span className="text-base font-semibold">
            Ask Haven why this path appears
          </span>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Haven can explain the proof behind each path, what is
            uncertain, and what action would improve your options.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SuggestionChip onClick={() => onNavigate?.('haven')}>
            Why this path?
          </SuggestionChip>
          <SuggestionChip onClick={() => onNavigate?.('haven')}>
            What should I learn next?
          </SuggestionChip>
          <SuggestionChip onClick={() => onNavigate?.('haven')}>
            Which path has the lowest risk?
          </SuggestionChip>
          <SuggestionChip onClick={() => onNavigate?.('haven')}>
            What unlocks the most roles?
          </SuggestionChip>
        </div>
        <AskHavenButton
          className="w-fit"
          onClick={() => onNavigate?.('haven')}
        />
      </Card>

      {/* Next steps */}
      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Ready for the next step? Turn this route into action.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => onNavigate?.('discover')}>
            Continue to Discover roles
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button variant="outline" onClick={() => onNavigate?.('portfolio')}>
            Strengthen portfolio
          </Button>
        </div>
      </div>

      {/* Path detail panel */}
      <PathDetailPanel
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        role={selected.role}
        category={selected.category}
        fit={selected.fit}
        fitTone={selected.fitTone}
        detail={detail}
        onAskHaven={() => {
          setDetailOpen(false)
          onNavigate?.('haven')
        }}
      />
    </div>
  )
}
