import { Test, TestingModule } from '@nestjs/testing';
import { CategorysController } from './categorys.controller';

describe('CategorysController', () => {
  let controller: CategorysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategorysController],
    }).compile();

    controller = module.get<CategorysController>(CategorysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
