import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min } from 'class-validator';
import {
  IsFuture,
  IsLongerThan,
  IsShorterThan,
} from '../../decorators/date-validator.decorator';

export class CreateVoucherDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsNotEmpty()
  thresholdDiscount: number;

  @ApiProperty()
  @IsNotEmpty()
  discountAmount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsShorterThan('endTime', { message: 'startTime must be shorter endTime' })
  @IsFuture({ message: 'startTime must be future' })
  startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsLongerThan('startTime', { message: 'endTime must be longer startTime' })
  endTime: Date;
}
