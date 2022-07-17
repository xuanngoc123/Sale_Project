import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { STATUS_ORDER_ENUM } from '../orders/orders.constant';
import { FileUploadService } from '../file-upload/file-upload.service';
import { MailsService } from '../mails/mails.service';
import { STATUS_USER_ENUM } from '../users/users.constant';
import { UsersService } from '../users/users.service';
import { ICreateFlashSale } from './entities/create-flash-sale.entity';
import { IFlashSale } from './entities/flash-sale.entity';
import { IUpdateFlashSale } from './entities/update-flash-sale.entity';
import { FlashSaleRepository } from './flash-sales.repository';

@Injectable()
export class FlashSalesService {
  constructor(
    private flashSaleRepository: FlashSaleRepository,
    private schedulerRegistry: SchedulerRegistry,
    private mailsService: MailsService,
    private usersService: UsersService,
    private fileUploadService: FileUploadService,
  ) {}

  async createFlashSale(
    createFlashSaleData: ICreateFlashSale,
  ): Promise<IFlashSale> {
    const createFlashSale = await this.flashSaleRepository.create(
      createFlashSaleData,
    );

    const date =
      new Date(createFlashSaleData.startTime).getTime() -
      parseFloat(process.env.TIME_TO_SEND_MAIL) * 60 * 1000;

    const job = new CronJob(new Date(date), async () => {
      const allUser = await this.usersService.findAll({
        status: STATUS_USER_ENUM.ACTIVE,
      });

      const allPromise = [];
      for (let i = 0, length = allUser.length; i < length; i++) {
        allPromise.push(
          this.mailsService.sendMail(
            allUser[i],
            `FlashSale sẽ bắt đầu vào lúc ${createFlashSaleData.startTime}`,
            'THÔNG BÁO FLASH SALE',
          ),
        );
      }

      Promise.all(allPromise);
    });
    this.schedulerRegistry.addCronJob(`${Date.now()}`, job);
    job.start();
    return this.addImage(createFlashSale);
  }

  async updateFlashSale(
    id: string,
    updateFlashSaleData: IUpdateFlashSale,
  ): Promise<IFlashSale> {
    const updateFlashSale = await this.flashSaleRepository.findOneAndUpdate(
      { _id: id },
      updateFlashSaleData,
    );

    return this.addImage(updateFlashSale);
  }

  async getFlashSale(): Promise<IFlashSale> {
    const now = new Date().toISOString();
    const flashSale = await this.flashSaleRepository.findOne({
      startTime: { $lt: now },
      endTime: { $gt: now },
    });
    if (!flashSale) {
      throw new NotFoundException();
    }
    return this.addImage(flashSale);
  }

  async deleteFlashSale(id): Promise<any> {
    await this.flashSaleRepository.deleteOne({ _id: id });
    return;
  }

  getFlashSaleNow(): Promise<IFlashSale> {
    const now = new Date().toISOString();
    return this.flashSaleRepository.findOne({
      startTime: { $lt: now },
      endTime: { $gt: now },
    });
  }

  async updateQuantity(
    itemId: any,
    quantity: number,
    status: STATUS_ORDER_ENUM,
  ) {
    const now = new Date().toISOString();
    const flashSale = await this.flashSaleRepository.findOne({
      startTime: { $lt: now },
      endTime: { $gt: now },
    });
    const itemInFlashSale = flashSale?.listItems.find((x) => {
      return x.itemId.toString() == itemId;
    });

    if (
      itemInFlashSale?.quantity - itemInFlashSale?.quantitySold <= 0 &&
      status === STATUS_ORDER_ENUM.COMFIRM
    ) {
      throw new BadRequestException('Out of item in flash sale');
    }

    return this.flashSaleRepository.findOneAndUpdateQuantity(
      {
        'listItems.itemId': itemId,
        startTime: { $lt: now },
        endTime: { $gt: now },
      },
      {
        $inc: {
          'listItems.$.quantitySold': -quantity,
        },
      },
    );
  }

  addImage(result: any) {
    for (let i = 0, length = result.listItems.length; i < length; i++) {
      result.listItems[i].avatar = this.fileUploadService.getUrl(
        result.listItems[i].avatar,
      );
    }
    return result;
  }
}
