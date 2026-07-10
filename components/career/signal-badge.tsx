import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const signalBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap transition-colors [&_svg]:size-3 [&_svg]:shrink-0',
  {
    variants: {
      tone: {
        neutral: 'border-border bg-muted text-muted-foreground',
        primary:
          'border-primary/25 bg-primary/10 text-primary dark:border-primary/30',
        success:
          'border-success/30 bg-success-muted/60 text-success dark:text-success',
        warning:
          'border-warning/40 bg-warning-muted/60 text-warning-foreground dark:text-warning',
        risk: 'border-risk/30 bg-risk-muted/60 text-risk dark:text-risk',
        outline: 'border-border bg-transparent text-foreground',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
)

export interface SignalBadgeProps
  extends ComponentProps<'span'>,
    VariantProps<typeof signalBadgeVariants> {}

export function SignalBadge({
  className,
  tone,
  ...props
}: SignalBadgeProps) {
  return (
    <span
      data-slot="signal-badge"
      className={cn(signalBadgeVariants({ tone }), className)}
      {...props}
    />
  )
}

export { signalBadgeVariants }
