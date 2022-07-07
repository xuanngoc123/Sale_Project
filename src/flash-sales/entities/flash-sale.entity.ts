import { ObjectID } from '../../commons/commons.type';

export interface IItemFlashSale {
  itemId: ObjectID;

  name: string;

  quantity: number;

  quantitySold?: number;

  discount: number;
}

export interface IFlashSale {
  _id?: ObjectID;

  name: string;

  listItems: [IItemFlashSale];

  startTime: Date;

  endTime: Date;

  createdAt: Date;

  updatedAt: Date;
}