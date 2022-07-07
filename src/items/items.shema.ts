import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from '../categories/categories.shema';
import { ItemDto } from './dto/items.dto';
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
  tag: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Category' })
  categoryId: Category;

  @Prop({ required: true })
  categoryName: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  _delete: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

export interface ItemModel extends Document, ItemDto {}

ItemSchema.pre<ItemModel>('save', async function (this, next) {
  const category = await this.db
    .collection('categories')
    .findOne({ name: this.categoryName });

  if (!category) {
    throw new BadRequestException('Category does not exist');
  }
  if (category._id != this.categoryId) {
    throw new BadRequestException('categoryId and caegoryName invalid');
  }
  next();
});