import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  const MockCategoryService = {
    createCategory: jest.fn(),
    updateCategory: jest.fn(),
    deleteCategoryById: jest.fn(),
    getAllCategories: jest.fn(),
    getCategoryById: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
    })
      .overrideProvider(UsersService)
      .useValue(MockCategoryService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
