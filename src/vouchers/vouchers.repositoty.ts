import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../database/entity.repository';
import { Voucher, VoucherDocument } from './vouchers.schema';

@Injectable()
export class VoucherRepository extends EntityRepository<VoucherDocument> {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
  ) {
    super(voucherModel);
  }
}
