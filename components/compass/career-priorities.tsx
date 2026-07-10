'use client'

import { useMemo } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  HeartHandshake,
  RotateCcw,
  Scale,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { usePersistentState } from '@/lib/use-persistent-state'

type PriorityId = 'growth' | 'stability' | 'balance' | 'learning' | 'impact'
type PriorityValues = Record<PriorityId, number>

const defaultPriorities: PriorityValues = {
  growth: 4,
  stability: 5,
  balance: 3,
  learning: 5,
  impact: 3,
}

const priorities = [
  {
    id: 'growth' as const,
    label: 'Income growth',
    description: 'Higher long-term earning potential',
    icon: BadgeDollarSign,
  },
  {
    id: 'stability' as const,
    label: 'Stability',
    description: 'Predictable demand and lower transition risk',
    icon: ShieldCheck,
  },
  {
    id: 'balance' as const,
    label: 'Work-life fit',
    description: 'Sustainable pace and flexibility',
    icon: Scale,
  },
  {
    id: 'learning' as const,
    label: 'Learning pace',
    description: 'Frequent technical growth and challenge',
    icon: BookOpen,
  },
  {
    id: 'impact' as const,
    label: 'People impact',
    description: 'Visible value for users or stakeholders',
    icon: HeartHandshake,
  },
]

const paths = [
  {
    id: 'backend-engineer',
    label: 'Backend Engineer',
    weights: { growth: 5, stability: 4, balance: 3, learning: 5, impact: 3 },
  },
  {
    id: 'data-engineer',
    label: 'Data Engineer',
    weights: { growth: 5, stability: 4, balance: 3, learning: 5, impact: 2 },
  },
  {
    id: 'product-engineer',
    label: 'Product Engineer',
    weights: { growth: 5, stability: 3, balance: 2, learning: 5, impact: 5 },
  },
  {
    id: 'technical-consultant',
    label: 'Technical Consultant',
    weights: { growth: 4, stability: 3, balance: 2, learning: 5, impact: 5 },
  },
  {
    id: 'systems-analyst',
    label: 'Systems Analyst',
    weights: { growth: 3, stability: 5, balance: 4, learning: 3, impact: 4 },
  },
  {
    id: 'steady-growth',
    label: 'Steady Growth Track',
    weights: { growth: 2, stability: 5, balance: 5, learning: 3, impact: 3 },
  },
] satisfies Array<{
  id: string
  label: string
  weights: PriorityValues
}>

const valueLabels = ['Low', 'Somewhat low', 'Neutral', 'Important', 'Essential']

export function CareerPriorities({
  onSelectRecommendation,
}: {
  onSelectRecommendation: (laneId: string) => void
}) {
  const [values, setValues, ready] = usePersistentState<PriorityValues>(
    'career-os.career-priorities.v1',
    defaultPriorities,
  )

  const ranked = useMemo(() => {
    const totalPriority = Object.values(values).reduce((sum, value) => sum + value, 0)
    return paths
      .map((path) => {
        const weighted = priorities.reduce(
          (sum, priority) =>
            sum + values[priority.id] * path.weights[priority.id],
          0,
        )
        return {
          ...path,
          score: Math.round((weighted / (totalPriority * 5)) * 100),
        }
      })
      .sort((a, b) => b.score - a.score)
  }, [values])

  const topPriorities = useMemo(
    () =>
      priorities
        .map((priority) => ({ ...priority, value: values[priority.id] }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 2),
    [values],
  )

  const recommendation = ranked[0]
  const alternative = ranked[1]

  return (
    <section aria-labelledby="career-priorities-heading" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 id="career-priorities-heading" className="text-base font-semibold">
              Career priorities check-in
            </h2>
            <SignalBadge tone="primary">Re-ranks your paths</SignalBadge>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Rate what matters in your next move. This is a preference check,
            not a personality test, and you can change it whenever life changes.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setValues(defaultPriorities)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </button>
      </div>

      <Card className="gap-0 overflow-hidden p-0 lg:grid lg:grid-cols-[1.35fr_0.65fr]">
        <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-6">
          {priorities.map((priority) => {
            const Icon = priority.icon
            const value = values[priority.id]
            return (
              <label key={priority.id} className="flex flex-col gap-2.5">
                <span className="flex items-start justify-between gap-3">
                  <span className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="size-3.5" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{priority.label}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {priority.description}
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-xs tabular-nums">
                    {value}/5
                  </span>
                </span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={value}
                  aria-valuetext={valueLabels[value - 1]}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      [priority.id]: Number(event.target.value),
                    }))
                  }
                  className="h-1.5 w-full cursor-pointer accent-[var(--primary)]"
                />
              </label>
            )
          })}
        </div>

        <div className="flex flex-col justify-between gap-5 border-t border-border bg-primary/5 p-5 sm:p-6 lg:border-t-0 lg:border-l">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-wide text-primary uppercase">
              Best aligned right now
            </p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <h3 className="text-xl font-semibold">{recommendation.label}</h3>
              <span className="text-2xl font-semibold text-primary tabular-nums">
                {recommendation.score}%
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Strongest match for your priorities of {topPriorities[0].label.toLowerCase()} and{' '}
              {topPriorities[1].label.toLowerCase()}. Your skills and proof of work
              are evaluated separately below.
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Next closest path</span>
              <span className="font-medium">
                {alternative.label} · {alternative.score}%
              </span>
            </div>
            <Button
              size="sm"
              onClick={() => onSelectRecommendation(recommendation.id)}
            >
              Compare this path
              <ArrowRight data-icon="inline-end" />
            </Button>
            <span className="text-[0.68rem] text-muted-foreground">
              {ready ? 'Saved on this device for the demo.' : 'Loading your saved priorities…'}
            </span>
          </div>
        </div>
      </Card>
    </section>
  )
}
