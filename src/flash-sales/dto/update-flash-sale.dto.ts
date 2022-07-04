import { PartialType } from '@nestjs/swagger';
import { CreateFlashSaleDto } from './create-flash-sale.dto';

export class UpdateFlashSaleDto extends PartialType(CreateFlashSaleDto) {}
