import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';
import type { ApiErrorResponse } from '../interfaces/api-response.interface';

/**
 * Single source of truth for error responses.
 *
 * Without this, Nest returns `{ statusCode, message, error }` for HTTP
 * exceptions and a raw 500 with a stack-derived message for anything else.
 * Here every failure — validation, throttling, not-found, unexpected crash —
 * is normalised to the same body and never leaks internals in production.
 */
/**
 * Stable, machine-readable error codes keyed by HTTP status.
 * A client can switch on these without parsing human-readable messages.
 */
const STATUS_CODES: Readonly<Record<number, string>> = {
  [400]: 'BAD_REQUEST',
  [401]: 'UNAUTHORIZED',
  [403]: 'FORBIDDEN',
  [404]: 'NOT_FOUND',
  [405]: 'METHOD_NOT_ALLOWED',
  [409]: 'CONFLICT',
  [422]: 'UNPROCESSABLE_ENTITY',
  [429]: 'RATE_LIMITED',
  [503]: 'SERVICE_UNAVAILABLE',
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly isProduction: boolean) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId =
      (request as Request & { requestId?: string }).requestId ?? randomUUID();

    const { status, code, message, details } = this.describe(exception);

    // Unexpected (non-HTTP) throwables are genuine bugs worth a full stack.
    if (status >= (HttpStatus.INTERNAL_SERVER_ERROR as number)) {
      this.logger.error(
        `${request.method} ${request.originalUrl} → ${status} [${requestId}]`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const body: ApiErrorResponse = {
      success: false,
      error: {
        code,
        message,
        ...(details !== undefined ? { details } : {}),
        path: request.originalUrl,
        requestId,
        timestamp: new Date().toISOString(),
      },
    };

    response.status(status).json(body);
  }

  /** Maps an arbitrary throwable onto an HTTP status + stable error code. */
  private describe(exception: unknown): {
    status: number;
    code: string;
    message: string;
    details?: unknown;
  } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const payload = exception.getResponse();

      // ValidationPipe returns { message: string[], error, statusCode }.
      if (typeof payload === 'object' && payload !== null) {
        const record = payload as Record<string, unknown>;
        const rawMessage = record.message;

        if (Array.isArray(rawMessage)) {
          return {
            status,
            code: 'VALIDATION_ERROR',
            message: 'One or more fields are invalid.',
            details: rawMessage,
          };
        }

        const text =
          typeof rawMessage === 'string'
            ? rawMessage
            : (record.error as string) || exception.message;

        return { status, code: this.codeFor(status), message: text };
      }

      return {
        status,
        code: this.codeFor(status),
        message: exception.message,
      };
    }

    // Anything else is a bug. Say so plainly, but keep the cause out of the
    // response body in production — it belongs in the logs, not the wire.
    const fallback = 'An unexpected error occurred. Please try again.';
    const message =
      !this.isProduction && exception instanceof Error
        ? exception.message
        : fallback;

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      message,
    };
  }

  private codeFor(status: number): string {
    const known = STATUS_CODES[status];
    if (known) return known;
    return status >= 500 ? 'INTERNAL_SERVER_ERROR' : 'REQUEST_FAILED';
  }
}
