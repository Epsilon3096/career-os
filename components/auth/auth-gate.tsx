'use client'

import { useMemo, useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Briefcase,
  Check,
  Compass,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DemoRole } from '@/components/shell/nav-config'
import {
  createCareerSession,
  demoProfiles,
  type CareerSession,
} from '@/components/auth/session'

type AuthMode = 'signin' | 'create'

const roleDetails = {
  candidate: {
    icon: UserRound,
    label: 'Candidate',
    description: 'Plan your next move',
  },
  employer: {
    icon: Briefcase,
    label: 'Employer',
    description: 'Review talent signals',
  },
  university: {
    icon: GraduationCap,
    label: 'University',
    description: 'Track career outcomes',
  },
} satisfies Record<
  DemoRole,
  { icon: typeof UserRound; label: string; description: string }
>

const valuePoints = [
  'Compare realistic career paths and trade-offs',
  'Turn projects into proof employers can understand',
  'Follow a focused 30-day action plan',
]

export function AuthGate({
  onAuthenticated,
}: {
  onAuthenticated: (session: CareerSession, remember: boolean) => void
}) {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [role, setRole] = useState<DemoRole>('candidate')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const selectedProfile = useMemo(
    () => demoProfiles.find((profile) => profile.role === role)!,
    [role],
  )

  const finish = (
    selectedRole: DemoRole,
    overrides?: { email?: string; name?: string },
  ) => {
    const profile = demoProfiles.find((item) => item.role === selectedRole)!
    onAuthenticated(createCareerSession(profile, overrides), remember)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setNotice('')

    if (mode === 'create' && name.trim().length < 2) {
      setError('Enter the name you want shown in your workspace.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 6) {
      setError('Use at least 6 characters for this demo password.')
      return
    }

    finish(role, {
      email,
      name: mode === 'create' ? name : selectedProfile.name,
    })
  }

  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(480px,0.95fr)]">
      <section className="relative hidden min-h-screen overflow-hidden border-r border-border bg-sidebar px-10 py-10 lg:flex lg:flex-col xl:px-16 xl:py-14">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Compass className="size-5" />
          </span>
          <div>
            <p className="text-base font-semibold">Career OS</p>
            <p className="text-xs text-muted-foreground">
              Career clarity that turns into action
            </p>
          </div>
        </div>

        <div className="my-auto flex max-w-xl flex-col gap-8 py-16">
          <div className="flex flex-col gap-4">
            <span className="w-fit rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Your career, made navigable
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-balance xl:text-5xl">
              Know where you stand. Choose what to do next.
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              Career OS connects your goals, work history, skills, and market
              signals into a clear path you can act on.
            </p>
          </div>

          <div className="grid gap-3">
            {valuePoints.map((point) => (
              <div key={point} className="flex items-center gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success-muted text-success">
                  <Check className="size-3.5" />
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="grid max-w-lg grid-cols-[1fr_auto] gap-5 rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Highest-impact move
                </span>
                <span className="rounded-full bg-success-muted px-2 py-0.5 text-[0.68rem] font-semibold text-success">
                  +8 readiness
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Deploy your inventory API with Docker
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Closes the top gap across 7 of your 10 best-matched roles.
                </p>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[72%] rounded-full bg-primary" />
              </div>
            </div>
            <div className="flex size-14 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-lg font-semibold text-primary">
              72%
            </div>
          </div>
        </div>

        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Demo data only. No real account or career data is transmitted.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Compass className="size-4.5" />
            </span>
            <span className="text-base font-semibold">Career OS</span>
          </div>

          <div className="mb-7">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">
              Demo workspace
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {mode === 'signin' ? 'Welcome back' : 'Create your workspace'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {mode === 'signin'
                ? 'Sign in or choose a demo profile to explore Career OS.'
                : 'Set up a local demo profile. Real account services can be connected later.'}
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-lg bg-muted p-1" role="tablist">
            {(['signin', 'create'] as AuthMode[]).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={mode === item}
                onClick={() => {
                  setMode(item)
                  setError('')
                  setNotice('')
                }}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                  mode === item
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {item === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <fieldset className="grid grid-cols-3 gap-2">
              <legend className="mb-2 text-xs font-medium text-muted-foreground">
                Workspace view
              </legend>
              {(Object.keys(roleDetails) as DemoRole[]).map((item) => {
                const details = roleDetails[item]
                const Icon = details.icon
                const active = item === role
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setRole(item)}
                    className={cn(
                      'flex min-w-0 flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none',
                      active
                        ? 'border-primary bg-primary/8 text-foreground'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground',
                    )}
                  >
                    <Icon className={cn('size-4', active && 'text-primary')} />
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold">
                        {details.label}
                      </span>
                      <span className="mt-0.5 hidden text-[0.68rem] leading-tight text-muted-foreground sm:block">
                        {details.description}
                      </span>
                    </span>
                  </button>
                )
              })}
            </fieldset>

            {mode === 'create' ? (
              <label className="flex flex-col gap-2 text-sm font-medium">
                Display name
                <span className="relative">
                  <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    placeholder="Aisyah Rahman"
                    className="h-11 w-full rounded-lg border border-input bg-background pr-3 pl-10 text-sm font-normal outline-none transition focus:border-primary focus:ring-3 focus:ring-ring/25"
                  />
                </span>
              </label>
            ) : null}

            <label className="flex flex-col gap-2 text-sm font-medium">
              Email address
              <span className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder={selectedProfile.email}
                  className="h-11 w-full rounded-lg border border-input bg-background pr-3 pl-10 text-sm font-normal outline-none transition focus:border-primary focus:ring-3 focus:ring-ring/25"
                />
              </span>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Password
              <span className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  placeholder="Minimum 6 characters"
                  className="h-11 w-full rounded-lg border border-input bg-background pr-11 pl-10 text-sm font-normal outline-none transition focus:border-primary focus:ring-3 focus:ring-ring/25"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute top-1/2 right-2.5 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </span>
            </label>

            <div className="flex items-center justify-between gap-4 text-xs">
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                  className="size-4 accent-[var(--primary)]"
                />
                Keep me signed in on this device
              </label>
              {mode === 'signin' ? (
                <button
                  type="button"
                  className="shrink-0 font-medium text-primary hover:underline"
                  onClick={() => {
                    setError('')
                    setNotice('Password reset is simulated in this demo.')
                  }}
                >
                  Forgot password?
                </button>
              ) : null}
            </div>

            {error ? (
              <p role="alert" className="rounded-lg border border-risk/25 bg-risk-muted/40 px-3 py-2 text-xs text-risk dark:text-risk">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p role="status" className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                {notice}
              </p>
            ) : null}

            <Button type="submit" size="lg" className="w-full">
              {mode === 'signin' ? 'Sign in to workspace' : 'Create demo workspace'}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-[0.68rem] font-medium tracking-wide text-muted-foreground uppercase">
            <span className="h-px flex-1 bg-border" />
            Or explore instantly
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {demoProfiles.map((profile) => {
              const details = roleDetails[profile.role]
              const Icon = details.icon
              return (
                <button
                  key={profile.role}
                  type="button"
                  onClick={() => finish(profile.role)}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-colors hover:border-primary/35 hover:bg-primary/5 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:flex-col sm:items-start"
                >
                  <Icon className="size-4 text-primary" />
                  <span className="text-xs font-medium">{details.label} demo</span>
                </button>
              )
            })}
          </div>

          <p className="mt-6 text-center text-[0.7rem] leading-relaxed text-muted-foreground">
            Demo sign-in runs only in this browser. Connect a secure identity
            provider and database before using real personal data.
          </p>
        </div>
      </section>
    </main>
  )
}
