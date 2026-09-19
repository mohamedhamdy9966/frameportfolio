import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { ContentModule } from './content/content.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { HealthModule } from './health/health.module';
import { CONFIG_NAMESPACES } from './config/configuration';
import { validateEnvironment } from './config/env.validation';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: ['.env.local', '.env'],
      load: CONFIG_NAMESPACES,
      // Refuses to boot on a bad environment rather than failing later.
      validate: validateEnvironment,
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            name: 'default',
            ttl: config.get<number>('throttle.ttl', 60) * 1000,
            limit: config.get<number>('throttle.limit', 120),
          },
        ],
      }),
    }),
    ContentModule,
    EnquiriesModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    // Global rate limiting. Endpoints can loosen or tighten this with
    // @Throttle({ default: { limit, ttl } }) — the enquiry POST does.
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule implements NestModule {
  /** Applies correlation-id request logging to every route. */
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
