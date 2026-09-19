import Link from "next/link";
import { getSoftwareProducts } from "@/lib/api";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  PageHeader,
  Pill,
} from "@/components/ui";

export const metadata = { title: "Software" };
export const dynamic = "force-dynamic";

export default async function SoftwarePage() {
  let products: Awaited<ReturnType<typeof getSoftwareProducts>> = [];
  let error: string | null = null;

  try {
    products = await getSoftwareProducts();
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Could not load products.";
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
        title="Shipped software"
        description="Platforms built end-to-end and shown on the client's Software section."
      />

      {error ? (
        <Alert tone="error" title="Could not load products">
          {error}
        </Alert>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader
                title={
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ background: product.accent }}
                    />
                    {product.name}
                  </span>
                }
                subtitle={product.type}
                action={
                  <a
                    href={product.url}
                    target={"_blank"}
                    rel="noopener noreferrer"
                    className="text-[12.5px] font-medium text-accent hover:underline"
                  >
                    Visit live site ↗
                  </a>
                }
              />

              <CardBody className="flex flex-col gap-4">
                <p className="text-[13px] font-medium text-foreground">
                  {product.tagline}
                </p>
                <p className="text-[12.5px] leading-relaxed text-muted">
                  {product.description}
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <Label>Features</Label>
                    <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                      {product.features.map((feature) => (
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

                  <div className="flex flex-col gap-4">
                    <div>
                      <Label>Metrics</Label>
                      <div className="mt-2 flex-col gap-1.5">
                        {product.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="flex items-baseline justify-between gap-2"
                          >
                            <span
                              className="text-[15px] font-bold"
                              style={{ color: product.accent }}
                            >
                              {metric.value}
                            </span>
                            <span className="text-right text-[11px] text-subtle">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-border pt-3">
                  <div>
                    <Label>Stack</Label>
                    <div className="mt-1.5 flex-wrap gap-1.5">
                      {product.stack.map((tech) => (
                        <Pill key={tech} tone="accent">
                          {tech}
                        </Pill>
                      ))}
                    </div>
                  </div>
                  <div className="sm:ml-auto">
                    <Label>Platforms</Label>
                    <div className="mt-1.5 flex-wrap gap-1.5">
                      {product.platforms.map((platform) => (
                        <Pill key={platform} tone="neutral">
                          {platform}
                        </Pill>
                      ))}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10.5px] font-semibold uppercase tracking-[0.09em] text-subtle">
      {children}
    </p>
  );
}
