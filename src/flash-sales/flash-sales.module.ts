import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailsModule } from 'src/mails/mails.module';
import { UsersModule } from 'src/users/users.module';
import { FlashSalesController } from './flash-sales.controller';
import { FlashSaleRepository } from './flash-sales.repository';
import { FlashSaleSchema } from './flash-sales.schema';
import { FlashSalesService } from './flash-sales.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FlashSale', schema: FlashSaleSchema }]),
    MailsModule,
    UsersModule,
  ],
  controllers: [FlashSalesController],
  providers: [FlashSalesService, FlashSaleRepository],
})
export class FlashSalesModule {}
