import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Item, ItemDocument } from './items.schema';
@Injectable()
export class ItemRepository extends EntityRepository<ItemDocument> {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {
    super(itemModel);
  }

  async deleteOne(entityFilterQuery: FilterQuery<ItemDocument>): Promise<any> {
    const find = await this.itemModel.findOne(entityFilterQuery);
    if (!find) {
      throw new NotFoundException();
    }
    find['name'] = `${find['name']}-${Date.now()}`;
    find['barcode'] = `${find['barcode']}-${Date.now()}`;
    find['_delete'] = true;
    await find.save();
    return;
  }
}
