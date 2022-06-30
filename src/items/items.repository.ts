import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Item, ItemDocument } from './items.shema';
@Injectable()
export class ItemRepository extends EntityRepository<ItemDocument> {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {
    super(itemModel);
  }
}
