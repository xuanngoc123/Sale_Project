import mongoose from 'mongoose';
import { STATE_USER_ENUM } from '../users/users.constant';

export type ObjectID = mongoose.Types.ObjectId;

export class PayloadJwt {
  role: string;
  email: string;
  userName: string;
  status: STATE_USER_ENUM;
  address: string;
  phoneNumber: string;
}

export class ResponseUploadFile {
  key: string;
  publicUrl: string;
}
