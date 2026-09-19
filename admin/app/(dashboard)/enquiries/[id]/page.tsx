import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiError, getEnquiry } from "@/lib/api";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  PageHeader,
  StatusBadge,
} from "@/components/ui";
import {
  CopyEmailButton,
  DeleteEnquiryButton,
  StatusControls,
} from "@/components/EnquiryActions";
import { formatDateTime, relativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const enquiry = await getEnquiry(id);
    return { title: enquiry.name };
  } catch {
    return { title: "Enquiry" };
  }
}

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let enquiry;
  try {
    enquiry = await getEnquiry(id);
  } catch (error) {
    // A genuine 404 is a not-found page; anything else is worth showing.
    if (error instanceof ApiError && error.status === 404) notFound();
    return (
      <div className="flex flex-col gap-5">
        <PageHeader title="Enquiry" />
        <Alert tone="error" title="Could not load this enquiry">
          {error instanceof Error ? error.message : "Unknown error."}
          <div className="mt-2">
            <Link
              href="/enquiries"
              className="font-medium text-accent hover:underline"
            >
              ← Back to enquiries
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  const mailtoHref = `mailto:${enquiry.email}?subject=${encodeURIComponent(
    `Re: your ${enquiry.projectType} enquiry`,
  )}`;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link
          href="/enquiries"
          className="text-[12.5px] font-medium text-subtle transition-colors hover:text-accent"
        >
          ← Back to enquiries
        </Link>
      </div>

      <PageHeader
        title={enquiry.name}
        description={`Received ${relativeTime(enquiry.createdAt)} · ${enquiry.company || "No company given"}`}
        action={<StatusBadge status={enquiry.status} className="text-[12px]" />}
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* ── Message ── */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Brief" subtitle={enquiry.projectType} />
            <CardBody>
              <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap text-muted">
                {enquiry.message}
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Contact"
              action={
                <div className="flex items-center gap-2">
                  <CopyEmailButton email={enquiry.email} />
                  <a
                    href={mailtoHref}
                    className="rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] px-3.5 py-1.5 text-[12.5px] font-bold text-black transition-opacity hover:opacity-90"
                  >
                    Reply by email
                  </a>
                </div>
              }
            />
            <CardBody className="grid gap-3 sm:grid-cols-2">
              <Field label="Email" value={enquiry.email} />
              <Field label="Phone" value={enquiry.phone ?? "Not provided"} />
              <Field
                label="Company"
                value={enquiry.company ?? "Not provided"}
              />
              <Field
                label="Source IP"
                value={enquiry.sourceIp ?? "Not recorded"}
                mono
              />
            </CardBody>
          </Card>
        </div>

        {/* ── Sidebar ── */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Pipeline status" />
            <CardBody>
              <StatusControls id={enquiry.id} current={enquiry.status} />
              {enquiry.needsFollowUp ? (
                <p className="mt-3 text-[12px] text-[var(--warning)]">
                  This enquiry still needs a reply.
                </p>
              ) : (
                <p className="mt-3 text-[12px] text-[var(--success)]">
                  No follow-up outstanding.
                </p>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Project details" />
            <CardBody className="flex flex-col gap-3">
              <Field label="Type" value={enquiry.projectType} />
              <Field label="Budget" value={enquiry.budget} />
              <Field label="Timeline" value={enquiry.timeline} />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Timeline" />
            <CardBody className="flex flex-col gap-3">
              <Field
                label="Created"
                value={formatDateTime(enquiry.createdAt)}
              />
              <Field
                label="Last updated"
                value={formatDateTime(enquiry.updatedAt)}
              />
              <Field label="Reference" value={enquiry.id.slice(0, 8)} mono />
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Danger zone" />
            <CardBody>
              <DeleteEnquiryButton id={enquiry.id} name={enquiry.name} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-subtle">
        {label}
      </p>
      <p
        className={`mt-1 truncate text-[13px] text-foreground ${mono ? "font-mono text-[12px]" : ""}`}
        title={value}
      >
        {value}
      </p>
    </div>
  );
}
