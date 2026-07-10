import { DsSection } from '@/components/design-system/ds-section'

interface Swatch {
  name: string
  token: string
  className: string
  ring?: boolean
}

const swatches: Swatch[] = [
  { name: 'Background', token: '--background', className: 'bg-background', ring: true },
  { name: 'Surface', token: '--surface', className: 'bg-surface', ring: true },
  {
    name: 'Surface elevated',
    token: '--surface-elevated',
    className: 'bg-surface-elevated',
    ring: true,
  },
  { name: 'Border', token: '--border', className: 'bg-border' },
  { name: 'Primary', token: '--primary', className: 'bg-primary' },
  { name: 'Success', token: '--success', className: 'bg-success' },
  { name: 'Warning', token: '--warning', className: 'bg-warning' },
  { name: 'Risk', token: '--risk', className: 'bg-risk' },
  { name: 'Muted text', token: '--muted-foreground', className: 'bg-muted-foreground' },
  { name: 'Strong text', token: '--foreground', className: 'bg-foreground' },
]

export function ColorTokens() {
  return (
    <DsSection
      index="02"
      title="Color Tokens"
      description="A restrained, editorial palette. Deep navy surfaces in dark mode, warm neutrals in light mode, with a refined cyan-blue primary and muted status colors. Toggle the theme to see each token adapt."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {swatches.map((s) => (
          <div
            key={s.token}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-2.5 transition-colors hover:border-primary/40"
          >
            <div
              className={`h-16 w-full rounded-lg ${s.className} ${
                s.ring ? 'ring-1 ring-inset ring-border' : ''
              }`}
            />
            <div className="flex flex-col gap-0.5 px-0.5 pb-0.5">
              <span className="text-xs font-medium">{s.name}</span>
              <span className="font-mono text-[0.65rem] text-muted-foreground">
                {s.token}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DsSection>
  )
}
