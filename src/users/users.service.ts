import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { AppService } from 'src/app.service';
import { generateActiveToken } from 'src/commons/generate-token';
import { ROLE_ENUM } from './users.constant';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly appService: AppService,
  ) {}
  async register(createUserDto: CreateUserDto): Promise<any> {
    const findUser = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (findUser) {
      throw new ConflictException();
    }
    const salt = await bcrypt.genSalt(10);
    const encypted_password = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = encypted_password;
    const createUser = await this.userRepository.create(createUserDto);
    const activeToken = generateActiveToken({
      role: ROLE_ENUM.USER,
      email: createUser.email,
    });
    const html = `Click to active: <a href="${process.env.FROENT_HOST}?token=${activeToken}"><a href="${process.env.FROENT_HOST}?token=${activeToken}</a>`;
    const subject = 'VERIFY EMAIL';
    await this.appService.sendMail(createUserDto, html, subject);
    console.log(html);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, userName, isVerify, createdAt, updatedAt, ...data } =
      createUser;
    return {
      _id,
      userName,
      isVerify,
      createdAt,
      updatedAt,
    };
  }
}
