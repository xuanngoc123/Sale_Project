import { Test, TestingModule } from '@nestjs/testing';
import { CreateFlashSaleDto } from './dto/create-flash-sale.dto';
import { UpdateFlashSaleDto } from './dto/update-flash-sale.dto';
import { FlashSalesController } from './flash-sales.controller';
import { FlashSalesService } from './flash-sales.service';

describe('FlashSalesController', () => {
  let controller: FlashSalesController;
  const id = '123';
  const MockFlashSaleService = {
    createFlashSale: jest.fn(),
    updateFlashSale: jest.fn(),
    getFlashSale: jest.fn(),
    deleteFlashSale: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashSalesController],
      providers: [FlashSalesService],
    })
      .overrideProvider(FlashSalesService)
      .useValue(MockFlashSaleService)
      .compile();

    controller = module.get<FlashSalesController>(FlashSalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create flash sale', () => {
    it('[Expect-success] Should call service to create flash sale', async () => {
      MockFlashSaleService.createFlashSale.mockResolvedValue(true);
      const result = await controller.createFlashSale(new CreateFlashSaleDto());
      expect(result).toBe(true);
    });
  });

  describe('update flash sale', () => {
    it('[Expect-success] Should call service to update flash sale', async () => {
      MockFlashSaleService.updateFlashSale.mockResolvedValue(true);
      const result = await controller.updateFlashSale(
        id,
        new UpdateFlashSaleDto(),
      );
      expect(result).toBe(true);
    });
  });

  describe('get flash sale by id', () => {
    it('[Expect-success] Should call service to get flash sale by id', async () => {
      MockFlashSaleService.getFlashSale.mockResolvedValue(true);
      const result = await controller.getFlashSale();
      expect(result).toBe(true);
    });
  });

  describe('delete flash sale', () => {
    it('[Expect-success] Should call service to delete flash sale', async () => {
      MockFlashSaleService.deleteFlashSale.mockResolvedValue(true);
      const result = await controller.deleteFlashSale(id);
      expect(result).toBe(true);
    });
  });
});
