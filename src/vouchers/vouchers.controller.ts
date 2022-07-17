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
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { IVoucher } from './entities/voucher.entity';
import { VouchersService } from './vouchers.service';
import { VoucherResponse } from './dto/swagger.dto';
import {
  BadRequestResponse,
  ForbiddenResponse,
  InternalServerErrorResponse,
  NotFoundResponse,
  UnauthorizedResponse,
} from '../swagger/value-example';

@ApiTags('Voucher')
@ApiInternalServerErrorResponse({
  description: 'Internal Server Error',
  type: InternalServerErrorResponse,
})
@Controller('vouchers')
export class VouchersController {
  constructor(private vouchersService: VouchersService) {}

  //CREATE VOUCHER-----------------------------------
  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({ type: VoucherResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createVoucher(
    @Body() createVoucherDto: CreateVoucherDto,
  ): Promise<IVoucher> {
    return this.vouchersService.createVoucher(createVoucherDto);
  }

  //UPDATE VOUCHER---------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ type: VoucherResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateVoucher(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ): Promise<IVoucher> {
    return this.vouchersService.updateVoucher(id, updateVoucherDto);
  }

  //GET VOUCHER BY ID---------------------------------
  @ApiOkResponse({ type: VoucherResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @Get(':id')
  getVoucherById(@Param('id') id: string): Promise<IVoucher> {
    return this.vouchersService.getVoucherById(id);
  }

  //GET LIST VOUCHER-------------------------------------
  @ApiOkResponse({ type: [VoucherResponse] })
  @Get()
  getAllVoucher(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('sort') sort: string,
  ): Promise<IVoucher[]> {
    return this.vouchersService.getAllVoucher(limit, page, sort);
  }

  //DELETE VOUCHER--------------------------------------------------
  @ApiBearerAuth('Authorization')
  @ApiNoContentResponse({ description: 'Delete success' })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse })
  @ApiForbiddenResponse({ type: ForbiddenResponse })
  @ApiNotFoundResponse({ type: NotFoundResponse })
  @Roles(ROLE_ENUM.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  deteteVoucher(@Query('id') id: string) {
    return this.vouchersService.deleteVoucher(id);
  }
}
