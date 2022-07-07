import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { MailsService } from 'src/mails/mails.service';
import { IUser } from 'src/users/entities/users.entity';
import { STATE_ENUM } from 'src/users/users.constant';
import { UsersService } from 'src/users/users.service';
import { ICreateFlashSale } from './entities/create-flash-sale.entity';
import { IFlashSale } from './entities/flash-sale.entity';
import { FlashSaleRepository } from './flash-sales.repository';

@Injectable()
export class FlashSalesService {
  constructor(
    private flashSaleRepository: FlashSaleRepository,
    private schedulerRegistry: SchedulerRegistry,
    private mailsService: MailsService,
    private usersService: UsersService,
  ) {}

  async createFlashSale(
    createFlashSaleData: ICreateFlashSale,
  ): Promise<IFlashSale> {
    const createFlashSale = await this.flashSaleRepository.create(
      createFlashSaleData,
    );
    const date = new Date(createFlashSaleData.startTime);
    const job = new CronJob(date, async () => {
      const allUser = await this.usersService.findAll({
        status: STATE_ENUM.ACTIVE,
      });
      console.log(allUser);

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
      console.log(allPromise.length);

      Promise.all(allPromise);
    });
    this.schedulerRegistry.addCronJob(`${Date.now()}`, job);
    job.start();
    return createFlashSale;
  }
}
