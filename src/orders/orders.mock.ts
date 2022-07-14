import mongoose from 'mongoose';
import { ItemOrderDto } from './dto/create-order.dto';
import { ICreateOrder } from './entities/create-order.entity';
import { IItemOrder, IOrder } from './entities/order.entity';

const listItems: IItemOrder = {
  itemId: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),
  name: '1',
  barcode: 0,
  quantity: 0,
  price: 0,
  avatar: '1',
  priceFlashSale: 0,
  discount: 0,
  categoryName: '1',
  categoryId: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),
};
export const mockOrder: IOrder = {
  listItems: [listItems],
  totalPrice: 0,
  originalPrice: 0,
  phoneNumberReceive: '1',
  addressReceive: '1',
  status: '1',
  voucherInfo: undefined,
  userInfo: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  _delete: false,
};

const listItemsDto: ItemOrderDto = {
  itemId: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),
  name: '1',
  barcode: 0,
  quantity: 0,
  price: 0,
  avatar: '1',
  priceFlashSale: 0,
  discount: 0,
  categoryName: '1',
  categoryId: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),
};
export const mockCreateOrderDto: ICreateOrder = {
  listItems: [listItemsDto],
  totalPrice: 0,
  originalPrice: 0,
  phoneNumberReceive: '1',
  addressReceive: '1',
  status: '1',
  voucherInfo: undefined,
  userInfo: undefined,
};
