import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

export enum EnquiryStatus {
  New = 'new',
  Read = 'read',
  Responded = 'responded',
  Won = 'won',
  Lost = 'lost',
  Archived = 'archived',
}

/** Enquiry as stored and returned. */
export class Enquiry {
  @ApiProperty({ example: 'f2b1c0de-...' })
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  @ApiPropertyOptional()
  company?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiProperty()
  projectType!: string;

  @ApiProperty()
  timeline!: string;

  @ApiProperty()
  budget!: string;

  @ApiProperty()
  message!: string;

  @ApiProperty({ enum: EnquiryStatus })
  status!: EnquiryStatus;

  @ApiProperty({ description: 'Whether a reply is still owed' })
  needsFollowUp!: boolean;

  @ApiProperty({ example: '2026-01-01T10:00:00.000Z' })
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiPropertyOptional({ description: 'IP the enquiry arrived from' })
  sourceIp?: string;
}

/** Query for the admin list endpoint. */
export class ListEnquiriesQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ enum: EnquiryStatus })
  @IsEnum(EnquiryStatus, {
    message: `status must be one of: ${Object.values(EnquiryStatus).join(' | ')}`,
  })
  @IsOptional()
  status?: EnquiryStatus;
}

/** Body for updating an enquiry's triage state. */
export class UpdateEnquiryStatusDto {
  @ApiProperty({ enum: EnquiryStatus })
  @IsEnum(EnquiryStatus, {
    message: `status must be one of: ${Object.values(EnquiryStatus).join(' | ')}`,
  })
  status!: EnquiryStatus;
}
