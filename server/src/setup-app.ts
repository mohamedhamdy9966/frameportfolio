import {
  INestApplication,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

/**
 * Applies the production configuration to a Nest application instance.
 *
 * Extracted from main.ts so tests can build an app that behaves exactly like
 * the deployed one. When this logic lived inline in bootstrap(), the e2e
 * suite silently exercised a different app — no exception filter, no
 * versioning — and passed tests that proved nothing about production.
 */
export function configureApp(app: INestApplication): INestApplication {
  const config = app.get(ConfigService);

  const apiPrefix = config.get<string>('app.apiPrefix', 'api');
  const isProduction = config.get<boolean>('app.isProduction', false);
  const corsOrigins = config.get<string[]>('app.corsOrigins', []);

  app.use(helmet({ contentSecurityPolicy: false }));

  // Compression is a no-op in tests but keeps behaviour identical.
  app.use(compression());

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-api-key',
      'x-request-id',
    ],
    exposedHeaders: ['X-Request-Id'],
    credentials: true,
    maxAge: 86_400,
  });

  // URI versioning only applies where it is asked for. Applying it globally
  // would also move the health endpoint to /v1/health, defeating the point of
  // excluding it from the prefix.
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  app.setGlobalPrefix(apiPrefix, {
    exclude: [
      // Health and status probes stay unprefixed so a load balancer or uptime
      // monitor that assumes /health keeps working.
      { path: 'health', method: RequestMethod.GET },
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      stopAtFirstError: false,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(isProduction));

  return app;
}
