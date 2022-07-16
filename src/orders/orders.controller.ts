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
  ApiQuery,
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
import { UpdateStatusOrderDto } from './dto/update-order.dto';
import { IOrder } from './entities/order.entity';
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

  //CREATE ORDER----------------------------------
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

  //UPDATE STATUS ORDER----------------------------------
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
    @Body() status: UpdateStatusOrderDto,
    @Req() req: any,
    @Param('id') id: string,
  ): Promise<IOrder> {
    return this.ordersService.updateStatusOrder(status.status, req, id);
  }

  //GET MY ORDER BY ID----------------------------------
  @ApiOkResponse({ type: OrderResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyOrderById(@Param('id') id: string, @Req() req: any): Promise<IOrder> {
    return this.ordersService.getMyOrderById(id, req);
  }

  //GET MY LIST ORDER----------------------------------
  @ApiOkResponse({ type: [OrderResponse] })
  @UseGuards(JwtAuthGuard)
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @Get()
  getListMyOrder(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
    @Req() req: any,
  ): Promise<IOrder[]> {
    return this.ordersService.getListMyOrder(req, limit, page, sort);
  }
}
