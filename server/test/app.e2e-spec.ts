import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/setup-app';

/**
 * End-to-end tests against the real HTTP surface.
 *
 * These assert the contract the client site actually depends on: the response
 * envelope, the validation rules on the quote form, the field whitelist, the
 * anti-spam honeypot, and that admin endpoints refuse unauthenticated reads.
 *
 * The suite deliberately fires more than 5 submissions a minute at the
 * enquiry endpoint — more than the production burst limit — so it raises
 * THROTTLE_LIMIT for the run. Rate limiting itself is verified for real in
 * test/rate-limit.e2e-spec.ts, which leaves the limit at its production value.
 */
/** Shape shared by every response, so assertions stay type-safe. */
interface Envelope<T = unknown> {
  success: boolean;
  data: T;
  meta?: Record<string, number | boolean>;
  error?: {
    code: string;
    message: string;
    details: string[];
    path: string;
    requestId: string;
    timestamp: string;
  };
}

/** Casts a supertest response body (typed `any`) to the real envelope. */
const bodyOf = <T = Record<string, unknown>>(response: {
  body: unknown;
}): Envelope<T> => response.body as Envelope<T>;

describe('Taxi API (e2e)', () => {
  let app: INestApplication<App>;
  let http: App;

  const validEnquiry = {
    name: 'Nour Ibrahim',
    email: 'nour@company.com',
    company: 'Acme Ltd',
    phone: '+20 111 125 5279',
    projectType: 'Web platform or website',
    timeline: 'As soon as possible',
    budget: 'EGP 50,000 – 150,000',
    message: 'We need a booking platform with payments and an admin dashboard.',
  };

  beforeAll(async () => {
    // Both limits are raised via test/setup-env.ts, which Jest loads before
    // this module — the @Throttle decorator reads its limit at import time,
    // so setting it here would be too late.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Applies the exact same pipes, filters, prefix and versioning as the
    // deployed server — so a green suite means something about production.
    configureApp(app);
    await app.init();

    http = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('root', () => {
    it('GET /api — reports service identity and the endpoint map', async () => {
      const response = await request(http).get('/api/v1').expect(200);

      expect(bodyOf(response).success).toBe(true);
      expect(bodyOf(response).data.name).toBe('Taxi Digital Solutions');
      expect(bodyOf(response).data.endpoints.submitEnquiry).toBeDefined();
      // Correlation id is echoed back for support tracing.
      expect(response.headers['x-request-id']).toBeDefined();
    });

    it('GET /api/status — reports uptime and environment', async () => {
      const response = await request(http).get('/api/v1/status').expect(200);

      expect(bodyOf(response).data.uptimeSeconds).toBeGreaterThanOrEqual(0);
      expect(bodyOf(response).data.nodeVersion).toMatch(/^v\d+/);
    });
  });

  describe('content', () => {
    it('GET /api/content/bootstrap — returns the whole homepage payload', async () => {
      const response = await request(http)
        .get('/api/v1/content/bootstrap')
        .expect(200);

      const data = bodyOf(response).data;
      expect(data.site.brand).toBeDefined();
      expect(data.softwareProducts).toHaveLength(3);
      expect(data.engagementModels).toHaveLength(3);
      expect(data.processSteps).toHaveLength(5);
    });

    it('GET /api/content/site — serves the WhatsApp number in wa.me format', async () => {
      const response = await request(http)
        .get('/api/v1/content/site')
        .expect(200);

      expect(bodyOf(response).data.whatsapp).toMatch(/^https:\/\/wa\.me\/\d+$/);
    });

    it('GET /api/content/projects — paginates with a meta block', async () => {
      const response = await request(http)
        .get('/api/v1/content/projects?page=1&limit=2')
        .expect(200);

      expect(bodyOf(response).data).toHaveLength(2);
      expect(bodyOf(response).meta).toMatchObject({
        page: 1,
        limit: 2,
        hasNextPage: true,
        hasPreviousPage: false,
      });
    });

    it('GET /api/content/projects?category=software — filters', async () => {
      const response = await request(http)
        .get('/api/v1/content/projects?category=software')
        .expect(200);

      expect(
        bodyOf(response).data.every(
          (item: { category: string }) => item.category === 'software',
        ),
      ).toBe(true);
    });

    it('GET /api/content/projects?category=nonsense — 400, not a silent empty list', async () => {
      const response = await request(http)
        .get('/api/v1/content/projects?category=nonsense')
        .expect(400);

      expect(bodyOf(response).success).toBe(false);
      expect(bodyOf(response).error.code).toBe('VALIDATION_ERROR');
    });

    it('GET /api/content/projects?limit=9999 — rejects an unbounded page size', async () => {
      const response = await request(http)
        .get('/api/v1/content/projects?limit=9999')
        .expect(400);

      expect(bodyOf(response).error.details.join(' ')).toContain('limit');
    });

    it('GET /api/content/software/pharmaca — returns one product', async () => {
      const response = await request(http)
        .get('/api/v1/content/software/pharmaca')
        .expect(200);

      expect(bodyOf(response).data.name).toBe('Pharmaca');
    });

    it('GET /api/content/software/unknown — 404 with a stable error code', async () => {
      const response = await request(http)
        .get('/api/v1/content/software/unknown')
        .expect(404);

      expect(bodyOf(response).success).toBe(false);
      expect(bodyOf(response).error.code).toBe('NOT_FOUND');
    });

    it('GET /api/content/form-options — matches the enquiry DTO contract', async () => {
      const options = await request(http)
        .get('/api/v1/content/form-options')
        .expect(200);

      const { projectTypes, budgetRanges, timelines } = bodyOf<{
        projectTypes: string[];
        budgetRanges: string[];
        timelines: string[];
      }>(options).data;
      expect(projectTypes).toContain(validEnquiry.projectType);
      expect(budgetRanges).toContain(validEnquiry.budget);
      expect(timelines).toContain(validEnquiry.timeline);
    });

    it('GET /api/content/testimonials — withholds unverified quotes by default', async () => {
      const response = await request(http)
        .get('/api/v1/content/testimonials')
        .expect(200);

      expect(
        bodyOf(response).data.every(
          (item: { verified: boolean }) => item.verified,
        ),
      ).toBe(true);
    });

    it('GET /api/content/projects/abc — 400 for a non-numeric id', async () => {
      await request(http).get('/api/v1/content/projects/abc').expect(400);
    });
  });

  describe('POST /api/enquiries', () => {
    it('accepts a valid submission and returns only a receipt', async () => {
      const response = await request(http)
        .post('/api/v1/enquiries')
        .send(validEnquiry)
        .expect(201);

      expect(bodyOf(response).success).toBe(true);
      expect(bodyOf(response).data.id).toBeDefined();
      expect(bodyOf(response).data.name).toBe('Nour Ibrahim');

      // The submitter must not receive back server-side triage fields.
      expect(bodyOf(response).data.status).toBeUndefined();
      expect(bodyOf(response).data.needsFollowUp).toBeUndefined();
      expect(bodyOf(response).data.sourceIp).toBeUndefined();
    });

    it('rejects a missing name with a field-level message', async () => {
      const withoutName: Record<string, unknown> = { ...validEnquiry };
      delete withoutName.name;

      const response = await request(http)
        .post('/api/v1/enquiries')
        .send(withoutName)
        .expect(400);

      expect(bodyOf(response).error.code).toBe('VALIDATION_ERROR');
      expect(bodyOf(response).error.details.join(' ')).toContain('name');
    });

    it('rejects a malformed email', async () => {
      const response = await request(http)
        .post('/api/v1/enquiries')
        .send({ ...validEnquiry, email: 'not-an-email' })
        .expect(400);

      expect(bodyOf(response).error.details.join(' ')).toContain('email');
    });

    it('rejects a message that is too short to act on', async () => {
      const response = await request(http)
        .post('/api/v1/enquiries')
        .send({ ...validEnquiry, message: 'hi' })
        .expect(400);

      expect(bodyOf(response).error.details.join(' ')).toContain('message');
    });

    it('rejects an unknown project type', async () => {
      const response = await request(http)
        .post('/api/v1/enquiries')
        .send({ ...validEnquiry, projectType: 'Free work please' })
        .expect(400);

      expect(bodyOf(response).error.details.join(' ')).toContain('projectType');
    });

    it('rejects a filled honeypot field', async () => {
      const response = await request(http)
        .post('/api/v1/enquiries')
        .send({ ...validEnquiry, website: 'http://spam.example' })
        .expect(400);

      expect(bodyOf(response).success).toBe(false);
    });

    it('strips unknown fields instead of storing them', async () => {
      const response = await request(http)
        .post('/api/v1/enquiries')
        .send({ ...validEnquiry, role: 'admin', injected: true })
        .expect(201);

      expect(bodyOf(response).data.role).toBeUndefined();
      expect(bodyOf(response).data.injected).toBeUndefined();
    });

    it('normalises email to lower case', async () => {
      const response = await request(http)
        .post('/api/v1/enquiries')
        .send({ ...validEnquiry, email: 'NOUR@Company.COM' })
        .expect(201);

      expect(bodyOf(response).data.email).toBe('nour@company.com');
    });
  });

  describe('admin surface', () => {
    it('refuses to list enquiries without an API key', async () => {
      const response = await request(http).get('/api/v1/enquiries').expect(401);

      expect(bodyOf(response).success).toBe(false);
      expect(bodyOf(response).error.code).toBe('UNAUTHORIZED');
    });

    it('refuses a wrong API key', async () => {
      await request(http)
        .get('/api/v1/enquiries')
        .set('x-api-key', 'definitely-wrong')
        .expect(401);
    });

    it('refuses the stats endpoint without a key too', async () => {
      await request(http).get('/api/v1/enquiries/stats').expect(401);
    });
  });

  describe('error envelope', () => {
    it('returns the same shape for an unknown route', async () => {
      const response = await request(http)
        .get('/api/v1/does-not-exist')
        .expect(404);

      expect(bodyOf(response)).toMatchObject({
        success: false,
        error: { code: 'NOT_FOUND' },
      });
      expect(bodyOf(response).error.requestId).toBeDefined();
      expect(bodyOf(response).error.timestamp).toBeDefined();
    });
  });
});
