import { cn } from '@/lib/utils'

/**
 * Lightweight visual placeholders built with CSS/SVG only.
 * These are Phase 0 stand-ins for a real charting layer later.
 */

export function SalaryLineChart({
  points,
}: {
  points: number[]
}) {
  const width = 260
  const height = 96
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * width
    const y = height - ((p - min) / range) * (height - 12) - 6
    return [x, y] as const
  })
  const line = coords.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `0,${height} ${line} ${width},${height}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-24 w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Salary progression trend line"
    >
      <polygon points={area} className="fill-primary/10" />
      <polyline
        points={line}
        className="fill-none stroke-primary"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {coords.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === coords.length - 1 ? 3.5 : 2}
          className={cn(
            i === coords.length - 1 ? 'fill-primary' : 'fill-primary/50',
          )}
        />
      ))}
    </svg>
  )
}

export function SkillGapBars({
  skills,
}: {
  skills: { label: string; value: number }[]
}) {
  return (
    <div className="flex flex-col gap-2.5">
      {skills.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="w-24 shrink-0 truncate text-xs text-muted-foreground">
            {s.label}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                'h-full rounded-full',
                s.value >= 70
                  ? 'bg-success'
                  : s.value >= 45
                    ? 'bg-warning'
                    : 'bg-risk',
              )}
              style={{ width: `${s.value}%` }}
            />
          </div>
          <span className="w-8 shrink-0 text-right font-mono text-xs tabular-nums">
            {s.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export function HiringFunnel({
  stages,
}: {
  stages: { label: string; value: number }[]
}) {
  const max = Math.max(...stages.map((s) => s.value))
  return (
    <div className="flex flex-col gap-1.5">
      {stages.map((s) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-xs text-muted-foreground">
            {s.label}
          </span>
          <div className="flex-1">
            <div
              className="flex h-7 items-center justify-end rounded-md bg-primary/80 px-2 text-[0.7rem] font-medium text-primary-foreground transition-all"
              style={{ width: `${(s.value / max) * 100}%` }}
            >
              {s.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function FacultyOutcomeBars({
  faculties,
}: {
  faculties: { label: string; value: number }[]
}) {
  const max = Math.max(...faculties.map((f) => f.value))
  return (
    <div className="flex h-28 items-end gap-3">
      {faculties.map((f) => (
        <div key={f.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-primary/70 transition-all hover:bg-primary"
              style={{ height: `${(f.value / max) * 100}%` }}
              title={`${f.label}: ${f.value}%`}
            />
          </div>
          <span className="text-[0.65rem] text-muted-foreground">
            {f.label}
          </span>
        </div>
      ))}
    </div>
  )
}
