import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from '../file-upload/file-upload.service';
import { ItemsService } from '../items/items.service';
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
  const MockItemService = {
    deleteItemByCategory: jest.fn(),
  };
  const MockFileUploadService = {
    getUrl: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        CategoryRepository,
        ItemsService,
        FileUploadService,
      ],
    })
      .overrideProvider(CategoryRepository)
      .useValue(MockCategoryRepository)
      .overrideProvider(ItemsService)
      .useValue(MockItemService)
      .overrideProvider(FileUploadService)
      .useValue(MockFileUploadService)
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
      MockCategoryRepository.create.mockRejectedValue(mockInternalServerError);
      try {
        await service.createCategory(mockCreateCategoryDto);
      } catch (error) {
        expect(500).toEqual(mockInternalServerError.statusCode);
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
      MockCategoryRepository.findOneAndUpdate.mockRejectedValue(
        mockInternalServerError,
      );
      try {
        await service.updateCategory(mockCreateCategoryDto, id);
      } catch (error) {
        expect(500).toEqual(mockInternalServerError.statusCode);
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
      MockCategoryRepository.findOne.mockReturnValue(null);
      try {
        await service.getCategoryById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('delete category', () => {
    it('[Expect-Success] delete category', async () => {
      MockCategoryRepository.deleteOne.mockResolvedValue(null);
      MockItemService.deleteItemByCategory.mockResolvedValue(null);
      await service.deleteCategoryById(id);
    });
  });
});
