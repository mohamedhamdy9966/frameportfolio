import Link from "next/link";
import { getTestimonials } from "@/lib/api";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  PageHeader,
  Pill,
} from "@/components/ui";

export const metadata = { title: "Testimonials" };
export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  let error: string | null = null;

  try {
    // The admin deliberately asks for unverified rows so the operator can see
    // exactly which placeholders still need replacing.
    testimonials = await getTestimonials(true);
  } catch (cause) {
    error =
      cause instanceof Error ? cause.message : "Could not load testimonials.";
  }

  const unverified = testimonials.filter((t) => !t.verified);

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/content"
        className="w-fit text-[12.5px] font-medium text-subtle transition-colors hover:text-accent"
      >
        ← Back to content
      </Link>

      <PageHeader
        title="Testimonials"
        description="Quotes rotated on the client's Client Results section."
      />

      {unverified.length > 0 ? (
        <Alert
          tone="warning"
          title={`${unverified.length} unverified placeholder${unverified.length === 1 ? "" : "s"}`}
        >
          The public API withholds any testimonial with{" "}
          <code className="font-mono">verified: false</code>, so these never
          reach visitors. Replace each one with an attributable quote and mark
          it verified in{" "}
          <code className="font-mono">
            server/src/content/data/portfolio.data.ts
          </code>
          .
        </Alert>
      ) : (
        <Alert tone="success">
          All testimonials are verified and publishable.
        </Alert>
      )}

      {error ? (
        <Alert tone="error" title="Could not load testimonials">
          {error}
        </Alert>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader
                title={testimonial.name}
                subtitle={testimonial.role}
                action={
                  testimonial.verified ? (
                    <Pill tone="accent">verified</Pill>
                  ) : (
                    <Pill tone="danger">unverified</Pill>
                  )
                }
              />
              <CardBody>
                <blockquote className="text-[13px] leading-relaxed text-muted">
                  “{testimonial.quote}”
                </blockquote>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
