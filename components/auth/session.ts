import type { DemoRole } from '@/components/shell/nav-config'

export const SESSION_STORAGE_KEY = 'career-os.demo-session.v1'

export interface CareerSession {
  id: string
  email: string
  name: string
  role: DemoRole
  workspace: string
  caption: string
  signedInAt: string
}

export interface DemoProfile {
  role: DemoRole
  email: string
  name: string
  workspace: string
  caption: string
}

export const demoProfiles: DemoProfile[] = [
  {
    role: 'candidate',
    email: 'aisyah@career-os.demo',
    name: 'Aisyah Rahman',
    workspace: 'Personal career workspace',
    caption: 'Data Analyst · Kuala Lumpur',
  },
  {
    role: 'employer',
    email: 'talent@cimb.demo',
    name: 'CIMB Talent Team',
    workspace: 'CIMB early-career hiring',
    caption: 'Employer workspace',
  },
  {
    role: 'university',
    email: 'outcomes@um.demo',
    name: 'Universiti Malaya',
    workspace: 'Graduate outcomes office',
    caption: 'University workspace',
  },
]

export function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function createCareerSession(
  profile: DemoProfile,
  overrides?: Partial<Pick<CareerSession, 'email' | 'name'>>,
): CareerSession {
  return {
    id: `${profile.role}-${Date.now()}`,
    email: overrides?.email?.trim() || profile.email,
    name: overrides?.name?.trim() || profile.name,
    role: profile.role,
    workspace: profile.workspace,
    caption: profile.caption,
    signedInAt: new Date().toISOString(),
  }
}
