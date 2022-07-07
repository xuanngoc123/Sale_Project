import { ObjectID } from '../../commons/commons.type';

export interface ICreateItem {
  name: string;

  barcode: string;

  cost: number;

  price: number;

  quantity: number;

  quantitySold: number;

  weight: number;

  description: string;

  tag: string;

  categoryId: ObjectID;

  categoryName: string;
}
