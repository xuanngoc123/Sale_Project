import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { FlashSalesService } from 'src/flash-sales/flash-sales.service';
import { ICreateItem } from './entities/create-item.entity';
import { IItem } from './entities/item.entity';
import { IUpdateItem } from './entities/update-item.entity';
import { ItemRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemRepository,
    private flashSalesService: FlashSalesService,
  ) {}

  async createItem(createItemData: ICreateItem): Promise<IItem> {
    try {
      return this.itemRepository.create(createItemData);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateItem(updateItemDto: IUpdateItem, id: string): Promise<IItem> {
    try {
      return this.itemRepository.findOneAndUpdate({ _id: id }, updateItemDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getListItem(
    category: string,
    tag: string,
    limit: number,
    page: number,
    sort: string,
  ): Promise<IItem[]> {
    let object = {};
    if (category) {
      object = {
        ...object,
        categoryName: category,
      };
    }
    if (tag) {
      object = {
        ...object,
        tag: tag,
      };
    }
    const items = await this.itemRepository.find(object, limit, page, sort);
    const flashSale = await this.flashSalesService.getFlashSaleNow();
    const arrItemsReturn: IItem[] = [];

    if (flashSale) {
      for (let i = 0, length = items.length; i < length; i++) {
        const itemFlashSale = flashSale.listItems.find(
          (x) => x.name === items[i].name,
        );
        if (itemFlashSale) {
          arrItemsReturn.push({
            ...items[i]['_doc'],
            priceFlashSale:
              items[i].price - items[i].price * itemFlashSale.discount,
            discount: itemFlashSale.discount,
          });
        }
        if (!itemFlashSale) {
          arrItemsReturn.push({
            ...items[i]['_doc'],
            priceFlashSale: null,
            discount: null,
          });
        }
      }
      return arrItemsReturn;
    }

    return items;
  }

  async getItemById(id: string): Promise<IItem> {
    const item: IItem = await this.itemRepository.findOne({ _id: id });
    if (!item) {
      throw new NotFoundException();
    }

    const itemReturn: IItem = {
      ...item['_doc'],
      priceFlashSale: null,
      discount: null,
    };
    const flashSale = await this.flashSalesService.getFlashSaleNow();

    breakme: if (flashSale) {
      const itemFlashSale = flashSale.listItems.find(
        (x) => x.name === item.name,
      );
      if (!itemFlashSale) {
        break breakme;
      }
      itemReturn.priceFlashSale =
        item.price - item.price * itemFlashSale.discount;
      itemReturn.discount = itemFlashSale.discount;
    }

    return itemReturn;
  }

  deleteItemById(id: string) {
    return this.itemRepository.deleteOne({ _id: id });
  }

  updateQuantity(id, quantity: number) {
    return this.itemRepository.findOneAndUpdateQuantity(
      { _id: id },
      { $inc: { quantity: quantity, quantitySold: -quantity } },
    );
  }
}
