import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { toPaginationMeta } from '../common/dto/pagination.dto';
import {
  success,
  type ApiSuccessResponse,
} from '../common/interfaces/api-response.interface';
import { ContentService } from './content.service';
import type {
  EngagementModel,
  Faq,
  Milestone,
  ProcessStep,
  Project,
  Service,
  SiteInfo,
  SoftwareProduct,
  Testimonial,
} from './data/portfolio.data';
import {
  ListContentQueryDto,
  ListTestimonialsQueryDto,
} from './dto/list-content.dto';

@ApiTags('content')
@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  /* ── Aggregated payload for the client homepage ── */

  @Get('bootstrap')
  @ApiOperation({
    summary: 'Everything the homepage needs, in one request',
    description:
      'Site metadata, featured projects, services, shipped software, published testimonials, FAQs, pricing and process. Use this instead of ten sequential calls on first paint.',
  })
  @ApiOkResponse({ description: 'Aggregated homepage payload.' })
  bootstrap(): ApiSuccessResponse<ReturnType<ContentService['getBootstrap']>> {
    return success(this.contentService.getBootstrap());
  }

  /* ── Site ───────────────────── */

  @Get('site')
  @ApiOperation({
    summary: 'Brand, contact details and headline stats',
    description:
      'Includes the WhatsApp link in wa.me format and the hero/impact counters so the client never hardcodes contact details.',
  })
  site(): ApiSuccessResponse<SiteInfo> {
    return success(this.contentService.getSite());
  }

  /* ── Projects ───────────────── */

  @Get('projects')
  @ApiOperation({
    summary: 'List case studies',
    description: 'Supports ?search=, ?category=, ?tag= and ?page=/&limit=.',
  })
  projects(@Query() query: ListContentQueryDto): ApiSuccessResponse<Project[]> {
    const { items, total, page, limit } =
      this.contentService.getProjects(query);
    return success(items, toPaginationMeta(total, page, limit));
  }

  @Get('projects/tags')
  @ApiOperation({
    summary: 'Distinct project tags',
    description: 'Powers client-side filter chips.',
  })
  projectTags(): ApiSuccessResponse<string[]> {
    return success(this.contentService.getProjectTags());
  }

  @Get('projects/featured')
  @ApiOperation({ summary: 'Featured case studies only' })
  featuredProjects(): ApiSuccessResponse<Project[]> {
    return success(this.contentService.getFeaturedProjects());
  }

  @Get('projects/:id')
  @ApiParam({ name: 'id', description: 'Numeric project id' })
  @ApiOperation({ summary: 'Fetch one case study' })
  project(@Param('id', ParseIntPipe) id: number): ApiSuccessResponse<Project> {
    return success(this.contentService.getProject(id));
  }

  /* ── Services ───────────────── */

  @Get('services')
  @ApiOperation({
    summary: 'List services',
    description:
      'Returns both marketing and software services; filter with ?category=software.',
  })
  services(@Query() query: ListContentQueryDto): ApiSuccessResponse<Service[]> {
    const { items, total, page, limit } =
      this.contentService.getServices(query);
    return success(items, toPaginationMeta(total, page, limit));
  }

  @Get('services/:id')
  @ApiParam({ name: 'id', description: 'Service slug, e.g. "mobile"' })
  @ApiOperation({ summary: 'Fetch one service' })
  service(@Param('id') id: string): ApiSuccessResponse<Service> {
    return success(this.contentService.getService(id));
  }

  /* ── Shipped software ── */

  @Get('software')
  @ApiOperation({
    summary: 'Platforms we shipped',
    description: 'Roshetta, Pharmaca and Kunafa Sheek with stack and metrics.',
  })
  software(): ApiSuccessResponse<SoftwareProduct[]> {
    return success(this.contentService.getSoftwareProducts());
  }

  @Get('software/:id')
  @ApiParam({ name: 'id', description: 'Product slug, e.g. "pharmaca"' })
  @ApiOperation({ summary: 'Fetch one shipped product' })
  softwareProduct(
    @Param('id') id: string,
  ): ApiSuccessResponse<SoftwareProduct> {
    return success(this.contentService.getSoftwareProduct(id));
  }

  /* ── Testimonials ─────────────────── */

  @Get('testimonials')
  @ApiOperation({
    summary: 'Client testimonials',
    description:
      'Unverified placeholder quotes are withheld unless ?includeUnverified=true is passed explicitly.',
  })
  testimonials(
    @Query() query: ListTestimonialsQueryDto,
  ): ApiSuccessResponse<Testimonial[]> {
    return success(this.contentService.getTestimonials(query));
  }

  /* ── FAQ, pricing, process, history ── */

  @Get('faqs')
  @ApiOperation({ summary: 'Frequently asked questions' })
  faqs(@Query('search') search?: string): ApiSuccessResponse<Faq[]> {
    return success(this.contentService.getFaqs(search));
  }

  @Get('pricing')
  @ApiOperation({
    summary: 'Engagement models and indicative pricing',
    description:
      'Prices are indicative. Final scope and cost are confirmed in writing before any work starts.',
  })
  pricing(): ApiSuccessResponse<EngagementModel[]> {
    return success(this.contentService.getEngagementModels());
  }

  @Get('process')
  @ApiOperation({ summary: 'Five-stage delivery process' })
  process(): ApiSuccessResponse<ProcessStep[]> {
    return success(this.contentService.getProcessSteps());
  }

  @Get('milestones')
  @ApiOperation({ summary: 'Company timeline for the About section' })
  milestones(): ApiSuccessResponse<Milestone[]> {
    return success(this.contentService.getMilestones());
  }

  /* ── Form option lists ───────────── */

  @Get('form-options')
  @ApiOperation({
    summary: 'Select options for the quote form',
    description:
      'Served from the API so the client and the server validation can never drift apart.',
  })
  formOptions(): ApiSuccessResponse<{
    projectTypes: readonly string[];
    budgetRanges: readonly string[];
    timelines: readonly string[];
  }> {
    return success({
      projectTypes: this.contentService.getFormOptions().projectTypes,
      budgetRanges: this.contentService.getFormOptions().budgetRanges,
      timelines: this.contentService.getFormOptions().timelines,
    });
  }
}
