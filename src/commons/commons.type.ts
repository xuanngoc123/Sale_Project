import mongoose from 'mongoose';

export type ObjectID = mongoose.Types.ObjectId;

export class PayloadJwt {
  role: string;
  email: string;
  userName: string;
}
