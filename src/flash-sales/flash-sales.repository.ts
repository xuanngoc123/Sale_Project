import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { FlashSale, FlashSaleDocument } from './flash-sales.schema';

@Injectable()
export class FlashSaleRepository extends EntityRepository<FlashSaleDocument> {
  constructor(
    @InjectModel(FlashSale.name)
    private flashSaleModel: Model<FlashSaleDocument>,
  ) {
    super(flashSaleModel);
  }
}
