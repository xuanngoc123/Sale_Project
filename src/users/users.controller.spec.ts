import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { CreateUserDto } from './users.dto';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const MockUserService = {
    register: jest.fn(),
    verifyEmail: jest.fn(),
    deleteUser: jest.fn(),
  };
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
});
