import type { Request } from 'express';

/**
 * Every response leaves the API in the same shape.
 *
 * The client should never have to branch on "did this endpoint wrap its
 * payload or not", so success and failure share a top-level contract:
 *
 *   { success: true,  data: ..., meta?: ... }
 *   { success: false, error: { code, message, details?, path, requestId, timestamp } }
 */

export interface ApiErrorBody {
  code: string;
  message: string;
  details?: unknown;
  path?: string;
  requestId?: string;
  timestamp: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorBody;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function success<T>(
  data: T,
  meta?: Record<string, unknown>,
): ApiSuccessResponse<T> {
  return meta ? { success: true, data, meta } : { success: true, data };
}

/** Reads the correlation id attached by LoggerMiddleware. */
export function requestIdOf(request: Request): string | undefined {
  return (request as Request & { requestId?: string }).requestId;
}
