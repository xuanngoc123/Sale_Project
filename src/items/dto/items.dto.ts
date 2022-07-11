import { ObjectID } from '../../commons/commons.type';

export class ItemDto {
  name: string;

  barcode: string;

  cost: number;

  price: number;

  quantity: number;

  quantitySold: number;

  weight: number;

  avatar: string;

  images: [string];

  description: string;

  tag: string;

  categoryId: ObjectID;

  categoryName: string;

  createdAt: Date;

  updatedAt: Date;
}
