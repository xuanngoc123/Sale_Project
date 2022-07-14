import { Test, TestingModule } from '@nestjs/testing';
import { mockInternalServerError } from '../mocks/reject.value';
import { mockCategory, mockCreateCategoryDto } from './categories.mock';
import { CategoryRepository } from './categories.repository';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const id = '123';
  const MockCategoryRepository = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    deleteOne: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, CategoryRepository],
    })
      .overrideProvider(CategoryRepository)
      .useValue(MockCategoryRepository)
      .compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create category', () => {
    it('[Expect-Success] create category', async () => {
      MockCategoryRepository.create.mockResolvedValue(mockCategory);
      const result = await service.createCategory(mockCreateCategoryDto);
      expect(result).toEqual(mockCategory);
    });

    it('[Expect-Error] create category error', async () => {
      MockCategoryRepository.create.mockResolvedValue(mockInternalServerError);
      try {
        await service.createCategory(mockCreateCategoryDto);
      } catch (error) {
        expect(error.statusCode).toEqual(500);
      }
    });
  });

  describe('update category', () => {
    it('[Expect-Success] update category', async () => {
      MockCategoryRepository.findOneAndUpdate.mockResolvedValue(mockCategory);
      const result = await service.updateCategory(mockCreateCategoryDto, id);
      expect(result).toEqual(mockCategory);
    });

    it('[Expect-Error] update category fail', async () => {
      MockCategoryRepository.findOneAndUpdate.mockResolvedValue(
        mockInternalServerError,
      );
      try {
        await service.updateCategory(mockCreateCategoryDto, id);
      } catch (error) {
        expect(error.statusCode).toEqual(500);
      }
    });
  });

  describe('get list category', () => {
    it('[Expect-Success] get list category', async () => {
      MockCategoryRepository.find.mockResolvedValue([mockCategory]);
      const result = await service.getAllCategories(10, 1, 'createdAt');
      expect(result).toEqual([mockCategory]);
    });
  });

  describe('get one category by id', () => {
    it('[Expect-Success] get one category success', async () => {
      MockCategoryRepository.findOne.mockResolvedValue(mockCategory);
      const result = await service.getCategoryById(id);
      expect(result).toEqual(mockCategory);
    });

    it('[Expect-Error] get one category fail', async () => {
      MockCategoryRepository.findOne.mockRejectedValue(mockInternalServerError);
      try {
        await service.getCategoryById(id);
      } catch (error) {
        expect(error.statusCode).toEqual(500);
      }
    });
  });
  describe('delete category', () => {
    it('[Expect-Success] delete category', async () => {
      MockCategoryRepository.deleteOne.mockResolvedValue(null);
      await service.deleteCategoryById(id);
    });
  });
});
