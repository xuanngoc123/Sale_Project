import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { STATUS_ORDER_ENUM } from '../orders.constant';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class UpdateStatusOrderDto {
  @ApiProperty()
  @IsEnum(STATUS_ORDER_ENUM)
  status: STATUS_ORDER_ENUM;
}
