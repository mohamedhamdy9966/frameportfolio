import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { PaginatedResult } from '../common/dto/pagination.dto';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import {
  Enquiry,
  EnquiryStatus,
  ListEnquiriesQueryDto,
} from './entities/enquiry.entity';

/**
 * Enquiry storage.
 *
 * The repository is deliberately behind this service so the storage engine is
 * an implementation detail. Right now it is an in-memory ring buffer, which is
 * enough for the marketing site (leads are also emailed) and keeps the server
 * runnable with zero infrastructure.
 *
 * TO SWAP IN A DATABASE: replace the four private helpers at the bottom
 * (insert / selectAll / selectById / mutate) with Prisma or TypeORM calls.
 * Nothing outside this file knows how enquiries are stored.
 */
@Injectable()
export class EnquiriesService implements OnModuleInit {
  private readonly logger = new Logger(EnquiriesService.name);

  /** Newest first — index 0 is the most recent enquiry. */
  private enquiries: Enquiry[] = [];

  private maxStored = 500;

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    this.maxStored = this.config.get<number>('enquiries.maxStored', 500);
    this.logger.log(
      `Enquiry store ready (in-memory, retention ${this.maxStored} records). ` +
        'Swap EnquiriesService persistence before relying on this in production.',
    );
  }

  /* ── Public API ─────────────────────────── */

  create(dto: CreateEnquiryDto, sourceIp?: string): Enquiry {
    const now = new Date().toISOString();

    const enquiry: Enquiry = {
      id: randomUUID(),
      name: dto.name,
      email: dto.email,
      ...(dto.company ? { company: dto.company } : {}),
      ...(dto.phone ? { phone: dto.phone } : {}),
      projectType: dto.projectType,
      timeline: dto.timeline,
      budget: dto.budget,
      message: dto.message,
      status: EnquiryStatus.New,
      needsFollowUp: true,
      createdAt: now,
      updatedAt: now,
      ...(sourceIp ? { sourceIp } : {}),
    };

    this.insert(enquiry);
    this.logger.log(
      `New enquiry from ${enquiry.email} (${enquiry.projectType})`,
    );

    return enquiry;
  }

  findAll(query: ListEnquiriesQueryDto): PaginatedResult<Enquiry> {
    let results = this.selectAll();

    if (query.status) {
      results = results.filter((item) => item.status === query.status);
    }

    if (query.search) {
      const term = query.search.toLowerCase();
      results = results.filter((item) =>
        [item.name, item.email, item.company, item.message, item.projectType]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(term)),
      );
    }

    const total = results.length;
    const start = query.skip;
    const items = results.slice(start, start + query.limit);

    return new PaginatedResult(items, total, query.page, query.limit);
  }

  findOne(id: string): Enquiry {
    const enquiry = this.selectById(id);
    if (!enquiry) {
      throw new NotFoundException(`No enquiry found with id "${id}".`);
    }
    return enquiry;
  }

  updateStatus(id: string, status: EnquiryStatus): Enquiry {
    const updated = this.mutate(id, (enquiry) => ({
      ...enquiry,
      status,
      // A lead that has been replied to no longer needs chasing; archiving
      // and losing it never did either.
      needsFollowUp:
        status === EnquiryStatus.New || status === EnquiryStatus.Read,
      updatedAt: new Date().toISOString(),
    }));

    if (!updated) {
      throw new NotFoundException(`No enquiry found with id "${id}".`);
    }

    return updated;
  }

  remove(id: string): { id: string; deleted: true } {
    const before = this.enquiries.length;
    this.enquiries = this.enquiries.filter((enquiry) => enquiry.id !== id);

    if (this.enquiries.length === before) {
      throw new NotFoundException(`No enquiry found with id "${id}".`);
    }

    this.logger.warn(`Enquiry ${id} deleted.`);
    return { id, deleted: true };
  }

  /** Counts per pipeline stage — powers the admin dashboard tiles. */
  getStats(): {
    total: number;
    needsFollowUp: number;
    byStatus: Record<string, number>;
  } {
    const byStatus = Object.values(EnquiryStatus).reduce<
      Record<string, number>
    >((acc, status) => ({ ...acc, [status]: 0 }), {});

    for (const enquiry of this.enquiries) {
      byStatus[enquiry.status] = (byStatus[enquiry.status] ?? 0) + 1;
    }

    return {
      total: this.enquiries.length,
      needsFollowUp: this.enquiries.filter((item) => item.needsFollowUp).length,
      byStatus,
    };
  }

  /* ── Storage implementation details ─────────────────────── */

  private insert(enquiry: Enquiry): void {
    this.enquiries.unshift(enquiry);

    // Evict oldest so a long-running process cannot grow without bound.
    if (this.enquiries.length > this.maxStored) {
      this.enquiries = this.enquiries.slice(0, this.maxStored);
    }
  }

  private selectAll(): Enquiry[] {
    return [...this.enquiries];
  }

  private selectById(id: string): Enquiry | undefined {
    return this.enquiries.find((enquiry) => enquiry.id === id);
  }

  private mutate(
    id: string,
    updater: (enquiry: Enquiry) => Enquiry,
  ): Enquiry | undefined {
    const index = this.enquiries.findIndex((enquiry) => enquiry.id === id);
    if (index === -1) return undefined;

    const updated = updater(this.enquiries[index]);
    this.enquiries[index] = updated;
    return updated;
  }
}
