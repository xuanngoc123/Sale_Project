import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VoucherDocument = Voucher & Document;
@Schema({ timestamps: true })
export class Voucher {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, min: 0, isInteger: true })
  quantity: number;

  @Prop({ required: true, default: 0 })
  quantityUsed: number;

  @Prop({ required: true })
  thresholdDiscount: number;

  @Prop({ required: true })
  discountAmount: number;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  _delete: boolean;
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);
