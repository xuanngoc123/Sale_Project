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

  avatar: string;

  urlAvatar?: string;

  images: [string];

  urlImages?: string[];

  description: string;

  tag: string;

  categoryName: string;

  createdAt: Date;

  updatedAt: Date;

  _delete: boolean;

  priceFlashSale?: number;

  discount?: number;

  quantityFlashSale?: number;

  quantitySoldFlashSale?: number;
}

export interface IListItem {
  items: [IItem];
  totalPage: number;
  currentPage: number;
  numberItemPerPage: number;
}
