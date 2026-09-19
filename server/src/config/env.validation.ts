import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

/**
 * Environment schema.
 *
 * The app validates its own environment on boot and refuses to start if a
 * value is missing or nonsensical — a misconfigured server should fail loudly
 * at deploy time, not quietly at 3am on the first request.
 */
export class EnvironmentVariables {
  @IsEnum(NodeEnv)
  @IsOptional()
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  PORT: number = 3000;

  /** Public origin(s) allowed to call this API. Comma-separated. */
  @IsString()
  @IsOptional()
  CORS_ORIGINS: string = 'http://localhost:3000,http://localhost:3001';

  @IsString()
  @IsOptional()
  API_PREFIX: string = 'api';

  /** Rate limit: requests per window, per IP. */
  @IsInt()
  @Min(1)
  @IsOptional()
  THROTTLE_LIMIT: number = 120;

  /** Rate limit window, in seconds. */
  @IsInt()
  @Min(1)
  @IsOptional()
  THROTTLE_TTL: number = 60;

  /** Max enquiries retained in memory before the oldest are evicted. */
  @IsInt()
  @Min(10)
  @IsOptional()
  MAX_STORED_ENQUIRIES: number = 500;

  /** Secret used to protect admin-only read endpoints. */
  @IsString()
  @MinLength(8)
  @IsOptional()
  ADMIN_API_KEY: string = 'change-me-in-production';

  /** Where contact-form notifications are sent. */
  @IsString()
  @IsOptional()
  CONTACT_NOTIFICATION_EMAIL: string = 'info@taxi.com';
}

/**
 * Used by ConfigModule.forRoot({ validate }).
 * Throws with a readable list of every problem, rather than one at a time.
 */
export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
    exposeDefaultValues: true,
  });

  const errors = validateSync(validated, {
    skipMissingProperties: false,
    forbidUnknownValues: false,
  });

  if (errors.length > 0) {
    const details = errors
      .map((error) => {
        const issues = Object.values(error.constraints ?? {}).join(', ');
        return `  - ${error.property}: ${issues}`;
      })
      .join('\n');

    throw new Error(`Invalid environment configuration:\n${details}`);
  }

  return validated;
}
