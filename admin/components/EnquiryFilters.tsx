"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ENQUIRY_STATUSES } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Search + status filter for the enquiries list.
 *
 * Filter state lives in the URL rather than component state, so a filtered
 * view is shareable and survives a refresh. Typing is debounced to avoid a
 * request per keystroke.
 */
export function EnquiryFilters({
  currentStatus,
  currentSearch,
}: {
  currentStatus: string;
  currentSearch: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [term, setTerm] = useState(currentSearch);

  const push = (next: URLSearchParams) => {
    // Any filter change resets to page 1, otherwise the user can land on a
    // page that no longer exists in the filtered set.
    next.delete("page");
    startTransition(() => {
      router.push(`/enquiries${next.toString() ? `?${next}` : ""}`);
    });
  };

  const setStatus = (status: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (status === "all") next.delete("status");
    else next.set("status", status);
    push(next);
  };

  // Debounce the search box: 350ms after the last keystroke.
  useEffect(() => {
    if (term === currentSearch) return;

    const timer = setTimeout(() => {
      const next = new URLSearchParams(searchParams.toString());
      if (term.trim()) next.set("search", term.trim());
      else next.delete("search");
      push(next);
    }, 350);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Status chips scroll horizontally on narrow screens rather than
          wrapping into a tall block. */}
      <div
        role="group"
        aria-label="Filter by status"
        className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:pb-0"
      >
        {(["all", ...ENQUIRY_STATUSES] as const).map((value) => {
          const active = currentStatus === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setStatus(value)}
              aria-pressed={active}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-medium capitalize transition-colors",
                active
                  ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-accent"
                  : "border-border text-muted hover:border-[var(--border-strong)] hover:text-foreground",
              )}
            >
              {value}
            </button>
          );
        })}
      </div>

      <div className="relative sm:w-64">
        <input
          type="search"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="Search name, email, message…"
          aria-label="Search enquiries"
          className="w-full rounded-lg border-border bg-white/[0.03] px-3.5 py-2 text-[13px] text-foreground outline-none transition-colors placeholder:text-subtle focus:border-[var(--accent-border)]"
        />
        {pending ? (
          <span
            aria-hidden
            className="absolute top-1/2 right-3 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent animate-pulse-soft"
          />
        ) : null}
      </div>
    </div>
  );
}
