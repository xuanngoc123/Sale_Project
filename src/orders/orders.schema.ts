import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from '../commons/commons.type';
import { STATUS_ORDER_ENUM } from './orders.constant';
export type OrderDocument = Order & Document;

@Schema({ _id: false })
class ItemOrder extends Document {
  @Prop({ required: true, type: String })
  itemId: ObjectID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  barcode: number;

  @Prop({ required: true, min: 1, isInteger: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  avatar: string;

  @Prop({ default: null })
  priceFlashSale: number | null;

  @Prop({ default: null })
  discount: number | null;

  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true, type: String })
  categoryId: ObjectID;
}
const ItemOrderSchema = SchemaFactory.createForClass(ItemOrder);

@Schema({ _id: false })
class UserInfo extends Document {
  @Prop({ required: true, type: String })
  userId: ObjectID;

  @Prop({ required: true })
  userName: string;

  @Prop()
  address: string | null;

  @Prop()
  phoneNumber: string | null;
}
const UserInfoSchema = SchemaFactory.createForClass(UserInfo);

@Schema({ _id: false })
class VoucherInfo extends Document {
  @Prop({ required: true, type: String })
  voucherId: ObjectID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  thresholdDiscount: number;

  @Prop({ required: true })
  discountAmount: number;
}
const VoucherInfoSchema = SchemaFactory.createForClass(VoucherInfo);

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: [ItemOrderSchema] })
  listItems: [ItemOrder];

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  originalPrice: number;

  @Prop({ required: true })
  phoneNumberReceive: string;

  @Prop({ required: true })
  addressReceive: string;

  @Prop({ enum: STATUS_ORDER_ENUM, default: STATUS_ORDER_ENUM.COMFIRM })
  status: string;

  @Prop({ type: VoucherInfoSchema, default: null })
  voucherInfo: VoucherInfo;

  @Prop({ required: true, type: UserInfoSchema })
  userInfo: UserInfo;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  _delete: boolean;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
