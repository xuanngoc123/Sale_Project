import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // handleRequest(err: any, user: any, info: any, context: any, status?: any) {
  //   const request = context.switchToHttp().getRequest();
  //   const { email, password } = request.body;
  //   if (err || !user) {
  //     if (!password) {
  //       throw new HttpException(
  //         { message: 'Password is not empty' },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     if (!email) {
  //       throw new HttpException(
  //         { message: 'Email is not empty' },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     if (!email.IsEmail) {
  //       throw new HttpException(
  //         { message: 'Email invalid' },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}
