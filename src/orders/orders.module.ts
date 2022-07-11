import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSalesModule } from 'src/flash-sales/flash-sales.module';
import { ItemsModule } from 'src/items/items.module';
import { VouchersModule } from 'src/vouchers/vouchers.module';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { Order, OrderSchema } from './orders.schema';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ItemsModule,
    VouchersModule,
    FlashSalesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
