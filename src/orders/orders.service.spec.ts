import { Test, TestingModule } from '@nestjs/testing';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ItemsService } from '../items/items.service';
import { VouchersService } from '../vouchers/vouchers.service';
import { OrderRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { mockCreateOrderDto, mockOrder } from './orders.mock';
import { STATUS_ORDER_ENUM } from './orders.constant';
import { mockNotFoundException } from '../mocks/reject.value';
import { FileUploadService } from '../file-upload/file-upload.service';

describe('OrdersService', () => {
  let service: OrdersService;

  const id = '123';
  const req = {
    user: {
      _id: '62cce07d0cbee3b42a793db1',
    },
  };

  const MockOrderRepository = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  };
  const MockItemService = {
    updateQuantity: jest.fn(),
  };
  const MockVoucherService = {
    updateQuantity: jest.fn(),
  };
  const MockFlashSaleService = {
    updateQuantity: jest.fn(),
  };

  const MockFileUploadService = {
    getUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        OrderRepository,
        ItemsService,
        VouchersService,
        FlashSalesService,
        FileUploadService,
      ],
    })
      .overrideProvider(OrderRepository)
      .useValue(MockOrderRepository)
      .overrideProvider(ItemsService)
      .useValue(MockItemService)
      .overrideProvider(VouchersService)
      .useValue(MockVoucherService)
      .overrideProvider(FlashSalesService)
      .useValue(MockFlashSaleService)
      .overrideProvider(FileUploadService)
      .useValue(MockFileUploadService)
      .compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create order', () => {
    it('[Expect-Success] create order', async () => {
      MockOrderRepository.create.mockResolvedValue(mockOrder);
      MockFlashSaleService.updateQuantity.mockResolvedValue(true);
      MockItemService.updateQuantity.mockResolvedValue(true);
      MockVoucherService.updateQuantity.mockResolvedValue(true);
      const result = await service.createOrder(mockCreateOrderDto, req);
      expect(result).toEqual(mockOrder);
    });
    // it('[Expect-Error] bad request flash sale', async () => {
    //   MockFlashSaleRepository.create.mockRejectedValue(mockBadRequestException);
    //   try {
    //     await service.createFlashSale(mockCreateFlashSaleDto);
    //   } catch (error) {
    //     expect(error.statusCode).toEqual(400);
    //   }
    // });
  });

  describe('update status order', () => {
    it('[Expect-Success] update status order', async () => {
      MockOrderRepository.findOneAndUpdate.mockResolvedValue(mockOrder);
      MockFlashSaleService.updateQuantity.mockResolvedValue(true);
      MockItemService.updateQuantity.mockResolvedValue(true);
      MockVoucherService.updateQuantity.mockResolvedValue(true);
      const result = await service.updateStatusOrder(
        STATUS_ORDER_ENUM.CANCEL,
        req,
        id,
      );
      expect(result).toEqual(mockOrder);
    });
  });

  describe('get my order by id', () => {
    it('[Expect-Success] get my order by id', async () => {
      MockOrderRepository.findOne.mockResolvedValue(mockOrder);
      const result = await service.getMyOrderById(id, req);
      expect(result).toEqual(mockOrder);
    });
    it('[Expect-Error] not found order', async () => {
      MockOrderRepository.findOne.mockRejectedValue(mockNotFoundException);
      try {
        await service.getMyOrderById(id, req);
      } catch (error) {
        expect(error.statusCode).toEqual(404);
      }
    });
  });

  describe('get my list order', () => {
    it('[Expect-Success] get my list order', async () => {
      MockOrderRepository.find.mockResolvedValue([mockOrder]);
      const result = await service.getListMyOrder(req, 1, 1, 'sort');
      expect(result).toEqual([mockOrder]);
    });
  });
});
