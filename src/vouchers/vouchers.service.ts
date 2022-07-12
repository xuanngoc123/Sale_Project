import { Injectable, NotFoundException } from '@nestjs/common';
import { ICreateVoucher } from './entities/create-voucher.entity';
import { IUpdateVoucher } from './entities/update-voucher.entity';
import { IVoucher } from './entities/voucher.entity';
import { VoucherRepository } from './vouchers.repositoty';

@Injectable()
export class VouchersService {
  constructor(private voucherRepository: VoucherRepository) {}

  createVoucher(createVoucherData: ICreateVoucher): Promise<IVoucher> {
    return this.voucherRepository.create(createVoucherData);
  }

  updateVoucher(
    id: string,
    updateVoucherData: IUpdateVoucher,
  ): Promise<IVoucher> {
    return this.voucherRepository.findOneAndUpdate(
      { _id: id },
      updateVoucherData,
    );
  }

  async getVoucherById(id: string): Promise<IVoucher> {
    const now = new Date().toISOString();
    const voucher: IVoucher = await this.voucherRepository.findOne({
      _id: id,
      startTime: { $lt: now },
      endTime: { $gt: now },
    });
    if (!voucher) {
      throw new NotFoundException();
    }
    return voucher;
  }

  getAllVoucher(
    limit: number,
    page: number,
    sort: string,
  ): Promise<IVoucher[]> {
    const now = new Date().toISOString();
    return this.voucherRepository.find(
      { startTime: { $lt: now }, endTime: { $gt: now } },
      limit,
      page,
      sort,
    );
  }

  async deleteVoucher(id: string) {
    await this.voucherRepository.deleteOne({ _id: id });
    return;
  }

  updateQuantity(id, quantity: number) {
    return this.voucherRepository.findOneAndUpdateQuantity(
      { _id: id },
      { $inc: { quantity: quantity, quantityUsed: -quantity } },
    );
  }
}
