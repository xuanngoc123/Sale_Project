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

  @Prop({ required: true, unique: true })
  barcode: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  price: number;

  @Prop({
    required: true,
    isInteger: true,
    min: 0,
  })
  quantity: number;

  @Prop({ required: true, isInteger: true, default: 0, min: 0 })
  quantitySold: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  avatar: string;

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
  const data = this.getChanges();

  if (data['$set'].categoryName) {
    const category = await this.db.collection('categories').findOne({
      _id: new mongoose.Types.ObjectId(`${this.categoryId}`),
      name: this.categoryName,
      _delete: false,
    });

    if (!category) {
      throw new BadRequestException('Category does not exist');
    }
    next();
  }
});
