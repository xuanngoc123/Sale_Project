import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginAccessDto } from './dto/swagger.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { STATUS_USER_ENUM } from '../users/users.constant';

describe('AuthService', () => {
  let service: AuthService;
  const mockLoginAccess: LoginAccessDto = {
    accessToken: '1',
    user: {
      userName: '1',
    },
  };

  const mockPayload = {
    _id: 'user._id',
    email: 'user.email',
    userName: '1',
    role: 'user.role',
    status: 'user.status',
    address: 'user.address',
    phoneNumber: 'user.phoneNumber',
  };

  const MockUserService = {
    findOne: jest.fn(),
  };
  const MockJwtService = {
    sign: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(MockUserService)
      .overrideProvider(JwtService)
      .useValue(MockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate user', () => {
    it('[Expect-Success] return', async () => {
      const spy = bcrypt;
      jest.spyOn(spy, 'compare').mockResolvedValue('123');
      MockUserService.findOne.mockResolvedValue(mockLoginAccess);
      const result = await service.validateUser(
        { email: 'xuanngochq2k@gmail.com' },
        { password: 'password' },
      );
      expect(await spy.compare('password', 'password')).toEqual('123');
      expect(result).toEqual(null);
    });

    it('[Expect-Error] not find user', async () => {
      MockUserService.findOne.mockResolvedValue(null);
      try {
        await service.validateUser(
          { email: 'xuanngochq2k@gmail.com' },
          { password: 'password' },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('[Expect-Error] forbidden inactive', async () => {
      MockUserService.findOne.mockResolvedValue({
        status: STATUS_USER_ENUM.INACTIVE,
      });
      try {
        await service.validateUser(
          { email: 'xuanngochq2k@gmail.com' },
          { password: 'password' },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });

    it('[Expect-Error] forbidden banned', async () => {
      MockUserService.findOne.mockResolvedValue({
        status: STATUS_USER_ENUM.BANNED,
      });
      try {
        await service.validateUser(
          { email: 'xuanngochq2k@gmail.com' },
          { password: 'password' },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(ForbiddenException);
      }
    });

    it('[Expect-Error] password invalid', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      try {
        await service.validateUser(
          { email: 'xuanngochq2k@gmail.com' },
          { password: 'password' },
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('login', () => {
    it('[Expect-Success] login', async () => {
      MockUserService.findOne.mockResolvedValue(mockLoginAccess);
      MockJwtService.sign.mockReturnValue(mockLoginAccess.accessToken);
      const result = await service.login(mockPayload);
      expect(result).toEqual(mockLoginAccess);
    });
  });
});
