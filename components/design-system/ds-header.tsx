import { Compass } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { SignalBadge } from '@/components/career/signal-badge'

export function DsHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Compass className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight tracking-tight">
              Career OS
            </span>
            <span className="hidden text-xs text-muted-foreground sm:block">
              One profile. One lifelong career map.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <SignalBadge tone="primary" className="hidden sm:inline-flex">
            Compass-ready design system
          </SignalBadge>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
