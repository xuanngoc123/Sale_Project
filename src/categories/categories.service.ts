import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { ICategory } from './entities/catetgory.entity';
import { ICreateCategory } from './entities/create-category.entity';
import { IUpdateCategory } from './entities/update-category.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(
    createCategoryData: ICreateCategory,
  ): Promise<ICategory> {
    try {
      const createCategory = await this.categoryRepository.create(
        createCategoryData,
      );
      return createCategory;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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
      return updateCategory;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getAllCategories(limit, page, sort): Promise<ICategory[]> {
    return this.categoryRepository.find({}, limit, page, sort);
  }

  async getCategoryById(id): Promise<ICategory> {
    const category = await this.categoryRepository.findOne({ _id: id });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async deleteCategoryById(id): Promise<any> {
    await this.categoryRepository.deleteOne({ _id: id });
    return;
  }
}
