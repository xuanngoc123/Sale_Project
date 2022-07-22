import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientSession } from 'mongoose';
import { STATUS_ORDER_ENUM } from '../orders/orders.constant';
import { mockNotFoundException } from '../mocks/reject.value';
import { mockCreateVoucherDto, mockVoucher } from './vouchers.mock';
import { VoucherRepository } from './vouchers.repository';
import { VouchersService } from './vouchers.service';

describe('VouchersService', () => {
  let service: VouchersService;
  const id = '123';
  const MockVoucherRepository = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
    findOneAndUpdateQuantity: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VouchersService, VoucherRepository],
    })
      .overrideProvider(VoucherRepository)
      .useValue(MockVoucherRepository)
      .compile();

    service = module.get<VouchersService>(VouchersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create voucher', () => {
    it('[Expect-Success] create voucher', async () => {
      MockVoucherRepository.create.mockResolvedValue(mockVoucher);
      const result = await service.createVoucher(mockCreateVoucherDto);
      expect(result).toEqual(mockVoucher);
    });
  });

  describe('update voucher', () => {
    it('[Expect-Success] update voucher', async () => {
      MockVoucherRepository.findOneAndUpdate.mockResolvedValue(mockVoucher);
      const result = await service.updateVoucher(id, mockCreateVoucherDto);
      expect(result).toEqual(mockVoucher);
    });
  });

  describe('get voucher by id', () => {
    it('[Expect-Success] get voucher by id', async () => {
      MockVoucherRepository.findOne.mockResolvedValue(mockVoucher);
      const result = await service.getVoucherById(id);
      expect(result).toEqual(mockVoucher);
    });

    it('[Expect-Error] get voucher by id fail', async () => {
      MockVoucherRepository.findOne.mockResolvedValue(mockNotFoundException);
      try {
        await service.getVoucherById(id);
      } catch (error) {
        expect(error.statusCode).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('get list voucher', () => {
    it('[Expect-Success] get list voucher ', async () => {
      MockVoucherRepository.find.mockResolvedValue([mockVoucher]);
      const result = await service.getAllVoucher(10, 1, 'createdAt');
      expect(result).toEqual([mockVoucher]);
    });
  });

  describe('delete voucher', () => {
    it('[Expect-Success] detelte voucher', async () => {
      MockVoucherRepository.deleteOne.mockResolvedValue(undefined);
      const result = await service.deleteVoucher(id);
      expect(result).toEqual(undefined);
    });
  });

  describe('update quantity', () => {
    it('[Expect-fail] update quantity fail', async () => {
      let session: ClientSession;
      MockVoucherRepository.findOne.mockResolvedValue(null);
      try {
        await service.updateQuantity(id, 1, STATUS_ORDER_ENUM.CANCEL, session);
        expect;
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
    it('[Expect-Success] update quantity', async () => {
      let session: ClientSession;
      MockVoucherRepository.findOneAndUpdateQuantity.mockResolvedValue(
        mockVoucher,
      );
      const result = await service.updateQuantity(
        id,
        1,
        STATUS_ORDER_ENUM.CANCEL,
        session,
      );
      expect(result).toEqual(mockVoucher);
    });
  });
});
