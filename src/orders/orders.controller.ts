import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE_ENUM } from 'src/users/users.constant';
import { CreateOrderDto } from './dto/create-order.dto';
import { CancelOrderDto, UpdateOrderDto } from './dto/update-order.dto';
import { IOrder } from './entities/order.entity';
import { STATUS_ORDER_ENUM } from './orders.constant';
import { OrdersService } from './orders.service';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Roles(ROLE_ENUM.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request,
  ): Promise<IOrder> {
    return this.ordersService.createOrder(createOrderDto, req);
  }

  @Roles(ROLE_ENUM.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateStatusOrder(
    @Query('status') status: STATUS_ORDER_ENUM,
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<IOrder> {
    return this.ordersService.updateStatusOrder(status, req, id);
  }

  @Roles(ROLE_ENUM.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  getMyOrderById(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<IOrder> {
    return this.ordersService.getMyOrderById(id, req);
  }

  @Roles(ROLE_ENUM.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getListMyOrder(@Req() req: Request): Promise<IOrder[]> {
    return this.ordersService.getListMyOrder(req);
  }
}
