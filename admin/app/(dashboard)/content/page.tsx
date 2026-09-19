import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  PageHeader,
  Pill,
  StatTile,
} from "@/components/ui";
import { getBootstrap, getTestimonials } from "@/lib/api";
import Link from "next/link";

export const metadata = { title: "Content" };

export const dynamic = "force-dynamic";

const SECTIONS = [
  { href: "/content/projects", label: "Projects", key: "featuredProjects" },
  { href: "/content/services", label: "Services", key: "services" },
  { href: "/content/software", label: "Software", key: "softwareProducts" },
  { href: "/content/pricing", label: "Pricing", key: "engagementModels" },
  { href: "/content/testimonials", label: "Testimonials", key: "testimonials" },
  { href: "/content/faqs", label: "FAQs", key: "faqs" },
] as const;

export default async function ContentPage() {
  let payload: Awaited<ReturnType<typeof getBootstrap>> | null = null;
  let error: string | null = null;

  /*
    Testimonials come from their own endpoint, not from /content/bootstrap.
    The server deliberately excludes unverified quotes from the bootstrap
    payload so the public client can never render one — which means reading
    them from there would report "0 testimonials, all fine" while a dozen
    placeholders sit in the data file. The admin must ask explicitly.
  */
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];

  try {
    const [bootstrap, allTestimonials] = await Promise.all([
      getBootstrap(),
      getTestimonials(true),
    ]);
    payload = bootstrap;
    testimonials = allTestimonials;
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Could not load content.";
  }

  if (error || !payload) {
    return (
      <div className="flex flex-col gap-5">
        <PageHeader title="Content" />
        <Alert tone="error" title="Could not load content">
          {error}
        </Alert>
      </div>
    );
  }

  const unverified = testimonials.filter((t) => !t.verified).length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Content"
        description="Read-only view of everything the client site renders. Serve from the API so both apps always agree."
      />

      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatTile
          label="Projects"
          value={payload.featuredProjects.length}
          hint={`${payload.featuredProjects.filter((p) => p.category === "software").length} software`}
        />
        <StatTile
          label="Services"
          value={payload.services.length}
          hint={`${payload.services.filter((s) => s.category === "software").length} software`}
        />
        <StatTile
          label="Shipped software"
          value={payload.softwareProducts.length}
          hint={payload.softwareProducts.map((p) => p.name).join(", ")}
        />
        <StatTile
          label="Testimonials"
          value={testimonials.length}
          tone={unverified ? "warning" : "success"}
          hint={
            unverified
              ? `${unverified} unverified — withheld from the public API`
              : "All verified and published"
          }
        />
      </section>

      {unverified > 0 ? (
        <Alert tone="warning" title="Placeholder testimonials detected">
          {unverified} testimonial{unverified === 1 ? "" : "s"} still have{" "}
          <code className="font-mono">verified: false</code> and are withheld
          from the public API. Replace them with attributable quotes before
          launch — the API already filters them out of{" "}
          <code className="font-mono">/content/testimonials</code> and{" "}
          <code className="font-mono">/content/bootstrap</code>.
        </Alert>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => {
          const items = payload[section.key];
          return (
            <Link key={section.href} href={section.href} className="group">
              <Card className="h-full transition-colors group-hover:border-[var(--accent-border)]">
                <CardHeader
                  title={section.label}
                  action={<Pill tone="neutral">{items.length}</Pill>}
                />
                <CardBody>
                  <p className="text-[12.5px] text-muted">
                    {summarise(section.key, payload, testimonials)}
                  </p>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* ── Site profile ── */}
      <Card>
        <CardHeader
          title="Site profile"
          subtitle="Brand and contact details served to the client"
        />
        <CardBody className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Row label="Brand" value={payload.site.brand} />
          <Row label="Tagline" value={payload.site.tagline} />
          <Row label="Email" value={payload.site.email} />
          <Row label="Phone" value={payload.site.phoneDisplay} />
          <Row label="WhatsApp" value={payload.site.whatsapp} mono />
          <Row label="Address" value={payload.site.address} />
          <Row label="Working hours" value={payload.site.workingHours} />
          <Row label="Timezone" value={payload.site.timezone} />
          <Row label="Response time" value={payload.site.responseTime} />
          <Row label="Founded" value={String(payload.site.founded)} />
          <Row
            label="Social profiles"
            value={String(payload.site.socials.length)}
          />
          <Row
            label="Hero stats"
            value={String(payload.site.heroStats.length)}
          />
        </CardBody>
      </Card>

      {/* ── Timeline ── */}
      <Card>
        <CardHeader
          title="Company timeline"
          subtitle="Rendered in the About section"
        />
        <CardBody>
          <ol className="flex flex-col gap-3">
            {payload.milestones.map((milestone) => (
              <li key={milestone.year} className="flex gap-4">
                <span className="w-12 shrink-0 text-[13px] font-bold text-accent tabular-nums">
                  {milestone.year}
                </span>
                <span className="text-[13px] leading-relaxed text-muted">
                  {milestone.text}
                </span>
              </li>
            ))}
          </ol>
        </CardBody>
      </Card>

      {/* ── Process ── */}
      <Card>
        <CardHeader
          title="Delivery process"
          subtitle="Five stages, shown on the site"
        />
        <CardBody>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {payload.processSteps.map((step) => (
              <li
                key={step.step}
                className="rounded-lg border-border bg-white/[0.02] p-3.5"
              >
                <span className="text-[11px] font-bold tracking-[0.1em] text-accent">
                  {step.step}
                </span>
                <p className="mt-1 text-[13px] font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </CardBody>
      </Card>
    </div>
  );
}

function summarise(
  key: (typeof SECTIONS)[number]["key"],
  payload: Awaited<ReturnType<typeof getBootstrap>>,
  testimonials: Awaited<ReturnType<typeof getTestimonials>>,
): string {
  switch (key) {
    case "featuredProjects":
      return `${payload.featuredProjects.filter((p) => p.category === "software").length} software, ${payload.featuredProjects.filter((p) => p.category === "marketing").length} marketing`;
    case "services":
      return `${payload.services.filter((s) => s.category === "software").length} software, ${payload.services.filter((s) => s.category === "marketing").length} marketing`;
    case "softwareProducts":
      return payload.softwareProducts.map((p) => p.name).join(", ");
    case "engagementModels":
      return payload.engagementModels.map((m) => m.name).join(", ");
    case "testimonials":
      return `${payload.testimonials.length} published, ${testimonials.filter((t) => !t.verified).length} unverified`;
    case "faqs":
      return `${payload.faqs.length} questions answered`;
    default:
      return "";
  }
}

function Row({
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
