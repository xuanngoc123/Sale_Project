import { Test, TestingModule } from '@nestjs/testing';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ItemRepository } from './items.repository';
import { ItemsService } from './items.service';
import {
  mockCreateItem,
  mockItem,
  mockItemGetList,
  mockItemGetOne,
} from './items.mock';
import {
  mockInternalServerError,
  mockNotFoundException,
} from '../mocks/reject.value';
import { IFlashSale } from '../flash-sales/entities/flash-sale.entity';
import mongoose, { ClientSession } from 'mongoose';
import { FileUploadService } from '../file-upload/file-upload.service';
import { OrdersService } from '../orders/orders.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { STATUS_ORDER_ENUM } from '../orders/orders.constant';
import { mockFlashSale } from '../flash-sales/flash-sales.mock';

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
    deleteMany: jest.fn(),
  };
  const MockFlashSaleService = {
    getFlashSaleNow: jest.fn(),
  };
  const MockFileUploadService = {
    getUrl: jest.fn(),
  };
  const MockOrderService = {
    findAllOrderConfirmHaveItemId: jest.fn(),
  };
  const find = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        ItemRepository,
        FlashSalesService,
        FileUploadService,
        OrdersService,
        {
          provide: Array,
          useValue: {
            find,
          },
        },
      ],
    })
      .overrideProvider(FileUploadService)
      .useValue(MockFileUploadService)
      .overrideProvider(ItemRepository)
      .useValue(MockItemRepository)
      .overrideProvider(FlashSalesService)
      .useValue(MockFlashSaleService)
      .overrideProvider(OrdersService)
      .useValue(MockOrderService)
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
      MockItemRepository.findOneAndUpdate.mockRejectedValue(
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
      MockItemRepository.find.mockResolvedValue([mockItem]);
      MockFlashSaleService.getFlashSaleNow.mockResolvedValue(mockFlashSale);
      const result = await service.getListItem(
        'category',
        'tag',
        10,
        1,
        'createdAt',
      );
      expect(result).toEqual([mockItemGetList]);
    });
  });

  describe('get one item by id', () => {
    it('[Expect-Success] get one item success', async () => {
      MockItemRepository.findOne.mockResolvedValue(mockItem);
      MockFlashSaleService.getFlashSaleNow.mockResolvedValue(mockFlashSale);
      const result = await service.getItemById(
        mockFlashSale.listItems[0].itemId.toString(),
      );
      expect(result).toEqual(mockItemGetOne);
    });

    it('[Expect-Error] get one item fail', async () => {
      MockItemRepository.findOne.mockReturnValue(null);
      try {
        await service.getItemById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete item', () => {
    it('[Expect-Success] delete item', async () => {
      MockOrderService.findAllOrderConfirmHaveItemId.mockResolvedValue([]);
      MockItemRepository.deleteOne.mockResolvedValue(null);
      const result = await service.deleteItemById(id);
      expect(result).toEqual(null);
    });

    it('[Expect-Error] delete item fail', async () => {
      MockOrderService.findAllOrderConfirmHaveItemId.mockReturnValue([]);
      try {
        await service.deleteItemById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(
          new BadRequestException('item can not delete'),
        );
      }
    });
  });

  describe('update quantity', () => {
    it('[Expect-fail] update quantity fail', async () => {
      let session: ClientSession;
      MockItemRepository.findOne.mockResolvedValue(mockItem);
      try {
        await service.updateQuantity(id, 1, STATUS_ORDER_ENUM.CANCEL, session);
        expect;
      } catch (error) {
        expect(error).toBeInstanceOf(new BadRequestException('Out of item'));
      }
    });
    it('[Expect-Success] update quantity', async () => {
      let session: ClientSession;
      MockItemRepository.findOneAndUpdateQuantity.mockResolvedValue(mockItem);
      const result = await service.updateQuantity(
        id,
        2,
        STATUS_ORDER_ENUM.COMFIRM,
        session,
      );
      expect(result).toEqual(mockItem);
    });
  });

  describe('delete item by category', () => {
    it('[Expect-Success] delete item by category', async () => {
      MockItemRepository.deleteMany.mockResolvedValue(null);
      const result = await service.deleteItemByCategory(id);
      expect(result).toEqual(null);
    });
  });
});
