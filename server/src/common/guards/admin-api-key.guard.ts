import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';
import type { Request } from 'express';

/**
 * Protects read endpoints that expose captured leads.
 *
 * Enquiries contain names, emails and phone numbers, so listing them must not
 * be public. The key arrives in the `x-api-key` header and is compared with a
 * timing-safe equality check.
 */
@Injectable()
export class AdminApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(AdminApiKeyGuard.name);

  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const provided = request.headers['x-api-key'];

    const expected = this.config.get<string>(
      'enquiries.adminApiKey',
      'change-me-in-production',
    );

    if (expected === 'change-me-in-production') {
      // Refusing to honour the default keeps a misconfigured deploy from
      // silently exposing every captured lead.
      this.logger.warn(
        'ADMIN_API_KEY is still the default value — admin endpoints are locked. ' +
          'Set ADMIN_API_KEY in the environment to enable them.',
      );
      throw new UnauthorizedException(
        'Admin access is not configured on this server.',
      );
    }

    if (typeof provided !== 'string' || !this.safeEqual(provided, expected)) {
      throw new UnauthorizedException('A valid x-api-key header is required.');
    }

    return true;
  }

  /** Constant-time comparison to avoid leaking the key one byte at a time. */
  private safeEqual(a: string, b: string): boolean {
    const bufferA = Buffer.from(a);
    const bufferB = Buffer.from(b);
    if (bufferA.length !== bufferB.length) return false;
    return timingSafeEqual(bufferA, bufferB);
  }
}
