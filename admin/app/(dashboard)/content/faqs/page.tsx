import Link from "next/link";
import { getFaqs } from "@/lib/api";
import { Alert, Card, PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "FAQs" };
export const dynamic = "force-dynamic";

export default async function FaqsPage() {
  let faqs: Awaited<ReturnType<typeof getFaqs>> = [];
  let error: string | null = null;

  try {
    faqs = await getFaqs();
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Could not load FAQs.";
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
        title="FAQs"
        description="Answers shown in the client's Common Questions accordion."
      />

      {error ? (
        <Alert tone="error" title="Could not load FAQs">
          {error}
        </Alert>
      ) : (
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <Card key={faq.q} className="p-4">
              <div className="flex items-start gap-3">
                <Pill tone="neutral">{index + 1}</Pill>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[13.5px] font-semibold text-foreground">
                    {faq.q}
                  </h2>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                    {faq.a}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
