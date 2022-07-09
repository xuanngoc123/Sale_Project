import { ObjectID } from '../../commons/commons.type';

export interface IItemOrder {
  productId: ObjectID;

  name: string;

  barcode: number;

  quantity: number;

  price: number;

  priceFlashSale: number | null;

  discount: number | null;

  categoryName: string;

  caetgoryId: ObjectID;
}

export interface IUserInfo {
  userId: ObjectID;

  userName: string;

  address: string;

  phoneNumber: string;
}

export interface IVoucherInfo {
  voucherId: ObjectID;

  name: string;

  thresholdDiscount: number;

  discountAmount: number;
}

export interface IOrder {
  _id?: ObjectID;

  listItems: [IItemOrder];

  totalPrice: number;

  originalPrice: number;

  phoneNumberReceive: string;

  addressReceive: string;

  status: string;

  voucherInfo: IVoucherInfo;

  userInfo: IUserInfo;

  createdAt: Date;

  updatedAt: Date;

  _delete: boolean;
}
