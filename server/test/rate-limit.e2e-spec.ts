import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/setup-app';

interface ErrorEnvelope {
  success: boolean;
  error: { code: string };
}

const bodyOf = (response: { body: unknown }): ErrorEnvelope =>
  response.body as ErrorEnvelope;

/**
 * Rate limiting is exercised in its own suite with the global throttler left
 * ON, so the protection is verified rather than merely switched off in tests.
 *
 * The enquiry POST is capped at 5 submissions per minute per IP — that is the
 * only unauthenticated write on the API and the obvious spam target.
 */
describe('Rate limiting (e2e)', () => {
  let app: INestApplication<App>;
  let http: App;

  const enquiry = {
    name: 'Rate Limit Tester',
    email: 'ratelimit@company.com',
    projectType: 'Web platform or website',
    timeline: 'As soon as possible',
    budget: 'EGP 50,000 – 150,000',
    message: 'Testing how the API behaves when hammered repeatedly.',
  };

  beforeAll(async () => {
    // ENQUIRY_THROTTLE_LIMIT is set to its shipped value (5) by
    // test/setup-env-rate-limit.ts, which Jest loads before any module —
    // the @Throttle decorator reads the value at import time.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();

    http = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  it('starts rejecting enquiry submissions once the burst limit is exceeded', async () => {
    const statuses: number[] = [];

    // 8 attempts against a 5-per-minute limit.
    for (let i = 0; i < 8; i += 1) {
      const response = await request(http)
        .post('/api/v1/enquiries')
        .send({ ...enquiry, email: `burst${i}@company.com` });

      statuses.push(response.status);

      // The 429 body must still use the standard error envelope.
      if (response.status === 429) {
        expect(bodyOf(response).success).toBe(false);
        expect(bodyOf(response).error.code).toBe('RATE_LIMITED');
      }
    }

    expect(statuses).toContain(429);
    expect(
      statuses.filter((status) => status === 201).length,
    ).toBeLessThanOrEqual(5);
  });

  it('does not rate limit ordinary reads at the same low threshold', async () => {
    const response = await request(http)
      .get('/api/v1/content/site')
      .expect(200);
    expect(bodyOf(response).success).toBe(true);
  });
});
