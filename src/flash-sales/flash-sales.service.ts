import { Injectable } from '@nestjs/common';
import { ICreateFlashSale } from './entities/create-flash-sale.entity';
import { IFlashSale } from './entities/flash-sale.entity';
import { FlashSaleRepository } from './flash-sales.repository';

@Injectable()
export class FlashSalesService {
  constructor(private flashSaleRepository: FlashSaleRepository) {}

  createFlashSale(createFlashSaleData: ICreateFlashSale): Promise<IFlashSale> {
    return this.flashSaleRepository.create(createFlashSaleData);
  }
}
