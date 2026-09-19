import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * Mirrors the option lists rendered by the client quote form. If the client
 * adds an option, this list is the contract to update — an unknown value is
 * rejected rather than stored as free text.
 */
export const PROJECT_TYPES = [
  'Web platform or website',
  'Mobile app (iOS / Android)',
  'SaaS or custom internal system',
  'E-commerce store & payments',
  'SEO / paid media growth',
  'Branding & creative',
  'Something else',
] as const;

export const BUDGET_RANGES = [
  'Under EGP 50,000',
  'EGP 50,000 – 150,000',
  'EGP 150,000 – 400,000',
  'EGP 400,000+',
  'Monthly retainer',
  'Not sure yet',
] as const;

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1 month',
  'Within 1–3 months',
  'Just exploring',
] as const;

const trim = ({ value }: { value: unknown }): unknown =>
  typeof value === 'string' ? value.trim() : value;

export class CreateEnquiryDto {
  @ApiProperty({ example: 'Nour Ibrahim', maxLength: 120 })
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'name should not be empty' })
  @MinLength(2, { message: 'name is too short' })
  @MaxLength(120)
  name!: string;

  @ApiProperty({ example: 'nour@company.com', maxLength: 160 })
  @Transform(({ value }): unknown =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'email must be a valid email address' })
  @MaxLength(160)
  email!: string;

  @ApiPropertyOptional({ example: 'Acme Ltd', maxLength: 120 })
  @Transform(trim)
  @IsString()
  @IsOptional()
  @MaxLength(120)
  company?: string;

  @ApiPropertyOptional({ example: '+20 111 125 5279', maxLength: 40 })
  @Transform(trim)
  @IsString()
  @IsOptional()
  @MaxLength(40)
  phone?: string;

  @ApiPropertyOptional({ enum: PROJECT_TYPES, default: PROJECT_TYPES[0] })
  @IsIn(PROJECT_TYPES as unknown as string[], {
    message: `projectType must be one of: ${PROJECT_TYPES.join(' | ')}`,
  })
  @IsOptional()
  projectType: string = PROJECT_TYPES[0];

  @ApiPropertyOptional({ enum: TIMELINE_OPTIONS, default: TIMELINE_OPTIONS[0] })
  @IsIn(TIMELINE_OPTIONS as unknown as string[], {
    message: `timeline must be one of: ${TIMELINE_OPTIONS.join(' | ')}`,
  })
  @IsOptional()
  timeline: string = TIMELINE_OPTIONS[0];

  @ApiPropertyOptional({ enum: BUDGET_RANGES, default: BUDGET_RANGES[1] })
  @IsIn(BUDGET_RANGES as unknown as string[], {
    message: `budget must be one of: ${BUDGET_RANGES.join(' | ')}`,
  })
  @IsOptional()
  budget: string = BUDGET_RANGES[1];

  @ApiProperty({
    example: 'We need a booking platform with payments and an admin dashboard.',
    minLength: 12,
    maxLength: 4000,
  })
  @Transform(trim)
  @IsString()
  @IsNotEmpty({ message: 'message should not be empty' })
  @MinLength(12, { message: 'message must be at least 12 characters' })
  @MaxLength(4000)
  message!: string;

  /**
   * Honeypot. Bots fill every field they find; humans never see this one.
   * Rejecting it costs nothing and removes a large slice of automated spam.
   */
  @ApiPropertyOptional({ description: 'Leave empty — anti-spam honeypot' })
  @IsOptional()
  @IsString()
  @MaxLength(0, { message: 'Unexpected value.' })
  website?: string;
}
