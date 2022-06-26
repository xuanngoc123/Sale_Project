import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './users.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { generateActiveToken } from '../commons/generate-token';
import { ROLE_ENUM, STATE_ENUM } from './users.constant';
import { verifyToken } from '../commons/verify-token';
import { ObjectID, PayloadJwt } from '../commons/commons.type';
import { MailService } from '../mail/mail.service';
@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
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
      userName: createUser.userName,
    });
    const html = `Click to active: <a href="${process.env.FROENT_HOST}?token=${activeToken}">${process.env.FROENT_HOST}?token=${activeToken}</a>`;
    const subject = 'VERIFY EMAIL';
    await this.mailService.sendMail(createUserDto, html, subject);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, userName, isVerify, createdAt, updatedAt, ...hiden } =
      createUser;
    return {
      _id,
      userName,
      isVerify,
      createdAt,
      updatedAt,
    };
  }
  async vefifyEmail(token: string) {
    const data: PayloadJwt = verifyToken(token, process.env.VERIFY_TOKEN_KEY);
    const userAfterUpdate = await this.userRepository.findOneAndUpdate(
      { email: data.email },
      { isVerify: STATE_ENUM.ACTIVE },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, userName, isVerify, createdAt, updatedAt, ...hiden } =
      userAfterUpdate;
    return {
      _id,
      userName,
      isVerify,
      createdAt,
      updatedAt,
    };
  }

  deleteUser(id: ObjectID) {
    return this.userRepository.deleteMany({ _id: id });
  }
}
