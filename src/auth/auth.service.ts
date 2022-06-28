import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadJwt } from '../commons/commons.type';
import { EmailDto, PassDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
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
      return null;
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (user && checkPassword === true) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user['_doc'];
      return this.login(result);
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload: PayloadJwt = {
      email: user.email,
      userName: user.userName,
      role: user.role,
      status: user.status,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userName: user.userName,
      },
    };
  }
}
