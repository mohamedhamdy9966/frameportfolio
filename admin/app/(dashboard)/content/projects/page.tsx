import Link from "next/link";
import { getProjects } from "@/lib/api";
import { Alert, Card, PageHeader, Pill } from "@/components/ui";

export const metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  let projects: Awaited<ReturnType<typeof getProjects>>["items"] = [];
  let error: string | null = null;

  try {
    projects = (await getProjects({ limit: 100 })).items;
  } catch (cause) {
    error = cause instanceof Error ? cause.message : "Could not load projects.";
  }

  return (
    <div className="flex flex-col gap-5">
      <BackLink />
      <PageHeader
        title="Projects"
        description="Case studies rendered on the client's Work section."
      />

      {error ? (
        <Alert tone="error" title="Could not load projects">
          {error}
        </Alert>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[14px] font-semibold text-foreground">
                  {project.title}
                </h2>
                <div className="flex shrink-0 gap-1.5">
                  <Pill
                    tone={
                      project.category === "software" ? "accent" : "neutral"
                    }
                  >
                    {project.category}
                  </Pill>
                  {project.featured ? (
                    <Pill tone="neutral">featured</Pill>
                  ) : null}
                </div>
              </div>

              <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-3 flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Pill key={tag} tone="neutral">
                    {tag}
                  </Pill>
                ))}
              </div>

              <div className="mt-4 flex-wrap items-center gap-3 border-t border-border pt-3 text-[12px]">
                <span className="text-subtle">Source:</span>
                <code className="truncate font-mono text-[11.5px] text-muted">
                  {project.source}
                </code>
                {project.visit.startsWith("http") ? (
                  <a
                    href={project.visit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto font-medium text-accent hover:underline"
                  >
                    Visit ↗
                  </a>
                ) : (
                  <span className="ml-auto text-subtle">
                    Internal case study only
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function BackLink() {
  return (
    <div>
      <Link
        href="/content"
        className="text-[12.5px] font-medium text-subtle transition-colors hover:text-accent"
      >
        ← Back to content
      </Link>
    </div>
  );
}
