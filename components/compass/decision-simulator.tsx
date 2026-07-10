'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Clock,
  FlaskConical,
  Gauge,
  Info,
  Users,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { ProgressBar } from '@/components/career/progress'
import { cn } from '@/lib/utils'
import type { SimAction, SimState } from '@/components/compass/compass-data'

function impactTone(impact: SimAction['impact']) {
  if (impact === 'High impact') return 'success' as const
  if (impact === 'Medium impact') return 'primary' as const
  return 'neutral' as const
}

function StateCard({
  label,
  state,
  highlight,
  maxRoles,
}: {
  label: string
  state: SimState
  highlight?: boolean
  maxRoles: number
}) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-4 rounded-xl border p-4 transition-colors duration-300',
        highlight
          ? 'border-primary/40 bg-primary/5'
          : 'border-border bg-surface',
      )}
    >
      <span
        className={cn(
          'text-[0.7rem] font-semibold tracking-wide uppercase',
          highlight ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>

      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-muted-foreground">Matching roles</span>
            <span className="text-lg font-semibold tabular-nums">
              {state.roles}
            </span>
          </div>
          <ProgressBar
            value={(state.roles / maxRoles) * 100}
            tone={highlight ? 'primary' : 'neutral'}
            className="h-1.5"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-muted-foreground">Readiness</span>
            <span className="text-lg font-semibold tabular-nums">
              {state.readiness}%
            </span>
          </div>
          <ProgressBar
            value={state.readiness}
            tone={highlight ? 'primary' : 'neutral'}
            className="h-1.5"
          />
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className="text-muted-foreground">Salary band</span>
          <span className="font-mono font-medium tabular-nums">
            {state.salary}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Missing proof gaps</span>
          <span className="font-semibold tabular-nums">{state.gaps}</span>
        </div>
      </div>
    </div>
  )
}

export function DecisionSimulator({
  laneRole,
  actions,
}: {
  laneRole: string
  actions: SimAction[]
}) {
  const [actionId, setActionId] = useState(actions[0]?.id)

  // Reset selection when the lane (and its action set) changes
  useEffect(() => {
    setActionId(actions[0]?.id)
  }, [actions])

  const action = actions.find((a) => a.id === actionId) ?? actions[0]
  if (!action) return null

  const maxRoles = Math.max(action.before.roles, action.after.roles, 1)
  const roleDelta = action.after.roles - action.before.roles
  const readinessDelta = action.after.readiness - action.before.readiness

  return (
    <section
      aria-label="Decision simulator"
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FlaskConical className="size-4" />
          </span>
          <h2 className="text-base font-semibold tracking-tight">
            What changes if you take action?
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Simulate how one action could change your opportunity landscape.
          This is not a prediction — it is a market-signal scenario.
        </p>
      </div>

      <Card className="gap-5 p-5 sm:p-6">
        {/* Action chips */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Pick one action for the {laneRole} route
          </span>
          <div
            role="radiogroup"
            aria-label="Simulated actions"
            className="flex flex-wrap gap-2"
          >
            {actions.map((a) => {
              const active = a.id === action.id
              return (
                <button
                  key={a.id}
                  role="radio"
                  aria-checked={active}
                  onClick={() => setActionId(a.id)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                    active
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground',
                  )}
                >
                  {a.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Before / After */}
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <StateCard label="Before" state={action.before} maxRoles={maxRoles} />
          <div className="flex items-center justify-center sm:flex-col">
            <span className="flex size-9 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <ArrowRight className="size-4 rotate-90 sm:rotate-0" />
            </span>
          </div>
          <StateCard
            label={`After: ${action.label}`}
            state={action.after}
            highlight
            maxRoles={maxRoles}
          />
        </div>

        {/* Delta summary */}
        <div className="flex flex-wrap items-center gap-2">
          <SignalBadge tone="success">
            +{roleDelta} matching roles
          </SignalBadge>
          <SignalBadge tone="success">
            +{readinessDelta}% readiness
          </SignalBadge>
          {action.after.gaps < action.before.gaps ? (
            <SignalBadge tone="primary">
              {action.before.gaps - action.after.gaps} proof gap closed
            </SignalBadge>
          ) : null}
        </div>

        {/* Impact labels */}
        <dl className="grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Gauge className="size-3" />
              Role access
            </dt>
            <dd>
              <SignalBadge tone={impactTone(action.impact)}>
                {action.impact}
              </SignalBadge>
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Clock className="size-3" />
              Time cost
            </dt>
            <dd className="text-sm font-medium">{action.timeCost}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Info className="size-3" />
              Confidence
            </dt>
            <dd className="text-sm font-medium">{action.confidence}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <Users className="size-3" />
              Based on
            </dt>
            <dd className="text-sm font-medium leading-snug">
              {action.basedOn}
            </dd>
          </div>
        </dl>
      </Card>

      {/* Uncertainty note */}
      <p className="flex max-w-3xl gap-2 rounded-lg border border-border bg-muted/50 px-3.5 py-2.5 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        Career OS avoids false certainty. These simulations show how options
        may expand based on observed market patterns, not guaranteed outcomes.
      </p>
    </section>
  )
}
