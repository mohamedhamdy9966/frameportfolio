import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  success,
  type ApiSuccessResponse,
} from './common/interfaces/api-response.interface';
import { ContentService } from './content/content.service';

interface SiteStatus {
  name: string;
  version: string;
  uptimeSeconds: number;
  nodeVersion: string;
  environment: string;
  startedAt: string;
}

@ApiTags('health')
@Controller()
export class AppController {
  constructor(
    private readonly config: ConfigService,
    private readonly contentService: ContentService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Service identity and a map of the API surface',
    description:
      'A human-friendly root response. Use /health for liveness probes and /api/docs for the full reference.',
  })
  @ApiOkResponse({ description: 'Service banner.' })
  root(): ApiSuccessResponse<{
    name: string;
    tagline: string;
    version: string;
    docs: string;
    endpoints: Record<string, string>;
  }> {
    const site = this.contentService.getSite();

    return success({
      name: site.brand,
      tagline: site.tagline,
      version: this.version,
      docs: '/api/docs',
      endpoints: {
        bootstrap: 'GET /api/content/bootstrap',
        site: 'GET /api/content/site',
        projects: 'GET /api/content/projects',
        services: 'GET /api/content/services',
        software: 'GET /api/content/software',
        testimonials: 'GET /api/content/testimonials',
        faqs: 'GET /api/content/faqs',
        pricing: 'GET /api/content/pricing',
        formOptions: 'GET /api/content/form-options',
        submitEnquiry: 'POST /api/enquiries',
        enquiriesAdmin: 'GET /api/enquiries (requires x-api-key)',
        health: 'GET /health',
      },
    });
  }

  @Get('status')
  @ApiOperation({
    summary: 'Runtime status',
    description: 'Uptime, version and environment. Safe to expose publicly.',
  })
  status(): ApiSuccessResponse<SiteStatus> {
    return success({
      name: this.contentService.getSite().brand,
      version: this.version,
      uptimeSeconds: Math.floor(process.uptime()),
      nodeVersion: process.version,
      environment: this.config.get<string>('app.nodeEnv', 'development'),
      startedAt: new Date(Date.now() - process.uptime() * 1000).toISOString(),
    });
  }

  private get version(): string {
    return process.env.npm_package_version ?? '0.0.1';
  }
}
