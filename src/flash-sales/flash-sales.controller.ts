import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateFlashSaleDto } from './dto/create-flash-sale.dto';
import { IFlashSale } from './entities/flash-sale.entity';
import { FlashSalesService } from './flash-sales.service';

@ApiTags('Flash Sale')
@Controller('flash-sales')
export class FlashSalesController {
  constructor(private flashSalesService: FlashSalesService) {}

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createFlashSale(
    @Body() createFlashSaleDto: CreateFlashSaleDto,
  ): Promise<IFlashSale> {
    return this.flashSalesService.createFlashSale(createFlashSaleDto);
  }
}
