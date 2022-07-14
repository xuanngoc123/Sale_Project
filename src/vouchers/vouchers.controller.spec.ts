import { Test, TestingModule } from '@nestjs/testing';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';

describe('VouchersController', () => {
  let controller: VouchersController;
  const id = '123';
  const MockVoucherService = {
    createVoucher: jest.fn(),
    updateVoucher: jest.fn(),
    getVoucherById: jest.fn(),
    getAllVoucher: jest.fn(),
    deleteVoucher: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VouchersController],
      providers: [VouchersService],
    })
      .overrideProvider(VouchersService)
      .useValue(MockVoucherService)
      .compile();

    controller = module.get<VouchersController>(VouchersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create voucher', () => {
    it('[Expect-success] Should call service to create voucher', async () => {
      MockVoucherService.createVoucher.mockResolvedValue(true);
      const result = await controller.createVoucher(new CreateVoucherDto());
      expect(result).toBe(true);
    });
  });

  describe('update voucher', () => {
    it('[Expect-success] Should call service to update voucher', async () => {
      MockVoucherService.updateVoucher.mockResolvedValue(true);
      const result = await controller.updateVoucher(id, new UpdateVoucherDto());
      expect(result).toBe(true);
    });
  });

  describe('get voucher by id', () => {
    it('[Expect-success] Should call service to get voucher by id', async () => {
      MockVoucherService.getVoucherById.mockResolvedValue(true);
      const result = await controller.getVoucherById(id);
      expect(result).toBe(true);
    });
  });

  describe('get list voucher', () => {
    it('[Expect-success] Should call service to get list voucher', async () => {
      MockVoucherService.getAllVoucher.mockResolvedValue(true);
      const result = await controller.getAllVoucher(10, 1, 'createdAt');
      expect(result).toBe(true);
    });
  });

  describe('detete voucher', () => {
    it('[Expect-success] Should call service to delete voucher', async () => {
      MockVoucherService.deleteVoucher.mockResolvedValue(true);
      const result = await controller.deteteVoucher(id);
      expect(result).toBe(true);
    });
  });
});
