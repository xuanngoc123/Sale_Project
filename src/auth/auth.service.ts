import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadJwt } from '../commons/commons.type';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ email: username });
    if (!user) {
      return null;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    console.log(user);

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
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        userName: user.userName,
      },
    };
  }
}
