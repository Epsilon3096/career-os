import { Card } from '@/components/ui/card'
import { DsLabel, DsSection } from '@/components/design-system/ds-section'

const rows = [
  {
    label: 'Display',
    node: (
      <p className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Navigate your career with clarity
      </p>
    ),
  },
  {
    label: 'Page title',
    node: (
      <p className="text-2xl font-semibold tracking-tight">
        Compass · Career Path Navigator
      </p>
    ),
  },
  {
    label: 'Section title',
    node: <p className="text-lg font-semibold">Strong fit roles for you</p>,
  },
  {
    label: 'Body',
    node: (
      <p className="max-w-xl text-sm leading-relaxed text-foreground">
        These paths are observed from similar profiles, not predictions. We
        surface realistic options, the trade-offs behind them, and the next
        actions that move you forward.
      </p>
    ),
  },
  {
    label: 'Muted helper',
    node: (
      <p className="text-sm text-muted-foreground">
        Medium confidence · updated from 1,240 comparable journeys
      </p>
    ),
  },
  {
    label: 'Mono / data',
    node: (
      <p className="font-mono text-sm tracking-tight text-muted-foreground">
        READINESS 72% · MOMENTUM +14% · 60D
      </p>
    ),
  },
]

export function TypographyPreview() {
  return (
    <DsSection
      index="03"
      title="Typography"
      description="Geist for interface and editorial hierarchy, Geist Mono for data and labels. Readable, premium, and calm."
    >
      <Card className="gap-0 divide-y divide-border p-0">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:gap-6"
          >
            <div className="w-28 shrink-0">
              <DsLabel>{r.label}</DsLabel>
            </div>
            <div className="min-w-0 flex-1">{r.node}</div>
          </div>
        ))}
      </Card>
    </DsSection>
  )
}
