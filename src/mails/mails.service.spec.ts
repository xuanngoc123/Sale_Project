import { MailerService } from '@nestjs-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { MailsService } from './mails.service';

describe('MailsService', () => {
  let service: MailsService;

  const MockMailerService = {
    sendMail: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailsService, MailerService],
    })
      .overrideProvider(MailerService)
      .useValue(MockMailerService)
      .compile();

    service = module.get<MailsService>(MailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendMail', () => {
    it('[Expect-Success] Send Mail', async () => {
      MockMailerService.sendMail.mockReturnValue(undefined);
      const result = await service.sendMail(
        { email: 'xuanngochq2k@gmail.com' },
        'abc',
        'abc',
      );
      expect(result).toEqual(undefined);
    });
  });
});
