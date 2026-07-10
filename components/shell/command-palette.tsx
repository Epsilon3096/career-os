'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  LogOut,
  Search,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  navGroups,
  type DemoRole,
  type SectionId,
} from '@/components/shell/nav-config'

interface PaletteItem {
  id: string
  label: string
  description: string
  group: 'Navigate' | 'Workspace' | 'Account'
  icon: LucideIcon
  action: () => void
}

export function CommandPalette({
  open,
  role,
  onOpenChange,
  onNavigate,
  onRoleChange,
  onSignOut,
}: {
  open: boolean
  role: DemoRole
  onOpenChange: (open: boolean) => void
  onNavigate: (id: SectionId) => void
  onRoleChange: (role: DemoRole) => void
  onSignOut: () => void
}) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<PaletteItem[]>(() => {
    const navigation = navGroups.flatMap((group) =>
      group.items.map((item) => ({
        id: `nav-${item.id}`,
        label: item.label,
        description:
          item.id === 'today'
            ? 'Open your career dashboard'
            : `Go to ${item.label}`,
        group: 'Navigate' as const,
        icon: item.icon,
        action: () => onNavigate(item.id),
      })),
    )

    const workspace: PaletteItem[] = [
      {
        id: 'role-candidate',
        label: 'Candidate workspace',
        description: role === 'candidate' ? 'Current view' : 'Preview candidate tools',
        group: 'Workspace',
        icon: UserRound,
        action: () => onRoleChange('candidate'),
      },
      {
        id: 'role-employer',
        label: 'Employer workspace',
        description: role === 'employer' ? 'Current view' : 'Preview hiring tools',
        group: 'Workspace',
        icon: Briefcase,
        action: () => onRoleChange('employer'),
      },
      {
        id: 'role-university',
        label: 'University workspace',
        description: role === 'university' ? 'Current view' : 'Preview outcomes tools',
        group: 'Workspace',
        icon: GraduationCap,
        action: () => onRoleChange('university'),
      },
    ]

    return [
      ...navigation,
      ...workspace,
      {
        id: 'sign-out',
        label: 'Sign out',
        description: 'Return to the demo sign-in screen',
        group: 'Account',
        icon: LogOut,
        action: onSignOut,
      },
    ]
  }, [onNavigate, onRoleChange, onSignOut, role])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return items
    return items.filter((item) =>
      `${item.label} ${item.description} ${item.group}`
        .toLowerCase()
        .includes(normalized),
    )
  }, [items, query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActiveIndex(0)
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  useEffect(() => {
    if (activeIndex > filtered.length - 1) setActiveIndex(0)
  }, [activeIndex, filtered.length])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((index) =>
          filtered.length ? (index + 1) % filtered.length : 0,
        )
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((index) =>
          filtered.length
            ? (index - 1 + filtered.length) % filtered.length
            : 0,
        )
      }
      if (event.key === 'Enter' && filtered[activeIndex]) {
        event.preventDefault()
        filtered[activeIndex].action()
        onOpenChange(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, filtered, onOpenChange, open])

  if (!open) return null

  let previousGroup: PaletteItem['group'] | null = null

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh] sm:pt-[16vh]">
      <button
        type="button"
        aria-label="Close command menu"
        onClick={() => onOpenChange(false)}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm dark:bg-black/55"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Search and navigate"
        className="relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActiveIndex(0)
            }}
            placeholder="Search pages, tools, and workspaces"
            className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label="Close command menu"
            onClick={() => onOpenChange(false)}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-2">
          {filtered.length ? (
            filtered.map((item, index) => {
              const showGroup = item.group !== previousGroup
              previousGroup = item.group
              const Icon = item.icon
              return (
                <div key={item.id}>
                  {showGroup ? (
                    <p className="px-2.5 pt-3 pb-1.5 text-[0.68rem] font-semibold tracking-wide text-muted-foreground uppercase first:pt-1.5">
                      {item.group}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      item.action()
                      onOpenChange(false)
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                      index === activeIndex ? 'bg-accent' : 'hover:bg-muted/70',
                    )}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {item.label}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                    <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" />
                  </button>
                </div>
              )
            })
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm font-medium">No matching command</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Try a page name such as Compass, Portfolio, or Companies.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-border bg-muted/40 px-4 py-2 text-[0.68rem] text-muted-foreground">
          <span>↑↓ Move</span>
          <span>Enter Open</span>
          <span>Esc Close</span>
        </div>
      </section>
    </div>
  )
}
