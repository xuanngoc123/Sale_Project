import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import * as fs from 'fs';
import { Readable } from 'stream';

describe('FileUploadController', () => {
  let controller: FileUploadController;

  const fileToBuffer = (filename) => {
    const readStream = fs.createReadStream(filename);
    const chunks = [];
    return new Promise((resolve, reject) => {
      readStream.on('error', (err) => {
        reject(err);
      });

      readStream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      readStream.on('close', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  };

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
      const imageBuffer = (await fileToBuffer(
        'C:\\Users\\ngoc\\Downloads\\1656992186599-Capture.PNG',
      )) as Buffer;

      const imageFile: Express.Multer.File = {
        buffer: imageBuffer,
        fieldname: 'fieldname-defined-in-@UseInterceptors-decorator',
        originalname: 'original-filename',
        encoding: '7bit',
        mimetype: 'file-mimetyp',
        destination: 'destination-path',
        filename: 'file-name',
        path: 'file-path',
        size: 955578,
        stream: new Readable(),
      };
      const mockUploadFile: Express.Multer.File = imageFile;
      const mockUploadFiles: Express.Multer.File[] = [imageFile];
      const filesCategory = {
        imageCategory: mockUploadFile,
        imageBaners: mockUploadFiles,
      };
      MockFileUploadService.uploadFileCatetgory.mockResolvedValue(true);
      const result = await controller.uploadFileCategory(filesCategory);
      expect(result).toBe(true);
    });
  });

  describe('uploadFileCatetgory', () => {
    it('[Expect-success] Should call service to uploadFileCatetgory', async () => {
      const imageBuffer = (await fileToBuffer(
        'C:\\Users\\ngoc\\Downloads\\1656992186599-Capture.PNG',
      )) as Buffer;

      const imageFile: Express.Multer.File = {
        buffer: imageBuffer,
        fieldname: 'fieldname-defined-in-@UseInterceptors-decorator',
        originalname: 'original-filename',
        encoding: '7bit',
        mimetype: 'file-mimetyp',
        destination: 'destination-path',
        filename: 'file-name',
        path: 'file-path',
        size: 955578,
        stream: new Readable(),
      };
      const mockUploadFile: Express.Multer.File = imageFile;
      const mockUploadFiles: Express.Multer.File[] = [imageFile];
      MockFileUploadService.uploadFileItem.mockResolvedValue(true);
      const filesItem = {
        imageAvatar: mockUploadFile,
        imageDetail: mockUploadFiles,
      };
      const result = await controller.uploadFileItem(filesItem);
      expect(result).toBe(true);
    });
  });
});
