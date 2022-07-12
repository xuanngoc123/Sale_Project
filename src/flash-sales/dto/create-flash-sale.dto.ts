import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  IsLongerThan,
  IsShorterThan,
} from '../../decorators/date-validator.decorator';
import { ObjectID } from '../../commons/commons.type';

export class ItemFlashSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  itemId: ObjectID;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  categoryName: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  discount: number;
}

export class CreateFlashSaleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @ApiProperty({ type: [ItemFlashSaleDto] })
  @ValidateNested({ each: true })
  @Type(() => ItemFlashSaleDto)
  listItems: [ItemFlashSaleDto];

  @ApiProperty()
  @IsNotEmpty()
  @IsShorterThan('endTime', { message: 'startTime must be shorter endTime' })
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsLongerThan('startTime', { message: 'endTime must be longer startTime' })
  endTime: Date;
}
