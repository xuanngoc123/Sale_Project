import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty()
  @IsNotEmpty()
  cost: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  quantitySold: number;

  @ApiProperty()
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  isFlashSale: boolean;

  @ApiProperty()
  @IsNotEmpty()
  tag: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryName: string;
}
export class UpdateItemDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  barcode: string;

  @ApiProperty()
  cost: number;

  images: string[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  quantitySold: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isFlashSale: boolean;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  categoryName: string;
}
