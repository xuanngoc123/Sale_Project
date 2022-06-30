import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from '../categories/categories.shema';
export type ItemDocument = Item & Document;
@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  barcode: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  quantitySold: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  images: [string];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  isFlashSale: boolean;

  @Prop({ required: true })
  tag: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Category' })
  categoryId: Category;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
