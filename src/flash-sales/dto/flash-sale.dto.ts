import { ItemFlashSaleDto } from './create-flash-sale.dto';

export class FlashSaleDto {
  name: string;

  listItems: [ItemFlashSaleDto];

  startTime: Date;

  endTime: Date;

  createdAt: Date;

  updatedAt: Date;
}
