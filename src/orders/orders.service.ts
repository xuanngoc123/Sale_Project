import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import mongoose from 'mongoose';
import { FlashSalesService } from 'src/flash-sales/flash-sales.service';
import { ItemsService } from 'src/items/items.service';
import { VouchersService } from 'src/vouchers/vouchers.service';
import { ICreateOrder } from './entities/create-order.entity';
import { IOrder } from './entities/order.entity';
import { ICancelOrder } from './entities/update-order.entity';
import { STATUS_ORDER_ENUM } from './orders.constant';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    private itemsService: ItemsService,
    private vouchersService: VouchersService,
    private flashSalesService: FlashSalesService,
  ) {}

  createOrder(createOrderData: ICreateOrder, req: Request): Promise<IOrder> {
    //user info
    createOrderData.userInfo = {
      userId: new mongoose.Types.ObjectId(req['user']['_id']),
      userName: req['user']['userName'],
      address: req['user']['address'],
      phoneNumber: req['user']['phoneNumber'],
    };

    //items
    let originalPrice = 0;
    let totalPrice = 0;
    const arrPromise = [];

    for (
      let i = 0, length = createOrderData.listItems.length;
      i < length;
      i++
    ) {
      originalPrice =
        originalPrice +
        createOrderData.listItems[i].price *
          createOrderData.listItems[i].quantity;
      if (
        createOrderData.listItems[i].priceFlashSale !== null ||
        createOrderData.listItems[i].priceFlashSale !== undefined
      ) {
        totalPrice =
          totalPrice +
          createOrderData.listItems[i].priceFlashSale *
            createOrderData.listItems[i].quantity;
        //update quantity flash sale
        arrPromise.push(
          this.flashSalesService.updateQuantity(
            -createOrderData.listItems[i].quantity,
          ),
        );
      }
      //update quantity items
      arrPromise.push(
        this.itemsService.updateQuantity(
          createOrderData.listItems[i].categoryId,
          -createOrderData.listItems[i].quantity,
        ),
      );
    }

    createOrderData.originalPrice = originalPrice;
    createOrderData.totalPrice = totalPrice;

    //add voucher
    if (createOrderData.voucherInfo) {
      if (totalPrice < createOrderData.voucherInfo.thresholdDiscount) {
        throw new BadRequestException('Voucher invalid');
      }
      createOrderData.totalPrice =
        totalPrice - createOrderData.voucherInfo.discountAmount;
      arrPromise.push(
        this.vouchersService.updateQuantity(
          createOrderData.voucherInfo.voucherId,
          -1,
        ),
      );
    }
    Promise.all(arrPromise);
    return this.orderRepository.create(createOrderData);
  }

  async updateStatusOrder(
    status: STATUS_ORDER_ENUM,
    req: Request,
    id: string,
  ): Promise<IOrder> {
    const myOrder: IOrder = await this.orderRepository.findOneAndUpdate(
      {
        _id: id,
        'userInfo.userId': req['user']['_id'],
      },
      { status: status },
    );
    let arrPromise = [];
    for (let i = 0, length = myOrder.listItems.length; i < length; i++) {
      if (
        myOrder.listItems[i].priceFlashSale !== null ||
        myOrder.listItems[i].priceFlashSale !== undefined
      ) {
        //update quantity flash sale
        arrPromise.push(
          this.flashSalesService.updateQuantity(myOrder.listItems[i].quantity),
        );
        arrPromise.push(
          this.itemsService.updateQuantity(
            myOrder.listItems[i].itemId,
            myOrder.listItems[i].quantity,
          ),
        );
      }
      if (myOrder.voucherInfo) {
        arrPromise.push(
          this.vouchersService.updateQuantity(myOrder.voucherInfo.voucherId, 1),
        );
      }
      if (status === STATUS_ORDER_ENUM.CANCEL) {
        Promise.all(arrPromise);
      }
      if (status === STATUS_ORDER_ENUM.DELIVERED) {
        arrPromise = [];
      }

      return myOrder;
    }
  }

  async getMyOrderById(id: string, req: Request): Promise<IOrder> {
    const myOrder = await this.orderRepository.findOne({
      _id: id,
      'userInfo.userId': req['user']['_id'],
    });
    if (!myOrder) {
      throw new NotFoundException();
    }
    return myOrder;
  }

  getListMyOrder(req: Request): Promise<IOrder[]> {
    return this.orderRepository.find({ 'userInfo.userId': req['user']['_id'] });
  }
}
