/**
 * Domain types mirroring the NestJS API contract.
 *
 * Kept hand-written and explicit rather than generated, so the admin portal
 * fails to compile when the server contract changes instead of failing at
 * runtime in front of a client.
 */

/** Every response from the API arrives in one of these two shapes. */

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

export interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string[];
    path?: string;
    requestId?: string;
    timestamp?: string;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/* ── Enquiries ─────────────────────────── */

export const ENQUIRY_STATUSES = [
  "new",
  "read",
  "responded",
  "won",
  "lost",
  "archived",
] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
  status: EnquiryStatus;
  needsFollowUp: boolean;
  createdAt: string;
  updatedAt: string;
  sourceIp?: string;
}

export interface EnquiryStats {
  total: number;
  needsFollowUp: number;
  byStatus: Record<string, number>;
}

/* ── Content ───────────────────────────── */

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  source: string;
  visit: string;
  category: "marketing" | "software";
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  text: string;
  deliverables: string[];
  category: "marketing" | "software";
}

export interface SoftwareProduct {
  id: string;
  name: string;
  type: string;
  url: string;
  accent: string;
  tagline: string;
  description: string;
  features: string[];
  stack: string[];
  platforms: string[];
  metrics: { value: string; label: string }[];
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  verified: boolean;
}

export interface Faq {
  q: string;
  a: string;
}

export interface EngagementModel {
  id: string;
  name: string;
  priceFrom: string;
  billing: string;
  tagline: string;
  bestFor: string;
  features: string[];
  highlighted: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  text: string;
}

export interface Milestone {
  year: number;
  text: string;
}

export interface SiteInfo {
  brand: string;
  shortBrand: string;
  tagline: string;
  description: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  timezone: string;
  responseTime: string;
  founded: number;
  socials: { label: string; href: string; icon: string }[];
  heroStats: { value: string; label: string }[];
  impactStats: { value: number; suffix: string; label: string }[];
  buildStats: { value: string; label: string }[];
}

export interface SiteStatus {
  name: string;
  version: string;
  uptimeSeconds: number;
  nodeVersion: string;
  environment: string;
  startedAt: string;
}

export interface BootstrapPayload {
  site: SiteInfo;
  featuredProjects: Project[];
  services: Service[];
  softwareProducts: SoftwareProduct[];
  testimonials: Testimonial[];
  faqs: Faq[];
  engagementModels: EngagementModel[];
  processSteps: ProcessStep[];
  milestones: Milestone[];
}

/* ── Query shapes ──────────────────────── */

export interface EnquiryQuery {
  page?: number;
  limit?: number;
  status?: EnquiryStatus | "all";
  search?: string;
}
