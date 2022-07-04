import { ObjectID } from '../../commons/commons.type';

export interface IItem {
  _id?: ObjectID;

  name: string;

  barcode: string;

  cost: number;

  price: number;

  quantity: number;

  quantitySold: number;

  weight: number;

  images: [string];

  description: string;

  isFlashSale: boolean;

  tag: string;

  // categoryId?: ObjectID;

  createdAt: Date;

  updatedAt: Date;
}
