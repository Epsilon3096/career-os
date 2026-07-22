'use client'

import { useCallback, useEffect, useState } from 'react'
import { Compass, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AuthGate } from '@/components/auth/auth-gate'
import {
  demoProfiles,
  SESSION_STORAGE_KEY,
  type CareerSession,
} from '@/components/auth/session'
import { SidebarNav } from '@/components/shell/sidebar'
import { TopBar } from '@/components/shell/top-bar'
import { CommandPalette } from '@/components/shell/command-palette'
import type { DemoRole, SectionId } from '@/components/shell/nav-config'
import { HomeSection } from '@/components/sections/home-section'
import { TodaySection } from '@/components/sections/today-section'
import { CompassSection } from '@/components/sections/compass-section'
import { DiscoverSection } from '@/components/sections/discover-section'
import { PortfolioSection } from '@/components/sections/portfolio-section'
import { HavenSection } from '@/components/sections/haven-section'
import { CompaniesSection } from '@/components/sections/companies-section'
import { EmployerSection } from '@/components/sections/employer-section'
import { UniversitySection } from '@/components/sections/university-section'

const SECTION_IDS: SectionId[] = [
  'home',
  'today',
  'compass',
  'discover',
  'portfolio',
  'haven',
  'companies',
  'employer',
  'university',
]

function sectionFromHash(): SectionId {
  if (typeof window === 'undefined') return 'home'
  const hash = window.location.hash.replace(/^#/, '')
  return (SECTION_IDS as string[]).includes(hash)
    ? (hash as SectionId)
    : 'home'
}

function landingSection(role: DemoRole): SectionId {
  if (role === 'employer') return 'employer'
  if (role === 'university') return 'university'
  return 'today'
}

function workspaceRoleForSection(id: SectionId): DemoRole | null {
  if (id === 'employer') return 'employer'
  if (id === 'university') return 'university'
  if (id !== 'home') return 'candidate'
  return null
}

export function AppShell() {
  const [active, setActive] = useState<SectionId>('home')
  const [role, setRole] = useState<DemoRole>('candidate')
  const [session, setSession] = useState<CareerSession | null | undefined>()
  const [rememberSession, setRememberSession] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  const navigate = useCallback((id: SectionId) => {
    setActive(id)
    const workspaceRole = workspaceRoleForSection(id)
    if (workspaceRole) setRole(workspaceRole)
    setMenuOpen(false)
    if (typeof window !== 'undefined' && window.location.hash !== `#${id}`) {
      window.location.hash = id
    }
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  }, [])

  useEffect(() => {
    const syncSectionFromHash = () => {
      const nextSection = sectionFromHash()
      setActive(nextSection)
      const workspaceRole = workspaceRoleForSection(nextSection)
      if (workspaceRole) setRole(workspaceRole)
      setMenuOpen(false)
    }

    syncSectionFromHash()
    const onHashChange = () => syncSectionFromHash()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    try {
      const persistent = window.localStorage.getItem(SESSION_STORAGE_KEY)
      const temporary = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
      const stored = persistent ?? temporary
      if (!stored) {
        setSession(null)
        return
      }
      const parsed = JSON.parse(stored) as CareerSession
      setSession(parsed)
      setRole(workspaceRoleForSection(sectionFromHash()) ?? parsed.role)
      setRememberSession(Boolean(persistent))
    } catch {
      setSession(null)
    }
  }, [])

  const persistSession = useCallback(
    (next: CareerSession, remember = rememberSession) => {
      try {
        window.localStorage.removeItem(SESSION_STORAGE_KEY)
        window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
        const storage = remember ? window.localStorage : window.sessionStorage
        storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(next))
      } catch {
        // The active session still works in memory if browser storage is blocked.
      }
    },
    [rememberSession],
  )

  const handleAuthenticated = useCallback(
    (next: CareerSession, remember: boolean) => {
      setSession(next)
      setRole(next.role)
      setRememberSession(remember)
      persistSession(next, remember)
      navigate(landingSection(next.role))
    },
    [navigate, persistSession],
  )

  const handleSignOut = useCallback(() => {
    try {
      window.localStorage.removeItem(SESSION_STORAGE_KEY)
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
    } catch {
      // Ignore storage restrictions and always clear the in-memory session.
    }
    setCommandOpen(false)
    setMenuOpen(false)
    setSession(null)
    setRole('candidate')
    setActive('home')
    window.history.replaceState(null, '', window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleRoleChange = useCallback(
    (next: DemoRole) => {
      setRole(next)
      navigate(landingSection(next))
    },
    [navigate],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((current) => !current)
      }
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex size-9 animate-pulse items-center justify-center rounded-lg bg-primary text-primary-foreground motion-reduce:animate-none">
            <Compass className="size-4" />
          </span>
          Loading Career OS…
        </div>
      </div>
    )
  }

  if (!session) {
    return <AuthGate onAuthenticated={handleAuthenticated} />
  }

  const previewProfile = demoProfiles.find((profile) => profile.role === role)!
  const workspaceSession: CareerSession =
    role === session.role
      ? session
      : {
          ...session,
          id: `preview-${role}`,
          email: previewProfile.email,
          name: previewProfile.name,
          role,
          workspace: previewProfile.workspace,
          caption: previewProfile.caption,
        }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:block">
        <SidebarNav active={active} session={workspaceSession} onNavigate={navigate} />
      </aside>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-foreground/30 backdrop-blur-xs"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-xl">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-3 inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <X className="size-4" />
            </button>
            <SidebarNav active={active} session={workspaceSession} onNavigate={navigate} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <TopBar
          active={active}
          role={role}
          session={workspaceSession}
          onRoleChange={handleRoleChange}
          onNavigate={navigate}
          onOpenMenu={() => setMenuOpen(true)}
          onOpenSearch={() => setCommandOpen(true)}
          onSignOut={handleSignOut}
        />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          <div
            key={active}
            className={cn('animate-in fade-in slide-in-from-bottom-1 duration-300 motion-reduce:animate-none')}
          >
            {active === 'home' ? <HomeSection onNavigate={navigate} /> : null}
            {active === 'today' ? <TodaySection onNavigate={navigate} /> : null}
            {active === 'compass' ? <CompassSection onNavigate={navigate} /> : null}
            {active === 'discover' ? <DiscoverSection onNavigate={navigate} /> : null}
            {active === 'portfolio' ? <PortfolioSection onNavigate={navigate} /> : null}
            {active === 'haven' ? <HavenSection onNavigate={navigate} /> : null}
            {active === 'companies' ? <CompaniesSection onNavigate={navigate} /> : null}
            {active === 'employer' ? <EmployerSection onNavigate={navigate} /> : null}
            {active === 'university' ? <UniversitySection onNavigate={navigate} /> : null}
          </div>
        </main>
      </div>

      <CommandPalette
        open={commandOpen}
        role={role}
        onOpenChange={setCommandOpen}
        onNavigate={navigate}
        onRoleChange={handleRoleChange}
        onSignOut={handleSignOut}
      />
    </div>
  )
}
