import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file-upload.service';
import AWS, { S3 } from 'aws-sdk';
import { ResponseUploadFile } from '../commons/commons.type';
import * as fs from 'fs';
describe('FileUploadService', () => {
  let service: FileUploadService;

  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION,
  });
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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadService],
    }).compile();

    service = module.get<FileUploadService>(FileUploadService);
    jest.useFakeTimers('legacy');
    jest.useFakeTimers('modern');
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upload', () => {
    it('[Expect-Success] upload category', async () => {
      const mockResponseUploadFile: ResponseUploadFile = {
        key: 'key',
        publicUrl: 'publicUrl',
      };
      const imageBuffer = (await fileToBuffer(
        'C:\\Users\\ngoc\\Downloads\\1656992186599-Capture.PNG',
      )) as Buffer;
      const mockFile = {
        fieldname: 'fieldname',
        originalname: 'originalname',
        encoding: 'encoding',
        mimetype: 'mimetype',
        buffer: imageBuffer,
        size: 3392,
      } as unknown as Express.Multer.File;

      jest.mock('aws-sdk', () => {
        return {
          uploadFileCatetgory: jest
            .fn()
            .mockReturnThis()
            .mockResolvedValue(mockResponseUploadFile),
          promise: jest.fn().mockReturnValueOnce({ Bucket: 'TestBucketName' }),
        };
      });
      const result = await service.uploadFileCatetgory({
        imageCategory: [mockFile],
        imageBanners: [mockFile],
      });
      const mockResponseUploadFileCategory = {
        keyOfImageCategory: `category/${Date.now()}-originalname`,
        keyOfImageBanners: [`category/${Date.now()}-originalname`],
      };
      expect(Object.keys(result)).toEqual(
        Object.keys(mockResponseUploadFileCategory),
      );
    }, 10000);

    it('[Expect-Success] upload item', async () => {
      const mockResponseUploadFile: ResponseUploadFile = {
        key: 'key',
        publicUrl: 'publicUrl',
      };
      const imageBuffer = (await fileToBuffer(
        'C:\\Users\\ngoc\\Downloads\\1656992186599-Capture.PNG',
      )) as Buffer;
      const mockFile = {
        fieldname: 'fieldname',
        originalname: 'originalname',
        encoding: 'encoding',
        mimetype: 'mimetype',
        buffer: imageBuffer,
        size: 3392,
      } as unknown as Express.Multer.File;

      jest.mock('aws-sdk', () => {
        return {
          upload: jest
            .fn()
            .mockReturnThis()
            .mockResolvedValue(mockResponseUploadFile),
        };
      });
      const mockResponseUploadFileImage = {
        keyOfImageAvatar: `item/${Date.now()}-originalname`,
        keyOfImageItems: [`item/${Date.now()}-originalname`],
      };
      const result = await service.uploadFileItem({
        imageAvatar: [mockFile],
        imageDetail: [mockFile],
      });

      expect(Object.keys(result)).toEqual(
        Object.keys(mockResponseUploadFileImage),
      );
    }, 10000);
  });
});
