import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ContentService } from './content.service';
import { ListContentQueryDto } from './dto/list-content.dto';
import { CONFIG_NAMESPACES } from '../config/configuration';

const buildQuery = (overrides: Partial<ListContentQueryDto> = {}) => {
  const query = new ListContentQueryDto();
  Object.assign(query, overrides);
  return query;
};

describe('ContentService', () => {
  let service: ContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: CONFIG_NAMESPACES,
          ignoreEnvFile: true,
        }),
      ],
      providers: [ContentService],
    }).compile();

    service = module.get<ContentService>(ContentService);
  });

  describe('getSite', () => {
    it('exposes the WhatsApp link in wa.me international format', () => {
      const site = service.getSite();

      expect(site.whatsapp).toMatch(/^https:\/\/wa\.me\/\d+$/);
      // A leading zero here is the classic broken-link bug.
      expect(site.whatsapp).not.toContain('/0');
    });

    it('serves the hero and impact counters the client renders', () => {
      const site = service.getSite();

      expect(site.heroStats.length).toBeGreaterThan(0);
      expect(site.impactStats.length).toBe(4);
      expect(site.buildStats.length).toBeGreaterThan(0);
    });
  });

  describe('getProjects', () => {
    it('returns every project by default', () => {
      const { total } = service.getProjects(buildQuery());
      expect(total).toBeGreaterThan(0);
    });

    it('filters by category', () => {
      const { items, total } = service.getProjects(
        buildQuery({ category: 'software' }),
      );

      expect(total).toBeGreaterThan(0);
      expect(items.every((item) => item.category === 'software')).toBe(true);
    });

    it('filters by tag, case-insensitively', () => {
      const { items, total } = service.getProjects(buildQuery({ tag: 'seo' }));

      expect(total).toBeGreaterThan(0);
      expect(
        items.every((item) =>
          item.tags.some((tag) => tag.toLowerCase() === 'seo'),
        ),
      ).toBe(true);
    });

    it('returns an empty page for an unknown tag rather than throwing', () => {
      const { items, total } = service.getProjects(
        buildQuery({ tag: 'definitely-not-a-tag' }),
      );

      expect(total).toBe(0);
      expect(items).toEqual([]);
    });

    it('searches titles, descriptions and tags', () => {
      const { total } = service.getProjects(buildQuery({ search: 'roshetta' }));
      expect(total).toBeGreaterThan(0);
    });

    it('paginates', () => {
      const page1 = service.getProjects(buildQuery({ page: 1, limit: 2 }));
      const page2 = service.getProjects(buildQuery({ page: 2, limit: 2 }));

      expect(page1.items).toHaveLength(2);
      expect(page1.items[0].id).not.toBe(page2.items[0]?.id);
    });
  });

  describe('getProject', () => {
    it('throws NotFound for an unknown id', () => {
      expect(() => service.getProject(9999)).toThrow(
        'No project found with id "9999".',
      );
    });
  });

  describe('getServices', () => {
    it('separates marketing from software services', () => {
      const marketing = service.getServices(
        buildQuery({ category: 'marketing' }),
      );
      const software = service.getServices(
        buildQuery({ category: 'software' }),
      );

      expect(marketing.total).toBeGreaterThan(0);
      expect(software.total).toBeGreaterThan(0);
      expect(marketing.total + software.total).toBe(
        service.getServices(buildQuery()).total,
      );
    });
  });

  describe('getSoftwareProducts', () => {
    it('ships the three real client platforms with live URLs', () => {
      const products = service.getSoftwareProducts();
      const ids = products.map((product) => product.id);

      expect(ids).toEqual(
        expect.arrayContaining(['roshetta', 'pharmaca', 'kunafa-sheek']),
      );
      for (const product of products) {
        expect(product.url).toMatch(/^https:\/\//);
        expect(product.metrics.length).toBeGreaterThan(0);
        expect(product.stack.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getTestimonials', () => {
    it('withholds unverified placeholder quotes by default', () => {
      // Nothing is verified yet, so the safe default returns an empty list
      // rather than publishing invented testimonials.
      const published = service.getTestimonials({});
      expect(published.every((item) => item.verified)).toBe(true);
    });

    it('returns everything when explicitly asked', () => {
      const all = service.getTestimonials({ includeUnverified: 'true' });
      expect(all.length).toBeGreaterThan(0);
    });
  });

  describe('getFormOptions', () => {
    it('serves the same options the enquiry DTO validates against', () => {
      const options = service.getFormOptions();

      expect(Object.keys(options)).toEqual([
        'projectTypes',
        'budgetRanges',
        'timelines',
      ]);
      for (const list of Object.values(options)) {
        expect(list.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getProjectTags', () => {
    it('returns a sorted, de-duplicated tag list', () => {
      const tags = service.getProjectTags();

      expect(tags.length).toBe(new Set(tags).size);
      expect([...tags].sort()).toEqual(tags);
    });
  });

  describe('getBootstrap', () => {
    it('bundles every homepage collection in one payload', () => {
      const payload = service.getBootstrap();

      expect(payload.site.brand).toBeDefined();
      expect(payload.featuredProjects.length).toBeGreaterThan(0);
      expect(payload.services.length).toBeGreaterThan(0);
      expect(payload.softwareProducts).toHaveLength(3);
      expect(payload.faqs.length).toBeGreaterThan(0);
      expect(payload.engagementModels).toHaveLength(3);
      expect(payload.processSteps).toHaveLength(5);
      expect(payload.milestones.length).toBeGreaterThan(0);
    });
  });

  describe('getFaqs', () => {
    it('searches questions and answers', () => {
      const results = service.getFaqs('NDA');
      expect(results.length).toBeGreaterThan(0);
    });
  });
});
