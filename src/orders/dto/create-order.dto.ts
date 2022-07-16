import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ObjectID } from '../../commons/commons.type';

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
  avatar: string;

  @ApiProperty()
  @IsOptional()
  priceFlashSale: number | null;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
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
