import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  Building2,
  Compass,
  FolderKanban,
  GraduationCap,
  Home,
  Search,
  Sparkles,
  Sun,
} from 'lucide-react'

export type SectionId =
  | 'home'
  | 'today'
  | 'compass'
  | 'discover'
  | 'portfolio'
  | 'haven'
  | 'companies'
  | 'employer'
  | 'university'

export type DemoRole = 'candidate' | 'employer' | 'university'

export interface NavItem {
  id: SectionId
  label: string
  icon: LucideIcon
}

export interface NavGroup {
  label: string | null
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: null,
    items: [{ id: 'home', label: 'Home', icon: Home }],
  },
  {
    label: 'Candidate',
    items: [
      { id: 'today', label: 'Dashboard', icon: Sun },
      { id: 'compass', label: 'Compass', icon: Compass },
      { id: 'discover', label: 'Job Listings', icon: Search },
      { id: 'portfolio', label: 'Portfolio', icon: FolderKanban },
      { id: 'haven', label: 'Haven', icon: Sparkles },
      { id: 'companies', label: 'Company Directory', icon: Building2 },
    ],
  },
  {
    label: 'Ecosystem previews',
    items: [
      { id: 'employer', label: 'Employer Dashboard', icon: Briefcase },
      { id: 'university', label: 'University Dashboard', icon: GraduationCap },
    ],
  },
]

export const sectionTitles: Record<SectionId, string> = {
  home: 'Home',
  today: 'Career Dashboard',
  compass: 'Compass',
  discover: 'Job Listings',
  portfolio: 'Portfolio',
  haven: 'Haven',
  companies: 'Company Directory',
  employer: 'Employer Dashboard',
  university: 'University Dashboard',
}

export const roleConfig: Record<
  DemoRole,
  { label: string; initials: string; name: string; caption: string }
> = {
  candidate: {
    label: 'Candidate',
    initials: 'AR',
    name: 'Aisyah Rahman',
    caption: 'Data Analyst · Kuala Lumpur',
  },
  employer: {
    label: 'Employer',
    initials: 'CI',
    name: 'CIMB Talent Team',
    caption: 'Employer workspace',
  },
  university: {
    label: 'University',
    initials: 'UM',
    name: 'Universiti Malaya',
    caption: 'Outcomes office',
  },
}
