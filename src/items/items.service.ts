import { Injectable } from '@nestjs/common';
import { ICreateItem } from './entities/create-item.entity';
import { IItem } from './entities/item.entity';
import { IUpdateItem } from './entities/update-item.entity';
import { ItemRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(private itemRepository: ItemRepository) {}

  async createItem(createItemData: ICreateItem): Promise<IItem> {
    return this.itemRepository.create(createItemData);
  }

  async updateItem(updateItemDto: IUpdateItem, id: string): Promise<IItem> {
    return this.itemRepository.findOneAndUpdate({ _id: id }, updateItemDto);
  }

  async getAllItems(): Promise<IItem[]> {
    return this.itemRepository.find({});
  }

  async getItemById(id: string): Promise<IItem> {
    return this.itemRepository.findOne({ _id: id });
  }

  async deleteItemById(id: string) {
    return this.itemRepository.deleteMany({ _id: id });
  }
}
