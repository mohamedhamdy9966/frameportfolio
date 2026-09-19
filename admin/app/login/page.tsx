"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = {};

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";

  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* Where to land after a successful sign-in. Validated server-side. */}
      <input type="hidden" name="next" value={next} />

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border-[rgba(255,107,107,0.35)] bg-[rgba(255,107,107,0.08)] px-3.5 py-2.5 text-[13px] text-[var(--danger)]"
        >
          {state.error}
        </p>
      ) : null}

      <label className="flex flex-col gap-1.5">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.09em] text-subtle">
          Username
        </span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          required
          defaultValue={state.username ?? ""}
          placeholder="admin"
          className="w-full rounded-lg border-border bg-white/[0.03] px-3.5 py-2.5 text-[14px] text-foreground transition-colors outline-none placeholder:text-subtle focus:border-[var(--accent-border)]"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-[11.5px] font-semibold uppercase tracking-[0.09em] text-subtle">
          Password
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••"
          className="w-full rounded-lg border-border bg-white/[0.03] px-3.5 py-2.5 text-[14px] text-foreground transition-colors outline-none placeholder:text-subtle focus:border-[var(--accent-border)]"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="mt-1 w-full rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-4 py-2.5 text-[14px] font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="relative z-1 flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-[400px]">
        <div className="mb-7 flex-col items-center text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] text-xl font-black text-black">
            T
          </span>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Taxi Admin
          </h1>
          <p className="mt-1 text-[13px] text-muted">
            Sign in to manage enquiries and content.
          </p>
        </div>

        <div className="rounded-xl border-border bg-surface p-6">
          <Suspense
            fallback={
              <div className="h-[188px] animate-pulse-soft rounded-lg bg-white/[0.02]" />
            }
          >
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-5 text-center text-[11.5px] leading-relaxed text-subtle">
          Credentials come from{" "}
          <code className="font-mono">ADMIN_USERNAME</code> and{" "}
          <code className="font-mono">ADMIN_PASSWORD</code> in this app&apos;s
          environment, and must match the API&apos;s{" "}
          <code className="font-mono">ADMIN_API_KEY</code>.
        </p>
      </div>
    </div>
  );
}
