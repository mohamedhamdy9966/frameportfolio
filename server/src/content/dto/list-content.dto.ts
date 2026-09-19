import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBooleanString,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

/** Query for list endpoints that support category and tag filters. */
export class ListContentQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    enum: ['marketing', 'software'],
    description: 'Filter by discipline',
  })
  @IsIn(['marketing', 'software'], {
    message: 'category must be either "marketing" or "software"',
  })
  @IsOptional()
  category?: 'marketing' | 'software';

  @ApiPropertyOptional({ description: 'Filter by an exact tag, e.g. "SEO"' })
  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @MaxLength(60)
  @IsOptional()
  tag?: string;
}

/** Query for the testimonials endpoint. */
export class ListTestimonialsQueryDto {
  @ApiPropertyOptional({
    description:
      'Include unverified placeholder quotes. Off by default so unverified content is never published by accident.',
    example: 'false',
  })
  @IsBooleanString({ message: 'includeUnverified must be "true" or "false"' })
  @IsOptional()
  includeUnverified?: string;
}
