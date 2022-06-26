import { ObjectID } from '../commons/commons.type';

export interface IUsers {
  _id: ObjectID;
  userName: string;
  //   password: string;
  //   email: string;
  //   phoneNumber: string;
  //   address: string;
  //   role: string;
  isVerify: string;
  createdAt: Date;
  updatedAt: Date;
}
