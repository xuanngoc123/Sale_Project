import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ResponseUploadFile } from '../commons/commons.type';
@Injectable()
export class FileUploadService {
  //   s3 = new S3({
  //     accessKeyId: process.env.AWS_ACCESS_KEY,
  //     secretAccessKey: process.env.AWS_SECRET_KEY,
  //     region: process.env.AWS_BUCKET_REGION,
  //   });
  async uploadFile(file): Promise<ResponseUploadFile> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: file.buffer,
      Key: `${Date.now()}-${file.originalname}`,
    };
    return await this.upload(params);
  }

  async upload(params): Promise<ResponseUploadFile> {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_BUCKET_REGION,
    });
    const data = await s3.upload(params).promise();

    const responseUploadFile: ResponseUploadFile = {
      key: data.Key,
      publicUrl: data.Location,
    };
    return responseUploadFile;
  }

  getUrl(key) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_BUCKET_REGION,
    });
    if (key === null || key === undefined || key === '') {
      return null;
    }
    const params = {
      Key: key,
      Bucket: process.env.AWS_BUCKET_NAME,
      Expires: process.env.TIME_EXPIRE_IMAGE,
    };
    return s3.getSignedUrl('getObject', params);
  }
}
