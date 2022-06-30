import { Injectable } from '@nestjs/common';
import { ResponseUploadFile } from '../commons/commons.type';
import { FileUploadService } from '../file-upload/file-upload.service';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
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
  async updateCategory(
    updateCategoryDto: UpdateCategoryDto,
    files,
    id,
  ): Promise<any> {
    let payload = {
      ...updateCategoryDto,
    };
    if (files.imageCategory) {
      const uploadImageCategory: ResponseUploadFile =
        await this.fileUploadService.uploadFile(files.imageCategory[0]);
      payload = {
        ...payload,
        imageCategory: uploadImageCategory.key,
      };
    }
    if (files.imageBaners) {
      const arrKeyImageBanners: string[] = [];
      for (let i = 0; i < files.imageBaners.length; i++) {
        const uploadImageBanner: ResponseUploadFile =
          await this.fileUploadService.uploadFile(files.imageBaners[i]);
        arrKeyImageBanners.push(uploadImageBanner.key);
      }
      payload = {
        ...payload,
        imageBaners: arrKeyImageBanners,
      };
    }
    return this.categoryRepository.findOneAndUpdate({ _id: id }, payload);
  }

  async getAllCategories() {
    return this.categoryRepository.find({});
  }
  async getCategoryById(id) {
    return this.categoryRepository.findOne({ _id: id });
  }
  async deleteCategoryById(id) {
    return this.categoryRepository.deleteMany({ _id: id });
  }
}
