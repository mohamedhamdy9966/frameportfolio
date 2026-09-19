import Link from "next/link";
import { getPricing } from "@/lib/api";
import { Alert, Card, CardHeader, PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Pricing" };
export const dynamic = "force-dynamic";

export default async function PricingPage() {
  let models: Awaited<ReturnType<typeof getPricing>> = [];
  let error: string | null = null;

  try {
    models = await getPricing();
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Could not load pricing.";
  }

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/content"
        className="w-fit text-[12.5px] font-medium text-subtle transition-colors hover:text-accent"
      >
        ← Back to content
      </Link>

      <PageHeader
        title="Pricing"
        description="Engagement models shown on the client's How We Work section."
      />

      <Alert tone="warning">
        These figures are indicative and currently placeholders. Confirm the
        real numbers before the site goes live — publishing a price you will not
        honour is worse than publishing none.
      </Alert>

      {error ? (
        <Alert tone="error" title="Could not load pricing">
          {error}
        </Alert>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {models.map((model) => (
            <Card key={model.id} className="flex flex-col">
              <CardHeader
                title={model.name}
                subtitle={model.tagline}
                action={
                  model.highlighted ? (
                    <Pill tone="accent">highlighted</Pill>
                  ) : null
                }
              />

              <div className="flex flex-1 flex-col p-5">
                <p className="text-2xl font-bold text-foreground">
                  {model.priceFrom}
                </p>
                <p className="mt-1 text-[11.5px] uppercase tracking-[0.07em] text-subtle">
                  {model.billing}
                </p>

                <p className="mt-4 border-y border-border py-3 text-[12.5px] text-muted">
                  Best for: {model.bestFor}
                </p>

                <ul className="mt-4 flex-col gap-2">
                  {model.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-2 text-[12.5px] text-muted"
                    >
                      <span className="text-accent" aria-hidden>
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
