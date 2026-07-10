import { cn } from '@/lib/utils'

type Tone = 'primary' | 'success' | 'warning' | 'risk' | 'neutral'

const toneFill: Record<Tone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  risk: 'bg-risk',
  neutral: 'bg-muted-foreground/50',
}

const toneStroke: Record<Tone, string> = {
  primary: 'stroke-primary',
  success: 'stroke-success',
  warning: 'stroke-warning',
  risk: 'stroke-risk',
  neutral: 'stroke-muted-foreground/50',
}

export function ProgressBar({
  value,
  tone = 'primary',
  className,
}: {
  value: number
  tone?: Tone
  className?: string
}) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'h-2 w-full overflow-hidden rounded-full bg-muted',
        className,
      )}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-700 ease-out',
          toneFill[tone],
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

export function CircularProgress({
  value,
  tone = 'primary',
  size = 112,
  strokeWidth = 9,
  label,
}: {
  value: number
  tone?: Tone
  size?: number
  strokeWidth?: number
  label?: string
}) {
  const clamped = Math.min(100, Math.max(0, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-muted"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            'fill-none transition-[stroke-dashoffset] duration-700 ease-out',
            toneStroke[tone],
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-semibold tabular-nums">{clamped}%</span>
        {label ? (
          <span className="text-[0.7rem] text-muted-foreground">{label}</span>
        ) : null}
      </div>
    </div>
  )
}

export interface JourneyStage {
  label: string
  stage: 'complete' | 'current' | 'upcoming'
}

export function JourneyBar({ stages }: { stages: JourneyStage[] }) {
  const gridStyle = {
    gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
  }

  return (
    <div className="flex flex-col">
      <div className="grid" style={gridStyle}>
        {stages.map((s, i) => {
          const isLast = i === stages.length - 1
          const done = s.stage === 'complete'
          const current = s.stage === 'current'
          return (
            <div key={s.label} className="relative flex justify-center">
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-[7px] left-1/2 h-0.5 w-full transition-colors',
                    done ? 'bg-primary' : 'bg-border',
                  )}
                />
              ) : null}
              <span
                className={cn(
                  'relative z-10 flex size-4 items-center justify-center rounded-full border-2 transition-colors',
                  done && 'border-primary bg-primary',
                  current && 'border-primary bg-background ring-4 ring-primary/20',
                  s.stage === 'upcoming' && 'border-border bg-muted',
                )}
              >
                {done ? (
                  <span className="size-1.5 rounded-full bg-primary-foreground" />
                ) : null}
              </span>
              {current ? (
                <span className="absolute top-6 z-20 whitespace-nowrap rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[0.62rem] font-medium text-primary">
                  You are here
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
      <div className="mt-8 grid gap-1" style={gridStyle}>
        {stages.map((s) => (
          <span
            key={s.label}
            className={cn(
              'min-w-0 text-center text-[0.62rem] leading-tight sm:text-xs',
              s.stage === 'current'
                ? 'font-semibold text-foreground'
                : 'text-muted-foreground',
            )}
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
