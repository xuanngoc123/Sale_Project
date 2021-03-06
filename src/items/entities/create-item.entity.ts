import { ObjectID } from '../../commons/commons.type';

export interface ICreateItem {
  name: string;

  barcode: string;

  cost: number;

  price: number;

  quantity: number;

  weight: number;

  avatar: string;

  images: string[];

  description: string;

  tag: string;

  categoryId: ObjectID;

  categoryName: string;
}
