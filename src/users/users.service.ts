import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { STATE_USER_ENUM } from './users.constant';
import { ObjectID, PayloadJwt } from '../commons/commons.type';
import { MailsService } from '../mails/mails.service';
import { FilterQuery } from 'mongoose';
import { UserDocument } from './users.schema';
import { JwtService } from '@nestjs/jwt';
import { ICreateUser } from './entities/create-user.entity';
import { IUser } from './entities/users.entity';
import { IUpdateUser } from './entities/update-user.entity';
import { Request } from 'express';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailsService: MailsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserData: ICreateUser): Promise<IUser> {
    const findUser = await this.userRepository.findOne({
      email: createUserData.email,
    });
    if (findUser) {
      throw new ConflictException();
    }
    const salt = await bcrypt.genSalt(10);
    const encypted_password = await bcrypt.hash(createUserData.password, salt);
    createUserData.password = encypted_password;

    const createUser = await this.userRepository.create(createUserData);
    const activeToken = this.jwtService.sign({
      email: createUser.email,
    });
    const html = `Click to active: <a href="${process.env.FROENT_HOST}?token=${activeToken}">${process.env.FROENT_HOST}?token=${activeToken}</a>`;
    const subject = 'VERIFY EMAIL';
    await this.mailsService.sendMail(createUserData, html, subject);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, userName, status, createdAt, updatedAt, ...hiden } =
      createUser;
    return {
      _id,
      userName,
      status,
      createdAt,
      updatedAt,
    };
  }
  async verifyEmail(token: string) {
    try {
      const data: PayloadJwt = this.jwtService.verify(token);
      const userAfterUpdate = await this.userRepository.findOneAndUpdate(
        { email: data.email },
        { status: STATE_USER_ENUM.ACTIVE },
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, userName, status, createdAt, updatedAt, ...hiden } =
        userAfterUpdate;

      return {
        _id,
        userName,
        status,
        createdAt,
        updatedAt,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateInfo(updateUserData: IUpdateUser, req: Request): Promise<IUser> {
    const updateInfo: IUser = await this.userRepository.findOneAndUpdate(
      { _id: req['user']['_id'] },
      updateUserData,
    );

    const { _id, userName, email, phoneNumber, address, createdAt, updatedAt } =
      updateInfo;
    return { _id, userName, email, phoneNumber, address, createdAt, updatedAt };
  }

  async resendEmail(email) {
    try {
      const user: IUser = await this.userRepository.findOne({ email: email });
      if (!user) {
        throw new NotFoundException('Email not found');
      }
      if (user.status === STATE_USER_ENUM.BANNED) {
        throw new BadRequestException('Account banned');
      }
      if (user.status === STATE_USER_ENUM.ACTIVE) {
        throw new BadRequestException('Account actived');
      }
      const activeToken = this.jwtService.sign({
        email: email,
      });
      const html = `Click to active: <a href="${process.env.FROENT_HOST}?token=${activeToken}">${process.env.FROENT_HOST}?token=${activeToken}</a>`;
      const subject = 'VERIFY EMAIL';
      await this.mailsService.sendMail(user, html, subject);
      return 'Send mail success';
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUser(id: ObjectID): Promise<void> {
    await this.userRepository.deleteOne({ _id: id });
    return;
  }

  findOne(filterQuery: FilterQuery<UserDocument>) {
    return this.userRepository.findOne(filterQuery);
  }

  findAll(condition) {
    return this.userRepository.findAll(condition);
  }
}
