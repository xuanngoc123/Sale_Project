import { ApiProperty } from '@nestjs/swagger';
import { STATUS_ORDER_ENUM } from '../orders.constant';

class ListItemInOrder {
  @ApiProperty()
  itemId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  barcode: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  priceFlashSale: number;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  categoryName: string;
  @ApiProperty()
  categoryId: string;
}
class VoucherInOrder {
  @ApiProperty()
  voucherId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  thresholdDiscount: number;
  @ApiProperty()
  discountAmount: number;
}
class UserInfoInOrder {
  @ApiProperty()
  userId: string;
  @ApiProperty()
  userName: string;
  @ApiProperty()
  address: string;
  phoneNumber: string;
}
export class OrderResponse {
  @ApiProperty({ type: [ListItemInOrder] })
  listItems: [ListItemInOrder];

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  originalPrice: number;

  @ApiProperty()
  phoneNumberReceive: string;

  @ApiProperty()
  addressReceive: string;

  @ApiProperty()
  status: STATUS_ORDER_ENUM;

  @ApiProperty({ type: VoucherInOrder })
  voucherInfo: VoucherInOrder;

  @ApiProperty({ type: UserInfoInOrder })
  userInfo: UserInfoInOrder;

  @ApiProperty()
  _delete: boolean;

  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
