'use client'

import { Compass, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CareerSession } from '@/components/auth/session'
import { navGroups, type SectionId } from '@/components/shell/nav-config'

const workspaceMetrics = {
  candidate: { label: 'Profile strength', value: 78 },
  employer: { label: 'Pipeline health', value: 78 },
  university: { label: 'Students on track', value: 74 },
} as const

export function SidebarNav({
  active,
  session,
  onNavigate,
}: {
  active: SectionId
  session: CareerSession
  onNavigate: (id: SectionId) => void
}) {
  const metric = workspaceMetrics[session.role]

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-1.5 border-b border-sidebar-border px-5 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Compass className="size-4.5" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Career OS</span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          One profile. One lifelong career map.
        </p>
      </div>

      <nav
        aria-label="Main navigation"
        className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 py-4"
      >
        {navGroups.map((group) => (
          <div key={group.label ?? 'root'} className="flex flex-col gap-1">
            {group.label ? (
              <span className="px-2.5 pb-1 text-[0.68rem] font-medium tracking-wider text-muted-foreground uppercase">
                {group.label}
              </span>
            ) : null}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    'group flex h-9 w-full items-center gap-3 rounded-lg px-2.5 text-left text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-sidebar-ring/50 focus-visible:outline-none',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
                  )}
                >
                  <Icon
                    className={cn(
                      'size-4 shrink-0 transition-colors',
                      isActive
                        ? 'text-sidebar-primary'
                        : 'text-muted-foreground group-hover:text-sidebar-foreground',
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="rounded-lg border border-sidebar-border bg-background/40 p-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-success" />
            <span className="text-[0.68rem] font-semibold tracking-wide text-muted-foreground uppercase">
              Demo workspace
            </span>
          </div>
          <p className="mt-2 truncate text-xs font-medium">{session.workspace}</p>
          <div className="mt-3 flex items-center justify-between text-[0.68rem] text-muted-foreground">
            <span>{metric.label}</span>
            <span className="font-mono tabular-nums text-sidebar-foreground">
              {metric.value}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={metric.label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={metric.value}
            className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${metric.value}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
