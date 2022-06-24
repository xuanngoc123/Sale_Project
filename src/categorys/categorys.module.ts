import { Module } from '@nestjs/common';
import { CategorysController } from './categorys.controller';
import { CategorysService } from './categorys.service';

@Module({
  controllers: [CategorysController],
  providers: [CategorysService]
})
export class CategorysModule {}
