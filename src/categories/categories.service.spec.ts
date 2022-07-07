import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from './categories.repository';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  const MockCategoryRepository = {
    create: jest.fn(),
    findOneAndUpdate: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    deleteMany: jest.fn(),
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

  // describe('create category', () => {
  //   it('[Expect-Success] create category', async () => {
  //     MockCategoryRepository.create.mockResolvedValue();
  //     const result = await service.createCategory();
  //     expect(result).toEqual(mockCreateUser);
  //   });
  // });
});
