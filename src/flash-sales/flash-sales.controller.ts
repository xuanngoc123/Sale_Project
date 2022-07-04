import { Controller, Post } from '@nestjs/common';
import { CreateFlashSaleDto } from './dto/create-flash-sale.dto';
import { FlashSalesService } from './flash-sales.service';

@Controller('flash-sales')
export class FlashSalesController {
  constructor(private flashSalesService: FlashSalesService) {}

  @Post()
  createFlashSale(createFlashSaleDto: CreateFlashSaleDto) {
    return this.flashSalesService.createFlashSale(createFlashSaleDto);
  }
}
