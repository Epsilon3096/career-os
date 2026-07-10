import { Card } from '@/components/ui/card'
import { DsLabel, DsSection } from '@/components/design-system/ds-section'
import {
  CircularProgress,
  JourneyBar,
  ProgressBar,
  type JourneyStage,
} from '@/components/career/progress'

const stages: JourneyStage[] = [
  { label: 'School', stage: 'complete' },
  { label: 'University', stage: 'complete' },
  { label: 'First Job', stage: 'current' },
  { label: 'Early Career', stage: 'upcoming' },
  { label: 'Mid Career', stage: 'upcoming' },
]

export function ProgressPreview() {
  return (
    <DsSection
      index="07"
      title="Progress Components"
      description="Linear and circular indicators plus the lifelong career journey bar — the spine of the Career OS narrative."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="gap-4 lg:col-span-2">
          <div className="flex flex-col gap-3">
            <DsLabel>Linear progress</DsLabel>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Backend readiness</span>
                <span className="font-mono">72%</span>
              </div>
              <ProgressBar value={72} tone="primary" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Portfolio evidence</span>
                <span className="font-mono">40%</span>
              </div>
              <ProgressBar value={40} tone="warning" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Interview practice</span>
                <span className="font-mono">18%</span>
              </div>
              <ProgressBar value={18} tone="risk" />
            </div>
          </div>
        </Card>

        <Card className="items-center justify-center gap-3">
          <DsLabel>Circular indicator</DsLabel>
          <CircularProgress value={72} label="Readiness" />
        </Card>

        <Card className="gap-4 lg:col-span-3">
          <DsLabel>Career journey stage</DsLabel>
          <div className="pt-1">
            <JourneyBar stages={stages} />
          </div>
        </Card>
      </div>
    </DsSection>
  )
}
