import mongoose from 'mongoose';

export type ObjectID = mongoose.Types.ObjectId;

export class PayloadUser {
  role: string;
  email: string;
}
