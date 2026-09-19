import Link from "next/link";
import { getServices } from "@/lib/api";
import { Alert, Card, PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Services" };
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  let services: Awaited<ReturnType<typeof getServices>> = [];
  let error: string | null = null;

  try {
    services = await getServices();
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Could not load services.";
  }

  const grouped = {
    software: services.filter((s) => s.category === "software"),
    marketing: services.filter((s) => s.category === "marketing"),
  };

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/content"
        className="w-fit text-[12.5px] font-medium text-subtle transition-colors hover:text-accent"
      >
        ← Back to content
      </Link>

      <PageHeader
        title="Services"
        description="Everything offered on the client's Services section."
      />

      {error ? (
        <Alert tone="error" title="Could not load services">
          {error}
        </Alert>
      ) : (
        <>
          {(["software", "marketing"] as const).map((group) => (
            <section key={group} className="flex flex-col gap-3">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.1em] text-subtle">
                {group} · {grouped[group].length}
              </h2>

              <div className="grid gap-3 lg:grid-cols-2">
                {grouped[group].map((service) => (
                  <Card key={service.id} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[14px] font-semibold text-foreground">
                        {service.title}
                      </h3>
                      <code className="shrink-0 font-mono text-[11px] text-subtle">
                        {service.id}
                      </code>
                    </div>

                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                      {service.text}
                    </p>

                    <div className="mt-3 flex-wrap gap-1.5">
                      {service.deliverables.map((item) => (
                        <Pill key={item} tone="neutral">
                          {item}
                        </Pill>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
