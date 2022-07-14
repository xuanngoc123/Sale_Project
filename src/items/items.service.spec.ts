import { Test, TestingModule } from '@nestjs/testing';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ItemRepository } from './items.repository';
import { ItemsService } from './items.service';
import { mockCreateItem, mockItem } from './items.mock';
import {
  mockInternalServerError,
  mockNotFoundException,
} from '../mocks/reject.value';
import { IFlashSale } from 'src/flash-sales/entities/flash-sale.entity';
import mongoose from 'mongoose';

describe('ItemsService', () => {
  let service: ItemsService;
  const id = '123';
  const MockItemRepository = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
    findOneAndUpdateQuantity: jest.fn(),
  };
  const MockFlashSaleService = {
    getFlashSaleNow: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService, ItemRepository, FlashSalesService],
    })
      .overrideProvider(ItemRepository)
      .useValue(MockItemRepository)
      .overrideProvider(FlashSalesService)
      .useValue(MockFlashSaleService)
      .compile();

    service = module.get<ItemsService>(ItemsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create item', () => {
    it('[Expect-Success] create item', async () => {
      MockItemRepository.create.mockResolvedValue(mockItem);
      const result = await service.createItem(mockCreateItem);
      expect(result).toEqual(mockItem);
    });

    it('[Expect-Error] create item error', async () => {
      MockItemRepository.create.mockRejectedValue(mockInternalServerError);
      try {
        await service.createItem(mockCreateItem);
      } catch (error) {
        expect(error.message).toEqual(mockInternalServerError.message);
      }
    });
  });

  describe('update item', () => {
    it('[Expect-Success] update item', async () => {
      MockItemRepository.findOneAndUpdate.mockResolvedValue(mockItem);
      const result = await service.updateItem(mockCreateItem, id);
      expect(result).toEqual(mockItem);
    });

    it('[Expect-Error] update item fail', async () => {
      MockItemRepository.findOneAndUpdate.mockResolvedValue(
        mockInternalServerError,
      );
      try {
        await service.updateItem(mockCreateItem, id);
      } catch (error) {
        expect(error.message).toEqual(mockInternalServerError.message);
      }
    });
  });

  describe('get list item', () => {
    it('[Expect-Success] get list item', async () => {
      const flashSale: IFlashSale = {
        _id: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),

        name: 'string',

        listItems: [
          {
            itemId: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),

            name: 'string',

            quantity: 1,

            price: 1,

            avatar: 'string',

            categoryName: 'string',

            categoryId: 'string',

            quantitySold: 1,

            discount: 1,
          },
        ],

        startTime: new Date(),

        endTime: new Date(),

        createdAt: new Date(),

        updatedAt: new Date(),

        _delete: false,
      };

      MockItemRepository.find.mockResolvedValue([mockItem]);
      MockFlashSaleService.getFlashSaleNow.mockResolvedValue(true);
      const result = await service.getListItem(
        'category',
        'tag',
        10,
        1,
        'createdAt',
      );
      expect(result).toEqual([mockItem]);
    });
  });

  describe('get one item by id', () => {
    it('[Expect-Success] get one item success', async () => {
      MockItemRepository.findOne.mockResolvedValue(mockItem);
      MockFlashSaleService.getFlashSaleNow.mockResolvedValue(true);
      const result = await service.getItemById(id);
      expect(result).toEqual(mockItem);
    });

    it('[Expect-Error] get one item fail', async () => {
      MockItemRepository.findOne.mockRejectedValue(mockNotFoundException);
      try {
        await service.getItemById(id);
      } catch (error) {
        expect(error.statusCode).toEqual(404);
      }
    });
  });
  describe('delete item', () => {
    it('[Expect-Success] delete item', async () => {
      MockItemRepository.deleteOne.mockResolvedValue(null);
      const result = await service.deleteItemById(id);
      expect(result).toEqual(null);
    });
  });

  describe('update quantity', () => {
    it('[Expect-Success] update quantity', async () => {
      MockItemRepository.findOneAndUpdateQuantity.mockResolvedValue(mockItem);
      const result = await service.updateQuantity(id, 2);
      expect(result).toEqual(mockItem);
    });
  });
});
