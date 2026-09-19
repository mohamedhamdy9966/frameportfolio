import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { EnquiryStatus } from './entities/enquiry.entity';
import { ListEnquiriesQueryDto } from './entities/enquiry.entity';
import { CONFIG_NAMESPACES } from '../config/configuration';

const buildDto = (
  overrides: Partial<CreateEnquiryDto> = {},
): CreateEnquiryDto =>
  ({
    name: 'Nour Ibrahim',
    email: 'nour@company.com',
    projectType: 'Web platform or website',
    timeline: 'As soon as possible',
    budget: 'EGP 50,000 – 150,000',
    message: 'We need a booking platform with payments.',
    ...overrides,
  }) as CreateEnquiryDto;

describe('EnquiriesService', () => {
  let service: EnquiriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: CONFIG_NAMESPACES,
          ignoreEnvFile: true,
        }),
      ],
      providers: [EnquiriesService],
    }).compile();

    service = module.get<EnquiriesService>(EnquiriesService);
    service.onModuleInit();
  });

  describe('create', () => {
    it('stores an enquiry and returns it with generated metadata', () => {
      const enquiry = service.create(buildDto(), '127.0.0.1');

      expect(enquiry.id).toBeDefined();
      expect(enquiry.name).toBe('Nour Ibrahim');
      expect(enquiry.status).toBe(EnquiryStatus.New);
      expect(enquiry.needsFollowUp).toBe(true);
      expect(enquiry.sourceIp).toBe('127.0.0.1');
      expect(enquiry.createdAt).toBe(enquiry.updatedAt);
    });

    it('defaults optional company and phone to undefined rather than empty strings', () => {
      const enquiry = service.create(buildDto());

      expect(enquiry.company).toBeUndefined();
      expect(enquiry.phone).toBeUndefined();
      expect(enquiry.sourceIp).toBeUndefined();
    });

    it('keeps the newest enquiry first', () => {
      service.create(buildDto({ email: 'first@company.com' }));
      service.create(buildDto({ email: 'second@company.com' }));

      const { items } = service.findAll(new ListEnquiriesQueryDto());

      expect(items[0].email).toBe('second@company.com');
      expect(items[1].email).toBe('first@company.com');
    });
  });

  describe('findAll', () => {
    beforeEach(() => {
      for (let i = 0; i < 25; i += 1) {
        service.create(buildDto({ name: `Client ${i}`, email: `c${i}@x.com` }));
      }
    });

    it('paginates results', () => {
      const query = new ListEnquiriesQueryDto();
      query.page = 2;
      query.limit = 10;

      const { items, total } = service.findAll(query);

      expect(total).toBe(25);
      expect(items).toHaveLength(10);
    });

    it('filters by status', () => {
      const all = service.findAll(new ListEnquiriesQueryDto());
      service.updateStatus(all.items[0].id, EnquiryStatus.Won);

      const query = new ListEnquiriesQueryDto();
      query.status = EnquiryStatus.Won;

      const { items, total } = service.findAll(query);

      expect(total).toBe(1);
      expect(items[0].status).toBe(EnquiryStatus.Won);
    });

    it('searches across name, email and message', () => {
      service.create(buildDto({ name: 'Zeyad Farouk', email: 'zeyad@x.com' }));

      const query = new ListEnquiriesQueryDto();
      query.search = 'zeyad';

      const { total } = service.findAll(query);

      expect(total).toBe(1);
    });
  });

  describe('findOne', () => {
    it('throws NotFound for an unknown id', () => {
      expect(() => service.findOne('does-not-exist')).toThrow(
        'No enquiry found with id "does-not-exist".',
      );
    });
  });

  describe('updateStatus', () => {
    it('clears the follow-up flag once a lead is responded to', () => {
      const enquiry = service.create(buildDto());

      const updated = service.updateStatus(enquiry.id, EnquiryStatus.Responded);

      expect(updated.status).toBe(EnquiryStatus.Responded);
      expect(updated.needsFollowUp).toBe(false);
    });

    it('keeps the follow-up flag for a lead that is still new or read', () => {
      const enquiry = service.create(buildDto());

      const updated = service.updateStatus(enquiry.id, EnquiryStatus.Read);

      expect(updated.needsFollowUp).toBe(true);
    });

    it('throws NotFound for an unknown id', () => {
      expect(() => service.updateStatus('nope', EnquiryStatus.Won)).toThrow();
    });
  });

  describe('remove', () => {
    it('deletes an existing enquiry', () => {
      const enquiry = service.create(buildDto());

      expect(service.remove(enquiry.id)).toEqual({
        id: enquiry.id,
        deleted: true,
      });
      expect(() => service.findOne(enquiry.id)).toThrow();
    });

    it('throws NotFound when deleting an unknown id', () => {
      expect(() => service.remove('nope')).toThrow();
    });
  });

  describe('getStats', () => {
    it('counts enquiries by status and tracks follow-ups', () => {
      const a = service.create(buildDto({ email: 'a@x.com' }));
      service.create(buildDto({ email: 'b@x.com' }));
      service.updateStatus(a.id, EnquiryStatus.Won);

      const stats = service.getStats();

      expect(stats.total).toBe(2);
      expect(stats.needsFollowUp).toBe(1);
      expect(stats.byStatus[EnquiryStatus.Won]).toBe(1);
      expect(stats.byStatus[EnquiryStatus.New]).toBe(1);
      expect(stats.byStatus[EnquiryStatus.Archived]).toBe(0);
    });
  });
});
