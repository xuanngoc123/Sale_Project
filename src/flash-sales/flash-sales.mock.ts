import mongoose from 'mongoose';
import { ICreateFlashSale } from './entities/create-flash-sale.entity';
import { IFlashSale } from './entities/flash-sale.entity';

export const mockFlashSale: IFlashSale = {
  name: '1',
  listItems: [
    {
      itemId: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),
      name: '1',
      quantity: 1,
      quantitySold: 1,
      price: 1,
      avatar: '1',
      categoryName: '1',
      categoryId: '1',
      discount: 1,
    },
  ],
  startTime: undefined,
  endTime: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  _delete: false,
};

export const mockCreateFlashSaleDto: ICreateFlashSale = {
  name: '1',
  listItems: [
    {
      itemId: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),
      name: '1',
      quantity: 1,
      quantitySold: 1,
      price: 1,
      avatar: '1',
      categoryName: '1',
      categoryId: '1',
      discount: 1,
    },
  ],
  startTime: undefined,
  endTime: undefined,
};
