import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/categories.dto';
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
      .overrideProvider(CategoriesService)
      .useValue(MockCategoryService)
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create category', () => {
    it('[Expect-success] Should call service to create category', async () => {
      MockCategoryService.createCategory.mockResolvedValue(true);
      const result = await controller.createCategory(new CreateCategoryDto());
      expect(result).toBe(true);
    });
  });

  describe('update category', () => {
    it('[Expect-success] Should call service to update category', async () => {
      MockCategoryService.updateCategory.mockResolvedValue(true);
      const result = await controller.updateCategory(
        '2314',
        new UpdateCategoryDto(),
      );
      expect(result).toBe(true);
    });
  });

  describe('get category by id', () => {
    it('[Expect-success] Should call service to get category by id', async () => {
      MockCategoryService.getCategoryById.mockResolvedValue(true);
      const result = await controller.getCategoryById('2314');
      expect(result).toBe(true);
    });
  });

  describe('get all category', () => {
    it('[Expect-success] Should call service to get all category', async () => {
      MockCategoryService.getAllCategories.mockResolvedValue(true);
      const result = await controller.getAllCategory(10, 1, 'createdAt');
      expect(result).toBe(true);
    });
  });

  describe('delete category', () => {
    it('[Expect-success] Should call service to delete category', async () => {
      MockCategoryService.deleteCategoryById.mockResolvedValue(true);
      const result = await controller.deleteCategory('2343');
      expect(result).toBe(true);
    });
  });
});
