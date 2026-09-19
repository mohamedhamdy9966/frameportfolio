import "server-only";
import { apiBase, env } from "./env";
import type {
  ApiResponse,
  BootstrapPayload,
  EngagementModel,
  Enquiry,
  EnquiryQuery,
  EnquiryStats,
  Faq,
  Milestone,
  PaginationMeta,
  ProcessStep,
  Project,
  Service,
  SiteInfo,
  SiteStatus,
  SoftwareProduct,
  Testimonial,
} from "./types";

/**
 * Server-side API client.
 *
 * Everything here runs on the server only — `server-only` makes an accidental
 * client import a build error rather than a leaked API key. The admin key is
 * attached in one place and never reaches the browser.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code = "REQUEST_FAILED",
    readonly details?: string[],
    readonly requestId?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  /** JSON body for write requests. */
  body?: unknown;
  /** Attach the admin API key. Required for enquiry endpoints. */
  authorised?: boolean;
  /** Abort the request after this many ms. */
  timeoutMs?: number;
  /** Next.js cache directives. Omitted means "no cache". */
  next?: { revalidate?: number; tags?: string[] };
}

async function request<T>(
  path: string,
  {
    method = "GET",
    body,
    authorised = false,
    timeoutMs = 10_000,
    next,
  }: RequestOptions = {},
): Promise<{ data: T; meta?: PaginationMeta }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = { Accept: "application/json" };
  if (authorised) headers["x-api-key"] = env.adminApiKey;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let response: Response;
  try {
    response = await fetch(`${apiBase}${path}`, {
      method,
      headers,
      signal: controller.signal,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      // A write is never cached.
      ...(method === "GET" ? {} : { cache: "no-store" as RequestCache }),
      // `fetch` is uncached by default in Next 16, which is what we want for
      // enquiries. Content routes opt into caching explicitly via `next`.
      ...(next ? { next } : {}),
    });
  } catch (error) {
    clearTimeout(timer);
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiError(
        `The API did not respond within ${timeoutMs}ms.`,
        504,
        "TIMEOUT",
      );
    }
    throw new ApiError(
      "Could not reach the API. Is the server running?",
      503,
      "NETWORK_ERROR",
    );
  }
  clearTimeout(timer);

  let payload: ApiResponse<T> | null = null;
  try {
    payload = (await response.json()) as ApiResponse<T>;
  } catch {
    // A non-JSON body means something upstream failed (proxy, crash page).
    throw new ApiError(
      `The API returned a non-JSON response (HTTP ${response.status}).`,
      response.status,
      "MALFORMED_RESPONSE",
    );
  }

  if (!payload || payload.success !== true) {
    const failure = payload as {
      error?: {
        message?: string;
        code?: string;
        details?: string[];
        requestId?: string;
      };
    };
    throw new ApiError(
      failure?.error?.message ?? `Request failed with HTTP ${response.status}.`,
      response.status,
      failure?.error?.code ?? "REQUEST_FAILED",
      failure?.error?.details,
      failure?.error?.requestId,
    );
  }

  return { data: payload.data, meta: payload.meta };
}

/** Builds a query string, skipping empty values. */
function qs(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "" || value === "all") continue;
    search.set(key, String(value));
  }
  const result = search.toString();
  return result ? `?${result}` : "";
}

/* ── Health / diagnostics ─────────────── */

export async function getSiteStatus(): Promise<SiteStatus> {
  const { data } = await request<SiteStatus>("/status", { timeoutMs: 4_000 });
  return data;
}

/* ── Enquiries (admin, authorised) ────── */

export async function listEnquiries(
  query: EnquiryQuery = {},
): Promise<{ items: Enquiry[]; meta: PaginationMeta }> {
  const { data, meta } = await request<Enquiry[]>(
    `/enquiries${qs({
      page: query.page,
      limit: query.limit,
      status: query.status === "all" ? undefined : query.status,
      search: query.search,
    })}`,
    { authorised: true },
  );

  return {
    items: data,
    meta: meta ?? {
      total: data.length,
      page: 1,
      limit: data.length || 10,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };
}

export async function getEnquiry(id: string): Promise<Enquiry> {
  const { data } = await request<Enquiry>(`/enquiries/${id}`, {
    authorised: true,
  });
  return data;
}

export async function getEnquiryStats(): Promise<EnquiryStats> {
  const { data } = await request<EnquiryStats>("/enquiries/stats", {
    authorised: true,
  });
  return data;
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"],
): Promise<Enquiry> {
  const { data } = await request<Enquiry>(`/enquiries/${id}/status`, {
    method: "PATCH",
    body: { status },
    authorised: true,
  });
  return data;
}

export async function deleteEnquiry(
  id: string,
): Promise<{ id: string; deleted: true }> {
  const { data } = await request<{ id: string; deleted: true }>(
    `/enquiries/${id}`,
    { method: "DELETE", authorised: true },
  );
  return data;
}

/* ── Content (public) ──────────────────── */

const CONTENT_TTL = 60; // seconds — content changes rarely

export async function getBootstrap(): Promise<BootstrapPayload> {
  const { data } = await request<BootstrapPayload>("/content/bootstrap", {
    next: { revalidate: CONTENT_TTL, tags: ["content"] },
  });
  return data;
}

export async function getSite(): Promise<SiteInfo> {
  const { data } = await request<SiteInfo>("/content/site", {
    next: { revalidate: CONTENT_TTL, tags: ["content"] },
  });
  return data;
}

export async function getProjects(
  params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
  } = {},
): Promise<{ items: Project[]; meta?: PaginationMeta }> {
  const { data, meta } = await request<Project[]>(
    `/content/projects${qs({ ...params, limit: params.limit ?? 50 })}`,
    { next: { revalidate: CONTENT_TTL, tags: ["content", "projects"] } },
  );
  return { items: data, meta };
}

export async function getServices(
  params: { category?: string } = {},
): Promise<Service[]> {
  const { data } = await request<Service[]>(
    `/content/services${qs({ ...params, limit: 100 })}`,
    { next: { revalidate: CONTENT_TTL, tags: ["content", "services"] } },
  );
  return data;
}

export async function getSoftwareProducts(): Promise<SoftwareProduct[]> {
  const { data } = await request<SoftwareProduct[]>("/content/software", {
    next: { revalidate: CONTENT_TTL, tags: ["content", "software"] },
  });
  return data;
}

/**
 * Testimonials.
 * `includeUnverified` defaults to true here because this is the admin — the
 * operator needs to see the placeholder rows in order to replace them.
 */
export async function getTestimonials(
  includeUnverified = true,
): Promise<Testimonial[]> {
  const { data } = await request<Testimonial[]>(
    `/content/testimonials${qs({ includeUnverified: String(includeUnverified) })}`,
    { next: { revalidate: CONTENT_TTL, tags: ["content", "testimonials"] } },
  );
  return data;
}

export async function getFaqs(search?: string): Promise<Faq[]> {
  const { data } = await request<Faq[]>(`/content/faqs${qs({ search })}`, {
    next: { revalidate: CONTENT_TTL, tags: ["content", "faqs"] },
  });
  return data;
}

export async function getPricing(): Promise<EngagementModel[]> {
  const { data } = await request<EngagementModel[]>("/content/pricing", {
    next: { revalidate: CONTENT_TTL, tags: ["content", "pricing"] },
  });
  return data;
}

export async function getProcess(): Promise<ProcessStep[]> {
  const { data } = await request<ProcessStep[]>("/content/process", {
    next: { revalidate: CONTENT_TTL, tags: ["content"] },
  });
  return data;
}

export async function getMilestones(): Promise<Milestone[]> {
  const { data } = await request<Milestone[]>("/content/milestones", {
    next: { revalidate: CONTENT_TTL, tags: ["content"] },
  });
  return data;
}

export async function getFormOptions(): Promise<{
  projectTypes: string[];
  budgetRanges: string[];
  timelines: string[];
}> {
  const { data } = await request<{
    projectTypes: string[];
    budgetRanges: string[];
    timelines: string[];
  }>("/content/form-options", {
    next: { revalidate: CONTENT_TTL, tags: ["content"] },
  });
  return data;
}
