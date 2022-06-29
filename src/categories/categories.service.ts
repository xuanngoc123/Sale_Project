import { Injectable } from '@nestjs/common';
import { ResponseUploadFile } from 'src/commons/commons.type';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateCategoryDto } from './categories.dto';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private categoryRepository: CategoryRepository,
    private fileUploadService: FileUploadService,
  ) {}
  async createCategory(createCategory: CreateCategoryDto, files): Promise<any> {
    const uploadImageCategory: ResponseUploadFile =
      await this.fileUploadService.uploadFile(files.imageCategory[0]);

    const arrKeyImageBanners: string[] = [];
    for (let i = 0; i < files.imageBaners.length; i++) {
      const uploadImageBanner: ResponseUploadFile =
        await this.fileUploadService.uploadFile(files.imageBaners[i]);
      arrKeyImageBanners.push(uploadImageBanner.key);
    }

    return this.categoryRepository.create({
      ...createCategory,
      imageBaners: arrKeyImageBanners,
      imageCategory: uploadImageCategory.key,
    });
  }
}
