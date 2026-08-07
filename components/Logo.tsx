export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      {/* Chevrón del logo LOGICAV */}
      <path d="M7 3h9.5L29 16 16.5 29H7l12.5-13L7 3z" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 text-ink">
      <LogoMark className="h-7 w-7 text-ink" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-[0.08em]">
          LOGICAV
        </span>
        {!compact && (
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
            Climatización · Ingeniería
          </span>
        )}
      </span>
    </span>
  );
}
