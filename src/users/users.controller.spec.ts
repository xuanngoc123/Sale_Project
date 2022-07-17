import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { request, Request } from 'express';
import { STATUS_USER_ENUM } from './users.constant';

describe('UsersController', () => {
  let controller: UsersController;
  const MockUserService = {
    register: jest.fn(),
    verifyEmail: jest.fn(),
    updateInfo: jest.fn(),
    resendEmail: jest.fn(),
    getMyInfo: jest.fn(),
    banUser: jest.fn(),
  };
  const req: Request = request;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(MockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('register', () => {
    it('[Expect-success] Should call service to register', async () => {
      MockUserService.register.mockResolvedValue(true);
      const result = await controller.register(new CreateUserDto());
      expect(result).toBe(true);
    });
  });

  describe('verify email', () => {
    it('[Expect-success] Should call service to verify email', async () => {
      MockUserService.verifyEmail.mockResolvedValue(true);
      const result = await controller.verifyEmail('423434');
      expect(result).toBe(true);
    });
  });

  describe('update info', () => {
    it('[Expect-success] Should call service to update info', async () => {
      MockUserService.updateInfo.mockResolvedValue(true);
      const result = await controller.updateInfo(req, new UpdateUserDto());
      expect(result).toBe(true);
    });
  });

  describe('resend email', () => {
    it('[Expect-success] Should call service to resend mail', async () => {
      MockUserService.resendEmail.mockResolvedValue(true);
      const result = await controller.resendEmail({
        email: 'xuanngochq2k@gmail.com',
      });
      expect(result).toBe(true);
    });
  });

  describe('get my info', () => {
    it('[Expect-success] Should call service to get my info', async () => {
      MockUserService.getMyInfo.mockResolvedValue(true);
      const result = await controller.getMyInfo(req);
      expect(result).toBe(true);
    });
  });

  describe('ban user', () => {
    it('[Expect-success] Should call service to ban user', async () => {
      MockUserService.banUser.mockResolvedValue(true);
      const result = await controller.banUser('id123', STATUS_USER_ENUM.ACTIVE);
      expect(result).toBe(true);
    });
  });
});
