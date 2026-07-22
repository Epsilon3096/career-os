import { BookOpenCheck, BriefcaseBusiness, Scale } from 'lucide-react'
import { SignalBadge } from '@/components/career/signal-badge'

const goalConfig = {
  4: {
    label: 'Quality education',
    icon: BookOpenCheck,
  },
  8: {
    label: 'Decent work',
    icon: BriefcaseBusiness,
  },
  10: {
    label: 'Reduced inequalities',
    icon: Scale,
  },
} as const

export type SdgGoal = keyof typeof goalConfig

export function SdgBadge({ goal }: { goal: SdgGoal }) {
  const config = goalConfig[goal]
  const Icon = config.icon

  return (
    <SignalBadge
      tone="outline"
      title={`United Nations Sustainable Development Goal ${goal}: ${config.label}`}
    >
      <Icon />
      SDG {goal} · {config.label}
    </SignalBadge>
  )
}
