import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { STATUS_CATEGORY_ENUM } from './categories.constant';

export type CategoryDocument = Category & Document;
@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageBanners: [string];

  @Prop({ required: true })
  imageCategory: string;

  @Prop({
    enum: STATUS_CATEGORY_ENUM,
    required: true,
    default: STATUS_CATEGORY_ENUM.INACTIVE,
  })
  status: STATUS_CATEGORY_ENUM;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: Date.now() })
  priority: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
