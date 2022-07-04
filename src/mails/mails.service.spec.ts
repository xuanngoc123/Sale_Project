import { Test, TestingModule } from '@nestjs/testing';
import { MailsModule } from './mails.module';
import { MailsService } from './mails.service';

describe('MailsService', () => {
  let service: MailsService;

  const MockMailsService = {
    sendMail: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MailsModule],
      providers: [MailsService],
    })
      .overrideProvider(MailsService)
      .useValue(MockMailsService)
      .compile();

    service = module.get<MailsService>(MailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMail', () => {
    it('[Expect-Success] Send Mail', async () => {
      MockMailsService.sendMail.mockReturnValue(true);
      const result = await service.sendMail(
        { email: 'xuanngochq2k@gmail.com' },
        'abc',
        'abc',
      );
      expect(result).toEqual(true);
    });
  });
});
