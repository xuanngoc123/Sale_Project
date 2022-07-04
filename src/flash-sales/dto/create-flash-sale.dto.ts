import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ObjectID } from '../../commons/commons.type';

class ItemFlashSale {
  @ApiProperty()
  @IsNotEmpty()
  productId: ObjectID;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  quantitySold: number;

  @ApiProperty()
  @IsNotEmpty()
  discount: number;
}

export class CreateFlashSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: [ItemFlashSale] })
  @ValidateNested({ each: true })
  @Type(() => ItemFlashSale)
  listItems: [ItemFlashSale];

  @ApiProperty()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  endTime: Date;
}
