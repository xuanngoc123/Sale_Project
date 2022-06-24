import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { MailService } from './mail/mail.service';

@Controller()
@ApiTags('Auth')
export class AppController {
  constructor(
    private mailService: MailService,
    private appService: AppService,
  ) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  login(@Req() req): any {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get('sendmmail')
  async sendMail() {
    const user = { email: 'dangngochq2k@gmail.com' };
    const send = await this.appService.sendMail(user, '123', 'test');
    console.log(send);

    return '123';
  }
}
