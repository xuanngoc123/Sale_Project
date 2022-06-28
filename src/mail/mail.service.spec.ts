import { Test, TestingModule } from '@nestjs/testing';
import { MailModule } from './mail.module';
import { MailService } from './mail.service';

describe('MailService', () => {
  let service: MailService;

  const MockMailService = {
    sendMail: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailModule],
      providers: [MailService],
    })
      .overrideProvider(MailService)
      .useValue(MockMailService)
      .compile();

    service = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMail', () => {
    it('[Expect-Success] Send Mail', async () => {
      MockMailService.sendMail.mockReturnValue(true);
      const result = await service.sendMail(
        { email: 'xuanngochq2k@gmail.com' },
        'abc',
        'abc',
      );
      expect(result).toEqual(true);
    });
  });
});
