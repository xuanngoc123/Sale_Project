import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadJwt } from '../commons/commons.type';
import { EmailDto, PassDto } from './dto/auth.dto';
import { UsersService } from '../users/users.service';
import { STATUS_USER_ENUM } from '../users/users.constant';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: EmailDto, password: PassDto): Promise<any> {
    const user = await this.userService.findOne({
      email: email,
    });
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    // if (user.status === STATUS_USER_ENUM.INACTIVE) {
    //   throw new ForbiddenException('Account not actived');
    // }
    // if (user.status === STATUS_USER_ENUM.BANNED) {
    //   throw new ForbiddenException('Account banned');
    // }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword === false) {
      throw new BadRequestException('Password invalid');
    }
    if (user && checkPassword === true) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user['_doc'];
      return this.login(result);
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload: PayloadJwt = {
      _id: user._id,
      email: user.email,
      userName: user.userName,
      role: user.role,
      status: user.status,
      address: user.address,
      phoneNumber: user.phoneNumber,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        userName: user.userName,
      },
    };
  }
}
