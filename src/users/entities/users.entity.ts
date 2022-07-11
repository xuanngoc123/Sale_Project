import { ObjectID } from '../../commons/commons.type';

export interface IUser {
  _id?: ObjectID;
  userName: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  role?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  _delete?: boolean;
}
