import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE_ENUM, STATE_USER_ENUM } from './users.constant';

export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  phoneNumber: string;

  @Prop({ default: null })
  address: string;

  @Prop({ enum: ROLE_ENUM, default: ROLE_ENUM.USER })
  role: string;

  @Prop({ enum: STATE_USER_ENUM, default: STATE_USER_ENUM.INACTIVE })
  status: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ default: false })
  _delete: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
