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

  tag: string;

  categoryName: string;

  createdAt: Date;

  updatedAt: Date;

  _delete: boolean;

  priceFlashSale?: number;

  discount?: number;
}
