import { cn } from '@/lib/utils'

export function DsSection({
  index,
  title,
  description,
  children,
  className,
}: {
  index: string
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn('scroll-mt-24', className)}>
      <div className="mb-5 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-primary">{index}</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

export function DsLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  )
}
