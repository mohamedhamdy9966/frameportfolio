import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configureApp } from './setup-app';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn', 'log']
        : ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Same configuration the e2e tests apply, so tests and production
  // cannot drift apart.
  configureApp(app);

  const config = app.get(ConfigService);
  const port = config.get<number>('app.port', 3000);
  const apiPrefix = config.get<string>('app.apiPrefix', 'api');
  const isProduction = config.get<boolean>('app.isProduction', false);
  const corsOrigins = config.get<string[]>('app.corsOrigins', []);

  /* ── OpenAPI docs ──
     Exposed outside production by default; set ENABLE_SWAGGER=true to
     publish them deliberately. */
  const swaggerEnabled = !isProduction || process.env.ENABLE_SWAGGER === 'true';

  if (swaggerEnabled) {
    const documentConfig = new DocumentBuilder()
      .setTitle('Taxi Digital Solutions API')
      .setDescription(
        'Public content and enquiry endpoints for the Taxi portfolio site and admin portal.',
      )
      .setVersion('1.0')
      .addServer(`http://localhost:${port}`, 'Local')
      .addApiKey(
        { type: 'apiKey', name: 'x-api-key', in: 'header' },
        'admin-key',
      )
      .addTag(
        'content',
        'Portfolio content: projects, services, software, FAQs',
      )
      .addTag('enquiries', 'Quote form submissions and admin triage')
      .addTag('health', 'Liveness and status')
      .build();

    const document = SwaggerModule.createDocument(app, documentConfig);
    SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    logger.log(`API docs available at /${apiPrefix}/docs`);
  }

  /* ── Graceful shutdown ──
     Without this, in-flight requests are severed on redeploy. */
  app.enableShutdownHooks();

  await app.listen(port, '0.0.0.0');

  logger.log(`Server listening on http://localhost:${port}/${apiPrefix}/v1`);
  logger.log(`Environment: ${config.get<string>('app.nodeEnv')}`);
  logger.log(`CORS origins: ${corsOrigins.join(', ') || '(none configured)'}`);
}

void bootstrap();
