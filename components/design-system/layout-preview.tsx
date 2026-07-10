import {
  Bell,
  Building2,
  Compass,
  Home,
  LayoutGrid,
  MessageCircle,
  Search,
  User,
} from 'lucide-react'
import { DsSection } from '@/components/design-system/ds-section'
import { SignalBadge } from '@/components/career/signal-badge'
import { CircularProgress, ProgressBar } from '@/components/career/progress'

const nav = [
  { icon: Home, label: 'Today', active: false },
  { icon: Compass, label: 'Compass', active: true },
  { icon: LayoutGrid, label: 'Discover', active: false },
  { icon: MessageCircle, label: 'Haven', active: false },
  { icon: Building2, label: 'Companies', active: false },
]

export function LayoutPreview() {
  return (
    <DsSection
      index="11"
      title="Layout Preview"
      description="A mock Compass dashboard assembled from the components above — sidebar, top navigation, and a content card grid."
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <div className="flex min-h-[26rem]">
          {/* Sidebar */}
          <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-border bg-sidebar p-3 md:flex">
            <div className="mb-3 flex items-center gap-2 px-2 py-1">
              <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Compass className="size-4" />
              </span>
              <span className="text-sm font-semibold">Career OS</span>
            </div>
            {nav.map(({ icon: Icon, label, active }) => (
              <span
                key={label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="size-4" />
                {label}
              </span>
            ))}
            <div className="mt-auto flex items-center gap-2 rounded-lg border border-border p-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                AR
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-medium leading-tight">
                  Aria Reyes
                </span>
                <span className="text-[0.65rem] text-muted-foreground">
                  Early career
                </span>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Top nav */}
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-sm font-semibold">
                  Compass · Career Path Navigator
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground sm:flex">
                  <Search className="size-3.5" />
                  Search roles
                </span>
                <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground">
                  <Bell className="size-4" />
                </span>
                <span className="flex size-8 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground">
                  <User className="size-4" />
                </span>
              </div>
            </div>

            {/* Content grid */}
            <div className="grid flex-1 grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    Backend Engineer
                  </span>
                  <SignalBadge tone="success">Strong fit</SignalBadge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Observed from similar profiles. Rising demand nearby with a
                  clear path from your current strengths.
                </p>
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Readiness</span>
                    <span className="font-mono">72%</span>
                  </div>
                  <ProgressBar value={72} />
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4">
                <CircularProgress value={72} size={92} strokeWidth={8} />
                <span className="text-xs text-muted-foreground">
                  Overall readiness
                </span>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
                <span className="text-xs text-muted-foreground">
                  Career Momentum
                </span>
                <span className="text-2xl font-semibold tracking-tight">
                  +14%
                </span>
                <SignalBadge tone="primary" className="w-fit">
                  Rising 60d
                </SignalBadge>
              </div>

              <div className="flex flex-col gap-2 rounded-xl border border-warning/40 bg-warning-muted/30 p-4 sm:col-span-2">
                <span className="text-sm font-semibold">
                  Portfolio proof gap
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Add 2 portfolio pieces to move confidence from medium to
                  strong.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DsSection>
  )
}
