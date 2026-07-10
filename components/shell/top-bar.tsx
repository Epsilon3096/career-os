'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FolderKanban,
  LogOut,
  Menu,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { initialsFor, type CareerSession } from '@/components/auth/session'
import {
  roleConfig,
  sectionTitles,
  type DemoRole,
  type SectionId,
} from '@/components/shell/nav-config'

const roles: DemoRole[] = ['candidate', 'employer', 'university']

const notifications = [
  {
    icon: CheckCircle2,
    title: 'Docker proof added to your plan',
    detail: 'Readiness scenario: +8 points',
    tone: 'text-success bg-success-muted/60',
    target: 'today' as const,
  },
  {
    icon: Clock3,
    title: 'CIMB interview rehearsal is ready',
    detail: '8 questions · about 20 minutes',
    tone: 'text-primary bg-primary/10',
    target: 'haven' as const,
  },
]

export function TopBar({
  active,
  role,
  session,
  onRoleChange,
  onNavigate,
  onOpenMenu,
  onOpenSearch,
  onSignOut,
}: {
  active: SectionId
  role: DemoRole
  session: CareerSession
  onRoleChange: (role: DemoRole) => void
  onNavigate: (section: SectionId) => void
  onOpenMenu: () => void
  onOpenSearch: () => void
  onSignOut: () => void
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const controlsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeMenus = (event: PointerEvent) => {
      if (!controlsRef.current?.contains(event.target as Node)) {
        setNotificationsOpen(false)
        setAccountOpen(false)
      }
    }
    window.addEventListener('pointerdown', closeMenus)
    return () => window.removeEventListener('pointerdown', closeMenus)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/92 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={onOpenMenu}
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none lg:hidden"
      >
        <Menu className="size-4" />
      </button>

      <div className="flex min-w-0 items-center gap-2">
        <span className="hidden text-sm font-semibold tracking-tight sm:inline lg:hidden">
          Career OS
        </span>
        <span aria-hidden="true" className="hidden text-muted-foreground/50 sm:inline lg:hidden">
          /
        </span>
        <h2 className="truncate text-sm font-medium text-foreground">
          {sectionTitles[active]}
        </h2>
      </div>

      <button
        type="button"
        onClick={onOpenSearch}
        className="ml-auto hidden h-9 w-48 items-center gap-2 rounded-lg border border-border bg-surface px-3 text-left text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:bg-muted/60 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:flex xl:w-64"
      >
        <Search className="size-3.5" />
        <span className="min-w-0 flex-1 truncate">Search Career OS</span>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.62rem]">
          Ctrl K
        </kbd>
      </button>

      <div ref={controlsRef} className="relative flex items-center gap-1.5 sm:gap-2">
        <div
          role="group"
          aria-label="Demo workspace switcher"
          className="hidden items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 xl:flex"
        >
          {roles.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onRoleChange(item)}
              aria-pressed={role === item}
              className={cn(
                'rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                role === item
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {roleConfig[item].label}
            </button>
          ))}
        </div>

        <select
          aria-label="Demo workspace switcher"
          value={role}
          onChange={(event) => onRoleChange(event.target.value as DemoRole)}
          className="hidden h-9 max-w-28 rounded-lg border border-border bg-surface px-2 text-xs font-medium text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:block xl:hidden"
        >
          {roles.map((item) => (
            <option key={item} value={item}>
              {roleConfig[item].label}
            </option>
          ))}
        </select>

        <button
          type="button"
          aria-label="Search Career OS"
          onClick={onOpenSearch}
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:hidden"
        >
          <Search className="size-4" />
        </button>

        <div className="relative">
          <button
            type="button"
            aria-label="Open notifications"
            aria-expanded={notificationsOpen}
            onClick={() => {
              setNotificationsOpen((current) => !current)
              setAccountOpen(false)
            }}
            className="relative inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-risk ring-2 ring-surface" />
          </button>

          {notificationsOpen ? (
            <div className="absolute top-11 right-0 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                  <p className="text-sm font-semibold">Notifications</p>
                  <p className="text-[0.68rem] text-muted-foreground">2 updates for your plan</p>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.68rem] font-medium text-primary">New</span>
              </div>
              <div className="divide-y divide-border">
                {notifications.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => {
                        setNotificationsOpen(false)
                        onNavigate(item.target)
                      }}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/60"
                    >
                      <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg', item.tone)}>
                        <Icon className="size-4" />
                      </span>
                      <span>
                        <span className="block text-xs font-medium leading-snug">{item.title}</span>
                        <span className="mt-1 block text-[0.68rem] text-muted-foreground">{item.detail}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}
        </div>

        <ThemeToggle />

        <div className="relative">
          <button
            type="button"
            aria-label="Open account menu"
            aria-expanded={accountOpen}
            onClick={() => {
              setAccountOpen((current) => !current)
              setNotificationsOpen(false)
            }}
            className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface py-1 pr-2 pl-1 transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-primary/15 text-[0.68rem] font-semibold text-primary">
              {initialsFor(session.name)}
            </span>
            <span className="hidden min-w-0 max-w-28 flex-col text-left leading-none lg:flex">
              <span className="truncate text-xs font-medium">{session.name}</span>
              <span className="mt-1 truncate text-[0.62rem] text-muted-foreground">
                {session.caption}
              </span>
            </span>
            <ChevronDown className="hidden size-3 text-muted-foreground lg:block" />
          </button>

          {accountOpen ? (
            <div className="absolute top-11 right-0 w-64 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
              <div className="border-b border-border px-4 py-3">
                <p className="truncate text-sm font-semibold">{session.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{session.email}</p>
                <p className="mt-2 rounded-md bg-muted px-2 py-1.5 text-[0.68rem] text-muted-foreground">
                  {session.workspace}
                </p>
              </div>
              <div className="p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false)
                    onNavigate('compass')
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <SlidersHorizontal className="size-3.5" />
                  Career priorities
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false)
                    onNavigate('portfolio')
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <FolderKanban className="size-3.5" />
                  Portfolio and proof
                </button>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-risk transition-colors hover:bg-risk-muted/50"
                >
                  <LogOut className="size-3.5" />
                  Sign out
                </button>
              </div>
              <p className="border-t border-border px-4 py-2 text-[0.62rem] text-muted-foreground">
                Demo session · device-local data
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}
