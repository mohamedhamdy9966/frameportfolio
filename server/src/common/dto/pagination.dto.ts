import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

/**
 * Reusable pagination query DTO.
 *
 * Every list endpoint extends this, so `?page=` and `?limit=` behave
 * identically everywhere and `limit` can never be used to ask for 1,000,000
 * rows in one request.
 */
export class PaginationQueryDto {
  @ApiPropertyOptional({
    default: 1,
    minimum: 1,
    description: 'Page number (1-based)',
  })
  @Type(() => Number)
  @IsInt({ message: 'page must be an integer' })
  @Min(1, { message: 'page must be at least 1' })
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    default: 12,
    minimum: 1,
    maximum: 100,
    description: 'Items per page (max 100)',
  })
  @Type(() => Number)
  @IsInt({ message: 'limit must be an integer' })
  @Min(1, { message: 'limit must be at least 1' })
  @Max(100, { message: 'limit must not exceed 100' })
  @IsOptional()
  limit: number = 12;

  @ApiPropertyOptional({
    description: 'Free-text search across the collection',
  })
  @IsString()
  @IsOptional()
  search?: string;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}

/** Generic paginated payload returned inside the response envelope. */
export class PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;

  constructor(items: T[], total: number, page: number, limit: number) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.limit = limit;
  }
}

/** Builds the `meta` block that accompanies a paginated response. */
export function toPaginationMeta(
  total: number,
  page: number,
  limit: number,
): Record<string, number | boolean> {
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0;
  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

/** Reusable @ApiPropertyOptional for pagination query params in Swagger. */
export const ApiPaginationProps = {
  page: () => ApiPropertyOptional({ default: 1, minimum: 1 }),
  limit: () => ApiPropertyOptional({ default: 12, minimum: 1, maximum: 100 }),
  search: () => ApiPropertyOptional({ description: 'Free-text search term' }),
};

export { ApiProperty, ApiPropertyOptional };
