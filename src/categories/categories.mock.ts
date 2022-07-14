import { STATUS_CATEGORY_ENUM } from './categories.constant';
import { ICategory } from './entities/catetgory.entity';
import { ICreateCategory } from './entities/create-category.entity';

export const mockCreateCategoryDto: ICreateCategory = {
  name: '1',
  imageBanners: ['1', '2'],
  imageCategory: '1',
  status: STATUS_CATEGORY_ENUM.ACTIVE,
  description: '1',
};
export const mockCategory: ICategory = {
  name: '1',
  imageBanners: ['1', '2'],
  imageCategory: '1',
  status: STATUS_CATEGORY_ENUM.ACTIVE,
  description: '1',
  priority: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  _delete: false,
};
