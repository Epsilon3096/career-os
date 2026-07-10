import { DsHeader } from '@/components/design-system/ds-header'
import { ColorTokens } from '@/components/design-system/color-tokens'
import { TypographyPreview } from '@/components/design-system/typography-preview'
import {
  BadgesPreview,
  ButtonsPreview,
} from '@/components/design-system/controls-preview'
import { DataCardsPreview } from '@/components/design-system/data-cards-preview'
import { ProgressPreview } from '@/components/design-system/progress-preview'
import { ChartsPreview } from '@/components/design-system/charts-preview'
import { HavenPreview } from '@/components/design-system/haven-preview'
import { MotionPreview } from '@/components/design-system/motion-preview'
import { LayoutPreview } from '@/components/design-system/layout-preview'
import { SignalBadge } from '@/components/career/signal-badge'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <DsHeader />

      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        {/* Section 1: Intro */}
        <section className="border-b border-border py-12 sm:py-16">
          <div className="flex flex-col gap-4">
            <SignalBadge tone="primary" className="w-fit">
              Phase 0 · Design System
            </SignalBadge>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              The foundation for Career OS
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty">
              A professional, editorial, and calm component system for the
              Compass / Career Path Navigator. Navigation, not prediction — we
              surface realistic options, trade-offs, and next actions. Reusable
              tokens and blocks ready to scale into Today, Compass, Discover,
              Portfolio, Haven, Companies, and beyond.
            </p>
          </div>
        </section>

        <div className="flex flex-col gap-14 py-12 sm:gap-16">
          <ColorTokens />
          <TypographyPreview />
          <ButtonsPreview />
          <BadgesPreview />
          <DataCardsPreview />
          <ProgressPreview />
          <ChartsPreview />
          <HavenPreview />
          <MotionPreview />
          <LayoutPreview />
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <span>Career OS · Compass-ready design system</span>
          <span className="font-mono text-xs">One profile. One lifelong career map.</span>
        </div>
      </footer>
    </div>
  )
}
