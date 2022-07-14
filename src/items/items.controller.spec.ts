import { Test, TestingModule } from '@nestjs/testing';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

describe('ItemsController', () => {
  let controller: ItemsController;
  const id = '123';
  const MockItemService = {
    createItem: jest.fn(),
    updateItem: jest.fn(),
    getItemById: jest.fn(),
    getListItem: jest.fn(),
    deleteItemById: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    })
      .overrideProvider(ItemsService)
      .useValue(MockItemService)
      .compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create item', () => {
    it('[Expect-success] Should call service to create item', async () => {
      MockItemService.createItem.mockResolvedValue(true);
      const result = await controller.createItem(new CreateItemDto());
      expect(result).toBe(true);
    });
  });

  describe('update item', () => {
    it('[Expect-success] Should call service to update item', async () => {
      MockItemService.updateItem.mockResolvedValue(true);
      const result = await controller.updateItems(id, new UpdateItemDto());
      expect(result).toBe(true);
    });
  });

  describe('get item by id', () => {
    it('[Expect-success] Should call service to get item by id', async () => {
      MockItemService.getItemById.mockResolvedValue(true);
      const result = await controller.getItemById(id);
      expect(result).toBe(true);
    });
  });

  describe('get list item', () => {
    it('[Expect-success] Should call service to get list item', async () => {
      MockItemService.getListItem.mockResolvedValue(true);
      const result = await controller.getListItem(
        'cattegory',
        'tag',
        10,
        1,
        'createdAt',
      );
      expect(result).toBe(true);
    });
  });

  describe('delete item', () => {
    it('[Expect-success] Should call service to delete item', async () => {
      MockItemService.deleteItemById.mockResolvedValue(true);
      const result = await controller.deleteItemById(id);
      expect(result).toBe(true);
    });
  });
});
