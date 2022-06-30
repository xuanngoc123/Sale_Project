import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  // @ApiProperty()
  imageBaners: string[];

  // @ApiProperty()
  imageCategory: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  priority: number;
}

export class UpdateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  imageBaners: string[];

  @ApiProperty()
  imageCategory: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  priority: number;
}
