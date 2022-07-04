import { ExpressAdapter } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/categories.dto';
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
    const file = new File(['imageCategory'], 'darthvader.png', {});
    Object.defineProperty(file, 'size', { value: 1024 * 1024 + 1 });
    it('[Expect-success] Should call service to create category', async () => {
      MockCategoryService.createCategory.mockResolvedValue(true);
      // const result = await controller.createCategory(new CreateCategoryDto());
      // expect(result).toBe(true);
    });
  });
});
