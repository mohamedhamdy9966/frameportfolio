import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginatedResult } from '../common/dto/pagination.dto';
import {
  BUDGET_RANGES,
  PROJECT_TYPES,
  TIMELINE_OPTIONS,
} from '../enquiries/dto/create-enquiry.dto';
import {
  ENGAGEMENT_MODELS,
  FAQS,
  MILESTONES,
  PROCESS_STEPS,
  PROJECTS,
  SERVICES,
  SITE,
  SOFTWARE_PRODUCTS,
  TESTIMONIALS,
  type EngagementModel,
  type Faq,
  type Milestone,
  type ProcessStep,
  type Project,
  type Service,
  type SiteInfo,
  type SoftwareProduct,
  type Testimonial,
} from './data/portfolio.data';
import {
  ListContentQueryDto,
  ListTestimonialsQueryDto,
} from './dto/list-content.dto';

/**
 * Read access to portfolio content.
 *
 * All filtering happens here rather than in the controllers, so pagination
 * and search behave identically across every collection and the controllers
 * stay thin.
 */
@Injectable()
export class ContentService {
  /* ── Site ───────────────── */

  getSite(): SiteInfo {
    return SITE;
  }

  /* ── Projects ───────────────────────────── */

  getProjects(query: ListContentQueryDto): PaginatedResult<Project> {
    return this.paginate(
      this.filter(
        PROJECTS,
        query,
        (project) => [project.title, project.description, ...project.tags],
        'category',
      ),
      query,
    );
  }

  getFeaturedProjects(): Project[] {
    return PROJECTS.filter((project) => project.featured);
  }

  getProject(id: number): Project {
    const project = PROJECTS.find((item) => item.id === id);
    if (!project) {
      throw new NotFoundException(`No project found with id "${id}".`);
    }
    return project;
  }

  /* ── Services ───────────────────────────── */

  getServices(query: ListContentQueryDto): PaginatedResult<Service> {
    return this.paginate(
      this.filter(
        SERVICES,
        query,
        (service) => [service.title, service.text, ...service.deliverables],
        'category',
      ),
      query,
    );
  }

  getService(id: string): Service {
    const service = SERVICES.find((item) => item.id === id);
    if (!service) {
      throw new NotFoundException(`No service found with id "${id}".`);
    }
    return service;
  }

  /* ── Software products ──────────────────── */

  getSoftwareProducts(): SoftwareProduct[] {
    return SOFTWARE_PRODUCTS;
  }

  getSoftwareProduct(id: string): SoftwareProduct {
    const product = SOFTWARE_PRODUCTS.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`No software product found with id "${id}".`);
    }
    return product;
  }

  /* ── Testimonials ───────────────────────── */

  getTestimonials(query: ListTestimonialsQueryDto): Testimonial[] {
    let results = TESTIMONIALS;

    // By default, withhold unverified placeholder quotes so a consumer cannot
    // accidentally publish them. `?includeUnverified=true` opts in explicitly.
    if (!query.includeUnverified) {
      results = results.filter((item) => item.verified);
    }

    return results;
  }

  /* ── FAQ / pricing / process / history ──── */

  getFaqs(search?: string): Faq[] {
    if (!search) return FAQS;
    const term = search.toLowerCase();
    return FAQS.filter(
      (faq) =>
        faq.q.toLowerCase().includes(term) ||
        faq.a.toLowerCase().includes(term),
    );
  }

  getEngagementModels(): EngagementModel[] {
    return ENGAGEMENT_MODELS;
  }

  getProcessSteps(): ProcessStep[] {
    return PROCESS_STEPS;
  }

  getMilestones(): Milestone[] {
    return MILESTONES;
  }

  /**
   * Everything the client homepage needs in one round trip, so the first
   * paint does not wait on ten sequential fetches.
   */
  getBootstrap(): {
    site: SiteInfo;
    featuredProjects: Project[];
    services: Service[];
    softwareProducts: SoftwareProduct[];
    testimonials: Testimonial[];
    faqs: Faq[];
    engagementModels: EngagementModel[];
    processSteps: ProcessStep[];
    milestones: Milestone[];
  } {
    return {
      site: SITE,
      featuredProjects: this.getFeaturedProjects(),
      services: SERVICES,
      softwareProducts: SOFTWARE_PRODUCTS,
      // Unverified placeholder quotes are filtered out of the bootstrap
      // payload so the public client can never render them by default.
      testimonials: TESTIMONIALS.filter((item) => item.verified),
      faqs: FAQS,
      engagementModels: ENGAGEMENT_MODELS,
      processSteps: PROCESS_STEPS,
      milestones: MILESTONES,
    };
  }

  /* ── Helpers ────────────────────────────── */

  /** Applies free-text search plus a category filter, if provided. */
  private filter<T>(
    source: T[],
    query: ListContentQueryDto,
    searchableFields: (item: T) => (string | undefined)[],
    categoryKey?: keyof T,
  ): T[] {
    let results = source;

    // `category` is validated as a string at the DTO level, so an unknown
    // value simply yields an empty page rather than an error.
    if (query.category && categoryKey) {
      results = results.filter(
        (item) => String(item[categoryKey]) === query.category,
      );
    }

    if (query.tag) {
      results = results.filter((item) =>
        Array.isArray((item as { tags?: string[] }).tags)
          ? (item as { tags: string[] }).tags.some(
              (tag) => tag.toLowerCase() === query.tag!.toLowerCase(),
            )
          : false,
      );
    }

    if (query.search) {
      const term = query.search.toLowerCase();
      results = results.filter((item) =>
        searchableFields(item)
          .filter((field): field is string => typeof field === 'string')
          .some((field) => field.toLowerCase().includes(term)),
      );
    }

    return results;
  }

  /** Slices a filtered collection into the standard paginated shape. */
  private paginate<T>(
    items: T[],
    query: ListContentQueryDto,
  ): PaginatedResult<T> {
    const total = items.length;
    const pageItems = items.slice(query.skip, query.skip + query.limit);
    return new PaginatedResult(pageItems, total, query.page, query.limit);
  }

  /**
   * The exact select options the quote form uses.
   *
   * Served from the API and imported by the enquiry DTO from the same source,
   * so the client's dropdowns and the server's validation can never drift
   * apart — a value the form offers is always a value the API accepts.
   */
  getFormOptions(): {
    projectTypes: readonly string[];
    budgetRanges: readonly string[];
    timelines: readonly string[];
  } {
    return {
      projectTypes: PROJECT_TYPES,
      budgetRanges: BUDGET_RANGES,
      timelines: TIMELINE_OPTIONS,
    };
  }

  /** Distinct tag list, useful for building client-side filter chips. */
  getProjectTags(): string[] {
    const tags = new Set<string>();
    for (const project of PROJECTS) {
      for (const tag of project.tags) tags.add(tag);
    }
    return [...tags].sort();
  }
}
