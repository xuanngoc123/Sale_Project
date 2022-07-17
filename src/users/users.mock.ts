import { STATUS_USER_ENUM } from './users.constant';
import { IUpdateUser } from './entities/update-user.entity';
import { IUser } from './entities/users.entity';
import mongoose from 'mongoose';
import { ICreateUser } from './entities/create-user.entity';

export const mockCreateUserDto: ICreateUser = {
  userName: 'xuanngochq2k',
  password: '123',
  email: 'xuanngochq2k@gmail.com',
};

export const mockCreateUser = {
  _id: Date.now(),
  userName: 'xuanngochq2k',
  status: STATUS_USER_ENUM.INACTIVE,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const mockUpdateUserDto: IUpdateUser = {
  userName: '1',
  phoneNumber: '1',
  address: '1',
};

export const mockUpdateInfoUser: IUser = {
  _id: new mongoose.Types.ObjectId('62cce07d0cbee3b42a793db1'),
  phoneNumber: '123',
  userName: 'xuanngochq2k',
  address: '123',
  email: 'xuanngochq2k@gmail.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};
