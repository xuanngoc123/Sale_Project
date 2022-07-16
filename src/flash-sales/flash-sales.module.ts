import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { MailsModule } from '../mails/mails.module';
import { UsersModule } from '../users/users.module';
import { FlashSalesController } from './flash-sales.controller';
import { FlashSaleRepository } from './flash-sales.repository';
import { FlashSaleSchema } from './flash-sales.schema';
import { FlashSalesService } from './flash-sales.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'FlashSale', schema: FlashSaleSchema }]),
    MailsModule,
    UsersModule,
    FileUploadModule,
  ],
  controllers: [FlashSalesController],
  providers: [FlashSalesService, FlashSaleRepository],
  exports: [FlashSalesService],
})
export class FlashSalesModule {}
