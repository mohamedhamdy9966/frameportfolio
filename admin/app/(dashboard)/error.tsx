"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary.
 *
 * Catches anything a page throws — including an API outage — and gives the
 * operator a retry instead of a blank screen.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the browser console; server-side logs carry the stack.
    console.error("[admin] route error:", error);
  }, [error]);

  const isNetwork =
    /fetch|network|ECONNREFUSED|reach the API/i.test(error.message) ||
    error.name === "TypeError";

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border-[rgba(255,107,107,0.35)] bg-[rgba(255,107,107,0.08)] text-xl text-[var(--danger)]">
        !
      </span>

      <div>
        <h1 className="text-lg font-bold text-foreground">
          {isNetwork ? "Cannot reach the API" : "Something went wrong"}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-muted">
          {isNetwork
            ? "The admin portal could not reach the NestJS API. Confirm it is running and that API_URL points at the right port."
            : error.message || "An unexpected error occurred."}
        </p>
      </div>

      {error.digest ? (
        <code className="font-mono text-[11px] text-subtle">
          digest: {error.digest}
        </code>
      ) : null}

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-4 py-2 text-[13px] font-bold text-black transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <a
          href="/"
          className="rounded-lg border-border px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:border-[var(--accent-border)] hover:text-accent"
        >
          Back to dashboard
        </a>
      </div>
    </div>
  );
}
