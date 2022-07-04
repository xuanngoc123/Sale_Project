import { Test, TestingModule } from '@nestjs/testing';
import { mockConflicException } from '../mocks/reject.value';
import { MailsModule } from '../mails/mails.module';
import { MailsService } from '../mails/mails.service';
import { mockCreateUser, mockCreateUserDto } from './users.mock';
import { UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('UsersService', () => {
  let service: UsersService;

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
      imports: [MailsModule, JwtModule, ConfigModule.forRoot()],
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
    it('[Expect-Success] Register', async () => {
      MockUserRepository.create.mockResolvedValue(mockCreateUser);
      MockMailsService.sendMail.mockResolvedValue(true);
      const result = await service.register(mockCreateUserDto);
      expect(result).toEqual(mockCreateUser);
    });
    it('[Expect-error] Register', async () => {
      MockUserRepository.findOne.mockRejectedValue(mockConflicException);
      try {
        await service.register(mockCreateUserDto);
      } catch (error) {
        expect(error.statusCode).toEqual(409);
      }
    });
  });

  describe('verify', () => {
    it('[Expect-Success] Verify', async () => {
      MockJwtService.verify.mockReturnValue({
        email: 'xuanngochq2k@gmail.com',
      });
      MockUserRepository.findOneAndUpdate.mockResolvedValue(mockCreateUser);
      const result = await service.verifyEmail('123');
      expect(result).toEqual(mockCreateUser);
    });
  });
});
