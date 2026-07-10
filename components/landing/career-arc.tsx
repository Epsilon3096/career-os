import { cn } from '@/lib/utils'
import { SignalBadge } from '@/components/career/signal-badge'

const arcStages = [
  { age: '16', label: 'School Leaver', focus: true },
  { age: '18', label: 'Choose & Enrol', focus: true },
  { age: '21', label: 'University', focus: true },
  { age: '23', label: 'First Job', focus: true },
  { age: '28', label: 'Early Career', focus: true },
  { age: '40', label: 'Mid-Career', focus: false },
  { age: '55', label: 'Senior Moves', focus: false },
  { age: '65+', label: 'Retirement', focus: false },
]

export function CareerArc() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight">
            One map, from 16 to 65+
          </h2>
          <p className="text-sm text-muted-foreground">
            The same profile carries every stage of a working life.
          </p>
        </div>
        <SignalBadge tone="primary">Build-phase focus: 16–30</SignalBadge>
      </div>

      <div
        tabIndex={0}
        aria-label="Career stages from age 16 to retirement"
        className="scrollbar-none overflow-x-auto pb-2 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        <div className="flex min-w-[640px] items-stretch">
          {arcStages.map((s, i) => {
            const isLast = i === arcStages.length - 1
            return (
              <div
                key={s.age}
                className="flex flex-1 flex-col gap-3 last:flex-none"
              >
                <div className="flex items-center">
                  <span
                    className={cn(
                      'flex size-3.5 shrink-0 items-center justify-center rounded-full border-2',
                      s.focus
                        ? 'border-primary bg-primary/20'
                        : 'border-border bg-muted',
                    )}
                  >
                    {s.focus ? (
                      <span className="size-1.5 rounded-full bg-primary" />
                    ) : null}
                  </span>
                  {!isLast ? (
                    <span
                      className={cn(
                        'mx-1.5 h-0.5 flex-1 rounded-full',
                        s.focus && arcStages[i + 1].focus
                          ? 'bg-primary/50'
                          : 'bg-border',
                      )}
                    />
                  ) : null}
                </div>
                <div className={cn('flex flex-col pr-3', isLast && 'pr-0')}>
                  <span
                    className={cn(
                      'font-mono text-xs tabular-nums',
                      s.focus ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {s.age}
                  </span>
                  <span
                    className={cn(
                      'text-xs font-medium whitespace-nowrap',
                      s.focus ? 'text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
