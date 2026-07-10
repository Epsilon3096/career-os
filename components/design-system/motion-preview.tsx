import { MousePointerClick, MoveUpRight, SunMoon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { DsSection } from '@/components/design-system/ds-section'

const items = [
  {
    icon: MoveUpRight,
    title: 'Cards lift on hover',
    body: 'Hover any card — it rises subtly and the border brightens toward the primary accent.',
  },
  {
    icon: MousePointerClick,
    title: 'Considered button states',
    body: 'Buttons ease on hover and focus, with a gentle press. No bounce, no flash.',
  },
  {
    icon: SunMoon,
    title: 'Smooth theme switch',
    body: 'Toggling theme fades tokens between navy and warm neutral without harsh jumps.',
  },
]

export function MotionPreview() {
  return (
    <DsSection
      index="10"
      title="Motion &amp; Interaction"
      description="Restrained motion: small lifts, soft brightening, and smooth transitions. Nothing exaggerated or gamified."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <Card
            key={title}
            className="group gap-3 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-200 group-hover:scale-105">
              <Icon className="size-4" />
            </span>
            <span className="text-sm font-semibold">{title}</span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          </Card>
        ))}
      </div>
    </DsSection>
  )
}
