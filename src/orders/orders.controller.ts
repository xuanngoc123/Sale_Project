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
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import {
  BadRequestResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from 'src/swagger/value-example';
import { ROLE_ENUM } from 'src/users/users.constant';
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
    @Req() req: Request,
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
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<IOrder> {
    return this.ordersService.updateStatusOrder(status, req, id);
  }

  @ApiOkResponse({ type: OrderResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyOrderById(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<IOrder> {
    return this.ordersService.getMyOrderById(id, req);
  }

  @ApiOkResponse({ type: [OrderResponse] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getListMyOrder(@Req() req: Request): Promise<IOrder[]> {
    return this.ordersService.getListMyOrder(req);
  }
}
