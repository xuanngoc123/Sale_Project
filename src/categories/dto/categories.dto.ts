import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { STATUS_CATEGORY_ENUM } from '../categories.constant';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  imageBanners: string[];

  @ApiProperty()
  @IsNotEmpty()
  imageCategory: string;

  @ApiPropertyOptional()
  @IsEnum(STATUS_CATEGORY_ENUM)
  status: STATUS_CATEGORY_ENUM;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional()
  priority: number;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
