"use client";

import { useTransition } from "react";
import { logoutAction } from "@/app/actions/auth";

/** Sign-out control for the sidebar footer. */
export function LogoutButton({ user }: { user: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-[11px] font-bold text-black">
          {user.slice(0, 2).toUpperCase()}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[12.5px] font-medium text-foreground">
            {user}
          </span>
          <span className="block text-[10.5px] text-subtle">Signed in</span>
        </span>
      </div>

      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => void logoutAction())}
        className="w-full rounded-lg border-border px-3 py-2 text-[12.5px] font-medium text-muted transition-colors hover:border-[rgba(255,107,107,0.4)] hover:text-[var(--danger)] disabled:opacity-50"
      >
        {pending ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}

/** Live health indicator for the API the admin is talking to. */
export function ApiStatusPill() {
  return (
    <span className="hidden items-center gap-1.5 rounded-full border-border px-2.5 py-1 text-[11px] font-medium text-subtle sm:flex">
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-[var(--success)] animate-pulse-soft"
      />
      Connected
    </span>
  );
}
