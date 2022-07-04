import { Test, TestingModule } from '@nestjs/testing';
import { FlashSalesController } from './flash-sales.controller';

describe('FlashSalesController', () => {
  let controller: FlashSalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashSalesController],
    }).compile();

    controller = module.get<FlashSalesController>(FlashSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
