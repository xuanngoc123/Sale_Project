import { IItemOrder, IUserInfo, IVoucherInfo } from './order.entity';

export interface IUpdateOrder {
  listItems?: [IItemOrder];

  totalPrice?: number;

  originalPrice?: number;

  phoneNumberReceive?: string;

  addressReceive?: string;

  status?: string;

  voucherInfo?: IVoucherInfo;

  userInfo?: IUserInfo;
}
