import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateFlashSaleDto } from './dto/create-flash-sale.dto';
import { IFlashSale } from './entities/flash-sale.entity';
import { FlashSalesService } from './flash-sales.service';
import { UpdateFlashSaleDto } from './dto/update-flash-sale.dto';

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

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  updateFlashSale(
    @Query('id') id: string,
    @Body() updateFlashSaleDto: UpdateFlashSaleDto,
  ): Promise<IFlashSale> {
    return this.flashSalesService.updateFlashSale(id, updateFlashSaleDto);
  }

  @Get(':id')
  getFlashSaleById(@Param('id') id: string): Promise<IFlashSale> {
    return this.flashSalesService.getFlashSaleById(id);
  }

  @Get()
  getAllFlashSaleByQuery(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
  ): Promise<IFlashSale[]> {
    return this.flashSalesService.getAllFlashSaleByQuery(limit, page, sort);
  }

  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  deleteFlashSale(@Query('id') id: string): Promise<any> {
    return this.flashSalesService.deleteFlashSale(id);
  }
}
