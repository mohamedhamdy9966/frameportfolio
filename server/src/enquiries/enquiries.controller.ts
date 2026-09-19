import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { toPaginationMeta } from '../common/dto/pagination.dto';
import { AdminApiKeyGuard } from '../common/guards/admin-api-key.guard';
import {
  success,
  type ApiSuccessResponse,
} from '../common/interfaces/api-response.interface';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiriesService } from './enquiries.service';
import {
  Enquiry,
  ListEnquiriesQueryDto,
  UpdateEnquiryStatusDto,
} from './entities/enquiry.entity';

@ApiTags('enquiries')
@Controller('enquiries')
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  /**
   * Public endpoint — this is what the client's quote form posts to.
   *
   * Throttled harder than the global limit because it is the only
   * unauthenticated write on the API and the obvious spam target.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({
    default: {
      // Overridable so automated tests can raise the ceiling without
      // weakening the limit that actually ships.
      limit: parseInt(process.env.ENQUIRY_THROTTLE_LIMIT ?? '5', 10),
      ttl: 60_000,
    },
  })
  @ApiOperation({
    summary: 'Submit a project enquiry',
    description:
      'Accepts the client quote form payload. Rate limited to 5 submissions per minute per IP.',
  })
  @ApiCreatedResponse({ description: 'Enquiry accepted.' })
  create(
    @Body() dto: CreateEnquiryDto,
    @Req() request: Request,
  ): ApiSuccessResponse<{ id: string; name: string; email: string }> {
    const ip =
      (request.headers['x-forwarded-for'] as string | undefined)
        ?.split(',')[0]
        ?.trim() ??
      request.ip ??
      request.socket?.remoteAddress;

    const enquiry = this.enquiriesService.create(dto, ip);

    // Return only what the form needs to confirm receipt. Echoing the whole
    // record back would leak the stored server-side fields to the submitter.
    return success({
      id: enquiry.id,
      name: enquiry.name,
      email: enquiry.email,
    });
  }

  /* ── Admin surface ────────────────────────
     Everything below exposes captured personal data, so it requires the
     x-api-key header. */

  @Get('stats')
  @UseGuards(AdminApiKeyGuard)
  @ApiHeader({ name: 'x-api-key', required: true })
  @ApiOperation({ summary: 'Enquiry pipeline counts (admin)' })
  @ApiOkResponse({ description: 'Counts by pipeline status.' })
  stats(): ApiSuccessResponse<ReturnType<EnquiriesService['getStats']>> {
    return success(this.enquiriesService.getStats());
  }

  @Get()
  @UseGuards(AdminApiKeyGuard)
  @ApiHeader({ name: 'x-api-key', required: true })
  @ApiOperation({
    summary: 'List enquiries (admin)',
    description: 'Paginated, filterable by status and free-text searchable.',
  })
  findAll(
    @Query() query: ListEnquiriesQueryDto,
  ): ApiSuccessResponse<Enquiry[]> {
    const { items, total, page, limit } = this.enquiriesService.findAll(query);

    return success(items, toPaginationMeta(total, page, limit));
  }

  @Get(':id')
  @UseGuards(AdminApiKeyGuard)
  @ApiHeader({ name: 'x-api-key', required: true })
  @ApiParam({ name: 'id', description: 'Enquiry UUID' })
  @ApiOperation({ summary: 'Fetch one enquiry (admin)' })
  findOne(@Param('id') id: string): ApiSuccessResponse<Enquiry> {
    return success(this.enquiriesService.findOne(id));
  }

  @Patch(':id/status')
  @UseGuards(AdminApiKeyGuard)
  @ApiHeader({ name: 'x-api-key', required: true })
  @ApiOperation({ summary: 'Update enquiry pipeline status (admin)' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateEnquiryStatusDto,
  ): ApiSuccessResponse<Enquiry> {
    return success(this.enquiriesService.updateStatus(id, dto.status));
  }

  @Delete(':id')
  @UseGuards(AdminApiKeyGuard)
  @ApiHeader({ name: 'x-api-key', required: true })
  @ApiOperation({ summary: 'Delete an enquiry (admin)' })
  remove(
    @Param('id') id: string,
  ): ApiSuccessResponse<{ id: string; deleted: true }> {
    return success(this.enquiriesService.remove(id));
  }
}
