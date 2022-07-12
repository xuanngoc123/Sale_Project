import { ApiProperty } from '@nestjs/swagger';

export class VoucherResponse {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  quantityUsed: number;

  @ApiProperty()
  thresholdDiscount: number;

  @ApiProperty()
  discountAmount: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty({ default: false })
  _delete: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
