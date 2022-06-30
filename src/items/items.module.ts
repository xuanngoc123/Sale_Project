import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { ItemsController } from './items.controller';
import { ItemRepository } from './items.repository';
import { ItemsService } from './items.service';
import { ItemSchema } from './items.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
    FileUploadModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService, ItemRepository],
})
export class ItemsModule {}
