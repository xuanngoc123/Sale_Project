import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE_ENUM } from 'src/users/users.constant';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrder } from './entities/order.entity';
import { OrdersService } from './orders.service';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Roles(ROLE_ENUM.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<IOrder> {
    return this.ordersService.createOrder(createOrderDto);
  }
}
