import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectID } from '../../commons/commons.type';

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
  categoryId: ObjectID;
}
export class UpdateItemDto extends PartialType(CreateItemDto) {}
