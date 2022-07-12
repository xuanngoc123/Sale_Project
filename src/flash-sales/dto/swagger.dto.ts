import { ApiProperty } from '@nestjs/swagger';

class ListItemInFlashSale {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  quantitySold: number;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  categoryName: string;
}

export class FlashSaleResponse {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: [ListItemInFlashSale] })
  listItems: [ListItemInFlashSale];

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  _delete: boolean;

  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
