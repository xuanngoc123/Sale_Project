import { Injectable } from '@nestjs/common';
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

  getVoucherById(id: string): Promise<IVoucher> {
    return this.voucherRepository.findOne({ _id: id });
  }

  getAllVoucher(
    limit: number,
    page: number,
    sort: string,
  ): Promise<IVoucher[]> {
    return this.voucherRepository.find({}, limit, page, sort);
  }

  deleteVoucher(id: string) {
    return this.voucherRepository.deleteOne({ _id: id });
  }
}
