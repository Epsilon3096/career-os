import type { LucideIcon } from 'lucide-react'
import {
  ArrowUpRight,
  Info,
  MapPin,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { ProgressBar } from '@/components/career/progress'
import { cn } from '@/lib/utils'

const cardHover =
  'transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md'

export function MetricCard({
  label,
  value,
  delta,
  caption,
  icon: Icon = TrendingUp,
}: {
  label: string
  value: string
  delta: string
  caption: string
  icon?: LucideIcon
}) {
  return (
    <Card className={cn('gap-3', cardHover)}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-semibold tracking-tight tabular-nums">
          {value}
        </span>
        <SignalBadge tone="success" className="mb-1">
          <ArrowUpRight />
          {delta}
        </SignalBadge>
      </div>
      <span className="text-xs text-muted-foreground">{caption}</span>
    </Card>
  )
}

export function ReadinessCard({
  label,
  value,
  note = 'Observed from similar profiles',
}: {
  label: string
  value: number
  note?: string
}) {
  return (
    <Card className={cn('gap-3', cardHover)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-mono text-sm text-muted-foreground tabular-nums">
          {value}%
        </span>
      </div>
      <ProgressBar value={value} tone="primary" />
      <span className="text-xs text-muted-foreground">{note}</span>
    </Card>
  )
}

export function InsightCard({
  title = 'Why this appears',
  points,
}: {
  title?: string
  points: string[]
}) {
  return (
    <Card className={cn('gap-3', cardHover)}>
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Info className="size-3.5" />
        </span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <ul className="flex flex-col gap-2">
        {points.map((p) => (
          <li key={p} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <span className="leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function WarningCard({
  title,
  description,
  action = 'Add portfolio evidence',
}: {
  title: string
  description: string
  action?: string
}) {
  return (
    <Card
      className={cn(
        'gap-3 border-warning/40 bg-warning-muted/30',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
      )}
    >
      <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-warning/20 text-warning-foreground dark:text-warning">
          <TriangleAlert className="size-3.5" />
        </span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <button className="mt-1 inline-flex w-fit items-center gap-1 text-xs font-medium text-warning-foreground underline-offset-4 hover:underline dark:text-warning">
        {action}
        <ArrowUpRight className="size-3" />
      </button>
    </Card>
  )
}

export function MarketplaceCard({
  role,
  company,
  location,
  salary,
  fit,
}: {
  role: string
  company: string
  location: string
  salary: string
  fit: string
}) {
  return (
    <Card className={cn('gap-3', cardHover)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-sm font-semibold text-secondary-foreground">
            {company.slice(0, 2).toUpperCase()}
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">{role}</span>
            <span className="text-xs text-muted-foreground">{company}</span>
          </div>
        </div>
        <SignalBadge tone="success">{fit}</SignalBadge>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" />
          {location}
        </span>
        <span className="font-mono text-foreground tabular-nums">{salary}</span>
      </div>
    </Card>
  )
}
