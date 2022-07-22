import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VouchersController } from './vouchers.controller';
import { VoucherRepository } from './vouchers.repository';
import { VoucherSchema } from './vouchers.schema';
import { VouchersService } from './vouchers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Voucher', schema: VoucherSchema }]),
  ],
  controllers: [VouchersController],
  providers: [VouchersService, VoucherRepository],
  exports: [VouchersService],
})
export class VouchersModule {}
