import { BadRequestException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectID } from 'src/commons/commons.type';
import { FlashSaleDto } from './dto/flash-sale.dto';

export type FlashSaleDocument = FlashSale & Document;

@Schema({ _id: false })
class ItemFlashSale extends Document {
  @Prop({ required: true, type: String })
  itemId: ObjectID;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  categoryId: string;

  @Prop({ required: true, min: 0 })
  quantity: number;

  @Prop({ required: true, default: 0 })
  quantitySold: number;

  @Prop({ required: true })
  discount: number;
}
const ItemFlashSaleSchema = SchemaFactory.createForClass(ItemFlashSale);

@Schema({ timestamps: true })
export class FlashSale {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: [ItemFlashSaleSchema],
    default: [],
  })
  listItems: [ItemFlashSale];

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

export const FlashSaleSchema = SchemaFactory.createForClass(FlashSale);

export interface FlashSaleModel extends Document, FlashSaleDto {}

FlashSaleSchema.pre<FlashSaleModel>('save', async function (next) {
  const uniqueName = [];
  const uniqueItemId = [];
  for (let i = 0, l = this.listItems.length; i < l; i++) {
    const name = this.listItems[i].name;
    const itemId = this.listItems[i].itemId;

    // const item = await this.db
    //   .collection('items')
    //   .findOne({ _id: itemId, _delete: false });

    // if (this.listItems[i].quantity > item.quantity) {
    //   throw new BadRequestException(`Quantity of ${name} invalid`);
    // }

    if (uniqueName.indexOf(name) > -1) {
      throw new BadRequestException('Duplicate name in itemLists');
    }
    if (uniqueItemId.indexOf(itemId) > -1) {
      throw new BadRequestException('Duplicate itemId in itemLists');
    }

    uniqueName.push(name);
    uniqueItemId.push(itemId);
  }

  const data = this.getChanges();

  if (data['$set'].startTime) {
    const findFlashSale = await this.db.collection('flashsales').findOne({
      endTime: { $gt: this.startTime },
      _delete: false,
    });

    if (findFlashSale) {
      throw new BadRequestException('flash sale is not over yet');
    }
  }

  next();
});
