import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/create-order.dto';
import { STATUS_ORDER_ENUM } from './orders.constant';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  const id = '123';
  const req = {
    user: {
      _id: '62cce07d0cbee3b42a793db1',
    },
  };
  const MockOrderService = {
    createOrder: jest.fn(),
    updateStatusOrder: jest.fn(),
    getMyOrderById: jest.fn(),
    getListMyOrder: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    })
      .overrideProvider(OrdersService)
      .useValue(MockOrderService)
      .compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create order', () => {
    it('[Expect-success] Should call service to create order', async () => {
      MockOrderService.createOrder.mockResolvedValue(true);
      const result = await controller.createOrder(new CreateOrderDto(), req);
      expect(result).toBe(true);
    });
  });

  describe('update status order', () => {
    it('[Expect-success] Should call service to update status order', async () => {
      MockOrderService.updateStatusOrder.mockResolvedValue(true);
      const result = await controller.updateStatusOrder(
        STATUS_ORDER_ENUM.CANCEL,
        req,
        id,
      );
      expect(result).toBe(true);
    });
  });

  describe('get my order by id', () => {
    it('[Expect-success] Should call service to get my order by id', async () => {
      MockOrderService.getMyOrderById.mockResolvedValue(true);
      const result = await controller.getMyOrderById(id, req);
      expect(result).toBe(true);
    });
  });

  describe('get my list order', () => {
    it('[Expect-success] Should call service to get my list order', async () => {
      MockOrderService.getListMyOrder.mockResolvedValue(true);
      const result = await controller.getListMyOrder(id);
      expect(result).toBe(true);
    });
  });
});
