import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashSalesController } from './flash-sales.controller';
import { FlashSaleRepository } from './flash-sales.repository';
import { FlashSale, FlashSaleSchema } from './flash-sales.schema';
import { FlashSalesService } from './flash-sales.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FlashSale.name, schema: FlashSaleSchema },
    ]),
  ],
  controllers: [FlashSalesController],
  providers: [FlashSalesService, FlashSaleRepository],
})
export class FlashSalesModule {}
