export interface IUpdateVoucher {
  name?: string;

  quantity?: number;

  thresholdDiscount?: number;

  discountAmount?: number;

  startTime?: Date;

  endTime?: Date;
}
