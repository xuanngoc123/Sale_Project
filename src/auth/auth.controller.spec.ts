import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  const req = { user: { _id: '123' } };
  let controller: AuthController;
  const MockAuthService = {
    sendMail: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(MockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('[Expect-success] Should call service to login', async () => {
      const result = await controller.login(req);
      expect(result).toBe(req.user);
    });
  });
});
