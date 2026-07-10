import {
  ArrowRight,
  Feather,
  Flame,
  Gauge,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { DsLabel, DsSection } from '@/components/design-system/ds-section'

export function ButtonsPreview() {
  return (
    <DsSection
      index="04"
      title="Core Buttons"
      description="Primary actions use the cyan-blue accent. Everything else stays quiet so decisions feel deliberate."
    >
      <Card>
        <div className="flex flex-col gap-2">
          <DsLabel>Variants</DsLabel>
          <div className="flex flex-wrap items-center gap-3">
            <Button>
              Explore path
              <ArrowRight />
            </Button>
            <Button variant="secondary">Compare options</Button>
            <Button variant="ghost">Not now</Button>
            <Button variant="destructive">Dismiss risk</Button>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <DsLabel>Sizes &amp; icon</DsLabel>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" variant="outline" aria-label="Add">
              <Plus />
            </Button>
          </div>
        </div>
      </Card>
    </DsSection>
  )
}

export function BadgesPreview() {
  return (
    <DsSection
      index="05"
      title="Badges &amp; Tags"
      description="Signal language avoids deterministic claims — fit, confidence, effort, and evidence, not guarantees."
    >
      <Card>
        <div className="flex flex-wrap items-center gap-2.5">
          <SignalBadge tone="success">
            <ShieldCheck />
            Strong fit
          </SignalBadge>
          <SignalBadge tone="primary">
            <Gauge />
            Medium confidence
          </SignalBadge>
          <SignalBadge tone="warning">
            <Flame />
            High effort
          </SignalBadge>
          <SignalBadge tone="success">
            <ShieldCheck />
            Low risk
          </SignalBadge>
          <SignalBadge tone="primary">
            <TrendingUp />
            Rising momentum
          </SignalBadge>
          <SignalBadge tone="risk">
            <Feather />
            Missing proof
          </SignalBadge>
          <SignalBadge tone="outline">
            <Sparkles />
            Priorities: Growth + Stability
          </SignalBadge>
        </div>
      </Card>
    </DsSection>
  )
}
