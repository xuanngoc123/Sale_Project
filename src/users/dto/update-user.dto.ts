import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  userName?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  address?: string;
}
