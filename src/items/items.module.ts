import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSalesModule } from '../flash-sales/flash-sales.module';
import { ItemsController } from './items.controller';
import { ItemRepository } from './items.repository';
import { ItemsService } from './items.service';
import { Item, ItemSchema } from './items.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
    FlashSalesModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemRepository],
})
export class ItemsModule {}
