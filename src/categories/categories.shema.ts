import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;
@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imageBaners: [string];

  @Prop({ required: true })
  imageCategory: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, unique: true })
  priority: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
