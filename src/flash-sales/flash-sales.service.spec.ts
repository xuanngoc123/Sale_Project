import { SchedulerRegistry } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { MailsService } from '../mails/mails.service';
import { FlashSaleRepository } from './flash-sales.repository';
import { FlashSalesService } from './flash-sales.service';
import { mockCreateFlashSaleDto, mockFlashSale } from './flash-sales.mock';
import {
  mockBadRequestException,
  mockNotFoundException,
} from '../mocks/reject.value';
import { mockUpdateInfoUser } from '../users/users.mock';

describe('FlashSalesService', () => {
  let service: FlashSalesService;
  const id = '123';
  const MockFlashSaleRepository = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
    findOneAndUpdateQuantity: jest.fn(),
  };
  const MockMailsService = {
    sendMail: jest.fn(),
  };
  const MockUserService = {
    findAll: jest.fn(),
  };

  const MockSchedulerRegistry = {
    addCronJob: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlashSalesService,
        FlashSaleRepository,
        SchedulerRegistry,
        MailsService,
        UsersService,
      ],
    })
      .overrideProvider(FlashSaleRepository)
      .useValue(MockFlashSaleRepository)
      .overrideProvider(UsersService)
      .useValue(MockUserService)
      .overrideProvider(MailsService)
      .useValue(MockMailsService)
      .overrideProvider(SchedulerRegistry)
      .useValue(MockSchedulerRegistry)
      .compile();

    service = module.get<FlashSalesService>(FlashSalesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create flash sale', () => {
    it('[Expect-Success] create flash sale', async () => {
      MockFlashSaleRepository.create.mockResolvedValue(mockFlashSale);
      MockUserService.findAll.mockResolvedValue([mockUpdateInfoUser]);
      const result = await service.createFlashSale(mockCreateFlashSaleDto);
      expect(result).toEqual(mockFlashSale);
    });
    it('[Expect-Error] bad request flash sale', async () => {
      MockFlashSaleRepository.create.mockRejectedValue(mockBadRequestException);
      try {
        await service.createFlashSale(mockCreateFlashSaleDto);
      } catch (error) {
        expect(error.statusCode).toEqual(400);
      }
    });
  });

  describe('update flash sale', () => {
    it('[Expect-Success] update flash sale', async () => {
      MockFlashSaleRepository.findOneAndUpdate.mockResolvedValue(mockFlashSale);
      const result = await service.updateFlashSale(id, mockCreateFlashSaleDto);
      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('get flash sale', () => {
    it('[Expect-Success] get flash sale', async () => {
      MockFlashSaleRepository.findOne.mockResolvedValue(mockFlashSale);
      const result = await service.getFlashSaleById(id);
      expect(result).toEqual(mockFlashSale);
    });
    it('[Expect-Error] not found flash sale', async () => {
      MockFlashSaleRepository.findOne.mockRejectedValue(mockNotFoundException);
      try {
        await service.getFlashSaleById(id);
      } catch (error) {
        expect(error.statusCode).toEqual(404);
      }
    });
  });

  describe('delete flash sale', () => {
    it('[Expect-Success] delete flash sale', async () => {
      MockFlashSaleRepository.deleteOne.mockResolvedValue(undefined);
      const result = await service.deleteFlashSale(id);
      expect(result).toEqual(undefined);
    });
  });

  describe('get flash sale now', () => {
    it('[Expect-Success] get flash sale now', async () => {
      MockFlashSaleRepository.findOne.mockResolvedValue(mockFlashSale);
      const result = await service.getFlashSaleNow();
      expect(result).toEqual(mockFlashSale);
    });
  });

  describe('update quantity fl sale', () => {
    it('[Expect-Success] update quantity fl sale', async () => {
      MockFlashSaleRepository.findOneAndUpdateQuantity.mockResolvedValue(
        mockFlashSale,
      );
      const result = await service.updateQuantity(2);
      expect(result).toEqual(mockFlashSale);
    });
  });
});
