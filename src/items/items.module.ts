import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from '../orders/orders.module';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { FlashSalesModule } from '../flash-sales/flash-sales.module';
import { ItemsController } from './items.controller';
import { ItemRepository } from './items.repository';
import { ItemsService } from './items.service';
import { ItemSchema } from './items.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    FlashSalesModule,
    FileUploadModule,
    forwardRef(() => OrdersModule),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemRepository],
  exports: [ItemsService],
})
export class ItemsModule {}
