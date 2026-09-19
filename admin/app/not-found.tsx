import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
        Error 404
      </p>
      <h1 className="text-2xl font-bold text-foreground">
        That page does not exist.
      </h1>
      <p className="max-w-sm text-[13px] leading-relaxed text-muted">
        The record may have been deleted, or the link is out of date.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-4 py-2 text-[13px] font-bold text-black transition-opacity hover:opacity-90"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
