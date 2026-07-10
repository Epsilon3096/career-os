import { Activity } from 'lucide-react'
import { DsSection } from '@/components/design-system/ds-section'
import {
  InsightCard,
  MarketplaceCard,
  MetricCard,
  ReadinessCard,
  WarningCard,
} from '@/components/career/data-cards'

export function DataCardsPreview() {
  return (
    <DsSection
      index="06"
      title="Data Cards"
      description="Reusable cards for metrics, readiness, insight, caution, and marketplace previews — the building blocks of Today and Compass."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          label="Career Momentum"
          value="+14%"
          delta="Rising"
          caption="Rising over the last 60 days"
          icon={Activity}
        />
        <ReadinessCard label="Backend readiness" value={72} />
        <InsightCard
          points={[
            'Observed from similar profiles with backend focus',
            'Your recent projects match 4 of 6 core signals',
            'Strong overlap with in-demand roles nearby',
          ]}
        />
        <WarningCard
          title="Portfolio proof gap"
          description="Your target roles expect demonstrable projects. Add 2 portfolio pieces to raise confidence from medium to strong."
        />
        <MarketplaceCard
          role="Backend Engineer"
          company="Northwind"
          location="Remote · UK"
          salary="£48k–£62k"
          fit="Strong fit"
        />
        <MarketplaceCard
          role="Platform Engineer"
          company="Lumen Labs"
          location="Hybrid · Berlin"
          salary="€55k–€70k"
          fit="Strong fit"
        />
      </div>
    </DsSection>
  )
}
