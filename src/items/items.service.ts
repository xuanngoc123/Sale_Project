import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ICreateItem } from './entities/create-item.entity';
import { IItem, IListItem } from './entities/item.entity';
import { IUpdateItem } from './entities/update-item.entity';
import { ItemRepository } from './items.repository';
import { STATUS_ORDER_ENUM } from '../orders/orders.constant';

@Injectable()
export class ItemsService {
  constructor(
    private itemRepository: ItemRepository,
    private flashSalesService: FlashSalesService,
    private fileUploadService: FileUploadService,
    @Inject(forwardRef(() => OrdersService))
    private orderService: OrdersService,
  ) {}

  async createItem(createItemData: ICreateItem): Promise<IItem> {
    const createtItem = await this.itemRepository
      .create(createItemData)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
    const createItemReturn: IItem = {
      ...createtItem,
      urlAvatar: '',
      urlImages: [],
    };

    return this.addImage(createItemReturn['_doc']);
  }

  async updateItem(updateItemDto: IUpdateItem, id: string): Promise<IItem> {
    const updateItem = await this.itemRepository
      .findOneAndUpdate({ _id: id }, updateItemDto)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
    const updateItemReturn: IItem = {
      ...updateItem,
      urlAvatar: '',
      urlImages: [],
    };
    return this.addImage(updateItemReturn['_doc']);
  }

  async getListItem(
    category: string,
    tag: string,
    limit: number,
    page: number,
    sort: string,
  ): Promise<any> {
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
    const items = await this.itemRepository.findList(object, limit, page, sort);

    //return image
    const itemsReturn: IItem[] = [];
    for (let i = 0, length = items.data.length; i < length; i++) {
      itemsReturn.push({
        ...items.data[i]['_doc'],
        images: items.data[i].images,
        discount: null,
        priceFlashSale: null,
        quantityFlashSale: null,
        quantitySoldFlashSale: null,
      });
    }
    for (let i = 0, length = items.length; i < length; i++) {
      itemsReturn[i].urlAvatar = this.fileUploadService.getUrl(
        itemsReturn[i].avatar,
      );
    }

    //override price
    const flashSale = await this.flashSalesService.getFlashSaleNow();

    if (flashSale) {
      for (let i = 0, length = items.data.length; i < length; i++) {
        const itemFlashSale = flashSale.listItems.find(
          (x) => x.itemId == items.data[i]._id,
        );
        if (itemFlashSale?.quantity <= itemFlashSale?.quantitySold) {
          continue;
        }
        if (itemFlashSale) {
          itemsReturn[i].priceFlashSale =
            items.data[i].price - items.data[i].price * itemFlashSale.discount;
          itemsReturn[i].discount = itemFlashSale.discount;
          itemsReturn[i].quantityFlashSale = itemFlashSale.quantity;
          itemsReturn[i].quantitySoldFlashSale = itemFlashSale.quantitySold;
        }
      }
    }

    return {
      items: itemsReturn,
      totalPage: items.totalPage,
      currentPage: items.currentPage,
      numberItemPerPage: items.numberItemPerPage,
    };
  }

  async getItemById(id: string): Promise<IItem> {
    const item: IItem = await this.itemRepository.findOne({ _id: id });
    if (!item) {
      throw new NotFoundException();
    }

    const itemReturn: IItem = {
      ...item['_doc'],
      images: item.images,
      priceFlashSale: null,
      discount: null,
      quantityFlashSale: null,
      quantitySoldFlashSale: null,
    };

    //override price
    const flashSale = await this.flashSalesService.getFlashSaleNow();

    breakme: if (flashSale) {
      const itemFlashSale = flashSale.listItems.find(
        (x) => String(x.itemId) === String(id),
      );

      if (
        !itemFlashSale &&
        itemFlashSale?.quantity <= itemFlashSale?.quantitySold
      ) {
        break breakme;
      }
      itemReturn.priceFlashSale =
        item.price - item.price * itemFlashSale.discount;
      itemReturn.discount = itemFlashSale.discount;
      itemReturn.quantityFlashSale = itemFlashSale.quantity;
      itemReturn.quantitySoldFlashSale = itemFlashSale.quantitySold;
    }
    //return image
    return this.addImage(itemReturn);
  }

  async deleteItemById(id: string) {
    const ordersHaveItemId =
      await this.orderService.findAllOrderConfirmHaveItemId(id);
    if (ordersHaveItemId.length !== 0) {
      throw new BadRequestException('item can not delete');
    }

    const flashSale = await this.flashSalesService.getFlashSaleNow();
    if (flashSale) {
      const indexOfItemInFlashSale = flashSale.listItems.findIndex(
        (x) => x.itemId.toString() == id,
      );
      if (indexOfItemInFlashSale !== -1) {
        flashSale.listItems.splice(indexOfItemInFlashSale, 1);
      }
      this.flashSalesService.updateFlashSale(flashSale._id.toString(), {
        listItems: flashSale.listItems,
      });
    }
    return this.itemRepository.deleteOne({ _id: id });
  }

  deleteItemByCategory(categoryId: string) {
    return this.itemRepository.deleteMany({ categoryId: categoryId });
  }

  async updateQuantity(
    id,
    quantity: number,
    status: STATUS_ORDER_ENUM,
    session,
  ) {
    const item = await this.itemRepository.findOne({ _id: id });
    if (item?.quantity < quantity && status === STATUS_ORDER_ENUM.COMFIRM) {
      throw new BadRequestException('Out of item');
    }
    return this.itemRepository.findOneAndUpdateQuantity(
      { _id: id },
      { $inc: { quantity: quantity, quantitySold: -quantity } },
      session,
    );
  }

  private getArrUrl(arrKey: string[]): string[] {
    const result: string[] = [];
    for (let i = 0, length = arrKey.length; i < length; i++) {
      result.push(this.fileUploadService.getUrl(arrKey[i]));
    }
    return result;
  }

  private addImage(result: any) {
    result.urlAvatar = this.fileUploadService.getUrl(result.avatar);
    result.urlImages = this.getArrUrl(result.images);
    return result;
  }
}
