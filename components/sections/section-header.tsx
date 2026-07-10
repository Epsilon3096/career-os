export function SectionHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </header>
  )
}
