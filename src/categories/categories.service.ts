import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.categoryRepository.create(createCategoryData);
  }

  async updateCategory(
    updateCategoryData: IUpdateCategory,
    id: string,
  ): Promise<ICategory> {
    return this.categoryRepository.findOneAndUpdate(
      { _id: id },
      updateCategoryData,
    );
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
    return this.categoryRepository.deleteOne({ _id: id });
  }
}
