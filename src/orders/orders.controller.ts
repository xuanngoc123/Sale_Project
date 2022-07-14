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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '../swagger/value-example';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponse } from './dto/swagger.dto';
import { IOrder } from './entities/order.entity';
import { STATUS_ORDER_ENUM } from './orders.constant';
import { OrdersService } from './orders.service';

@ApiTags('Order')
@ApiBearerAuth('Authorization')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: InternalServerErrorResponse,
})
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiCreatedResponse({ type: OrderResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: any,
  ): Promise<IOrder> {
    return this.ordersService.createOrder(createOrderDto, req);
  }

  @ApiOkResponse({ type: OrderResponse })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
    description: 'Status is enum CANCEL/DELIVERED',
  })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateStatusOrder(
    @Query('status') status: STATUS_ORDER_ENUM,
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<IOrder> {
    return this.ordersService.updateStatusOrder(status, req, id);
  }

  @ApiOkResponse({ type: OrderResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyOrderById(@Param('id') id: string, @Req() req: any): Promise<IOrder> {
    return this.ordersService.getMyOrderById(id, req);
  }

  @ApiOkResponse({ type: [OrderResponse] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getListMyOrder(@Req() req: any): Promise<IOrder[]> {
    return this.ordersService.getListMyOrder(req);
  }
}
