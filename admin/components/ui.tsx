import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { EnquiryStatus } from "@/lib/types";

/* ── Card ─────────────────────────────── */

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border-border bg-surface",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
        {subtitle ? (
          <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-5 py-4", className)}>{children}</div>;
}

/* ── Stat tile ────────────────────────── */

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "accent" | "warning" | "success";
}) {
  const toneClass = {
    default: "text-foreground",
    accent: "text-[var(--accent)]",
    warning: "text-[var(--warning)]",
    success: "text-[var(--success)]",
  }[tone];

  return (
    <div className="rounded-xl border-border bg-surface p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-subtle">
        {label}
      </p>
      <p className={cn("mt-2 text-3xl font-bold tabular-nums", toneClass)}>
        {value}
      </p>
      {hint ? <p className="mt-1 text-[12px] text-muted">{hint}</p> : null}
    </div>
  );
}

/* ── Status badge ─────────────────────── */

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: "border-[rgba(255,193,7,0.4)] bg-[rgba(255,193,7,0.12)] text-[var(--accent)]",
  read: "border-[rgba(88,166,255,0.35)] bg-[rgba(88,166,255,0.1)] text-[var(--info)]",
  responded:
    "border-[rgba(61,220,151,0.35)] bg-[rgba(61,220,151,0.1)] text-[var(--success)]",
  won: "border-[rgba(61,220,151,0.5)] bg-[rgba(61,220,151,0.16)] text-[var(--success)]",
  lost: "border-[rgba(255,107,107,0.35)] bg-[rgba(255,107,107,0.1)] text-[var(--danger)]",
  archived: "border-[var(--border-strong)] bg-white/[0.03] text-subtle",
};

export function StatusBadge({
  status,
  className,
}: {
  status: EnquiryStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em]",
        STATUS_STYLES[status] ?? STATUS_STYLES.archived,
        className,
      )}
    >
      {status}
    </span>
  );
}

/* ── Generic pill ─────────────────────── */

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "danger";
}) {
  const toneClass = {
    neutral: "border-[var(--border-strong)] text-muted",
    accent: "border-[var(--accent-border)] text-[var(--accent)]",
    danger: "border-[rgba(255,107,107,0.35)] text-[var(--danger)]",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium",
        toneClass,
      )}
    >
      {children}
    </span>
  );
}

/* ── Empty state ──────────────────────── */

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border-[var(--border-strong)] bg-white/[0.02] text-xl text-subtle">
        ◌
      </div>
      <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-[13px] leading-relaxed text-muted">
        {description}
      </p>
      {action}
    </div>
  );
}

/* ── Alert ────────────────────────────── */

export function Alert({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "error" | "warning" | "success";
  title?: string;
  children: ReactNode;
}) {
  const toneClass = {
    info: "border-[rgba(88,166,255,0.3)] bg-[rgba(88,166,255,0.08)]",
    error: "border-[rgba(255,107,107,0.35)] bg-[rgba(255,107,107,0.08)]",
    warning: "border-[rgba(255,176,32,0.35)] bg-[rgba(255,176,32,0.08)]",
    success: "border-[rgba(61,220,151,0.35)] bg-[rgba(61,220,151,0.08)]",
  }[tone];

  return (
    <div className={cn("rounded-lg border px-4 py-3 text-[13px]", toneClass)}>
      {title ? <p className="font-semibold text-foreground">{title}</p> : null}
      <div className="text-muted leading-relaxed">{children}</div>
    </div>
  );
}

/* ── Page header ──────────────────────── */

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-[13px] text-muted">{description}</p>
        ) : null}
      </div>
      {action}
    </header>
  );
}
