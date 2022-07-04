import { ROLE_ENUM, STATE_ENUM } from './users.constant';
import { CreateUserDto } from './dto/create-user.dto';

export const mockCreateUser: any = {
  _id: Date.now(),
  userName: 'xuanngochq2k',
  status: STATE_ENUM.INACTIVE,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};
export const mockCreateUserDto: CreateUserDto = {
  userName: 'xuanngochq2k',
  password: '123',
  email: 'xuanngochq2k@gmail.com',
};
