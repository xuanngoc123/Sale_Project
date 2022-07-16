import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { FileUploadService } from '../file-upload/file-upload.service';
import { FlashSalesService } from '../flash-sales/flash-sales.service';
import { ItemsService } from '../items/items.service';
import { VouchersService } from '../vouchers/vouchers.service';
import { ICreateOrder } from './entities/create-order.entity';
import { IOrder } from './entities/order.entity';
import { STATUS_ORDER_ENUM } from './orders.constant';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    @Inject(forwardRef(() => ItemsService))
    private itemsService: ItemsService,
    private vouchersService: VouchersService,
    private flashSalesService: FlashSalesService,
    private fileUploadService: FileUploadService,
  ) {}

  async createOrder(createOrderData: ICreateOrder, req: any): Promise<IOrder> {
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
            createOrderData.listItems[i].itemId,
            -createOrderData.listItems[i].quantity,
          ),
        );
      }
      //update quantity items
      arrPromise.push(
        this.itemsService.updateQuantity(
          createOrderData.listItems[i].itemId,
          -createOrderData.listItems[i].quantity,
        ),
      );
    }

    createOrderData.originalPrice = originalPrice;
    createOrderData.totalPrice = totalPrice;
    if (totalPrice === 0) {
      createOrderData.totalPrice = originalPrice;
    }

    //add voucher
    if (createOrderData.voucherInfo) {
      if (
        createOrderData.totalPrice <
        createOrderData.voucherInfo.thresholdDiscount
      ) {
        throw new BadRequestException('Voucher invalid');
      }
      createOrderData.totalPrice =
        createOrderData.totalPrice - createOrderData.voucherInfo.discountAmount;
      arrPromise.push(
        this.vouchersService.updateQuantity(
          createOrderData.voucherInfo.voucherId,
          -1,
        ),
      );
    }
    Promise.all(arrPromise);
    const createOrder = await this.orderRepository
      .create(createOrderData)
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
    return this.addImage(createOrder);
  }

  async updateStatusOrder(
    status: STATUS_ORDER_ENUM,
    req: any,
    id: string,
  ): Promise<IOrder> {
    const myOrder: IOrder = await this.orderRepository
      .findOneAndUpdate(
        {
          _id: id,
          'userInfo.userId': req['user']['_id'],
        },
        { status: status },
      )
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });

    let arrPromise = [];
    for (let i = 0, length = myOrder.listItems.length; i < length; i++) {
      if (
        myOrder.listItems[i].priceFlashSale !== null ||
        myOrder.listItems[i].priceFlashSale !== undefined
      ) {
        //update quantity flash sale
        arrPromise.push(
          this.flashSalesService.updateQuantity(
            myOrder.listItems[i].itemId,
            myOrder.listItems[i].quantity,
          ),
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

      return this.addImage(myOrder);
    }
  }

  async getMyOrderById(id: string, req: any): Promise<IOrder> {
    const myOrder = await this.orderRepository.findOne({
      _id: id,
      'userInfo.userId': req['user']['_id'],
    });

    if (!myOrder) {
      throw new NotFoundException();
    }

    return this.addImage(myOrder);
  }

  getListMyOrder(
    req: any,
    limit: number,
    page: number,
    sort: string,
  ): Promise<IOrder[]> {
    return this.orderRepository.find(
      { 'userInfo.userId': req['user']['_id'] },
      limit,
      page,
      sort,
    );
  }

  private addImage(result: any) {
    for (let i = 0, length = result.listItems.length; i < length; i++) {
      result.listItems[i].avatar = this.fileUploadService.getUrl(
        result.listItems[i].avatar,
      );
    }
    return result;
  }

  findAllOrderConfirmHaveItemId(itemId): Promise<IOrder[]> {
    return this.orderRepository.findAll({
      status: STATUS_ORDER_ENUM.COMFIRM,
      'listItems.itemId': itemId,
    });
  }
}
