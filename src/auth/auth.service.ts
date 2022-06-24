import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
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

    if (user && checkPassword === true) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user['_doc'];
      return this.login(result);
    }
    return null;
  }

  async login(user: any) {
    const payload = { userName: user.userName, id: user._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userName: user.userName,
      },
    };
  }
}
