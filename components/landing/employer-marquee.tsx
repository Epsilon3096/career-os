const companies = [
  'CIMB',
  'Maybank',
  'Petronas',
  'Grab',
  'Shell',
  'Intel',
  'Microsoft',
  'Dell',
  'Samsung',
  'Nestlé',
  'HSBC',
  'Unilever',
]

export function EmployerMarquee() {
  return (
    <div
      className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
      aria-label="Example employers in the Career OS demo dataset"
    >
      <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[...companies, ...companies].map((name, i) => (
          <div
            key={`${name}-${i}`}
            aria-hidden={i >= companies.length}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-xs"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-secondary-foreground">
              {name.slice(0, 2).toUpperCase()}
            </span>
            <span className="text-sm font-medium whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
