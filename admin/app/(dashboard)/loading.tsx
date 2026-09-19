/** Streaming skeleton shown while a dashboard route's data resolves. */
export default function Loading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>

      <div className="flex flex-col gap-2">
        <div className="h-7 w-44 animate-pulse-soft rounded-md bg-white/[0.05]" />
        <div className="h-4 w-64 animate-pulse-soft rounded-md bg-white/[0.03]" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-xl border-border bg-surface p-5">
            <div className="h-3 w-20 animate-pulse-soft rounded bg-white/[0.05]" />
            <div className="mt-3 h-7 w-14 animate-pulse-soft rounded bg-white/[0.07]" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border-border bg-surface">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-border px-5 py-4 last:border-0"
          >
            <div className="h-8 w-8 shrink-0 animate-pulse-soft rounded-full bg-white/[0.05]" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-3.5 w-40 animate-pulse-soft rounded bg-white/[0.06]" />
              <div className="h-3 w-64 max-w-full animate-pulse-soft rounded bg-white/[0.03]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
