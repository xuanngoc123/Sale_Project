import { Injectable } from '@nestjs/common';
import { ICreateOrder } from './entities/create-order.entity';
import { IOrder } from './entities/order.entity';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private orderRepository: OrderRepository) {}

  createOrder(createOrderData: ICreateOrder): Promise<IOrder> {
    return this.orderRepository.create(createOrderData);
  }
}
