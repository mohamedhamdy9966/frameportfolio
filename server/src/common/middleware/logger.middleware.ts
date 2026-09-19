import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

/**
 * Structured request logging with a correlation id.
 *
 * Every log line for a request carries the same `requestId`, so a report of
 * "the quote form failed" can be traced across every log entry it generated.
 * The id is echoed back in the X-Request-Id header for the client to quote.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = Date.now();

    const requestId =
      (request.headers['x-request-id'] as string | undefined) ??
      crypto.randomUUID();

    // Expose the id to downstream handlers and back to the caller.
    (request as Request & { requestId: string }).requestId = requestId;
    response.setHeader('X-Request-Id', requestId);

    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      const duration = Date.now() - startedAt;

      const line = `${method} ${originalUrl} ${statusCode} ${duration}ms [${requestId}]`;

      // 5xx is the server's fault and needs attention; 4xx is the caller's.
      if (statusCode >= 500) this.logger.error(line);
      else if (statusCode >= 400) this.logger.warn(line);
      else this.logger.log(line);
    });

    next();
  }
}
