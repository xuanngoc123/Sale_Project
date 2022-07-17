import mongoose from 'mongoose';
import { STATUS_USER_ENUM } from '../users/users.constant';

export type ObjectID = mongoose.Types.ObjectId;

export class PayloadJwt {
  _id: string;
  role: string;
  email: string;
  userName: string;
  status: STATUS_USER_ENUM;
  address: string;
  phoneNumber: string;
}

export class ResponseUploadFile {
  key: string;
  publicUrl: string;
}
