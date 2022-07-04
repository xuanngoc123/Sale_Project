import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'src/commons/commons.type';

export type FlashSaleDocument = FlashSale & Document;
@Schema({ timestamps: true })
export class FlashSale {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  listItems: [ItemFlashSale];

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);

class ItemFlashSale {
  @Prop({ required: true, type: String })
  productId: ObjectID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true, default: 0 })
  quantitySold: number;

  @Prop({ required: true })
  discount: number;
}
