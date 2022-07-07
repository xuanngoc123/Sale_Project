import { ExpressAdapter } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

describe('FileUploadController', () => {
  let controller: FileUploadController;

  const MockFileUploadService = {
    uploadFileCatetgory: jest.fn(),
    uploadFileItem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileUploadController],
      providers: [FileUploadService],
    })
      .overrideProvider(FileUploadService)
      .useValue(MockFileUploadService)
      .compile();

    controller = module.get<FileUploadController>(FileUploadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('uploadFileCatetgory', () => {
    it('[Expect-success] Should call service to uploadFileCatetgory', async () => {
      MockFileUploadService.uploadFileCatetgory.mockResolvedValue(true);
    });
  });
});
