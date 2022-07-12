import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateFlashSaleDto } from './dto/create-flash-sale.dto';
import { IFlashSale } from './entities/flash-sale.entity';
import { FlashSalesService } from './flash-sales.service';
import { UpdateFlashSaleDto } from './dto/update-flash-sale.dto';
import { FlashSaleResponse } from './dto/swagger.dto';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '../swagger/value-example';

@ApiTags('Flash Sale')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: InternalServerErrorResponse,
})
@Controller('flash-sales')
export class FlashSalesController {
  constructor(private flashSalesService: FlashSalesService) {}

  //CREATE FLASH SALE---------------------------
  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({ type: FlashSaleResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createFlashSale(
    @Body() createFlashSaleDto: CreateFlashSaleDto,
  ): Promise<IFlashSale> {
    return this.flashSalesService.createFlashSale(createFlashSaleDto);
  }

  //UPDATE FLASH SALE-------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ type: FlashSaleResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  updateFlashSale(
    @Param('id') id: string,
    @Body() updateFlashSaleDto: UpdateFlashSaleDto,
  ): Promise<IFlashSale> {
    return this.flashSalesService.updateFlashSale(id, updateFlashSaleDto);
  }

  //GET FLASH SALE BY ID------------------------------------
  @ApiOkResponse({ type: FlashSaleResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @Get(':id')
  getFlashSaleById(@Param('id') id: string): Promise<IFlashSale> {
    return this.flashSalesService.getFlashSaleById(id);
  }

  //DELETE FLASH SALE------------------------------
  @ApiBearerAuth('Authorization')
  @ApiNoContentResponse({ description: 'delete success' })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deleteFlashSale(@Query('id') id: string): Promise<any> {
    return this.flashSalesService.deleteFlashSale(id);
  }
}
