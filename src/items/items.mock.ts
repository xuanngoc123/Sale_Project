import mongoose from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { IItem } from './entities/item.entity';

export const mockItem: IItem = {
  name: '1',
  barcode: '1',
  cost: 0,
  price: 0,
  quantity: 0,
  quantitySold: 0,
  weight: 0,
  avatar: '1',
  images: ['1'],
  description: '1',
  tag: '1',
  categoryName: '1',
  createdAt: undefined,
  updatedAt: undefined,
  _delete: false,
  priceFlashSale: 0,
  discount: 1,
  quantityFlashSale: 1,
  quantitySoldFlashSale: 1,
  urlAvatar: undefined,
  urlImages: [undefined],
};

export const mockItemGetOne = {
  discount: 1,
  priceFlashSale: 0,
  images: ['1'],
  quantityFlashSale: 1,
  quantitySoldFlashSale: 1,
  urlAvatar: undefined,
  urlImages: [undefined],
};

export const mockItemGetList = {
  discount: null,
  images: ['1'],
  urlAvatar: undefined,
  priceFlashSale: null,
  quantityFlashSale: null,
  quantitySoldFlashSale: null,
};

export const mockCreateItem: CreateItemDto = {
  name: '1',
  barcode: '1',
  cost: 0,
  price: 0,
  avatar: '1',
  images: ['1'],
  quantity: 0,
  weight: 0,
  description: '1',
  tag: '1',
  categoryId: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),
  categoryName: '1',
};
