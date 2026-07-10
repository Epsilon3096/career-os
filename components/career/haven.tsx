'use client'

import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChatBubble({
  role,
  children,
}: {
  role: 'haven' | 'user'
  children: React.ReactNode
}) {
  const isHaven = role === 'haven'
  return (
    <div
      className={cn(
        'flex items-end gap-2',
        isHaven ? 'justify-start' : 'justify-end',
      )}
    >
      {isHaven ? (
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Sparkles className="size-3.5" />
        </span>
      ) : null}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isHaven
            ? 'rounded-bl-sm border border-border bg-surface-elevated text-foreground'
            : 'rounded-br-sm bg-primary text-primary-foreground',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Sparkles className="size-3.5" />
      </span>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-surface-elevated px-3.5 py-3">
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
      </div>
    </div>
  )
}

export function AskHavenButton({
  className,
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none active:translate-y-px',
        className,
      )}
    >
      <Sparkles className="size-4" />
      Ask Haven
    </button>
  )
}

export function SuggestionChip({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
    >
      {children}
    </button>
  )
}
