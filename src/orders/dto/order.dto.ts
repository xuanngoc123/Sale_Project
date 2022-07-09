import { ObjectID } from '../../commons/commons.type';
import { ItemOrderDto, UserInfoDto, VoucherInfoDto } from './create-order.dto';

export class OrderDto {
  _id?: ObjectID;

  listItems: [ItemOrderDto];

  totalPrice: number;

  originalPrice: number;

  phoneNumberReceive: string;

  addressReceive: string;

  status: string;

  voucherInfo: VoucherInfoDto;

  userInfo: UserInfoDto;

  createdAt: Date;

  updatedAt: Date;

  _delete: boolean;
}
