import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FileUploadService } from '../file-upload/file-upload.service';
import { ItemsService } from '../items/items.service';
import { CategoryRepository } from './categories.repository';
import { ICategory } from './entities/catetgory.entity';
import { ICreateCategory } from './entities/create-category.entity';
import { IUpdateCategory } from './entities/update-category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private categoryRepository: CategoryRepository,
    private itemService: ItemsService,
    private fileUploadService: FileUploadService,
  ) {}

  async createCategory(
    createCategoryData: ICreateCategory,
  ): Promise<ICategory> {
    const createCategory = await this.categoryRepository
      .create(createCategoryData)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
    return this.addImage(createCategory);
  }

  async updateCategory(
    updateCategoryData: IUpdateCategory,
    id: string,
  ): Promise<ICategory> {
    try {
      const updateCategory = await this.categoryRepository.findOneAndUpdate(
        { _id: id },
        updateCategoryData,
      );

      return this.addImage(updateCategory);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllCategories(limit, page, sort): Promise<ICategory[]> {
    const categories = await this.categoryRepository.find(
      {},
      limit,
      page,
      sort,
    );
    for (let i = 0, length = categories.length; i < length; i++) {
      categories[i].imageCategory = this.fileUploadService.getUrl(
        categories[i].imageCategory,
      );
    }
    return categories;
  }

  async getCategoryById(id): Promise<ICategory> {
    const category = await this.categoryRepository.findOne({ _id: id });
    if (!category) {
      throw new NotFoundException();
    }

    return this.addImage(category);
  }

  async deleteCategoryById(id): Promise<any> {
    await this.categoryRepository.deleteOne({ _id: id });
    await this.itemService.deleteItemByCategory(id);
    return;
  }

  getArrUrl(arrKey: string[]): [string] {
    const result: any = [];
    for (let i = 0, length = arrKey.length; i < length; i++) {
      result.push(this.fileUploadService.getUrl(arrKey[i]));
    }
    return result;
  }

  addImage(result: any) {
    result.imageCategory = this.fileUploadService.getUrl(result.imageCategory);
    result.imageBanners = this.getArrUrl(result.imageBanners);
    return result;
  }
}
