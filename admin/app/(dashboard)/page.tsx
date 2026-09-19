import Link from "next/link";
import {
  getEnquiryStats,
  listEnquiries,
  getSiteStatus,
  getBootstrap,
} from "@/lib/api";
import { ENQUIRY_STATUSES } from "@/lib/types";
import type { EnquiryStatus } from "@/lib/types";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  EmptyState,
  PageHeader,
  Pill,
  StatTile,
  StatusBadge,
} from "@/components/ui";
import { formatDuration, relativeTime } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

/** Re-read on every request — this is an operational view, not a cached page. */
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Fetch in parallel; a slow status probe should not delay the stats.
  const [statsResult, recentResult, statusResult, contentResult] =
    await Promise.allSettled([
      getEnquiryStats(),
      listEnquiries({ page: 1, limit: 5 }),
      getSiteStatus(),
      getBootstrap(),
    ]);

  const stats = statsResult.status === "fulfilled" ? statsResult.value : null;
  const recent =
    recentResult.status === "fulfilled" ? recentResult.value : null;
  const status =
    statusResult.status === "fulfilled" ? statusResult.value : null;
  const content =
    contentResult.status === "fulfilled" ? contentResult.value : null;

  // Surface the *reason* when the API is unreachable, rather than rendering a
  // dashboard of zeros that looks like real data.
  const apiDown =
    statsResult.status === "rejected" && recentResult.status === "rejected";

  const apiError =
    statsResult.status === "rejected"
      ? (statsResult.reason as Error)?.message
      : undefined;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Live pipeline and system status."
        action={
          <Link
            href="/enquiries"
            className="rounded-lg border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-2 text-[13px] font-semibold text-accent transition-colors hover:bg-[rgba(255,193,7,0.18)]"
          >
            View all enquiries →
          </Link>
        }
      />

      {apiDown ? (
        <Alert tone="error" title="Cannot reach the API">
          {apiError ?? "The NestJS server did not respond."} Start it with{" "}
          <code className="font-mono text-foreground">npm run start:dev</code>{" "}
          in <code className="font-mono text-foreground">server/</code>, then
          reload. Check that{" "}
          <code className="font-mono text-foreground">API_URL</code> points at
          the right port.
        </Alert>
      ) : null}

      {/* ── Pipeline tiles ── */}
      <section
        aria-label="Enquiry pipeline"
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        <StatTile label="Total enquiries" value={stats?.total ?? "—"} />
        <StatTile
          label="Needs follow-up"
          value={stats?.needsFollowUp ?? "—"}
          tone={stats?.needsFollowUp ? "warning" : "default"}
          hint={
            stats?.needsFollowUp ? "Awaiting a reply" : "Nothing outstanding"
          }
        />
        <StatTile
          label="Won"
          value={stats?.byStatus?.won ?? 0}
          tone="success"
          hint="Converted to projects"
        />
        <StatTile
          label="Responded"
          value={stats?.byStatus?.responded ?? 0}
          hint="Replied, not yet closed"
        />
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* ── Recent enquiries ── */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent enquiries"
            subtitle="The five most recent submissions"
            action={
              <Link
                href="/enquiries"
                className="text-[12.5px] font-medium text-accent hover:underline"
              >
                View all
              </Link>
            }
          />

          {!recent || recent.items.length === 0 ? (
            <EmptyState
              title="No enquiries yet"
              description="Submissions from the client site's quote form will appear here the moment they arrive."
            />
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {recent.items.map((enquiry) => (
                <li key={enquiry.id}>
                  <Link
                    href={`/enquiries/${enquiry.id}`}
                    className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[var(--accent-border)] bg-[var(--accent-soft)] text-[11px] font-bold text-accent">
                      {enquiry.name.slice(0, 2).toUpperCase()}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-[13.5px] font-semibold text-foreground">
                          {enquiry.name}
                        </span>
                        <StatusBadge status={enquiry.status} />
                        {enquiry.needsFollowUp ? (
                          <Pill tone="accent">follow up</Pill>
                        ) : null}
                      </span>
                      <span className="mt-1 block truncate text-[12.5px] text-muted">
                        {enquiry.message}
                      </span>
                      <span className="mt-1 block text-[11.5px] text-subtle">
                        {enquiry.projectType} ·{" "}
                        {relativeTime(enquiry.createdAt)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <div className="flex flex-col gap-4">
          {/* ── Pipeline breakdown ── */}
          <Card>
            <CardHeader title="Pipeline" subtitle="Counts by status" />
            <CardBody className="flex flex-col gap-2.5">
              {ENQUIRY_STATUSES.map((value: EnquiryStatus) => {
                const count = stats?.byStatus?.[value] ?? 0;
                const pct = stats?.total ? (count / stats.total) * 100 : 0;

                return (
                  <div key={value} className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <StatusBadge status={value} />
                        <span className="text-[12.5px] font-semibold tabular-nums text-foreground">
                          {count}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardBody>
          </Card>

          {/* ── System status ── */}
          <Card>
            <CardHeader title="System" subtitle="API health and content" />
            <CardBody className="flex flex-col gap-2.5 text-[12.5px]">
              <Row label="API">
                {status ? (
                  <span className="text-[var(--success)]">online</span>
                ) : (
                  <span className="text-[var(--danger)]">unreachable</span>
                )}
              </Row>
              <Row label="Uptime">
                {status ? formatDuration(status.uptimeSeconds) : "—"}
              </Row>
              <Row label="Environment">{status?.environment ?? "—"}</Row>
              <Row label="Node">{status?.nodeVersion ?? "—"}</Row>
              <Row label="Projects">
                {content?.featuredProjects.length ?? "—"}
              </Row>
              <Row label="Services">{content?.services.length ?? "—"}</Row>
              <Row label="Software">
                {content?.softwareProducts.length ?? "—"}
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-subtle">{label}</span>
      <span className="truncate font-medium text-foreground">{children}</span>
    </div>
  );
}
