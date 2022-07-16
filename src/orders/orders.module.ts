import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { FlashSalesModule } from '../flash-sales/flash-sales.module';
import { ItemsModule } from '../items/items.module';
import { VouchersModule } from '../vouchers/vouchers.module';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { Order, OrderSchema } from './orders.schema';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    forwardRef(() => ItemsModule),
    VouchersModule,
    FlashSalesModule,
    FileUploadModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
