import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ResponseUploadFile } from '../commons/commons.type';
import { FOLDER_UPLOAD_ENUM } from './file-upload.constant';
@Injectable()
export class FileUploadService {
  async uploadFile(
    file: Express.Multer.File,
    folderName: string,
  ): Promise<ResponseUploadFile> {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: file.buffer,
      Key: `${folderName}/${Date.now()}-${file.originalname}`,
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

  async uploadFileCatetgory(files) {
    let result = {};

    const uploadImageCategory: ResponseUploadFile = await this.uploadFile(
      files.imageCategory[0],
      FOLDER_UPLOAD_ENUM.CATEORY,
    );
    result = {
      ...result,
      keyOfImageCategory: uploadImageCategory.key,
    };

    const keyOfImageBanners: string[] = [];
    for (let i = 0; i < files.imageBanners.length; i++) {
      const uploadImageBanner: ResponseUploadFile = await this.uploadFile(
        files.imageBanners[i],
        FOLDER_UPLOAD_ENUM.CATEORY,
      );
      keyOfImageBanners.push(uploadImageBanner.key);
    }

    result = {
      ...result,
      keyOfImageBanners: keyOfImageBanners,
    };

    return result;
  }

  async uploadFileItem(files) {
    let result = {};
    const keyOfImageItems: string[] = [];
    for (let i = 0; i < files.images.length; i++) {
      const uploadImageItem: ResponseUploadFile = await this.uploadFile(
        files.images[0],
        FOLDER_UPLOAD_ENUM.ITEM,
      );

      keyOfImageItems.push(uploadImageItem.key);
    }
    result = {
      ...result,
      keyOfImageItems: keyOfImageItems,
    };
    return result;
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
      Expires: Number(process.env.TIME_EXPIRE_IMAGE),
    };
    return s3.getSignedUrl('getObject', params);
  }
}
