import { IItemFlashSale } from './flash-sale.entity';

export interface ICreateFlashSale {
  name: string;

  listItems: [IItemFlashSale];

  startTime: Date;

  endTime: Date;
}
