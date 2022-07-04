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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ROLE_ENUM } from '../users/users.constant';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { IVoucher } from './entities/voucher.entity';
import { VouchersService } from './vouchers.service';

@ApiTags('Voucher')
@Roles(ROLE_ENUM.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('Authorization')
@Controller('vouchers')
export class VouchersController {
  constructor(private vouchersService: VouchersService) {}

  @Post()
  async createVoucher(
    @Body() createVoucherDto: CreateVoucherDto,
  ): Promise<IVoucher> {
    return this.vouchersService.createVoucher(createVoucherDto);
  }

  @Put(':id')
  async updateVoucher(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ): Promise<IVoucher> {
    return this.vouchersService.updateVoucher(id, updateVoucherDto);
  }

  @Get()
  getAllVoucher() {
    return 1;
  }

  @Delete()
  deteteVoucher(@Query('id') id: string) {
    return this.vouchersService.deleteVoucher(id);
  }
}
