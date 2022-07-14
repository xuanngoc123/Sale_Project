import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file-upload.service';
import { S3 } from 'aws-sdk';
import { ResponseUploadFile } from 'src/commons/commons.type';
describe('FileUploadService', () => {
  let service: FileUploadService;

  const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_BUCKET_REGION,
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileUploadService],
    }).compile();

    service = module.get<FileUploadService>(FileUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('upload', () => {
    it('[Expect-Success] upload', async () => {
      const mockUploadRs = new S3.ManagedUpload({
        params: {
          Body: { destroyed: 1 },
          ACL: 'public-read',
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: '1',
        },
      });
      jest.spyOn(s3, 'upload').mockReturnValue(mockUploadRs);
      const result = await service.upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: 'file.buffer',
        Key: '${folderName}/${Date.now()}-${file.originalname}',
      });
      expect(result).toEqual(mockUploadRs.promise());
    }, 0);
  });
});
