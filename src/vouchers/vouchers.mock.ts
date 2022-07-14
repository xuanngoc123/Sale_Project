import { CreateVoucherDto } from './dto/create-voucher.dto';
import { IVoucher } from './entities/voucher.entity';

export const mockVoucher: IVoucher = {
  name: '1',
  quantity: 0,
  quantityUsed: 0,
  thresholdDiscount: 0,
  discountAmount: 0,
  startTime: new Date(),
  endTime: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
  _delete: false,
};

export const mockCreateVoucherDto: CreateVoucherDto = {
  name: '1',
  quantity: 0,
  thresholdDiscount: 0,
  discountAmount: 0,
  startTime: new Date(),
  endTime: new Date(),
};
