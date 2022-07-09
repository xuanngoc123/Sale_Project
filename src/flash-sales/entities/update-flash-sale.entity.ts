import { IItemFlashSale } from './flash-sale.entity';

export interface IUpdateFlashSale {
  name?: string;

  listItems?: [IItemFlashSale];

  startTime?: Date;

  endTime?: Date;
}
