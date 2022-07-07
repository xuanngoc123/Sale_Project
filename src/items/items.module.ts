import { BadRequestException, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoryRepository } from 'src/categories/categories.repository';
import { ItemsController } from './items.controller';
import { ItemRepository } from './items.repository';
import { ItemsService } from './items.service';
import { Item, ItemSchema } from './items.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemRepository],
})
export class ItemsModule {}
