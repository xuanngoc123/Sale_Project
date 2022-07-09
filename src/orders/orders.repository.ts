import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Order, OrderDocument } from './orders.schema';

export class OrderRepository extends EntityRepository<OrderDocument> {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {
    super(orderModel);
  }
}
