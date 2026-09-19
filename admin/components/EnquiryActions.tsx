"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  deleteEnquiryAction,
  setEnquiryStatusAction,
} from "@/app/actions/enquiries";
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Status selector — writes through a Server Action and refreshes the route. */
export function StatusControls({
  id,
  current,
}: {
  id: string;
  current: EnquiryStatus;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [optimistic, setOptimistic] = useState<EnquiryStatus | null>(null);

  const active = optimistic ?? current;

  const update = (status: EnquiryStatus) => {
    if (status === active) return;

    // Update the UI immediately; roll back if the server rejects it.
    setOptimistic(status);
    setError(null);

    startTransition(async () => {
      const result = await setEnquiryStatusAction(id, status);
      if (!result.ok) {
        setOptimistic(null);
        setError(result.error ?? "Could not update the status.");
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        role="group"
        aria-label="Enquiry status"
        className="flex flex-wrap gap-1.5"
      >
        {ENQUIRY_STATUSES.map((value) => (
          <button
            key={value}
            type="button"
            disabled={pending}
            onClick={() => update(value)}
            aria-pressed={active === value}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12px] font-medium capitalize transition-colors disabled:opacity-60",
              active === value
                ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-accent"
                : "border-border text-muted hover:border-[var(--border-strong)] hover:text-foreground",
            )}
          >
            {value}
          </button>
        ))}
      </div>

      {error ? (
        <p role="alert" className="text-[12.5px] text-[var(--danger)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Delete with an inline confirm — no window.confirm, which is unstyled. */
export function DeleteEnquiryButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-lg border-border px-3.5 py-2 text-[13px] font-medium text-muted transition-colors hover:border-[rgba(255,107,107,0.4)] hover:text-[var(--danger)]"
      >
        Delete enquiry
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2 rounded-lg border-[rgba(255,107,107,0.35)] bg-[rgba(255,107,107,0.06)] p-3">
      <p className="text-[12.5px] text-muted">
        Permanently delete the enquiry from{" "}
        <strong className="text-foreground">{name}</strong>? This cannot be
        undone.
      </p>

      {error ? (
        <p role="alert" className="text-[12.5px] text-[var(--danger)]">
          {error}
        </p>
      ) : null}

      <div className="flex gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            startTransition(async () => {
              const result = await deleteEnquiryAction(id);
              if (!result.ok) {
                setError(result.error ?? "Could not delete the enquiry.");
                return;
              }
              router.push("/enquiries");
            });
          }}
          className="rounded-lg bg-[var(--danger)] px-3.5 py-1.5 text-[12.5px] font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Deleting…" : "Yes, delete"}
        </button>

        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-lg border-border px-3.5 py-1.5 text-[12.5px] font-medium text-muted transition-colors hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/** Copies the reply-to address, since operators paste it into their mail client. */
export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          setCopied(false);
        }
      }}
      className="rounded-md border-border px-2 py-1 text-[11.5px] font-medium text-subtle transition-colors hover:text-accent"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
