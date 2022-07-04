import { ObjectID } from '../../commons/commons.type';

export interface IVoucher {
  _id?: ObjectID;

  name: string;

  quantity: number;

  quantityUsed: number;

  thresholdDiscount: number;

  discountAmount: number;

  startTime: Date;

  endTime: Date;

  createdAt: Date;

  updatedAt: Date;
}
