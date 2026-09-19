import { EnquiryFilters } from "@/components/EnquiryFilters";
import {
  Alert,
  Card,
  EmptyState,
  PageHeader,
  Pill,
  StatusBadge,
} from "@/components/ui";
import { listEnquiries } from "@/lib/api";
import { ENQUIRY_STATUSES, type EnquiryStatus } from "@/lib/types";
import { relativeTime } from "@/lib/utils";
import Link from "next/link";

export const metadata = { title: "Enquiries" };

export const dynamic = "force-dynamic";

interface SearchParams {
  page?: string;
  status?: string;
  search?: string;
}

const LIMIT = 15;

export default async function EnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // searchParams is async in this Next version.
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const status = (ENQUIRY_STATUSES as readonly string[]).includes(
    params.status ?? "",
  )
    ? (params.status as EnquiryStatus)
    : undefined;
  const search = params.search?.trim() || undefined;

  let result: Awaited<ReturnType<typeof listEnquiries>> | null = null;
  let error: string | null = null;

  try {
    result = await listEnquiries({ page, limit: LIMIT, status, search });
  } catch (cause) {
    error =
      cause instanceof Error ? cause.message : "Could not load enquiries.";
  }

  const filtersActive = Boolean(status || search);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Enquiries"
        description="Every submission from the client quote form."
        action={
          result ? (
            <span className="text-[13px] text-muted">
              <strong className="text-foreground tabular-nums">
                {result.meta.total}
              </strong>{" "}
              total
            </span>
          ) : null
        }
      />

      <EnquiryFilters
        currentStatus={status ?? "all"}
        currentSearch={search ?? ""}
      />

      {error ? (
        <Alert tone="error" title="Could not load enquiries">
          {error}
        </Alert>
      ) : !result || result.items.length === 0 ? (
        <Card>
          <EmptyState
            title={filtersActive ? "No matching enquiries" : "No enquiries yet"}
            description={
              filtersActive
                ? "Try clearing the search or choosing a different status."
                : "Submissions from the client site's quote form will appear here."
            }
            action={
              filtersActive ? (
                <Link
                  href="/enquiries"
                  className="rounded-lg border-[var(--accent-border)] px-3.5 py-2 text-[13px] font-medium text-accent"
                >
                  Clear filters
                </Link>
              ) : undefined
            }
          />
        </Card>
      ) : (
        <>
          <Card className="overflow-hidden">
            {/* Table on md+, cards on mobile — a horizontally scrolling table
                on a phone is worse than a stacked card. */}
            <div className="hidden md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle">
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Project</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 whitespace-nowrap">Received</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {result.items.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="border-b border-border last:border-0 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5">
                        <span className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[var(--accent-border)] bg-[var(--accent-soft)] text-[10.5px] font-bold text-accent">
                            {enquiry.name.slice(0, 2).toUpperCase()}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] font-semibold text-foreground">
                              {enquiry.name}
                            </span>
                            <span className="block truncate text-[11.5px] text-subtle">
                              {enquiry.email}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className="max-w-[260px] px-5 py-3.5">
                        <span className="block truncate text-[12.5px] text-muted">
                          {enquiry.projectType}
                        </span>
                        <span className="block truncate text-[11.5px] text-subtle">
                          {enquiry.budget}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="flex flex-wrap items-center gap-1.5">
                          <StatusBadge status={enquiry.status} />
                          {enquiry.needsFollowUp ? (
                            <Pill tone="accent">follow up</Pill>
                          ) : null}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3.5 text-[12px] text-subtle">
                        {relativeTime(enquiry.createdAt)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/enquiries/${enquiry.id}`}
                          className="text-[12.5px] font-medium text-accent hover:underline"
                        >
                          Open →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-[var(--border)] md:hidden">
              {result.items.map((enquiry) => (
                <li key={enquiry.id}>
                  <Link
                    href={`/enquiries/${enquiry.id}`}
                    className="flex flex-col gap-2 px-4 py-3.5 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[13.5px] font-semibold text-foreground">
                        {enquiry.name}
                      </span>
                      <StatusBadge status={enquiry.status} />
                    </span>
                    <span className="truncate text-[12px] text-muted">
                      {enquiry.email}
                    </span>
                    <span className="truncate text-[12px] text-subtle">
                      {enquiry.projectType}
                    </span>
                    <span className="flex items-center justify-between gap-2 text-[11.5px] text-subtle">
                      <span>{relativeTime(enquiry.createdAt)}</span>
                      {enquiry.needsFollowUp ? (
                        <Pill tone="accent">follow up</Pill>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Pagination meta={result.meta} status={status} search={search} />
        </>
      )}
    </div>
  );
}

/** Prev/next pager that preserves the active filters. */
function Pagination({
  meta,
  status,
  search,
}: {
  meta: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    total: number;
  };
  status?: EnquiryStatus;
  search?: string;
}) {
  if (meta.totalPages <= 1) return null;

  const link = (page: number) => {
    const qs = new URLSearchParams();
    qs.set("page", String(page));
    if (status) qs.set("status", status);
    if (search) qs.set("search", search);
    return `/enquiries?${qs.toString()}`;
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-3"
    >
      {meta.hasPreviousPage ? (
        <Link
          href={link(meta.page - 1)}
          className="rounded-lg border-border px-3.5 py-2 text-[13px] font-medium text-muted transition-colors hover:border-[var(--accent-border)] hover:text-accent"
        >
          ← Previous
        </Link>
      ) : (
        <span className="rounded-lg border-transparent px-3.5 py-2 text-[13px] text-subtle opacity-40">
          ← Previous
        </span>
      )}

      <span className="text-[12.5px] text-subtle">
        Page <strong className="text-foreground">{meta.page}</strong> of{" "}
        {meta.totalPages}
      </span>

      {meta.hasNextPage ? (
        <Link
          href={link(meta.page + 1)}
          className="rounded-lg border-border px-3.5 py-2 text-[13px] font-medium text-muted transition-colors hover:border-[var(--accent-border)] hover:text-accent"
        >
          Next →
        </Link>
      ) : (
        <span className="rounded-lg border-transparent px-3.5 py-2 text-[13px] text-subtle opacity-40">
          Next →
        </span>
      )}
    </nav>
  );
}
