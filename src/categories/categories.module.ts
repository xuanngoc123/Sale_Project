import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { CategoriesController } from './categories.controller';
import { CategoryRepository } from './categories.repository';
import { CategoriesService } from './categories.service';
import { CategorySchema } from './categories.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    FileUploadModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository],
})
export class CategoriesModule {}
