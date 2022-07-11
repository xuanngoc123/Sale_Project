import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  max,
  Max,
  min,
  Min,
  ValidateNested,
} from 'class-validator';
import { ObjectID } from '../../commons/commons.type';
import { STATUS_ORDER_ENUM } from '../orders.constant';

export class ItemOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  itemId: ObjectID;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  barcode: number;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  priceFlashSale: number | null;

  @ApiProperty()
  @IsNotEmpty()
  // @Min(0)
  // @Max(1)
  discount: number | null;

  @ApiProperty()
  @IsNotEmpty()
  categoryName: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: ObjectID;
}

export class UserInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: ObjectID;

  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumber: string;
}

export class VoucherInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  voucherId: ObjectID;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  thresholdDiscount: number;

  @ApiProperty()
  @IsNotEmpty()
  discountAmount: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [ItemOrderDto] })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ItemOrderDto)
  listItems: [ItemOrderDto];

  // @ApiProperty()
  // @IsNotEmpty()
  totalPrice: number;

  // @ApiProperty()
  // @IsNotEmpty()
  originalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  phoneNumberReceive: string;

  @ApiProperty()
  @IsNotEmpty()
  addressReceive: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsEnum(STATUS_ORDER_ENUM)
  status: string;

  // @ApiProperty({ type: UserInfoDto })
  // @IsNotEmpty()
  // @ValidateNested({ each: true })
  // @Type(() => UserInfoDto)
  userInfo: UserInfoDto;

  @ApiPropertyOptional({ type: VoucherInfoDto })
  // @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => VoucherInfoDto)
  voucherInfo: VoucherInfoDto;
}
