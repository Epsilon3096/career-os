'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      {mounted ? (
        <>
          <Sun
            className={cn(
              'size-4 transition-all duration-300',
              isDark
                ? 'scale-0 -rotate-90 opacity-0'
                : 'scale-100 rotate-0 opacity-100',
            )}
          />
          <Moon
            className={cn(
              'absolute size-4 transition-all duration-300',
              isDark
                ? 'scale-100 rotate-0 opacity-100'
                : 'scale-0 rotate-90 opacity-0',
            )}
          />
        </>
      ) : (
        <span className="size-4" />
      )}
    </button>
  )
}
