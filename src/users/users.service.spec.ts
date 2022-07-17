import { Test, TestingModule } from '@nestjs/testing';
import {
  mockBadRequestException,
  mockConflicException,
  mockInternalServerError,
  mockNotFoundException,
} from '../mocks/reject.value';
import { MailsModule } from '../mails/mails.module';
import { MailsService } from '../mails/mails.service';
import {
  mockCreateUser,
  mockCreateUserDto,
  mockUpdateInfoUser,
  mockUpdateUserDto,
} from './users.mock';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { STATUS_USER_ENUM } from './users.constant';

describe('UsersService', () => {
  let service: UsersService;

  const req = {
    user: {
      _id: '62cce07d0cbee3b42a793db1',
    },
  };

  const MockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };
  const MockMailsService = {
    sendMail: jest.fn(),
  };
  const MockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailsModule, JwtModule],
      providers: [UsersService, UserRepository, MailsService],
    })
      .overrideProvider(UserRepository)
      .useValue(MockUserRepository)
      .overrideProvider(MailsService)
      .useValue(MockMailsService)
      .overrideProvider(JwtService)
      .useValue(MockJwtService)
      .compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
    // jest.useFakeTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('[Expect-Success] Create user success', async () => {
      MockUserRepository.create.mockResolvedValue(mockCreateUser);
      MockMailsService.sendMail.mockResolvedValue(true);
      const result = await service.register(mockCreateUserDto);
      expect(result).toEqual(mockCreateUser);
    });
    it('[Expect-error] Conflic', async () => {
      MockUserRepository.findOne.mockRejectedValue(mockConflicException);
      try {
        await service.register(mockCreateUserDto);
      } catch (error) {
        expect(error.statusCode).toEqual(409);
      }
    });
  });

  describe('verify', () => {
    it('[Expect-Success] Verify success', async () => {
      MockJwtService.verify.mockReturnValue({
        email: 'xuanngochq2k@gmail.com',
      });
      MockUserRepository.findOneAndUpdate.mockResolvedValue(mockCreateUser);
      const result = await service.verifyEmail('123');
      expect(result).toEqual(mockCreateUser);
    });

    it('[Expect-Error] Verify fail token exprise/ invalid', async () => {
      MockJwtService.verify.mockReturnValue(mockInternalServerError);
      MockUserRepository.findOneAndUpdate.mockResolvedValue(
        mockInternalServerError,
      );
      try {
        await service.verifyEmail('123');
      } catch (error) {
        expect(error.statusCode).toEqual(500);
      }
    });
  });

  describe('updateInfo', () => {
    it('[Expect-Success] updateInfo success', async () => {
      MockUserRepository.findOneAndUpdate.mockResolvedValue(mockUpdateInfoUser);
      const result = await service.updateInfo(mockUpdateUserDto, req);
      expect(result).toEqual(mockUpdateInfoUser);
    });
  });

  describe('resendEmail', () => {
    it('[Expect-Success] resendEmail success', async () => {
      MockUserRepository.findOne.mockResolvedValue(mockUpdateInfoUser);
      MockJwtService.sign.mockReturnValue('token');
      MockMailsService.sendMail.mockResolvedValue('Send mail success');
      await service.resendEmail('xuanngochq2k@gmail.com');
    });

    it('[Expect-Error] email not found', async () => {
      MockUserRepository.findOne.mockResolvedValue(mockNotFoundException);
      try {
        await service.resendEmail('xuanngochq2k@gmail.com');
      } catch (error) {
        expect(error.statusCode).toEqual(404);
      }
    });

    it('[Expect-Error] status invalid', async () => {
      MockUserRepository.findOne.mockResolvedValue(mockBadRequestException);
      try {
        await service.resendEmail('xuanngochq2k@gmail.com');
      } catch (error) {
        expect(error.statusCode).toEqual(400);
      }
    });

    it('[Expect-Error] send mail fail', async () => {
      MockMailsService.sendMail.mockResolvedValue(mockInternalServerError);
      MockUserRepository.findOne.mockResolvedValue(mockInternalServerError);
      try {
        await service.resendEmail('xuanngochq2k@gmail.co');
      } catch (error) {
        expect(error.statusCode).toEqual(500);
      }
    });
  });

  describe('getMyInfo', () => {
    it('[Expect-Success] getMyInfo success', async () => {
      MockUserRepository.findOne.mockResolvedValue(mockUpdateInfoUser);
      const result = await service.getMyInfo(req);
      expect(result).toEqual(mockUpdateInfoUser);
    });
  });

  describe('banUser', () => {
    it('[Expect-Success] banUser success', async () => {
      MockUserRepository.findOneAndUpdate.mockResolvedValue(mockUpdateInfoUser);
      const result = await service.banUser(
        '62cce07d0cbee3b42a793db1',
        STATUS_USER_ENUM.ACTIVE,
      );
      expect(result).toEqual(mockUpdateInfoUser);
    });
  });
});
