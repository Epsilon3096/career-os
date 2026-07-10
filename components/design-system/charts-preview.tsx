import { Card, CardTitle } from '@/components/ui/card'
import { DsSection } from '@/components/design-system/ds-section'
import {
  FacultyOutcomeBars,
  HiringFunnel,
  SalaryLineChart,
  SkillGapBars,
} from '@/components/career/charts'

const chartHover =
  'transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40'

export function ChartsPreview() {
  return (
    <DsSection
      index="08"
      title="Chart Previews"
      description="Phase 0 visual placeholders built with CSS and SVG only — no chart library yet. They establish the shape and tone of later data visuals."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className={chartHover}>
          <div className="flex items-center justify-between">
            <CardTitle>Salary progression</CardTitle>
            <span className="font-mono text-xs text-muted-foreground">5Y</span>
          </div>
          <SalaryLineChart points={[28, 32, 38, 41, 47, 55, 62]} />
        </Card>

        <Card className={chartHover}>
          <CardTitle>Skill gap</CardTitle>
          <SkillGapBars
            skills={[
              { label: 'APIs', value: 78 },
              { label: 'Databases', value: 64 },
              { label: 'System design', value: 42 },
              { label: 'Testing', value: 30 },
            ]}
          />
        </Card>

        <Card className={chartHover}>
          <CardTitle>Hiring funnel</CardTitle>
          <HiringFunnel
            stages={[
              { label: 'Applied', value: 100 },
              { label: 'Screen', value: 48 },
              { label: 'Interview', value: 22 },
              { label: 'Offer', value: 9 },
            ]}
          />
        </Card>

        <Card className={chartHover}>
          <CardTitle>Faculty outcomes</CardTitle>
          <FacultyOutcomeBars
            faculties={[
              { label: 'CS', value: 88 },
              { label: 'Eng', value: 74 },
              { label: 'Bus', value: 66 },
              { label: 'Arts', value: 52 },
              { label: 'Sci', value: 70 },
            ]}
          />
        </Card>
      </div>
    </DsSection>
  )
}
